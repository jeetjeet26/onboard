"""
Accelo → Supabase ETL
=====================
Syncs all Accelo entities into the P11 Supabase data lake.

Usage:
    python accelo_etl.py                  # incremental (default)
    python accelo_etl.py --full           # full replace
    python accelo_etl.py --tables Job     # single table
    python accelo_etl.py --full --tables Company Job Activity

Setup:
    pip install requests psycopg2-binary python-dotenv

.env file:
    ACCELO_CLIENT_ID=your_client_id
    ACCELO_CLIENT_SECRET=your_client_secret
    ACCELO_DEPLOYMENT=your_accelo_subdomain
    SUPABASE_DB_URL=postgresql://postgres.<project_ref>:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres
"""

from accelo_pipeline import main as layered_main

if __name__ == "__main__":
    layered_main()
    raise SystemExit(0)

import os
import sys
import json
import time
import argparse
import logging
from datetime import datetime, timezone
from typing import Any, Optional

import requests
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

load_dotenv()

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("accelo_etl.log"),
    ],
)
log = logging.getLogger(__name__)

# ── Config ────────────────────────────────────────────────────────────────────
ACCELO_CLIENT_ID     = os.getenv("ACCELO_CLIENT_ID")
ACCELO_CLIENT_SECRET = os.getenv("ACCELO_CLIENT_SECRET")
ACCELO_DEPLOYMENT    = os.getenv("ACCELO_DEPLOYMENT", "p11creativeinc")
SUPABASE_DB_URL      = os.getenv("SUPABASE_DB_URL")
ACCELO_HTTP_TIMEOUT_SECS = float(os.getenv("ACCELO_HTTP_TIMEOUT_SECS", "300"))
ACCELO_HTTP_MAX_RETRIES = int(os.getenv("ACCELO_HTTP_MAX_RETRIES", "6"))
ACCELO_HTTP_RETRY_BACKOFF_SECS = float(os.getenv("ACCELO_HTTP_RETRY_BACKOFF_SECS", "10"))
UPSERT_BATCH_SIZE = int(os.getenv("UPSERT_BATCH_SIZE", "1000"))

ACCELO_BASE = f"https://{ACCELO_DEPLOYMENT}.api.accelo.com/api/v0"
TOKEN_URL   = f"https://{ACCELO_DEPLOYMENT}.api.accelo.com/oauth2/v0/token"

# ── Entity definitions ────────────────────────────────────────────────────────
# Each entry: (accelo_endpoint, supabase_table, fields, date_modified_field)
# fields=None means fetch all optional fields (_fields=_ALL)
# date_modified_field is used for incremental sync
#
# ORDER MATTERS — dependencies (lookup/reference tables) are synced first so
# FK references resolve correctly for downstream entities.

