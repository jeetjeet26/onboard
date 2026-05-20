const supabaseUrl = process.env.SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !serviceRoleKey) {
  const message =
    "DB company consistency check requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.";
  if (process.env.CI === "true") {
    throw new Error(message);
  }
  console.warn(
    `${message} Skipping locally; CI fails when these secrets are not configured.`
  );
  process.exit(0);
}

const endpoint = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/internal_assert_portal_company_consistency`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    apikey: serviceRoleKey,
    authorization: `Bearer ${serviceRoleKey}`,
    "content-type": "application/json",
  },
  body: "{}",
});

if (!response.ok) {
  const errorBody = await response.text();
  throw new Error(
    `DB company consistency check failed (${response.status} ${response.statusText}): ${errorBody}`
  );
}

const payload = await response.json();
console.log("DB company consistency check passed.", payload);
