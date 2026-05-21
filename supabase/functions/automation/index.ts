import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { corsHeaders, errorResponse, jsonResponse } from "../_shared/cors.ts";
import { createServiceRoleClient, requireInternalUser, getEnv } from "../_shared/auth.ts";
import {
  dropboxApiCall,
  ensureSharedLink,
  fetchIntegration,
  joinDropboxPath,
  refreshAccessToken,
  sanitizeFolderName,
} from "../_shared/dropbox.ts";

type Sb = ReturnType<typeof createServiceRoleClient>;

interface AutomationJob {
  id: number;
  onboarding_client_id: number | null;
  provider_code: string;
  action_code: string;
  status: string;
  request_payload: Record<string, unknown>;
  attempt_count: number;
  max_attempts: number;
}

const STANDARD_COMMUNITY_SUBFOLDERS = [
  "Assets",
  "Logos",
  "Brand Guide",
  "Creative Campaigns",
  "Ad Copy",
  "Demographic Profiles",
  "Other",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return errorResponse(405, "Method not allowed");
  }

  const url = new URL(req.url);
  const route = url.pathname.replace(/^\/+automation\/?/, "").replace(/\/+$/, "") || "run";

  try {
    if (route === "basecamp-webhook") {
      return await handleBasecampWebhook(req);
    }

    await authorizeRunner(req);
    if (route === "run") {
      const body = await req.json().catch(() => ({})) as Record<string, unknown>;
      const limit = Math.max(1, Math.min(Number(body.limit || 10), 50));
      return await handleRun(limit);
    }

    return errorResponse(404, `Unknown route: ${route}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected automation error";
    // deno-lint-ignore no-explicit-any
    const status = (error as any)?.status ?? 500;
    console.error("automation error", { route, message });
    return errorResponse(status, message);
  }
});

async function authorizeRunner(req: Request): Promise<void> {
  const configuredSecret = getEnv("AUTOMATION_RUNNER_SECRET", false);
  const providedSecret = req.headers.get("x-automation-secret") || "";
  if (configuredSecret && providedSecret === configuredSecret) return;
  await requireInternalUser(req);
}

async function handleRun(limit: number): Promise<Response> {
  const sb = createServiceRoleClient();
  const { data, error } = await sb
    .schema("onboarding")
    .from("automation_job")
    .select("*")
    .eq("status", "queued")
    .lte("scheduled_for", new Date().toISOString())
    .order("priority", { ascending: true })
    .order("scheduled_for", { ascending: true })
    .order("id", { ascending: true })
    .limit(limit);

  if (error) return errorResponse(500, error.message);

  const jobs = (data || []) as AutomationJob[];
  const results = [];
  for (const job of jobs) {
    results.push(await processJob(sb, job));
  }

  return jsonResponse({
    status: "ok",
    processed: results.length,
    results,
  });
}

async function processJob(sb: Sb, job: AutomationJob): Promise<Record<string, unknown>> {
  await markJob(sb, job.id, {
    status: "running",
    started_at: new Date().toISOString(),
    attempt_count: job.attempt_count + 1,
    locked_at: new Date().toISOString(),
    locked_by: "automation-edge-function",
    last_error: null,
  });

  try {
    const result = await dispatchJob(sb, job);
    await mirrorJobResult(sb, job, result);
    await markJob(sb, job.id, {
      status: "succeeded",
      completed_at: new Date().toISOString(),
      response_payload: result,
      external_id: typeof result.external_id === "string" ? result.external_id : null,
      external_url: typeof result.external_url === "string" ? result.external_url : null,
      locked_at: null,
      locked_by: null,
    });
    return { job_id: job.id, status: "succeeded", result };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown job error";
    const terminal = job.attempt_count + 1 >= job.max_attempts || isConfigurationError(message);
    await markJob(sb, job.id, {
      status: terminal ? "blocked" : "failed",
      last_error: message,
      locked_at: null,
      locked_by: null,
      response_payload: { error: message },
    });
    return { job_id: job.id, status: terminal ? "blocked" : "failed", error: message };
  }
}

async function mirrorJobResult(
  sb: Sb,
  job: AutomationJob,
  result: Record<string, unknown>
): Promise<void> {
  const onboardingClientId = Number(job.onboarding_client_id);
  if (!onboardingClientId) return;
  const externalId = typeof result.external_id === "string" ? result.external_id : null;
  const externalUrl = typeof result.external_url === "string" ? result.external_url : null;
  const systemCode = systemCodeForJob(job);
  if (systemCode && (externalId || externalUrl)) {
    await sb.schema("onboarding").from("onboarding_link").upsert(
      {
        onboarding_client_id: onboardingClientId,
        system_code: systemCode,
        external_id: externalId,
        external_url: externalUrl,
        metadata_json: { provider_code: job.provider_code, action_code: job.action_code },
      },
      { onConflict: "onboarding_client_id,system_code" }
    );
  }

  if (job.provider_code === "accelo") {
    const patch: Record<string, unknown> = {
      onboarding_client_id: onboardingClientId,
      last_write_status: "succeeded",
      last_write_job_id: job.id,
      last_write_at: new Date().toISOString(),
      metadata_json: {
        last_action_code: job.action_code,
        response: result.provider_response || result,
      },
    };
    const numericExternalId = externalId ? Number(externalId) : NaN;
    if (Number.isFinite(numericExternalId) && job.action_code.includes("company")) {
      patch.company_id = numericExternalId;
    }
    if (Number.isFinite(numericExternalId) && job.action_code.includes("contract")) {
      patch.contract_id = numericExternalId;
    }
    if (Number.isFinite(numericExternalId) && (job.action_code.includes("job") || job.action_code.includes("project"))) {
      patch.job_id = numericExternalId;
    }
    await sb.schema("onboarding").from("accelo_binding").upsert(
      patch,
      { onConflict: "onboarding_client_id" }
    );
  }
}

function systemCodeForJob(job: AutomationJob): string | null {
  if (job.provider_code === "basecamp" && job.action_code === "create_project") {
    return "basecamp_project";
  }
  if (job.provider_code === "google_drive" && job.action_code === "create_onboarding_folder") {
    return "google_drive_onboarding_folder";
  }
  if (job.provider_code === "google_drive" && job.action_code === "move_to_active") {
    return "google_drive_active_folder";
  }
  if (job.provider_code === "accelo" && job.action_code.includes("project")) {
    return "accelo_project";
  }
  return null;
}

async function dispatchJob(sb: Sb, job: AutomationJob): Promise<Record<string, unknown>> {
  const provider = job.provider_code;
  const action = job.action_code;
  if (provider === "dropbox" && action === "create_client_folder") {
    return await createDropboxFolder(sb, job);
  }
  if (provider === "slack" && action.startsWith("notify_")) {
    return await sendSlackMessage(job);
  }
  if (provider === "gmail" && action.endsWith("_draft")) {
    return await createGmailDraft(job);
  }
  if (provider === "accelo") {
    return await callAccelo(job);
  }
  if (provider === "basecamp") {
    return await callBasecamp(job);
  }
  if (provider === "google_drive") {
    return await callGoogleDrive(job);
  }
  if (provider === "portal" && action === "access_reminder_check") {
    return await runAccessReminderCheck(sb, job);
  }
  if (provider === "portal" && action === "stage_update") {
    return await updatePortalStage(sb, job);
  }
  throw new Error(`No handler for ${provider}.${action}`);
}

async function createDropboxFolder(sb: Sb, job: AutomationJob): Promise<Record<string, unknown>> {
  const onboardingClientId = Number(job.onboarding_client_id);
  if (!onboardingClientId) throw new Error("Dropbox job missing onboarding_client_id");

  const existing = await sb
    .schema("onboarding")
    .from("dropbox_folder_binding")
    .select("shared_link_url, folder_display_path")
    .eq("onboarding_client_id", onboardingClientId)
    .maybeSingle();
  if (existing.error) throw new Error(existing.error.message);
  if (existing.data) {
    return {
      status: "skipped",
      reason: "dropbox_folder_already_bound",
      external_url: existing.data.shared_link_url,
      folder_display_path: existing.data.folder_display_path,
    };
  }

  const integration = await fetchIntegration(sb);
  if (!integration?.is_active || !integration.refresh_token) {
    throw new Error("CONFIGURATION: Dropbox is not connected");
  }

  const client = await loadClientSummary(sb, onboardingClientId);
  const folderName = sanitizeFolderName(
    String(job.request_payload.folder_name || client.community_name || `Client ${onboardingClientId}`)
  );
  if (!folderName) throw new Error("Dropbox folder name is empty");

  const accessToken = await refreshAccessToken(sb, integration);
  const namespace = integration.team_root_namespace_id || integration.home_namespace_id || null;
  const root = String(job.request_payload.parent_path || integration.folder_root_path || "/");
  const targetPath = joinDropboxPath(root === "/" ? "" : root, folderName);
  const created = await dropboxApiCall({
    accessToken,
    endpoint: "/files/create_folder_v2",
    body: { path: targetPath, autorename: true },
    pathRootNamespaceId: namespace,
  }) as { metadata?: Record<string, unknown> };

  const metadata = created.metadata || {};
  const finalPath = String(metadata.path_display || targetPath);
  const subfolders = [];
  for (const name of STANDARD_COMMUNITY_SUBFOLDERS) {
    const path = joinDropboxPath(finalPath, name);
    try {
      const createdSubfolder = await dropboxApiCall({
        accessToken,
        endpoint: "/files/create_folder_v2",
        body: { path, autorename: false },
        pathRootNamespaceId: namespace,
      }) as { metadata?: Record<string, unknown> };
      subfolders.push({
        name,
        path_display: String(createdSubfolder.metadata?.path_display || path),
        status: "created",
      });
    } catch (_error) {
      subfolders.push({ name, path_display: path, status: "exists_or_skipped" });
    }
  }

  const shared = await ensureSharedLink(accessToken, finalPath, namespace);
  await sb.schema("onboarding").from("dropbox_folder_binding").upsert(
    {
      onboarding_client_id: onboardingClientId,
      namespace_id: namespace,
      folder_id: String(metadata.id || ""),
      folder_path: String(metadata.path_lower || finalPath.toLowerCase()),
      folder_display_path: finalPath,
      shared_link_url: shared.url,
      link_source: "created",
      linked_at: new Date().toISOString(),
      metadata_json: { created_by: "automation", subfolders },
    },
    { onConflict: "onboarding_client_id" }
  );

  await sb.schema("onboarding").from("onboarding_link").upsert(
    {
      onboarding_client_id: onboardingClientId,
      system_code: "dropbox_creative_folder",
      external_url: shared.url,
      metadata_json: { folder_display_path: finalPath },
    },
    { onConflict: "onboarding_client_id,system_code" }
  );

  return {
    status: "created",
    external_id: String(metadata.id || ""),
    external_url: shared.url,
    folder_display_path: finalPath,
    subfolders,
  };
}

async function sendSlackMessage(job: AutomationJob): Promise<Record<string, unknown>> {
  const webhookUrl = getEnv("SLACK_WEBHOOK_URL", false);
  if (!webhookUrl) throw new Error("CONFIGURATION: SLACK_WEBHOOK_URL is not set");
  const payload = job.request_payload || {};
  const text = String(payload.text || payload.message || "P11 onboarding automation notification");
  const resp = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, blocks: payload.blocks || undefined }),
  });
  const body = await resp.text();
  if (!resp.ok) throw new Error(`Slack webhook failed (${resp.status}): ${body}`);
  return { status: "sent", provider_response: body };
}

async function createGmailDraft(job: AutomationJob): Promise<Record<string, unknown>> {
  const accessToken = getEnv("GMAIL_ACCESS_TOKEN", false);
  const sender = getEnv("GMAIL_SENDER_EMAIL", false);
  if (!accessToken || !sender) {
    throw new Error("CONFIGURATION: GMAIL_ACCESS_TOKEN and GMAIL_SENDER_EMAIL are required for draft creation");
  }
  const payload = job.request_payload || {};
  const to = String(payload.to_email || payload.to || "");
  if (!to) throw new Error("Gmail draft is missing to_email");
  const subject = String(payload.subject || "P11creative Onboarding");
  const body = String(payload.body_text || payload.body || "");
  const raw = toBase64Url([
    `From: ${sender}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n"));

  const resp = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: { raw } }),
  });
  const result = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(`Gmail draft failed (${resp.status}): ${JSON.stringify(result)}`);
  return {
    status: "drafted",
    external_id: String(result.id || ""),
    provider_response: result,
  };
}

