"""
Layered Accelo -> Supabase ETL.

This module implements a 3-layer pipeline:
- raw: append-only payload capture
- staging: typed, source-faithful parsed rows
- core: strict relational/public tables
"""

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import signal
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Iterable, Optional

import psycopg2
import psycopg2.extras
from psycopg2 import InterfaceError, OperationalError
import requests
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("accelo_etl.log"),
    ],
)
log = logging.getLogger(__name__)


ACCELO_CLIENT_ID = os.getenv("ACCELO_CLIENT_ID")
ACCELO_CLIENT_SECRET = os.getenv("ACCELO_CLIENT_SECRET")
ACCELO_DEPLOYMENT = os.getenv("ACCELO_DEPLOYMENT", "p11creativeinc")
SUPABASE_DB_URL = os.getenv("SUPABASE_DB_URL")
ACCELO_HTTP_TIMEOUT_SECS = float(os.getenv("ACCELO_HTTP_TIMEOUT_SECS", "300"))
ACCELO_HTTP_MAX_RETRIES = int(os.getenv("ACCELO_HTTP_MAX_RETRIES", "6"))
ACCELO_HTTP_RETRY_BACKOFF_SECS = float(os.getenv("ACCELO_HTTP_RETRY_BACKOFF_SECS", "10"))
ACCELO_REQUEST_SPACING_SECS = float(os.getenv("ACCELO_REQUEST_SPACING_SECS", "0.25"))
ACCELO_RATE_LIMIT_MAX_SLEEP_SECS = float(os.getenv("ACCELO_RATE_LIMIT_MAX_SLEEP_SECS", "300"))
UPSERT_BATCH_SIZE = int(os.getenv("UPSERT_BATCH_SIZE", "1000"))

RAW_SCHEMA = os.getenv("ACCELO_RAW_SCHEMA", "raw")
STAGING_SCHEMA = os.getenv("ACCELO_STAGING_SCHEMA", "staging")
CORE_SCHEMA = os.getenv("ACCELO_CORE_SCHEMA", "public")
AUDIT_SCHEMA = os.getenv("ACCELO_AUDIT_SCHEMA", "audit")

ACCELO_BASE = f"https://{ACCELO_DEPLOYMENT}.api.accelo.com/api/v0"
TOKEN_URL = f"https://{ACCELO_DEPLOYMENT}.api.accelo.com/oauth2/v0/token"

INTEGER_TYPES = {"integer", "bigint", "smallint", "int", "int2", "int4", "int8", "numeric", "double precision", "real"}
TIMESTAMP_TYPES = {"timestamp without time zone", "timestamp with time zone"}
DATE_TYPES = {"date"}


@dataclass(frozen=True)
class EntitySpec:
    endpoint: Optional[str]
    table: str
    fields: Optional[str]
    date_field: Optional[str]
    detail_fetch: bool = False
    parent_table: Optional[str] = None
    parent_field: Optional[str] = None

    @property
    def is_linked(self) -> bool:
        return self.parent_table is not None and self.parent_field is not None

    @property
    def source_name(self) -> str:
        if self.endpoint:
            return self.endpoint
        return f"{self.parent_table}.{self.parent_field}"


BASE_ENTITY_SPECS: list[EntitySpec] = [
    EntitySpec("companies/statuses", "CompanyStatus", None, None),
    EntitySpec("contacts/statuses", "ContactStatus", None, None),
    EntitySpec("affiliations/statuses", "AffiliationStatus", None, None),
    EntitySpec("contracts/statuses", "ContractStatus", None, None),
    EntitySpec("contracts/types", "ContractType", None, None),
    EntitySpec("jobs/statuses", "JobStatus", None, None),
    EntitySpec("jobs/types", "JobType", None, None),
    EntitySpec("milestones/statuses", "MilestoneStatus", None, None),
    EntitySpec("tasks/statuses", "TaskStatus", None, None),
    EntitySpec("tasks/priorities", "TaskPriority", None, None),
    EntitySpec("issues/statuses", "IssueStatus", None, None),
    EntitySpec("issues/types", "IssueType", None, None),
    EntitySpec("issues/classes", "IssueClass", None, None),
    EntitySpec("issues/resolutions", "IssueResolution", None, None),
    EntitySpec("issues/priorities", "IssuePriority", None, None),
    EntitySpec("prospects/statuses", "ProspectStatus", None, None),
    EntitySpec("prospects/types", "ProspectType", None, None),
    EntitySpec("prospects/probabilities", "ProspectProbability", None, None),
    EntitySpec("expenses/types", "ExpenseType", None, None),
    EntitySpec("quotes/statuses", "QuoteStatus", None, None),
    EntitySpec("activities/classes", "ActivityClass", None, None),
    EntitySpec("assets/types", "AssetType", None, None),
    EntitySpec("contributors/types", "ContributorType", None, None),
    EntitySpec("requests/types", "RequestType", None, None),
    EntitySpec("staff", "Staff", None, "date_modified"),
    EntitySpec("rates", "Rate", None, None),
    EntitySpec("groups", "Group", None, None),
    EntitySpec("taxes", "Tax", None, None),
    EntitySpec("holidays", "Holiday", None, None),
    EntitySpec("divisions", "Division", None, None),
    EntitySpec("segmentations", "Segmentation", None, None),
    EntitySpec("tags", "Tag", None, None),
    EntitySpec("skills", "Skill", None, None),
    EntitySpec("companies", "Company", None, "date_modified"),
    EntitySpec("contacts", "Contact", None, "date_modified"),
    EntitySpec("affiliations", "Affiliation", None, "date_modified"),
    EntitySpec("addresses", "Address", None, "date_modified"),
    EntitySpec("contracts", "Contract", None, "date_modified"),
    EntitySpec("contracts/periods", "ContractPeriod", "_ALL,contract_budget(_ALL)", "date_modified"),
    EntitySpec("jobs", "Job", None, "date_modified"),
    EntitySpec("milestones", "Milestone", None, "date_modified"),
    EntitySpec("tasks", "Task", None, "date_modified"),
    EntitySpec("object_budgets", "ObjectBudget", None, "date_modified"),
    EntitySpec("activities", "Activity", "_ALL,activity_priority(_ALL),time_allocation(_ALL)", "date_modified"),
    EntitySpec("timers", "Timer", None, None),
    EntitySpec("time/externals", "TimeExternal", None, None),
    EntitySpec("invoices", "Invoice", None, "date_modified", detail_fetch=True),
    EntitySpec("invoices/line_items", "InvoiceLineItem", None, None),
    EntitySpec("payments", "Payment", None, "date_modified", detail_fetch=True),
    EntitySpec("expenses", "Expense", None, "date_modified"),
    EntitySpec("purchases", "Purchase", None, "date_modified"),
    EntitySpec("ledgers", "Ledger", None, None),
    EntitySpec("prospects", "Prospect", None, "date_modified"),
    EntitySpec("quotes", "Quote", None, "date_modified"),
    EntitySpec("referrals", "Referral", None, None),
    EntitySpec("issues", "Issue", None, "date_modified"),
    EntitySpec("requests", "Request", None, "date_modified"),
    EntitySpec("assets", "Asset", None, "date_modified"),
    EntitySpec("contributors", "Contributor", None, None),
    EntitySpec("signoffs", "Signoff", None, None),
    EntitySpec("signoffs/recipients", "SignoffRecipient", None, None),
    EntitySpec("signoffs/attachments", "SignoffAttachment", None, None),
    EntitySpec("checklists", "Checklist", None, None),
    EntitySpec("checklists/items", "ChecklistItem", None, None),
    EntitySpec("resources", "Resource", None, None),
    EntitySpec("filters", "Filter", None, None),
    EntitySpec("progressions/history", "ProgressionHistory", None, None),
]

PROFILE_OBJECTS = [
    ("affiliations", "Affiliation"),
    ("companies", "Company"),
    ("contacts", "Contact"),
    ("contracts", "Contract"),
    ("invoices", "Invoice"),
    ("issues", "Issue"),
    ("jobs", "Job"),
    ("milestones", "Milestone"),
    ("prospects", "Prospect"),
    ("purchases", "Purchase"),
    ("staff", "Staff"),
]

