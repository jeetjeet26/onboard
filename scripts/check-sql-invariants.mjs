import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, "..", "p11_onboarding_implementation.sql");
const sql = fs.readFileSync(sqlPath, "utf8");

const checks = [
  {
    name: "no direct company-directory namespace join",
    valid: !/portal_user_company_access\s+\w+[\s\S]{0,300}join\s+onboarding\.company_directory\s+\w+\s+on\s+\w+\.id\s*=\s*\w+\.company_id/i.test(
      sql
    ),
  },
  {
    name: "no invalid public public_* function revokes",
    valid: !/revoke\s+execute\s+on\s+function\s+public\.public_/i.test(sql),
  },
  {
    name: "lookup/config tables have RLS enabled",
    valid: [
      "property_type_crosswalk",
      "service_code_lookup",
      "stage_crosswalk",
      "platform_code_lookup",
      "field_mapping_spec",
    ].every((table) =>
      new RegExp(`alter\\s+table\\s+onboarding\\.${table}\\s+enable\\s+row\\s+level\\s+security`, "i").test(
        sql
      )
    ),
  },
  {
    name: "portal membership view is security invoker",
    valid: /create\s+or\s+replace\s+view\s+onboarding\.v_portal_user_membership\s+with\s+\(security_invoker\s*=\s*true\)/i.test(
      sql
    ),
  },
  {
    name: "company consistency assertion runs after schema changes",
    valid: /perform\s+public\.internal_assert_portal_company_consistency\(\)/i.test(sql),
  },
];

const failed = checks.filter((check) => !check.valid);
if (failed.length) {
  for (const check of failed) {
    console.error(`SQL invariant failed: ${check.name}`);
  }
  process.exit(1);
}

console.log(`SQL invariants passed (${checks.length} checks).`);