async function callAccelo(job: AutomationJob): Promise<Record<string, unknown>> {
  const deployment = getEnv("ACCELO_DEPLOYMENT", false) || "p11creativeinc";
  const token = await getAcceloWriteToken(deployment);
  const payload = job.request_payload || {};
  const endpoint = String(payload.endpoint || "");
  if (!endpoint) throw new Error("Accelo job missing endpoint");
  const method = String(payload.method || "POST").toUpperCase();
  const resp = await fetch(`https://${deployment}.api.accelo.com/api/v0/${endpoint.replace(/^\/+/, "")}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(payload.body || {}),
  });
  const result = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(`Accelo ${method} ${endpoint} failed (${resp.status}): ${JSON.stringify(result)}`);
  return { status: "ok", provider_response: result, external_id: extractExternalId(result) };
}

async function callBasecamp(job: AutomationJob): Promise<Record<string, unknown>> {
  const accountId = getEnv("BASECAMP_ACCOUNT_ID", false);
  const token = getEnv("BASECAMP_ACCESS_TOKEN", false);
  if (!accountId || !token) throw new Error("CONFIGURATION: Basecamp credentials are not configured");
  const payload = job.request_payload || {};
  const endpoint = String(payload.endpoint || "");
  if (!endpoint) throw new Error("Basecamp job missing endpoint");
  const method = String(payload.method || "POST").toUpperCase();
  const resp = await fetch(`https://3.basecampapi.com/${accountId}/${endpoint.replace(/^\/+/, "")}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": getEnv("BASECAMP_USER_AGENT", false) || "P11creative Onboard (ops@p11.com)",
    },
    body: method === "GET" ? undefined : JSON.stringify(payload.body || {}),
  });
  const result = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(`Basecamp ${method} ${endpoint} failed (${resp.status}): ${JSON.stringify(result)}`);
  return {
    status: "ok",
    provider_response: result,
    external_id: extractExternalId(result),
    external_url: typeof result.app_url === "string" ? result.app_url : undefined,
  };
}