PROFILE_ENTITY_SPECS: list[EntitySpec] = []
for endpoint, label in PROFILE_OBJECTS:
    PROFILE_ENTITY_SPECS.append(EntitySpec(f"{endpoint}/profiles/fields", f"{label}ProfileField", None, None))
    PROFILE_ENTITY_SPECS.append(EntitySpec(f"{endpoint}/profiles/values", f"{label}ProfileValue", None, None))

LINKED_ENTITY_SPECS: list[EntitySpec] = [
    EntitySpec(None, "ActivityPriority", None, None, parent_table="Activity", parent_field="activity_priority"),
    EntitySpec(None, "ActivityTimeAllocation", None, None, parent_table="Activity", parent_field="time_allocation"),
    EntitySpec(None, "ContractBudget", None, None, parent_table="ContractPeriod", parent_field="contract_budget"),
]

ENTITY_SPECS: list[EntitySpec] = BASE_ENTITY_SPECS + PROFILE_ENTITY_SPECS
ALL_ENTITY_SPECS: list[EntitySpec] = ENTITY_SPECS + LINKED_ENTITY_SPECS
ENTITY_BY_TABLE = {spec.table: spec for spec in ALL_ENTITY_SPECS}
LINKED_SPECS_BY_PARENT: dict[str, list[EntitySpec]] = {}
for spec in LINKED_ENTITY_SPECS:
    LINKED_SPECS_BY_PARENT.setdefault(spec.parent_table or "", []).append(spec)


_token_cache: dict[str, Any] = {}
_active_run_state: dict[str, Any] = {"run_id": None}


def safe_ident(name: str) -> str:
    return name.replace('"', "")


def qualify(schema: str, table: str) -> str:
    return f'"{safe_ident(schema)}"."{safe_ident(table)}"'


def get_db_conn():
    conn = psycopg2.connect(SUPABASE_DB_URL)
    conn.set_session(autocommit=False)
    return conn


def ensure_conn(conn):
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1")
        return conn
    except Exception:
        log.warning("DB connection stale, reconnecting...")
        try:
            conn.close()
        except Exception:
            pass
        return get_db_conn()


def ensure_schema(conn, schema: str):
    with conn.cursor() as cur:
        cur.execute(f'CREATE SCHEMA IF NOT EXISTS "{safe_ident(schema)}"')
    conn.commit()


def table_exists(conn, schema: str, table: str) -> bool:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = %s AND table_name = %s
            """,
            (schema, table),
        )
        return cur.fetchone() is not None


def get_table_columns(conn, table: str, schema: str = CORE_SCHEMA) -> set[str]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = %s AND table_name = %s
            """,
            (schema, table),
        )
        return {r[0] for r in cur.fetchall()}


def get_table_column_list(conn, table: str, schema: str = CORE_SCHEMA) -> list[str]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = %s AND table_name = %s
            ORDER BY ordinal_position
            """,
            (schema, table),
        )
        return [r[0] for r in cur.fetchall()]


def get_column_types(conn, table: str, schema: str = CORE_SCHEMA) -> dict[str, str]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = %s AND table_name = %s
            """,
            (schema, table),
        )
        return {r[0]: r[1] for r in cur.fetchall()}


def get_not_null_columns(conn, table: str, schema: str = CORE_SCHEMA) -> set[str]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = %s AND table_name = %s AND is_nullable = 'NO'
            """,
            (schema, table),
        )
        return {r[0] for r in cur.fetchall()}


def get_fk_relationships(conn, table: str, schema: str = CORE_SCHEMA) -> dict[str, tuple[str, str]]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT DISTINCT
              kcu.column_name AS fk_column,
              ccu.table_name AS ref_table,
              ccu.column_name AS ref_column
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu
              ON tc.constraint_name = kcu.constraint_name
             AND tc.table_schema = kcu.table_schema
             AND tc.table_name = kcu.table_name
            JOIN information_schema.constraint_column_usage ccu
              ON tc.constraint_name = ccu.constraint_name
             AND tc.table_schema = ccu.table_schema
            WHERE tc.table_schema = %s
              AND tc.table_name = %s
              AND tc.constraint_type = 'FOREIGN KEY'
            """,
            (schema, table),
        )
        return {r[0]: (r[1], r[2]) for r in cur.fetchall()}


def resolve_column_name(existing_columns: set[str], *candidates: str) -> Optional[str]:
    if not existing_columns:
        return None

    def canonicalize(name: str) -> str:
        return "".join(ch for ch in name.lower() if ch.isalnum())

    for cand in candidates:
        if cand and cand in existing_columns:
            return cand

    lower_map = {c.lower(): c for c in existing_columns}
    for cand in candidates:
        if cand and cand.lower() in lower_map:
            return lower_map[cand.lower()]

    canonical_map = {canonicalize(c): c for c in existing_columns}
    for cand in candidates:
        if cand:
            canonical = canonicalize(cand)
            if canonical in canonical_map:
                return canonical_map[canonical]

    return None


def infer_pg_type(val: Any) -> str:
    if isinstance(val, bool):
        return "boolean"
    if isinstance(val, int):
        return "bigint"
    if isinstance(val, float):
        return "double precision"
    if isinstance(val, (dict, list)):
        return "jsonb"
    return "text"


def coerce_unix_timestamp(value: Any) -> int:
    if value is None:
        return 0
    if isinstance(value, (int, float)):
        return int(value)
    if hasattr(value, "timestamp"):
        return int(value.timestamp())
    if isinstance(value, str):
        cleaned = value.strip()
        if not cleaned:
            return 0
        if cleaned.isdigit():
            return int(cleaned)
        try:
            return int(datetime.fromisoformat(cleaned.replace("Z", "+00:00")).timestamp())
        except ValueError:
            return 0
    return 0


def coerce_value_for_column(val: Any, data_type: str) -> Any:
    if val is None:
        return None
    if data_type in TIMESTAMP_TYPES:
        if isinstance(val, str):
            stripped = val.strip()
            if stripped == "" or stripped.lower() == "null":
                return None
            if stripped.isdigit():
                return datetime.fromtimestamp(int(stripped), timezone.utc).replace(tzinfo=None)
            try:
                parsed = datetime.fromisoformat(stripped.replace("Z", "+00:00"))
                return parsed.replace(tzinfo=None) if parsed.tzinfo else parsed
            except ValueError:
                return None
        if isinstance(val, (int, float)):
            return datetime.fromtimestamp(int(val), timezone.utc).replace(tzinfo=None)
    if data_type in DATE_TYPES:
        if isinstance(val, str):
            stripped = val.strip()
            if stripped == "" or stripped.lower() == "null":
                return None
            if stripped.isdigit():
                return datetime.fromtimestamp(int(stripped), timezone.utc).date()
            try:
                return datetime.fromisoformat(stripped.replace("Z", "+00:00")).date()
            except ValueError:
                return None
        if isinstance(val, (int, float)):
            return datetime.fromtimestamp(int(val), timezone.utc).date()
    if data_type in INTEGER_TYPES:
        if isinstance(val, str):
            stripped = val.strip()
            if stripped == "" or stripped.lower() == "null":
                return None
            try:
                if "." in stripped:
                    return float(stripped)
                return int(stripped)
            except (ValueError, TypeError):
                return None
    if data_type == "boolean" and isinstance(val, str):
        return val.lower() in ("true", "1", "yes")
    return val


def get_access_token() -> str:
    global _token_cache
    now = time.time()
    if _token_cache.get("expires_at", 0) > now + 60:
        return _token_cache["access_token"]

    log.info("Fetching Accelo OAuth2 token...")
    resp = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "client_credentials",
            "scope": "read(all)",
        },
        auth=(ACCELO_CLIENT_ID, ACCELO_CLIENT_SECRET),
        timeout=ACCELO_HTTP_TIMEOUT_SECS,
    )
    if resp.status_code == 401:
        resp = requests.post(
            TOKEN_URL,
            data={
                "grant_type": "client_credentials",
                "client_id": ACCELO_CLIENT_ID,
                "client_secret": ACCELO_CLIENT_SECRET,
                "scope": "read(all)",
            },
            timeout=ACCELO_HTTP_TIMEOUT_SECS,
        )
    resp.raise_for_status()
    data = resp.json()
    _token_cache = {
        "access_token": data["access_token"],
        "expires_at": now + data.get("expires_in", 3600),
    }
    log.info("Token acquired.")
    return _token_cache["access_token"]