ENTITIES = [
    # ── Tier 0: Lookup / status / type tables (always full-synced, tiny) ─────
    ("companies/statuses",          "CompanyStatus",          None, None),
    ("contacts/statuses",           "ContactStatus",          None, None),
    ("affiliations/statuses",       "AffiliationStatus",      None, None),
    ("contracts/statuses",          "ContractStatus",         None, None),
    ("contracts/types",             "ContractType",           None, None),
    ("jobs/statuses",               "JobStatus",              None, None),
    ("jobs/types",                  "JobType",                None, None),
    ("milestones/statuses",         "MilestoneStatus",        None, None),
    ("tasks/statuses",              "TaskStatus",             None, None),
    ("tasks/priorities",            "TaskPriority",           None, None),
    ("issues/statuses",             "IssueStatus",            None, None),
    ("issues/types",                "IssueType",              None, None),
    ("issues/classes",              "IssueClass",             None, None),
    ("issues/resolutions",          "IssueResolution",        None, None),
    ("issues/priorities",           "IssuePriority",          None, None),
    ("prospects/statuses",          "ProspectStatus",         None, None),
    ("prospects/types",             "ProspectType",           None, None),
    ("prospects/probabilities",     "ProspectProbability",    None, None),
    ("expenses/types",              "ExpenseType",            None, None),
    ("quotes/statuses",             "QuoteStatus",            None, None),
    ("activities/classes",          "ActivityClass",          None, None),
    ("assets/types",                "AssetType",              None, None),
    ("contributors/types",          "ContributorType",        None, None),
    ("requests/types",              "RequestType",            None, None),

    # ── Tier 1: Core reference entities (synced before anything that FKs them)
    ("staff",                       "Staff",                  None, "date_modified"),
    ("rates",                       "Rate",                   None, None),
    ("groups",                      "Group",                  None, None),
    ("taxes",                       "Tax",                    None, None),
    ("holidays",                    "Holiday",                None, None),
    ("divisions",                   "Division",               None, None),
    ("segmentations",               "Segmentation",           None, None),
    ("tags",                        "Tag",                    None, None),
    ("skills",                      "Skill",                  None, None),

    # ── Tier 2: CRM ──────────────────────────────────────────────────────────
    ("companies",                   "Company",                None, "date_modified"),
    ("contacts",                    "Contact",                None, "date_modified"),
    ("affiliations",                "Affiliation",            None, "date_modified"),
    ("addresses",                   "Address",                None, "date_modified"),

    # ── Tier 3: Projects / Retainers ─────────────────────────────────────────
    ("contracts",                   "Contract",               None, "date_modified"),
    ("contracts/periods",           "ContractPeriod",         "_ALL,contract_budget(_ALL)", "date_modified"),
    ("jobs",                        "Job",                    None, "date_modified"),
    ("milestones",                  "Milestone",              None, "date_modified"),
    ("tasks",                       "Task",                   None, "date_modified"),
    ("object_budgets",              "ObjectBudget",           None, "date_modified"),

    # ── Tier 4: Time tracking ────────────────────────────────────────────────
    ("activities",                  "Activity",               "_ALL,activity_priority(_ALL),time_allocation(_ALL)", "date_modified"),
    ("timers",                      "Timer",                  None, None),
    ("time/externals",              "TimeExternal",           None, None),

    # ── Tier 5: Financials ───────────────────────────────────────────────────
    ("invoices",                    "Invoice",                None, "date_modified"),
    ("invoices/line_items",         "InvoiceLineItem",        None, None),
    ("payments",                    "Payment",                None, "date_modified"),
    ("expenses",                    "Expense",                None, "date_modified"),
    ("purchases",                   "Purchase",               None, "date_modified"),
    ("ledgers",                     "Ledger",                 None, None),

    # ── Tier 6: Pipeline ─────────────────────────────────────────────────────
    ("prospects",                   "Prospect",               None, "date_modified"),
    ("quotes",                      "Quote",                  None, "date_modified"),
    ("referrals",                   "Referral",               None, None),

    # ── Tier 7: Support ──────────────────────────────────────────────────────
    ("issues",                      "Issue",                  None, "date_modified"),
    ("requests",                    "Request",                None, "date_modified"),

    # ── Tier 8: Assets ───────────────────────────────────────────────────────
    ("assets",                      "Asset",                  None, "date_modified"),

    # ── Tier 9: Collaboration / workflow ─────────────────────────────────────
    ("contributors",                "Contributor",            None, None),
    ("signoffs",                    "Signoff",                None, None),
    ("signoffs/recipients",         "SignoffRecipient",       None, None),
    ("signoffs/attachments",        "SignoffAttachment",      None, None),
    ("checklists",                  "Checklist",              None, None),
    ("checklists/items",            "ChecklistItem",          None, None),
    ("resources",                   "Resource",               None, None),
    ("filters",                     "Filter",                 None, None),

    # ── Tier 10: Progressions ────────────────────────────────────────────────
    ("progressions/history",        "ProgressionHistory",     None, None),
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

ENTITIES.extend(
    [
        (f"{endpoint}/profiles/fields", f"{label}ProfileField", None, None)
        for endpoint, label in PROFILE_OBJECTS
    ]
    + [
        (f"{endpoint}/profiles/values", f"{label}ProfileValue", None, None)
        for endpoint, label in PROFILE_OBJECTS
    ]
)

# Some endpoints return a sparse collection payload even when the list request
# succeeds. Hydrating those rows via the record-detail endpoint produces a much
# closer mirror of the source data.
DETAIL_FETCH_TABLES = {
    "Invoice",
    "Payment",
}

LINKED_CHILD_TABLES = {
    "Activity": [
        ("activity_priority", "ActivityPriority"),
        ("time_allocation", "ActivityTimeAllocation"),
    ],
    "ContractPeriod": [
        ("contract_budget", "ContractBudget"),
    ],
}

# ── OAuth2 token management ───────────────────────────────────────────────────
_token_cache: dict = {}

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
        resp = requests.post(TOKEN_URL, data={
            "grant_type":    "client_credentials",
            "client_id":     ACCELO_CLIENT_ID,
            "client_secret": ACCELO_CLIENT_SECRET,
            "scope":         "read(all)",
        }, timeout=ACCELO_HTTP_TIMEOUT_SECS)
    resp.raise_for_status()
    data = resp.json()
    _token_cache = {
        "access_token": data["access_token"],
        "expires_at":   now + data.get("expires_in", 3600),
    }
    log.info("Token acquired.")
    return _token_cache["access_token"]


def get_record_id(record: dict) -> Any:
    if not isinstance(record, dict):
        return None
    return record.get("id", record.get("ID"))


def accelo_request(endpoint: str, params: dict):
    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{ACCELO_BASE}/{endpoint}"
    resp = None

    for attempt in range(1, ACCELO_HTTP_MAX_RETRIES + 1):
        try:
            resp = requests.get(
                url,
                headers=headers,
                params=params,
                timeout=ACCELO_HTTP_TIMEOUT_SECS,
            )
        except (requests.Timeout, requests.ConnectionError) as e:
            offset = params.get("_offset", 0)
            if attempt >= ACCELO_HTTP_MAX_RETRIES:
                raise RuntimeError(
                    f"{endpoint}: request failed after {ACCELO_HTTP_MAX_RETRIES} attempts "
                    f"at offset {offset}: {e}"
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
            resp = requests.get(
                url,
                headers=headers,
                params=params,
                timeout=ACCELO_HTTP_TIMEOUT_SECS,
            )

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


def hydrate_detail_records(endpoint: str, records: list[dict]) -> list[dict]:
    hydrated: list[dict] = []
    for record in records:
        record_id = get_record_id(record)
        if record_id is None:
            hydrated.append(record)
            continue
        try:
            detailed = accelo_get_record(endpoint, record_id, fields="_ALL")
        except Exception as e:
            log.warning(f"{endpoint}/{record_id}: detail fetch failed, keeping summary row ({e})")
            detailed = None
        hydrated.append(detailed or record)
    return hydrated


def accelo_get_batches(
    endpoint: str,
    params: dict = None,
    batch_size: int = UPSERT_BATCH_SIZE,
    fields: Optional[str] = "_ALL",
    hydrate_details: bool = False,
):
    """GET from Accelo API with resilient fallbacks and optional detail hydration."""
    requested_fields = fields
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

    while True:
        resp = accelo_request(endpoint, base_params)

        if resp.status_code == 429:
            retry_after = int(resp.headers.get("Retry-After", 10))
            log.warning(f"Rate limited. Sleeping {retry_after}s...")
            time.sleep(retry_after)
            continue

        if resp.status_code == 404:
            log.warning(f"Endpoint not found: {endpoint} — skipping.")
            return

        if resp.status_code == 400 and "_fields" in base_params and not dropped_fields:
            log.warning(f"{endpoint}: requested fields not supported, retrying without _fields...")
            dropped_fields = True
            base_params.pop("_fields", None)
            continue

        if resp.status_code == 400 and pagination_enabled and not dropped_pagination:
            log.warning(f"{endpoint}: pagination params not supported, retrying without _limit/_offset...")
            dropped_pagination = True
            pagination_enabled = False
            base_params.pop("_limit", None)
            base_params.pop("_offset", None)
            continue

        resp.raise_for_status()
        data = resp.json()

        page = data.get("response", [])
        if isinstance(page, dict):
            page = [page]
        if not page:
            break

        if hydrate_details:
            page = hydrate_detail_records(endpoint, page)

        buffer.extend(page)
        total_fetched += len(page)

        if pagination_enabled:
            page_limit = base_params.get("_limit", len(page)) or len(page)
            page_num = (base_params.get("_offset", 0) // page_limit) + 1
        else:
            page_num = 1

        if page_num == 1 or page_num % 10 == 0:
            log.info(
                f"  {endpoint}: page {page_num}, batch {len(page)}, running total {total_fetched}"
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


# ── Supabase helpers ──────────────────────────────────────────────────────────

def get_db_conn():
    conn = psycopg2.connect(SUPABASE_DB_URL)
    conn.set_session(autocommit=False)
    return conn


def ensure_conn(conn):
    """Return a live connection, reconnecting if the previous one went stale."""
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


def safe_ident(name: str) -> str:
    return name.replace('"', '')


def get_table_columns(conn, table: str) -> set[str]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = %s
            """,
            (table,),
        )
        return {r[0] for r in cur.fetchall()}


def get_column_types(conn, table: str) -> dict[str, str]:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = %s
            """,
            (table,),
        )
        return {r[0]: r[1] for r in cur.fetchall()}


def get_fk_relationships(conn, table: str) -> dict[str, tuple[str, str]]:
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
            WHERE tc.table_schema = 'public'
              AND tc.table_name = %s
              AND tc.constraint_type = 'FOREIGN KEY'
            """,
            (table,),
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


INTEGER_TYPES = {"integer", "bigint", "smallint", "int", "int2", "int4", "int8", "numeric", "double precision", "real"}
TIMESTAMP_TYPES = {"timestamp without time zone", "timestamp with time zone"}
DATE_TYPES = {"date"}


def coerce_value_for_column(val: Any, data_type: str) -> Any:
    """Coerce empty strings and bad values to NULL for integer/numeric columns."""
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
    if data_type == "boolean":
        if isinstance(val, str):
            return val.lower() in ("true", "1", "yes")
    return val


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


def infer_pg_type(val: Any) -> str:
    if isinstance(val, bool):
        return "boolean"
    if isinstance(val, int):
        return "bigint"
    if isinstance(val, float):
        return "double precision"
    if isinstance(val, dict):
        return "jsonb"
    if isinstance(val, list):
        return "jsonb"
    return "text"


def get_last_sync(conn, table: str, date_field: str) -> Optional[int]:
    """Get the most recent modified timestamp for incremental sync."""
    existing_cols = get_table_columns(conn, table)
    local_date_col = resolve_column_name(existing_cols, date_field, "WhenModified", "date_modified")
    if not local_date_col:
        return None

    table_ident = safe_ident(table)
    date_ident = safe_ident(local_date_col)

    with conn.cursor() as cur:
        try:
            cur.execute(f'SELECT MAX("{date_ident}") FROM "{table_ident}"')
            result = cur.fetchone()[0]
            since = coerce_unix_timestamp(result)
            return since or None
        except Exception:
            conn.rollback()
            return None


def ensure_table_exists(conn, table: str, sample_record: Optional[dict] = None):
    """
    Auto-create table if it doesn't exist, inferring types from the sample record.
    """
    cols = []
    sample_record = sample_record or {}
    id_key = next((k for k in sample_record.keys() if k.lower() == "id"), None)

    if sample_record:
        for key, val in sample_record.items():
            col_name = safe_ident(key)
            col_type = infer_pg_type(val)
            if id_key and key.lower() == "id":
                cols.append(f'"{col_name}" {col_type} PRIMARY KEY')
            else:
                cols.append(f'"{col_name}" {col_type}')
    else:
        cols.extend([
            '"ID" bigint PRIMARY KEY',
            '"RemoteID" text',
            '"MirrorRemoteID" bigint',
            '"WhenCreated" timestamp without time zone',
            '"WhenModified" timestamp without time zone',
        ])
        id_key = "ID"

    cols.append('"WhenUpsertedIntoDataStore" timestamp without time zone DEFAULT now()')
    cols.append('"IsDeleted" boolean DEFAULT false')

    col_defs = ",\n  ".join(cols)
    ddl = f'CREATE TABLE IF NOT EXISTS "{table}" (\n  {col_defs}\n);'

    with conn.cursor() as cur:
        try:
            cur.execute(ddl)
            if id_key:
                table_ident = safe_ident(table)
                existing_cols = get_table_columns(conn, table)
                resolved_id_col = resolve_column_name(existing_cols, id_key, "ID", "id") or id_key
                id_ident = safe_ident(resolved_id_col)
                cur.execute(
                    f'CREATE UNIQUE INDEX IF NOT EXISTS "{table_ident}_{id_ident}_uidx" ON "{table_ident}" ("{id_ident}")'
                )
            conn.commit()
            log.info(f"Table '{table}' ensured.")
        except Exception as e:
            conn.rollback()
            log.warning(f"Could not auto-create '{table}': {e}")


def ensure_table_columns(conn, table: str, records: list[dict]):
    """Add newly discovered columns so repeated runs can converge on a fuller mirror."""
    if not records:
        return

    existing_cols = get_table_columns(conn, table)
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

    table_ident = safe_ident(table)
    with conn.cursor() as cur:
        for key, col_type in additions:
            col_ident = safe_ident(key)
            cur.execute(
                f'ALTER TABLE "{table_ident}" ADD COLUMN IF NOT EXISTS "{col_ident}" {col_type}'
            )
    conn.commit()
    log.info(f"  {table}: added {len(additions)} newly discovered columns.")


def ensure_conflict_key_constraint(conn, table: str, conflict_key: Optional[str]) -> Optional[str]:
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
            WHERE tc.table_schema = 'public'
              AND tc.table_name = %s
              AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE')
              AND kcu.column_name = %s
            LIMIT 1
            """,
            (table, conflict_key),
        )
        if cur.fetchone():
            return conflict_key

    table_ident = safe_ident(table)
    conflict_ident = safe_ident(conflict_key)
    index_name = f"{table_ident}_{conflict_ident}_uidx"
    try:
        with conn.cursor() as cur:
            cur.execute(
                f'CREATE UNIQUE INDEX IF NOT EXISTS "{index_name}" ON "{table_ident}" ("{conflict_ident}")'
            )
        conn.commit()
        log.info(f'  {table}: ensured unique index for conflict key "{conflict_key}".')
        return conflict_key
    except Exception as e:
        conn.rollback()
        log.warning(f'  {table}: could not ensure unique index for "{conflict_key}" ({e})')
        return None


def extract_linked_child_records(table: str, records: list[dict]) -> dict[str, list[dict]]:
    children = {child_table: [] for _, child_table in LINKED_CHILD_TABLES.get(table, [])}
    dedupe_keys = {child_table: set() for _, child_table in LINKED_CHILD_TABLES.get(table, [])}
    if not children:
        return children

    for record in records:
        for source_key, child_table in LINKED_CHILD_TABLES.get(table, []):
            child = record.get(source_key)
            if isinstance(child, dict) and child:
                child_id = get_record_id(child)
                dedupe_key = child_id if child_id is not None else json.dumps(child, sort_keys=True)
                if dedupe_key in dedupe_keys[child_table]:
                    continue
                dedupe_keys[child_table].add(dedupe_key)
                children[child_table].append(child)

    return children


def get_target_tables(entities: list[tuple[str, str, Optional[str], Optional[str]]]) -> list[str]:
    ordered: list[str] = []
    seen: set[str] = set()

    for _, table, _, _ in entities:
        if table not in seen:
            ordered.append(table)
            seen.add(table)
        for _, child_table in LINKED_CHILD_TABLES.get(table, []):
            if child_table not in seen:
                ordered.append(child_table)
                seen.add(child_table)

    return ordered


def reset_full_reload_tables(conn, entities: list[tuple[str, str, Optional[str], Optional[str]]]):
    target_tables = get_target_tables(entities)
    existing_tables: list[str] = []

    with conn.cursor() as cur:
        for table in target_tables:
            cur.execute(
                """
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = %s
                """,
                (table,),
            )
            if cur.fetchone():
                existing_tables.append(table)

    if not existing_tables:
        return

    table_list = ", ".join(f'"{safe_ident(table)}"' for table in existing_tables)
    with conn.cursor() as cur:
        cur.execute(f"TRUNCATE {table_list} RESTART IDENTITY CASCADE")
    conn.commit()
    log.info(f"Reset {len(existing_tables)} target tables for safe full reload.")


def upsert_records(conn, table: str, records: list[dict]):
    """
    Upsert records into Supabase via INSERT … ON CONFLICT DO UPDATE.
    Truncation for full-reload is handled by the caller before the first batch.
    """
    if not records:
        log.info(f"  {table}: no records to upsert.")
        return

    existing_cols = get_table_columns(conn, table)
    ensure_table_columns(conn, table, records)
    existing_cols = get_table_columns(conn, table)
    col_types = get_column_types(conn, table) if existing_cols else {}
    when_upsert_col = resolve_column_name(existing_cols, "WhenUpsertedIntoDataStore")
    is_deleted_col = resolve_column_name(existing_cols, "IsDeleted")
    conflict_key_hint = resolve_column_name(existing_cols, "id", "ID")
    remote_id_col = resolve_column_name(existing_cols, "RemoteID")
    mirror_remote_id_col = resolve_column_name(existing_cols, "MirrorRemoteID")
    fk_relationships = get_fk_relationships(conn, table) if existing_cols else {}
    fk_cols = set(fk_relationships.keys())

    # Collect all NOT NULL columns that we need to ensure are populated.
    not_null_cols = set()
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT column_name FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = %s AND is_nullable = 'NO'
            """,
            (table,),
        )
        not_null_cols = {r[0] for r in cur.fetchall()}

    normalized = []
    for rec in records:
        flat = {}
        for k, v in rec.items():
            target_k = resolve_column_name(existing_cols, k)
            if existing_cols and not target_k:
                continue
            target_k = target_k or k
            if isinstance(v, (dict, list)):
                flat[target_k] = json.dumps(v)
            else:
                flat[target_k] = v

        # Derive ID for data-lake metadata fields.
        id_for_defaults = flat.get(conflict_key_hint) if conflict_key_hint else None
        if id_for_defaults is None:
            id_for_defaults = rec.get("id") or rec.get("ID")

        # P11 data-lake compatibility: always populate RemoteID/MirrorRemoteID.
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

        # Coerce empty strings / bad types for integer/numeric columns.
        for col_name, dtype in col_types.items():
            if col_name in flat:
                flat[col_name] = coerce_value_for_column(flat[col_name], dtype)

        # Null out sentinel FK values (0, -1).
        for fk_col in fk_cols:
            if fk_col not in flat:
                continue
            val = flat[fk_col]
            if val in (-1, 0, "-1", "0", ""):
                flat[fk_col] = None
            elif isinstance(val, str) and val.strip() in ("-1", "0", ""):
                flat[fk_col] = None

        # Fill required NOT NULL columns with sensible defaults if missing.
        for nn_col in not_null_cols:
            if nn_col not in flat:
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
                else:
                    flat[nn_col] = ""

        normalized.append(flat)

    # Null out FK values that reference rows not currently present.
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
                ref_table_ident = safe_ident(ref_table)
                ref_col_ident = safe_ident(ref_col)
                probe_vals = [str(v) for v in distinct_vals]
                cur.execute(
                    f'SELECT "{ref_col_ident}"::text FROM "{ref_table_ident}" WHERE "{ref_col_ident}"::text = ANY(%s)',
                    (probe_vals,),
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
                f'  {table}: nulled {nulled} dangling FK values in "{fk_col}" '
                f'(missing refs in {ref_table}.{ref_col})'
            )

    all_keys = []
    seen = set()
    for row in normalized:
        for k in row.keys():
            if k not in seen:
                seen.add(k)
                all_keys.append(k)

    conflict_key = resolve_column_name(existing_cols, "id", "ID")
    if not conflict_key:
        conflict_key = next((k for k in all_keys if k.lower() == "id"), None)
    conflict_key = ensure_conflict_key_constraint(conn, table, conflict_key)

    # Final pass: coerce empty string to None for integer columns (catches any that slipped through).
    for row in normalized:
        for key in all_keys:
            val = row.get(key)
            if val == "" or (isinstance(val, str) and val.strip() == ""):
                if key in col_types and col_types[key] in INTEGER_TYPES:
                    row[key] = None

    cols = ", ".join(f'"{k}"' for k in all_keys)
    placeholders = ", ".join(["%s"] * len(all_keys))

    with conn.cursor() as cur:
        if conflict_key:
            updates = ", ".join(
                f'"{k}" = EXCLUDED."{k}"'
                for k in all_keys
                if k not in (conflict_key, when_upsert_col)
            )
            if when_upsert_col:
                sql = f"""
                    INSERT INTO "{table}" ({cols})
                    VALUES ({placeholders})
                    ON CONFLICT ("{conflict_key}") DO UPDATE SET
                      {updates},
                      "{when_upsert_col}" = now()
                """
            else:
                sql = f"""
                    INSERT INTO "{table}" ({cols})
                    VALUES ({placeholders})
                    ON CONFLICT ("{conflict_key}") DO UPDATE SET
                      {updates}
                """
        else:
            sql = f'INSERT INTO "{table}" ({cols}) VALUES ({placeholders})'

        rows = [tuple(r.get(k) for k in all_keys) for r in normalized]
        psycopg2.extras.execute_batch(cur, sql, rows, page_size=500)

    conn.commit()
    log.info(f"  {table}: {len(normalized)} records upserted.")


# ── Main sync logic ───────────────────────────────────────────────────────────

def sync_entity(
    conn,
    endpoint: str,
    table: str,
    fields: Optional[str],
    date_field: Optional[str],
    full: bool = False,
):
    log.info(f"Syncing {table} (endpoint: {endpoint}, mode: {'full' if full else 'incremental'})...")

    params = {}

    if not full and date_field:
        last_sync = get_last_sync(conn, table, date_field)
        if last_sync:
            since = int(last_sync)
            if since:
                params["_filters"] = f"{date_field}_after({since})"
                log.info(f"  Incremental since {datetime.fromtimestamp(since, timezone.utc)} ({since})")

    table_ready = False
    total_records = 0

    hydrate_details = table in DETAIL_FETCH_TABLES

    for batch in accelo_get_batches(endpoint, params, fields=fields or "_ALL", hydrate_details=hydrate_details):
        conn = ensure_conn(conn)
        child_records = extract_linked_child_records(table, batch)

        if not table_ready:
            ensure_table_exists(conn, table, batch[0])

            for child_table, rows in child_records.items():
                ensure_table_exists(conn, child_table, rows[0] if rows else None)
            table_ready = True

        upsert_records(conn, table, batch)
        for child_table, rows in child_records.items():
            if rows:
                upsert_records(conn, child_table, rows)
        total_records += len(batch)

    if total_records == 0:
        if full:
            ensure_table_exists(conn, table)
            for _, child_table in LINKED_CHILD_TABLES.get(table, []):
                ensure_table_exists(conn, child_table)
        log.info(f"  {table}: nothing to sync.")
    else:
        log.info(f"  {table}: done — {total_records} records synced.")

    return conn


def process_entities(
    conn,
    entities: list[tuple[str, str, Optional[str], Optional[str]]],
    force_full: bool,
    phase_label: str,
):
    log.info(f"=== Phase: {phase_label} ===")
    success = 0
    failed: list[str] = []

    for endpoint, table, fields, date_field in entities:
        is_lookup = date_field is None
        mode_full = force_full or is_lookup

        try:
            conn = sync_entity(conn, endpoint, table, fields, date_field, full=mode_full)
            success += 1
        except Exception as e:
            log.error(f"  FAILED {table}: {e}")
            failed.append(table)
            try:
                conn.rollback()
            except Exception:
                conn = get_db_conn()

    return conn, success, failed


def run_etl(full: bool = False, tables_filter: list[str] = None):
    log.info(f"=== Accelo ETL starting ({'FULL' if full else 'INCREMENTAL'}) ===")
    start = time.time()

    conn = get_db_conn()

    entities = ENTITIES
    if tables_filter:
        entities = [e for e in ENTITIES if e[1] in tables_filter]
        log.info(f"Filtered to tables: {[e[1] for e in entities]}")

    if full:
        reset_full_reload_tables(conn, entities)
        conn, _, failed_initial = process_entities(conn, entities, force_full=True, phase_label="full load")
        conn, _, failed_reconcile = process_entities(conn, entities, force_full=True, phase_label="reconciliation")
        failed = sorted(set(failed_initial + failed_reconcile))
        success = len(entities) - len(failed)
    else:
        conn, success, failed = process_entities(conn, entities, force_full=False, phase_label="incremental load")

    conn.close()

    elapsed = time.time() - start
    log.info(f"=== ETL complete in {elapsed:.1f}s — {success} succeeded, {len(failed)} failed ===")
    if failed:
        log.warning(f"Failed tables: {failed}")


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Accelo → Supabase ETL")
    parser.add_argument(
        "--full",
        action="store_true",
        help="Full reload (truncate + insert). Default is incremental.",
    )
    parser.add_argument(
        "--tables",
        nargs="+",
        metavar="TABLE",
        help="Only sync specific tables (e.g. --tables Job Activity)",
    )
    args = parser.parse_args()

    missing = [v for v in ["ACCELO_CLIENT_ID", "ACCELO_CLIENT_SECRET", "SUPABASE_DB_URL"] if not os.getenv(v)]
    if missing:
        log.error(f"Missing env vars: {missing}. Create a .env file.")
        sys.exit(1)

    run_etl(full=args.full, tables_filter=args.tables)