async function callGoogleDrive(job: AutomationJob): Promise<Record<string, unknown>> {
  const token = getEnv("GOOGLE_DRIVE_ACCESS_TOKEN", false);
  if (!token) throw new Error("CONFIGURATION: GOOGLE_DRIVE_ACCESS_TOKEN is not configured");
  const payload = job.request_payload || {};
  const method = String(payload.method || "POST").toUpperCase();
  const endpoint = String(payload.endpoint || "files");
  const resp = await fetch(`https://www.googleapis.com/drive/v3/${endpoint.replace(/^\/+/, "")}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(payload.body || {}),
  });
  const result = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(`Google Drive ${method} ${endpoint} failed (${resp.status}): ${JSON.stringify(result)}`);
  return {
    status: "ok",
    provider_response: result,
    external_id: extractExternalId(result),
    external_url: typeof result.webViewLink === "string" ? result.webViewLink : undefined,
  };
}

async function runAccessReminderCheck(sb: Sb, job: AutomationJob): Promise<Record<string, unknown>> {
  const onboardingClientId = Number(job.onboarding_client_id);
  if (!onboardingClientId) throw new Error("Reminder check missing onboarding_client_id");
  const { data, error } = await sb
    .schema("onboarding")
    .from("onboarding_platform_access")
    .select("platform_label, verified_status, is_required")
    .eq("onboarding_client_id", onboardingClientId)
    .eq("is_required", true)
    .neq("verified_status", "verified");
  if (error) throw new Error(error.message);
  const outstanding = data || [];
  if (!outstanding.length) {
    return { status: "skipped", reason: "all_required_access_verified" };
  }
  const client = await loadClientSummary(sb, onboardingClientId);
  const platforms = outstanding.map((row) => row.platform_label).join(", ");
  await enqueueFollowup(sb, {
    onboardingClientId,
    providerCode: "gmail",
    actionCode: "access_reminder_draft",
    idempotencyKey: `access-reminder:${onboardingClientId}`,
    payload: {
      to_email: client.reporting_primary_email || client.community_email,
      subject: `Access needed for ${client.community_name}`,
      body_text: `Hi ${client.reporting_primary_name || "there"},\n\nWe're ready to keep your onboarding moving. We still need access for: ${platforms}.\n\nPlease use your P11creative onboarding portal to complete the remaining access steps.\n\nThank you,\nP11creative`,
    },
    priority: 80,
  });
  await enqueueFollowup(sb, {
    onboardingClientId,
    providerCode: "slack",
    actionCode: "notify_access_reminder",
    idempotencyKey: `slack-access-reminder:${onboardingClientId}`,
    payload: { text: `${client.community_name} still needs platform access after the reminder window: ${platforms}. Gmail draft queued.` },
    priority: 90,
  });
  return { status: "queued_followups", outstanding_platforms: outstanding };
}