def get_source_record_id(record: dict) -> str:
    record_id = record.get("id", record.get("ID"))
    if record_id is not None:
        return str(record_id)
    fingerprint = hashlib.sha1(json.dumps(record, sort_keys=True, default=str).encode("utf-8")).hexdigest()
    return fingerprint


def snake_to_pascal(name: str) -> str:
    parts = [part for part in name.split("_") if part]
    return "".join(part[:1].upper() + part[1:] for part in parts)


def resolve_target_column(existing_columns: set[str], source_key: str) -> Optional[str]:
    if not existing_columns:
        return None

    pascal = snake_to_pascal(source_key)
    candidates = [pascal, f"{pascal}ID", source_key]

    if source_key.endswith("_status"):
        candidates.extend(["StatusID", f"{pascal}ID"])
    if source_key.endswith("_type"):
        candidates.extend(["TypeID", f"{pascal}ID"])
    if source_key.endswith("_priority"):
        candidates.extend(["PriorityID", f"{pascal}ID"])
    if source_key.endswith("_class"):
        candidates.extend(["ClassID", f"{pascal}ID"])
    if source_key.endswith("_address"):
        candidates.extend([pascal, f"{pascal}ID"])

    alias_map = {
        "company_status": ["CompanyStatusID", "StatusID"],
        "contact_status": ["ContactStatusID", "StatusID"],
        "affiliation_status": ["AffiliationStatusID", "StatusID"],
        "contract_status": ["ContractStatusID", "StatusID"],
        "job_status": ["JobStatusID", "StatusID"],
        "milestone_status": ["MilestoneStatusID", "StatusID"],
        "task_status": ["TaskStatusID", "StatusID"],
        "issue_status": ["IssueStatusID", "StatusID"],
        "prospect_status": ["ProspectStatusID", "StatusID"],
        "quote_status": ["QuoteStatusID", "StatusID"],
        "job_type": ["JobTypeID", "JobType", "TypeID"],
        "contract_type": ["ContractTypeID", "ContractType", "TypeID"],
        "task_priority": ["TaskPriorityID", "TaskPriority", "PriorityID"],
        "issue_priority": ["IssuePriorityID", "IssuePriority", "PriorityID"],
        "default_affiliation": ["DefaultAffiliation"],
        "postal_address": ["PostalAddress"],
        "physical_address": ["PhysicalAddress"],
    }
    candidates.extend(alias_map.get(source_key, []))

    deduped: list[str] = []
    seen = set()
    for candidate in candidates:
        if candidate and candidate not in seen:
            deduped.append(candidate)
            seen.add(candidate)

    return resolve_column_name(existing_columns, *deduped)


def accelo_request(endpoint: str, params: dict):
    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{ACCELO_BASE}/{endpoint}"

    for attempt in range(1, ACCELO_HTTP_MAX_RETRIES + 1):
        try:
            resp = requests.get(url, headers=headers, params=params, timeout=ACCELO_HTTP_TIMEOUT_SECS)
        except (requests.Timeout, requests.ConnectionError) as e:
            offset = params.get("_offset", 0)
            if attempt >= ACCELO_HTTP_MAX_RETRIES:
                raise RuntimeError(
                    f"{endpoint}: request failed after {ACCELO_HTTP_MAX_RETRIES} attempts at offset {offset}: {e}"
                ) from e
            sleep_for = ACCELO_HTTP_RETRY_BACKOFF_SECS * attempt
            log.warning(
                f"{endpoint}: request timeout/connection issue at offset {offset} "
                f"(attempt {attempt}/{ACCELO_HTTP_MAX_RETRIES}), retrying in {sleep_for:.1f}s..."
            )
            time.sleep(sleep_for)
            continue

        if resp.status_code == 401:
            token = get_access_token()
            headers = {"Authorization": f"Bearer {token}"}
            resp = requests.get(url, headers=headers, params=params, timeout=ACCELO_HTTP_TIMEOUT_SECS)

        if ACCELO_REQUEST_SPACING_SECS > 0:
            time.sleep(ACCELO_REQUEST_SPACING_SECS)
        return resp

    raise RuntimeError(f"{endpoint}: request failed before receiving a response")


def accelo_get_record(endpoint: str, record_id: Any, fields: Optional[str] = "_ALL") -> Optional[dict]:
    params = {"_fields": fields} if fields else {}
    resp = accelo_request(f"{endpoint}/{record_id}", params)
    if resp.status_code == 404:
        return None
    if resp.status_code == 400 and "_fields" in params:
        resp = accelo_request(f"{endpoint}/{record_id}", {})
    resp.raise_for_status()
    data = resp.json().get("response", {})
    if isinstance(data, list):
        return data[0] if data else None
    return data or None


def hydrate_detail_records(spec: EntitySpec, records: list[dict]) -> list[dict]:
    hydrated: list[dict] = []
    detail_fields = spec.fields or "_ALL"
    for record in records:
        record_id = record.get("id", record.get("ID"))
        if record_id is None or not spec.endpoint:
            hydrated.append(record)
            continue
        try:
            detailed = accelo_get_record(spec.endpoint, record_id, fields=detail_fields)
        except Exception as e:
            log.warning(f"{spec.endpoint}/{record_id}: detail fetch failed, keeping summary row ({e})")
            detailed = None
        hydrated.append(detailed or record)
    return hydrated