async function updatePortalStage(sb: Sb, job: AutomationJob): Promise<Record<string, unknown>> {
  const onboardingClientId = Number(job.onboarding_client_id);
  const stage = String(job.request_payload.stage || "");
  if (!onboardingClientId || !stage) throw new Error("stage_update missing client or stage");
  const { error } = await sb
    .schema("onboarding")
    .from("onboarding_client")
    .update({ current_stage: stage })
    .eq("id", onboardingClientId);
  if (error) throw new Error(error.message);
  return { status: "updated", stage };
}

async function handleBasecampWebhook(req: Request): Promise<Response> {
  const secret = getEnv("BASECAMP_WEBHOOK_SECRET", false);
  if (secret && req.headers.get("x-basecamp-webhook-secret") !== secret) {
    return errorResponse(401, "Invalid Basecamp webhook secret");
  }
  const payload = await req.json().catch(() => ({})) as Record<string, unknown>;
  const sb = createServiceRoleClient();
  const recording = (payload.recording || {}) as Record<string, unknown>;
  const bucket = (recording.bucket || {}) as Record<string, unknown>;
  const title = String(recording.title || "");
  const bucketId = bucket.id ? String(bucket.id) : null;
  const kind = String(payload.kind || "");

  let clientId: number | null = null;
  if (bucketId) {
    const { data } = await sb
      .schema("onboarding")
      .from("onboarding_link")
      .select("onboarding_client_id")
      .eq("system_code", "basecamp_project")
      .eq("external_id", bucketId)
      .maybeSingle();
    clientId = data?.onboarding_client_id ? Number(data.onboarding_client_id) : null;
  }

  if (clientId) {
    await sb.schema("onboarding").from("onboarding_stage_event").insert({
      onboarding_client_id: clientId,
      stage_code: title.toLowerCase().includes("approval") ? "prelaunch_review" : "campaign_build",
      event_type: `basecamp:${kind}`,
      actor_type: "basecamp_webhook",
      metadata_json: payload,
    });
  }

  return jsonResponse({ status: "ok", onboarding_client_id: clientId });
}

async function loadClientSummary(sb: Sb, onboardingClientId: number): Promise<Record<string, string | null>> {
  const { data, error } = await sb
    .schema("onboarding")
    .from("onboarding_client")
    .select("id, display_name, community_email")
    .eq("id", onboardingClientId)
    .single();
  if (error) throw new Error(error.message);

  const { data: contact } = await sb
    .schema("onboarding")
    .from("onboarding_contact")
    .select("full_name, email")
    .eq("onboarding_client_id", onboardingClientId)
    .eq("role_code", "reporting_primary")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return {
    community_name: data?.display_name || `Client ${onboardingClientId}`,
    community_email: data?.community_email || null,
    reporting_primary_name: contact?.full_name || null,
    reporting_primary_email: contact?.email || null,
  };
}

async function enqueueFollowup(sb: Sb, args: {
  onboardingClientId: number;
  providerCode: string;
  actionCode: string;
  idempotencyKey: string;
  payload: Record<string, unknown>;
  priority: number;
}): Promise<void> {
  await sb.schema("onboarding").rpc("enqueue_automation_job", {
    p_onboarding_client_id: args.onboardingClientId,
    p_provider_code: args.providerCode,
    p_action_code: args.actionCode,
    p_idempotency_key: args.idempotencyKey,
    p_request_payload: args.payload,
    p_priority: args.priority,
    p_scheduled_for: new Date().toISOString(),
  });
}

async function markJob(sb: Sb, jobId: number, patch: Record<string, unknown>): Promise<void> {
  const { error } = await sb.schema("onboarding").from("automation_job").update(patch).eq("id", jobId);
  if (error) throw new Error(`Unable to update automation job ${jobId}: ${error.message}`);
}

async function getAcceloWriteToken(deployment: string): Promise<string> {
  const clientId = getEnv("ACCELO_WRITE_CLIENT_ID", false) || getEnv("ACCELO_CLIENT_ID", false);
  const clientSecret = getEnv("ACCELO_WRITE_CLIENT_SECRET", false) || getEnv("ACCELO_CLIENT_SECRET", false);
  if (!clientId || !clientSecret) {
    throw new Error("CONFIGURATION: Accelo write credentials are not configured");
  }
  const resp = await fetch(`https://${deployment}.api.accelo.com/oauth2/v0/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "write(all)" }).toString(),
  });
  const result = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(`Accelo token failed (${resp.status}): ${JSON.stringify(result)}`);
  return String(result.access_token || "");
}

function toBase64Url(value: string): string {
  return btoa(unescape(encodeURIComponent(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function extractExternalId(result: unknown): string | undefined {
  const record = result as Record<string, unknown>;
  const response = record?.response as Record<string, unknown> | undefined;
  const target = response || record;
  const id = target?.id || target?.ID || target?.Id;
  return id === undefined || id === null ? undefined : String(id);
}

function isConfigurationError(message: string): boolean {
  return message.startsWith("CONFIGURATION:");
}