def accelo_get_batches(spec: EntitySpec, params: dict = None, batch_size: int = UPSERT_BATCH_SIZE):
    requested_fields = spec.fields or "_ALL"
    base_params = {
        "_limit": 100,
        "_offset": 0,
    }
    if requested_fields:
        base_params["_fields"] = requested_fields
    if params:
        base_params.update(params)

    buffer: list[dict] = []
    total_fetched = 0
    pagination_enabled = "_limit" in base_params and "_offset" in base_params
    dropped_fields = False
    dropped_pagination = False
    rate_limit_count = 0

    while True:
        if not spec.endpoint:
            break
        resp = accelo_request(spec.endpoint, base_params)

        if resp.status_code == 429:
            retry_after = int(resp.headers.get("Retry-After", 10))
            rate_limit_count += 1
            sleep_for = min(
                max(retry_after, int(ACCELO_HTTP_RETRY_BACKOFF_SECS * max(rate_limit_count, 1))),
                int(ACCELO_RATE_LIMIT_MAX_SLEEP_SECS),
            )
            log.warning(f"Rate limited. Sleeping {sleep_for}s...")
            time.sleep(sleep_for)
            continue
        rate_limit_count = 0

        if resp.status_code == 404:
            log.warning(f"Endpoint not found: {spec.endpoint} — skipping.")
            return

        if resp.status_code == 400 and "_fields" in base_params and not dropped_fields:
            log.warning(f"{spec.endpoint}: requested fields not supported, retrying without _fields...")
            dropped_fields = True
            base_params.pop("_fields", None)
            continue

        if resp.status_code == 400 and pagination_enabled and not dropped_pagination:
            log.warning(f"{spec.endpoint}: pagination params not supported, retrying without _limit/_offset...")
            dropped_pagination = True
            pagination_enabled = False
            base_params.pop("_limit", None)
            base_params.pop("_offset", None)
            continue

        resp.raise_for_status()
        data = resp.json()
        page = data.get("response", [])
        if isinstance(page, dict) and len(page) == 1:
            only_value = next(iter(page.values()))
            if isinstance(only_value, list):
                page = only_value
        if isinstance(page, dict):
            page = [page]
        if not page:
            break

        if spec.detail_fetch:
            page = hydrate_detail_records(spec, page)

        buffer.extend(page)
        total_fetched += len(page)

        if pagination_enabled:
            page_limit = base_params.get("_limit", len(page)) or len(page)
            page_num = (base_params.get("_offset", 0) // page_limit) + 1
        else:
            page_num = 1

        if page_num == 1 or page_num % 10 == 0:
            log.info(
                f"  {spec.source_name}: page {page_num}, batch {len(page)}, running total {total_fetched}"
            )

        if len(buffer) >= batch_size:
            yield buffer
            buffer = []

        meta = data.get("meta", {})
        more_info = meta.get("more_info")
        total = None
        if isinstance(more_info, dict):
            total = more_info.get("total_count")
        if total is None:
            total = meta.get("total_count")
        if total is None:
            total = meta.get("count")

        if not pagination_enabled:
            break
        if total and total_fetched >= int(total):
            break
        if len(page) < base_params["_limit"]:
            break

        base_params["_offset"] += base_params["_limit"]
        time.sleep(0.1)

    if buffer:
        yield buffer


def accelo_get_batches_with_progress(spec: EntitySpec, params: dict = None, batch_size: int = UPSERT_BATCH_SIZE):
    requested_fields = spec.fields or "_ALL"
    base_params = {
        "_limit": 100,
        "_offset": 0,
    }
    if requested_fields:
        base_params["_fields"] = requested_fields
    if params:
        base_params.update(params)

    buffer: list[dict] = []
    total_fetched = 0
    pagination_enabled = "_limit" in base_params and "_offset" in base_params
    dropped_fields = False
    dropped_pagination = False
    rate_limit_count = 0

    while True:
        if not spec.endpoint:
            break
        resp = accelo_request(spec.endpoint, base_params)

        if resp.status_code == 429:
            retry_after = int(resp.headers.get("Retry-After", 10))
            rate_limit_count += 1
            sleep_for = min(
                max(retry_after, int(ACCELO_HTTP_RETRY_BACKOFF_SECS * max(rate_limit_count, 1))),
                int(ACCELO_RATE_LIMIT_MAX_SLEEP_SECS),
            )
            log.warning(f"Rate limited. Sleeping {sleep_for}s...")
            time.sleep(sleep_for)
            continue
        rate_limit_count = 0

        if resp.status_code == 404:
            log.warning(f"Endpoint not found: {spec.endpoint} — skipping.")
            return

        if resp.status_code == 400 and "_fields" in base_params and not dropped_fields:
            log.warning(f"{spec.endpoint}: requested fields not supported, retrying without _fields...")
            dropped_fields = True
            base_params.pop("_fields", None)
            continue

        if resp.status_code == 400 and pagination_enabled and not dropped_pagination:
            log.warning(f"{spec.endpoint}: pagination params not supported, retrying without _limit/_offset...")
            dropped_pagination = True
            pagination_enabled = False
            base_params.pop("_limit", None)
            base_params.pop("_offset", None)
            continue

        resp.raise_for_status()
        data = resp.json()
        page = data.get("response", [])
        if isinstance(page, dict) and len(page) == 1:
            only_value = next(iter(page.values()))
            if isinstance(only_value, list):
                page = only_value
        if isinstance(page, dict):
            page = [page]
        if not page:
            break

        if spec.detail_fetch:
            page = hydrate_detail_records(spec, page)

        buffer.extend(page)
        total_fetched += len(page)

        current_offset = base_params.get("_offset", 0) if pagination_enabled else 0
        page_limit = base_params.get("_limit", len(page)) or len(page)
        page_num = ((current_offset // page_limit) + 1) if pagination_enabled else 1

        if page_num == 1 or page_num % 10 == 0:
            log.info(f"  {spec.source_name}: page {page_num}, batch {len(page)}, running total {total_fetched}")

        if len(buffer) >= batch_size:
            yield {
                "records": buffer,
                "offset": current_offset,
                "page_num": page_num,
                "total_fetched": total_fetched,
            }
            buffer = []

        meta = data.get("meta", {})
        more_info = meta.get("more_info")
        total = None
        if isinstance(more_info, dict):
            total = more_info.get("total_count")
        if total is None:
            total = meta.get("total_count")
        if total is None:
            total = meta.get("count")

        if not pagination_enabled:
            break
        if total and total_fetched >= int(total):
            break
        if len(page) < base_params["_limit"]:
            break

        base_params["_offset"] += base_params["_limit"]
        time.sleep(0.1)

    if buffer:
        yield {
            "records": buffer,
            "offset": base_params.get("_offset", 0) if pagination_enabled else 0,
            "page_num": ((base_params.get("_offset", 0) // max(base_params.get("_limit", 1), 1)) + 1) if pagination_enabled else 1,
            "total_fetched": total_fetched,
        }


def ensure_raw_table(conn, table: str):
    ensure_schema(conn, RAW_SCHEMA)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {qualify(RAW_SCHEMA, table)} (
              "RunID" text NOT NULL,
              "SourceEndpoint" text NOT NULL,
              "SourceRecordID" text NOT NULL,
              "ParentTable" text,
              "ParentRecordID" text,
              "SourceField" text,
              "SourceModifiedAt" bigint,
              "ExtractedAt" timestamp without time zone NOT NULL,
              "Payload" jsonb NOT NULL,
              "CreatedAt" timestamp without time zone DEFAULT now(),
              PRIMARY KEY ("RunID", "SourceEndpoint", "SourceRecordID")
            )
            """
        )
        cur.execute(
            f'CREATE INDEX IF NOT EXISTS "{safe_ident(table)}_raw_source_record_idx" '
            f'ON {qualify(RAW_SCHEMA, table)} ("SourceRecordID")'
        )
    conn.commit()


def insert_raw_records(conn, table: str, raw_records: list[dict]):
    if not raw_records:
        return
    cols = [
        "RunID",
        "SourceEndpoint",
        "SourceRecordID",
        "ParentTable",
        "ParentRecordID",
        "SourceField",
        "SourceModifiedAt",
        "ExtractedAt",
        "Payload",
    ]
    placeholders = ", ".join(["%s"] * len(cols))
    col_sql = ", ".join(f'"{safe_ident(col)}"' for col in cols)
    rows = []
    for record in raw_records:
        row = []
        for col in cols:
            val = record.get(col)
            if col == "Payload" and isinstance(val, (dict, list)):
                val = psycopg2.extras.Json(val)
            row.append(val)
        rows.append(tuple(row))

    with conn.cursor() as cur:
        psycopg2.extras.execute_batch(
            cur,
            f"""
            INSERT INTO {qualify(RAW_SCHEMA, table)} ({col_sql})
            VALUES ({placeholders})
            ON CONFLICT ("RunID", "SourceEndpoint", "SourceRecordID") DO NOTHING
            """,
            rows,
            page_size=500,
        )
    conn.commit()
    log.info(f"  {RAW_SCHEMA}.{table}: {len(raw_records)} raw records captured.")


def ensure_layer_table(conn, schema: str, table: str, sample_record: Optional[dict] = None):
    ensure_schema(conn, schema)
    sample_record = sample_record or {}
    cols = [
        '"SourceRecordID" text NOT NULL',
        '"SourceEndpoint" text NOT NULL',
        '"SourceRunID" text NOT NULL',
        '"ParentTable" text',
        '"ParentRecordID" text',
        '"SourceField" text',
        '"SourceModifiedAt" bigint',
        '"SourceExtractedAt" timestamp without time zone NOT NULL',
        '"RawPayload" jsonb NOT NULL',
        '"WhenUpsertedIntoDataStore" timestamp without time zone DEFAULT now()',
        '"IsDeleted" boolean DEFAULT false',
    ]

    id_key = next((k for k in sample_record.keys() if k.lower() == "id"), None)
    for key, val in sample_record.items():
        if key.startswith("_"):
            continue
        col_name = safe_ident(key)
        col_type = infer_pg_type(val)
        if id_key and key.lower() == "id":
            cols.append(f'"{col_name}" {col_type}')
        else:
            cols.append(f'"{col_name}" {col_type}')

    ddl = f'CREATE TABLE IF NOT EXISTS {qualify(schema, table)} (\n  {", ".join(cols)}\n)'
    with conn.cursor() as cur:
        cur.execute(ddl)
        existing_cols = get_table_columns(conn, table, schema=schema)
        for key, val in sample_record.items():
            if key.startswith("_"):
                continue
            if resolve_column_name(existing_cols, key):
                continue
            cur.execute(
                f'ALTER TABLE {qualify(schema, table)} ADD COLUMN IF NOT EXISTS "{safe_ident(key)}" {infer_pg_type(val)}'
            )
            existing_cols.add(key)
        cur.execute(
            f'CREATE UNIQUE INDEX IF NOT EXISTS "{safe_ident(table)}_{safe_ident(schema)}_source_record_uidx" '
            f'ON {qualify(schema, table)} ("SourceRecordID")'
        )
        if id_key:
            cur.execute(
                f'CREATE UNIQUE INDEX IF NOT EXISTS "{safe_ident(table)}_{safe_ident(schema)}_{safe_ident(id_key)}_uidx" '
                f'ON {qualify(schema, table)} ("{safe_ident(id_key)}")'
            )
    conn.commit()


def ensure_table_columns(conn, schema: str, table: str, records: list[dict]):
    if not records:
        return
    existing_cols = get_table_columns(conn, table, schema=schema)
    if not existing_cols:
        return

    additions: list[tuple[str, str]] = []
    for record in records:
        for key, value in record.items():
            if resolve_column_name(existing_cols, key):
                continue
            inferred_type = infer_pg_type(value)
            additions.append((key, inferred_type))
            existing_cols.add(key)

    if not additions:
        return

    with conn.cursor() as cur:
        for key, col_type in additions:
            cur.execute(
                f'ALTER TABLE {qualify(schema, table)} ADD COLUMN IF NOT EXISTS "{safe_ident(key)}" {col_type}'
            )
    conn.commit()
    log.info(f"  {schema}.{table}: added {len(additions)} newly discovered columns.")


def ensure_conflict_key_constraint(conn, schema: str, table: str, conflict_key: Optional[str]) -> Optional[str]:
    if not conflict_key:
        return None

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT 1
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu
              ON tc.constraint_name = kcu.constraint_name
             AND tc.table_schema = kcu.table_schema
             AND tc.table_name = kcu.table_name
            WHERE tc.table_schema = %s
              AND tc.table_name = %s
              AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE')
              AND kcu.column_name = %s
            LIMIT 1
            """,
            (schema, table, conflict_key),
        )
        if cur.fetchone():
            return conflict_key

    index_name = f"{safe_ident(table)}_{safe_ident(schema)}_{safe_ident(conflict_key)}_uidx"
    try:
        with conn.cursor() as cur:
            cur.execute(
                f'CREATE UNIQUE INDEX IF NOT EXISTS "{index_name}" ON {qualify(schema, table)} ("{safe_ident(conflict_key)}")'
            )
        conn.commit()
        return conflict_key
    except Exception as e:
        conn.rollback()
        log.warning(f'  {schema}.{table}: could not ensure unique index for "{conflict_key}" ({e})')
        return None


def normalize_and_upsert_records(
    conn,
    schema: str,
    table: str,
    records: list[dict],
    conflict_candidates: tuple[str, ...],
    null_unresolved_fks: bool,
):
    if not records:
        return

    ensure_table_columns(conn, schema, table, records)
    existing_cols = get_table_columns(conn, table, schema=schema)
    col_types = get_column_types(conn, table, schema=schema) if existing_cols else {}
    not_null_cols = get_not_null_columns(conn, table, schema=schema)
    when_upsert_col = resolve_column_name(existing_cols, "WhenUpsertedIntoDataStore")
    is_deleted_col = resolve_column_name(existing_cols, "IsDeleted")
    remote_id_col = resolve_column_name(existing_cols, "RemoteID")
    mirror_remote_id_col = resolve_column_name(existing_cols, "MirrorRemoteID")
    fk_relationships = get_fk_relationships(conn, table, schema=schema) if existing_cols and schema == CORE_SCHEMA else {}
    fk_cols = set(fk_relationships.keys())

    normalized: list[dict] = []
    for rec in records:
        flat: dict[str, Any] = {}
        for key, value in rec.items():
            target_key = resolve_target_column(existing_cols, key)
            if existing_cols and not target_key:
                continue
            target_key = target_key or key
            flat[target_key] = value

        id_for_defaults = flat.get(resolve_column_name(existing_cols, *conflict_candidates) or "")
        if id_for_defaults is None:
            id_for_defaults = rec.get("ID", rec.get("id", rec.get("SourceRecordID")))

        if remote_id_col and id_for_defaults is not None:
            flat[remote_id_col] = str(id_for_defaults)
        if mirror_remote_id_col and id_for_defaults is not None:
            try:
                flat[mirror_remote_id_col] = int(id_for_defaults)
            except (TypeError, ValueError):
                flat[mirror_remote_id_col] = 0
        if when_upsert_col:
            flat[when_upsert_col] = datetime.now(timezone.utc).isoformat()
        if is_deleted_col:
            flat[is_deleted_col] = False

        for col_name, dtype in col_types.items():
            if col_name not in flat:
                continue
            if dtype == "jsonb" and isinstance(flat[col_name], (dict, list)):
                flat[col_name] = psycopg2.extras.Json(flat[col_name])
            else:
                flat[col_name] = coerce_value_for_column(flat[col_name], dtype)

        for fk_col in fk_cols:
            if fk_col not in flat:
                continue
            val = flat[fk_col]
            if val in (-1, 0, "-1", "0", ""):
                flat[fk_col] = None
            elif isinstance(val, str) and val.strip() in ("-1", "0", ""):
                flat[fk_col] = None

        for nn_col in not_null_cols:
            if nn_col in flat:
                continue
            dtype = col_types.get(nn_col, "text")
            if nn_col == remote_id_col and id_for_defaults is not None:
                flat[nn_col] = str(id_for_defaults)
            elif nn_col == mirror_remote_id_col and id_for_defaults is not None:
                try:
                    flat[nn_col] = int(id_for_defaults)
                except (TypeError, ValueError):
                    flat[nn_col] = 0
            elif nn_col == is_deleted_col:
                flat[nn_col] = False
            elif dtype in INTEGER_TYPES:
                flat[nn_col] = 0
            elif dtype == "boolean":
                flat[nn_col] = False
            elif dtype == "jsonb":
                flat[nn_col] = psycopg2.extras.Json({})
            else:
                flat[nn_col] = ""

        normalized.append(flat)

    if null_unresolved_fks and fk_relationships:
        for fk_col, (ref_table, ref_col) in fk_relationships.items():
            distinct_vals = {
                row.get(fk_col)
                for row in normalized
                if row.get(fk_col) is not None
            }
            if not distinct_vals:
                continue
            try:
                with conn.cursor() as cur:
                    cur.execute(
                        f'SELECT "{safe_ident(ref_col)}"::text FROM {qualify(CORE_SCHEMA, ref_table)} '
                        f'WHERE "{safe_ident(ref_col)}"::text = ANY(%s)',
                        ([str(v) for v in distinct_vals],),
                    )
                    existing_refs = {r[0] for r in cur.fetchall()}
            except Exception:
                conn.rollback()
                continue

            nulled = 0
            for row in normalized:
                val = row.get(fk_col)
                if val is not None and str(val) not in existing_refs:
                    row[fk_col] = None
                    nulled += 1
            if nulled:
                log.warning(
                    f'  {schema}.{table}: nulled {nulled} dangling FK values in "{fk_col}" '
                    f'(missing refs in {ref_table}.{ref_col})'
                )

    all_keys: list[str] = []
    seen: set[str] = set()
    for row in normalized:
        for key in row.keys():
            if key not in seen:
                seen.add(key)
                all_keys.append(key)

    for row in normalized:
        for key in all_keys:
            if key not in row:
                continue
            val = row[key]
            if isinstance(val, (dict, list)):
                row[key] = psycopg2.extras.Json(val)

    conflict_key = resolve_column_name(existing_cols, *conflict_candidates)
    if not conflict_key:
        conflict_key = next((k for k in all_keys if k.lower() in {c.lower() for c in conflict_candidates}), None)
    conflict_key = ensure_conflict_key_constraint(conn, schema, table, conflict_key)

    cols = ", ".join(f'"{safe_ident(k)}"' for k in all_keys)
    placeholders = ", ".join(["%s"] * len(all_keys))

    with conn.cursor() as cur:
        if conflict_key:
            updates = ", ".join(
                f'"{safe_ident(k)}" = EXCLUDED."{safe_ident(k)}"'
                for k in all_keys
                if k not in (conflict_key, when_upsert_col)
            )
            sql = (
                f'INSERT INTO {qualify(schema, table)} ({cols}) VALUES ({placeholders}) '
                f'ON CONFLICT ("{safe_ident(conflict_key)}") DO UPDATE SET {updates}'
            )
            if when_upsert_col:
                sql += f', "{safe_ident(when_upsert_col)}" = now()'
        else:
            sql = f'INSERT INTO {qualify(schema, table)} ({cols}) VALUES ({placeholders})'

        rows = [tuple(row.get(k) for k in all_keys) for row in normalized]
        psycopg2.extras.execute_batch(cur, sql, rows, page_size=500)
    conn.commit()
    log.info(f"  {schema}.{table}: {len(normalized)} records upserted.")


def prepare_raw_records(
    spec: EntitySpec,
    records: list[dict],
    run_id: str,
    extracted_at: datetime,
    parent_record_id: Optional[str] = None,
) -> list[dict]:
    prepared = []
    for record in records:
        source_record_id = get_source_record_id(record)
        effective_parent_record_id = parent_record_id or record.get("_ParentRecordID")
        source_modified = coerce_unix_timestamp(
            record.get("date_modified")
            or record.get("DateModified")
            or record.get("WhenModified")
            or record.get("date_created")
            or record.get("DateCreated")
        )
        prepared.append(
            {
                "RunID": run_id,
                "SourceEndpoint": spec.source_name,
                "SourceRecordID": source_record_id,
                "ParentTable": spec.parent_table,
                "ParentRecordID": effective_parent_record_id,
                "SourceField": spec.parent_field,
                "SourceModifiedAt": source_modified or None,
                "ExtractedAt": extracted_at,
                "Payload": {k: v for k, v in record.items() if not k.startswith("_")},
            }
        )
    return prepared


def prepare_staging_records(
    spec: EntitySpec,
    records: list[dict],
    run_id: str,
    extracted_at: datetime,
    parent_record_id: Optional[str] = None,
) -> list[dict]:
    prepared = []
    for record in records:
        flat = {k: v for k, v in record.items() if not k.startswith("_")}
        effective_parent_record_id = parent_record_id or record.get("_ParentRecordID")
        flat["SourceRecordID"] = get_source_record_id(record)
        flat["SourceEndpoint"] = spec.source_name
        flat["SourceRunID"] = run_id
        flat["ParentTable"] = spec.parent_table
        flat["ParentRecordID"] = effective_parent_record_id
        flat["SourceField"] = spec.parent_field
        flat["SourceModifiedAt"] = coerce_unix_timestamp(
            record.get("date_modified")
            or record.get("DateModified")
            or record.get("WhenModified")
            or record.get("date_created")
            or record.get("DateCreated")
        ) or None
        flat["SourceExtractedAt"] = extracted_at
        flat["RawPayload"] = {k: v for k, v in record.items() if not k.startswith("_")}
        prepared.append(flat)
    return prepared


def extract_linked_child_records(parent_spec: EntitySpec, records: list[dict]) -> dict[str, list[dict]]:
    children: dict[str, list[dict]] = {}
    dedupe: dict[str, set[str]] = {}
    for linked_spec in LINKED_SPECS_BY_PARENT.get(parent_spec.table, []):
        children[linked_spec.table] = []
        dedupe[linked_spec.table] = set()

    if not children:
        return children

    for record in records:
        parent_record_id = get_source_record_id(record)
        for linked_spec in LINKED_SPECS_BY_PARENT.get(parent_spec.table, []):
            child = record.get(linked_spec.parent_field or "")
            if not isinstance(child, dict) or not child:
                continue
            dedupe_key = get_source_record_id(child)
            if dedupe_key in dedupe[linked_spec.table]:
                continue
            dedupe[linked_spec.table].add(dedupe_key)
            child_copy = dict(child)
            child_copy["_ParentRecordID"] = parent_record_id
            children[linked_spec.table].append(child_copy)

    return children


def get_last_sync(conn, table: str, date_field: str) -> Optional[int]:
    existing_cols = get_table_columns(conn, table, schema=STAGING_SCHEMA)
    local_date_col = resolve_column_name(existing_cols, date_field, "WhenModified", "date_modified", "SourceModifiedAt")
    if not local_date_col:
        return None
    with conn.cursor() as cur:
        try:
            cur.execute(f'SELECT MAX("{safe_ident(local_date_col)}") FROM {qualify(STAGING_SCHEMA, table)}')
            result = cur.fetchone()[0]
            return coerce_unix_timestamp(result) or None
        except Exception:
            conn.rollback()
            return None


def ensure_audit_tables(conn):
    ensure_schema(conn, AUDIT_SCHEMA)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {qualify(AUDIT_SCHEMA, "etl_runs")} (
              "RunID" text PRIMARY KEY,
              "Mode" text NOT NULL,
              "StartedAt" timestamp without time zone NOT NULL,
              "FinishedAt" timestamp without time zone,
              "Status" text NOT NULL,
              "FailureCount" integer DEFAULT 0,
              "Details" jsonb
            )
            """
        )
        cur.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {qualify(AUDIT_SCHEMA, "validation_results")} (
              "RunID" text NOT NULL,
              "CheckType" text NOT NULL,
              "TableName" text NOT NULL,
              "ColumnName" text,
              "MetricValue" bigint NOT NULL,
              "Details" jsonb,
              "CreatedAt" timestamp without time zone DEFAULT now()
            )
            """
        )
        cur.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {qualify(AUDIT_SCHEMA, "extraction_progress")} (
              "RunID" text NOT NULL,
              "TableName" text NOT NULL,
              "Status" text NOT NULL,
              "LastOffset" bigint DEFAULT 0,
              "LastPage" integer DEFAULT 0,
              "TotalStaged" bigint DEFAULT 0,
              "UpdatedAt" timestamp without time zone DEFAULT now(),
              "ErrorMessage" text,
              PRIMARY KEY ("RunID", "TableName")
            )
            """
        )
    conn.commit()


def record_run_start(conn, run_id: str, mode: str):
    ensure_audit_tables(conn)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            INSERT INTO {qualify(AUDIT_SCHEMA, "etl_runs")} ("RunID", "Mode", "StartedAt", "Status", "Details")
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT ("RunID") DO UPDATE SET
              "Mode" = EXCLUDED."Mode",
              "StartedAt" = EXCLUDED."StartedAt",
              "Status" = EXCLUDED."Status",
              "Details" = EXCLUDED."Details"
            """,
            (run_id, mode, datetime.now(timezone.utc).replace(tzinfo=None), "running", psycopg2.extras.Json({})),
        )
    conn.commit()


def record_run_finish(conn, run_id: str, status: str, failure_count: int, details: dict):
    conn = ensure_conn(conn)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            UPDATE {qualify(AUDIT_SCHEMA, "etl_runs")}
            SET "FinishedAt" = %s, "Status" = %s, "FailureCount" = %s, "Details" = %s
            WHERE "RunID" = %s
            """,
            (
                datetime.now(timezone.utc).replace(tzinfo=None),
                status,
                failure_count,
                psycopg2.extras.Json(details),
                run_id,
            ),
        )
    conn.commit()


def record_run_finish_fresh(run_id: str, status: str, failure_count: int, details: dict):
    conn = get_db_conn()
    try:
        record_run_finish(conn, run_id, status, failure_count, details)
    finally:
        conn.close()


def mark_interrupted_runs(conn):
    with conn.cursor() as cur:
        cur.execute(
            f"""
            UPDATE {qualify(AUDIT_SCHEMA, "etl_runs")}
            SET "FinishedAt" = now(),
                "Status" = 'interrupted',
                "FailureCount" = GREATEST(coalesce("FailureCount", 0), 1),
                "Details" = coalesce("Details", '{{}}'::jsonb) || %s::jsonb
            WHERE "FinishedAt" IS NULL
              AND "Status" = 'running'
            """,
            (json.dumps({"cleanup_reason": "startup_recovery"}),),
        )
    conn.commit()


def _handle_termination(signum, _frame):
    run_id = _active_run_state.get("run_id")
    if not run_id:
        raise SystemExit(128 + signum)

    conn = None
    try:
        conn = get_db_conn()
        record_run_finish(
            conn,
            run_id,
            "interrupted",
            1,
            {"signal": signum, "reason": "process_terminated"},
        )
    except Exception as e:
        log.error(f"Failed to mark interrupted run {run_id}: {e}")
    finally:
        if conn:
            conn.close()
    raise SystemExit(128 + signum)


def record_validation_result(conn, run_id: str, check_type: str, table_name: str, metric_value: int, column_name: Optional[str] = None, details: Optional[dict] = None):
    with conn.cursor() as cur:
        cur.execute(
            f"""
            INSERT INTO {qualify(AUDIT_SCHEMA, "validation_results")}
              ("RunID", "CheckType", "TableName", "ColumnName", "MetricValue", "Details")
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                run_id,
                check_type,
                table_name,
                column_name,
                metric_value,
                psycopg2.extras.Json(details or {}),
            ),
        )
    conn.commit()


def record_extraction_progress(
    conn,
    run_id: str,
    table_name: str,
    status: str,
    last_offset: int = 0,
    last_page: int = 0,
    total_staged: int = 0,
    error_message: Optional[str] = None,
):
    conn = ensure_conn(conn)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            INSERT INTO {qualify(AUDIT_SCHEMA, "extraction_progress")}
              ("RunID", "TableName", "Status", "LastOffset", "LastPage", "TotalStaged", "UpdatedAt", "ErrorMessage")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT ("RunID", "TableName") DO UPDATE SET
              "Status" = EXCLUDED."Status",
              "LastOffset" = EXCLUDED."LastOffset",
              "LastPage" = EXCLUDED."LastPage",
              "TotalStaged" = EXCLUDED."TotalStaged",
              "UpdatedAt" = EXCLUDED."UpdatedAt",
              "ErrorMessage" = EXCLUDED."ErrorMessage"
            """,
            (
                run_id,
                table_name,
                status,
                last_offset,
                last_page,
                total_staged,
                datetime.now(timezone.utc).replace(tzinfo=None),
                error_message,
            ),
        )
    conn.commit()


def reset_tables(conn, schema: str, tables: list[str], cascade: bool):
    existing_tables = [table for table in tables if table_exists(conn, schema, table)]
    if not existing_tables:
        return
    table_list = ", ".join(qualify(schema, table) for table in existing_tables)
    suffix = " CASCADE" if cascade else ""
    with conn.cursor() as cur:
        cur.execute(f"TRUNCATE {table_list} RESTART IDENTITY{suffix}")
    conn.commit()
    log.info(f"Reset {len(existing_tables)} tables in schema {schema}.")


def build_core_load_order(conn, tables: list[str]) -> list[str]:
    edges: dict[str, set[str]] = {table: set() for table in tables}
    reverse_edges: dict[str, set[str]] = {table: set() for table in tables}

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT tc.table_name, ccu.table_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu
              ON tc.constraint_name = kcu.constraint_name
             AND tc.table_schema = kcu.table_schema
             AND tc.table_name = kcu.table_name
            JOIN information_schema.constraint_column_usage ccu
              ON tc.constraint_name = ccu.constraint_name
             AND tc.table_schema = ccu.table_schema
            WHERE tc.table_schema = %s
              AND tc.constraint_type = 'FOREIGN KEY'
            """,
            (CORE_SCHEMA,),
        )
        for child, parent in cur.fetchall():
            if child in edges and parent in edges and child != parent:
                edges[child].add(parent)
                reverse_edges[parent].add(child)

    in_degree = {table: len(parents) for table, parents in edges.items()}
    queue = [table for table in tables if in_degree[table] == 0]
    ordered: list[str] = []

    while queue:
        node = queue.pop(0)
        ordered.append(node)
        for child in reverse_edges[node]:
            in_degree[child] -= 1
            if in_degree[child] == 0:
                queue.append(child)

    remaining = [table for table in tables if table not in ordered]
    ordered.extend(remaining)
    return ordered


def iter_staging_batches(conn, table: str, batch_size: int = UPSERT_BATCH_SIZE) -> Iterable[list[dict]]:
    columns = get_table_column_list(conn, table, schema=STAGING_SCHEMA)
    if not columns:
        return []
    select_cols = ", ".join(f'"{safe_ident(col)}"' for col in columns)
    order_col = resolve_column_name(set(columns), "ID", "id", "SourceRecordID")
    query = f"SELECT {select_cols} FROM {qualify(STAGING_SCHEMA, table)}"
    if order_col:
        query += f' ORDER BY "{safe_ident(order_col)}"'

    cursor_name = f"staging_{safe_ident(table)}_{uuid.uuid4().hex[:8]}"
    cur = conn.cursor(name=cursor_name, cursor_factory=psycopg2.extras.RealDictCursor)
    cur.itersize = batch_size
    cur.execute(query)
    try:
        while True:
            rows = cur.fetchmany(batch_size)
            if not rows:
                break
            yield [dict(row) for row in rows]
    finally:
        cur.close()


def ensure_core_table_from_staging(conn, table: str, sample_record: Optional[dict] = None):
    if table_exists(conn, CORE_SCHEMA, table):
        return
    sample_record = sample_record or {}
    cols = []
    id_key = next((k for k in sample_record.keys() if k.lower() == "id"), None)
    for key, val in sample_record.items():
        if key.startswith("Source") or key in {"RawPayload", "ParentTable", "ParentRecordID", "SourceField"}:
            continue
        col_name = safe_ident(key)
        col_type = infer_pg_type(val)
        if id_key and key.lower() == "id":
            cols.append(f'"{col_name}" {col_type} PRIMARY KEY')
        else:
            cols.append(f'"{col_name}" {col_type}')
    cols.append('"WhenUpsertedIntoDataStore" timestamp without time zone DEFAULT now()')
    cols.append('"IsDeleted" boolean DEFAULT false')
    ddl = f'CREATE TABLE IF NOT EXISTS {qualify(CORE_SCHEMA, table)} (\n  {", ".join(cols)}\n)'
    with conn.cursor() as cur:
        cur.execute(ddl)
    conn.commit()


def extract_to_raw_and_staging(conn, spec: EntitySpec, batch: list[dict], run_id: str, extracted_at: datetime):
    if not batch:
        return
    ensure_raw_table(conn, spec.table)
    ensure_layer_table(conn, STAGING_SCHEMA, spec.table, batch[0])
    raw_records = prepare_raw_records(spec, batch, run_id, extracted_at)
    staging_records = prepare_staging_records(spec, batch, run_id, extracted_at)
    insert_raw_records(conn, spec.table, raw_records)
    normalize_and_upsert_records(conn, STAGING_SCHEMA, spec.table, staging_records, ("SourceRecordID", "ID", "id"), False)


def sync_to_staging(conn, spec: EntitySpec, run_id: str, full: bool):
    log.info(f"Extracting {spec.table} from {spec.source_name} ({'full' if full else 'incremental'})...")
    params = {}
    if not full and spec.date_field:
        last_sync = get_last_sync(conn, spec.table, spec.date_field)
        if last_sync:
            params["_filters"] = f"{spec.date_field}_after({int(last_sync)})"
            log.info(f"  Incremental since {datetime.fromtimestamp(int(last_sync), timezone.utc)} ({int(last_sync)})")

    total_records = 0
    record_extraction_progress(conn, run_id, spec.table, "running")
    for batch_info in accelo_get_batches_with_progress(spec, params=params):
        batch = batch_info["records"]
        batch_offset = int(batch_info["offset"])
        batch_page = int(batch_info["page_num"])
        batch_total = int(batch_info["total_fetched"])

        batch_error: Optional[Exception] = None
        for _ in range(3):
            conn = ensure_conn(conn)
            extracted_at = datetime.now(timezone.utc).replace(tzinfo=None)
            try:
                extract_to_raw_and_staging(conn, spec, batch, run_id, extracted_at)

                linked_children = extract_linked_child_records(spec, batch)
                for child_table, child_rows in linked_children.items():
                    if not child_rows:
                        continue
                    linked_spec = ENTITY_BY_TABLE[child_table]
                    extract_to_raw_and_staging(conn, linked_spec, child_rows, run_id, extracted_at)
                batch_error = None
                break
            except (OperationalError, InterfaceError) as e:
                batch_error = e
                try:
                    conn.rollback()
                except Exception:
                    pass
                conn = get_db_conn()
                time.sleep(2)
            except Exception as e:
                batch_error = e
                break

        if batch_error is not None:
            record_extraction_progress(
                conn,
                run_id,
                spec.table,
                "failed",
                last_offset=batch_offset,
                last_page=batch_page,
                total_staged=total_records,
                error_message=str(batch_error),
            )
            raise batch_error

        total_records += len(batch)
        record_extraction_progress(
            conn,
            run_id,
            spec.table,
            "running",
            last_offset=batch_offset,
            last_page=batch_page,
            total_staged=batch_total,
        )

    if total_records == 0:
        ensure_raw_table(conn, spec.table)
        ensure_layer_table(conn, STAGING_SCHEMA, spec.table)
        log.info(f"  {spec.table}: nothing extracted.")
    else:
        log.info(f"  {spec.table}: staged {total_records} records.")
    record_extraction_progress(conn, run_id, spec.table, "completed", total_staged=total_records)
    return conn


def load_core_table_from_staging(read_conn, write_conn, table: str):
    if not table_exists(read_conn, STAGING_SCHEMA, table):
        ensure_core_table_from_staging(write_conn, table)
        log.info(f"  {table}: no staging table found for core load.")
        return

    any_rows = False
    first_batch_sample: Optional[dict] = None
    for batch in iter_staging_batches(read_conn, table):
        if not batch:
            continue
        if first_batch_sample is None:
            first_batch_sample = batch[0]
            ensure_core_table_from_staging(write_conn, table, first_batch_sample)
        any_rows = True
        normalize_and_upsert_records(write_conn, CORE_SCHEMA, table, batch, ("ID", "id", "SourceRecordID"), True)

    if not any_rows:
        ensure_core_table_from_staging(write_conn, table)
        log.info(f"  {table}: nothing loaded into core.")


def run_validation_audits(conn, run_id: str, tables: list[str]):
    for table in tables:
        conn = ensure_conn(conn)
        staging_exists = table_exists(conn, STAGING_SCHEMA, table)
        core_exists = table_exists(conn, CORE_SCHEMA, table)
        staging_count = 0
        core_count = 0
        with conn.cursor() as cur:
            if staging_exists:
                cur.execute(f"SELECT COUNT(*) FROM {qualify(STAGING_SCHEMA, table)}")
                staging_count = cur.fetchone()[0]
            if core_exists:
                cur.execute(f"SELECT COUNT(*) FROM {qualify(CORE_SCHEMA, table)}")
                core_count = cur.fetchone()[0]
        record_validation_result(
            conn,
            run_id,
            "row_count_drift",
            table,
            abs(staging_count - core_count),
            details={"staging_count": staging_count, "core_count": core_count},
        )

        if not core_exists:
            continue

        fk_relationships = get_fk_relationships(conn, table, schema=CORE_SCHEMA)
        staging_cols = get_table_columns(conn, table, schema=STAGING_SCHEMA) if staging_exists else set()
        for fk_col, (ref_table, ref_col) in fk_relationships.items():
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    SELECT COUNT(*)
                    FROM {qualify(CORE_SCHEMA, table)} child
                    LEFT JOIN {qualify(CORE_SCHEMA, ref_table)} parent
                      ON child."{safe_ident(fk_col)}" = parent."{safe_ident(ref_col)}"
                    WHERE child."{safe_ident(fk_col)}" IS NOT NULL
                      AND parent."{safe_ident(ref_col)}" IS NULL
                    """
                )
                orphan_count = cur.fetchone()[0]
            record_validation_result(conn, run_id, "fk_orphan", table, orphan_count, column_name=fk_col, details={"ref_table": ref_table, "ref_column": ref_col})

            staging_col = resolve_column_name(staging_cols, fk_col)
            if not staging_col:
                continue
            with conn.cursor() as cur:
                cur.execute(f'SELECT COUNT(*) FROM {qualify(STAGING_SCHEMA, table)} WHERE "{safe_ident(staging_col)}" IS NOT NULL')
                staging_non_null = cur.fetchone()[0]
                cur.execute(f'SELECT COUNT(*) FROM {qualify(CORE_SCHEMA, table)} WHERE "{safe_ident(fk_col)}" IS NOT NULL')
                core_non_null = cur.fetchone()[0]
            record_validation_result(
                conn,
                run_id,
                "fk_null_drift",
                table,
                staging_non_null - core_non_null,
                column_name=fk_col,
                details={"staging_non_null": staging_non_null, "core_non_null": core_non_null},
            )


def process_extraction_phase(conn, entities: list[EntitySpec], run_id: str, full: bool):
    log.info("=== Phase: raw + staging extraction ===")
    success = 0
    failed: list[str] = []
    for spec in entities:
        try:
            conn = sync_to_staging(conn, spec, run_id, full=full or spec.date_field is None)
            success += 1
        except Exception as e:
            log.error(f"  FAILED {spec.table}: {e}")
            failed.append(spec.table)
            try:
                conn.rollback()
            except Exception:
                conn = get_db_conn()
    return conn, success, failed


def process_core_phase(entities: list[EntitySpec], passes: int = 2):
    selected_tables = {entity.table for entity in entities}
    for entity in entities:
        for linked_spec in LINKED_SPECS_BY_PARENT.get(entity.table, []):
            selected_tables.add(linked_spec.table)

    tables = [spec.table for spec in ALL_ENTITY_SPECS if spec.table in selected_tables]
    order_conn = get_db_conn()
    try:
        ordered_tables = build_core_load_order(order_conn, tables)
    finally:
        order_conn.close()
    failures: list[str] = []

    for pass_num in range(1, passes + 1):
        log.info(f"=== Phase: core load pass {pass_num}/{passes} ===")
        for table in ordered_tables:
            read_conn = get_db_conn()
            write_conn = get_db_conn()
            try:
                load_core_table_from_staging(read_conn, write_conn, table)
            except Exception as e:
                log.error(f"  FAILED core load {table}: {e}")
                failures.append(table)
                try:
                    write_conn.rollback()
                except Exception:
                    pass
            finally:
                try:
                    read_conn.close()
                except Exception:
                    pass
                try:
                    write_conn.close()
                except Exception:
                    pass

    return failures


def run_etl(full: bool = False, tables_filter: Optional[list[str]] = None):
    mode = "FULL" if full else "INCREMENTAL"
    run_id = uuid.uuid4().hex
    log.info(f"=== Accelo ETL starting ({mode}) run_id={run_id} ===")
    start = time.time()

    conn = get_db_conn()
    ensure_audit_tables(conn)
    mark_interrupted_runs(conn)
    record_run_start(conn, run_id, mode.lower())
    _active_run_state["run_id"] = run_id
    signal.signal(signal.SIGTERM, _handle_termination)
    signal.signal(signal.SIGINT, _handle_termination)

    entities = ENTITY_SPECS
    if tables_filter:
        selected = set(tables_filter)
        entities = [spec for spec in ENTITY_SPECS if spec.table in selected]
        log.info(f"Filtered to tables: {[spec.table for spec in entities]}")

    selected_tables = {spec.table for spec in entities}
    for spec in entities:
        for linked_spec in LINKED_SPECS_BY_PARENT.get(spec.table, []):
            selected_tables.add(linked_spec.table)

    try:
        if full:
            reset_tables(conn, STAGING_SCHEMA, list(selected_tables), cascade=False)

        conn, extraction_success, extraction_failed = process_extraction_phase(conn, entities, run_id, full)
        core_failed: list[str] = []
        if extraction_failed:
            log.warning("Skipping core publish because extraction had failures.")
        else:
            if full:
                reset_tables(conn, CORE_SCHEMA, list(selected_tables), cascade=True)
            core_failed = process_core_phase(entities, passes=2)
            run_validation_audits(conn, run_id, list(selected_tables))

        failed = sorted(set(extraction_failed + core_failed))
        success = extraction_success if not failed else max(0, len(entities) - len(extraction_failed))
        elapsed = time.time() - start
        details = {"failed_tables": failed}
        record_run_finish(conn, run_id, "completed_with_issues" if failed else "completed", len(failed), details)
        log.info(f"=== ETL complete in {elapsed:.1f}s — {success} extraction succeeded, {len(failed)} failed ===")
        if failed:
            log.warning(f"Failed tables: {failed}")
    except Exception as e:
        elapsed = time.time() - start
        record_run_finish_fresh(run_id, "failed", 1, {"error": str(e)})
        log.error(f"=== ETL failed in {elapsed:.1f}s: {e} ===")
        raise
    finally:
        _active_run_state["run_id"] = None
        conn.close()


def main():
    parser = argparse.ArgumentParser(description="Accelo -> Supabase layered ETL")
    parser.add_argument("--full", action="store_true", help="Full rebuild of staging/core. Default is incremental extraction.")
    parser.add_argument("--tables", nargs="+", metavar="TABLE", help="Only sync specific logical tables.")
    args = parser.parse_args()

    missing = [v for v in ["ACCELO_CLIENT_ID", "ACCELO_CLIENT_SECRET", "SUPABASE_DB_URL"] if not os.getenv(v)]
    if missing:
        log.error(f"Missing env vars: {missing}. Create a .env file.")
        raise SystemExit(1)

    run_etl(full=args.full, tables_filter=args.tables)

