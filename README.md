# P11 Onboarding Portal

Multi-page onboarding portal for P11creative clients and internal teams.

## App Surfaces

- `index.html` - workspace home
- `client-home.html` - client community switcher + entrypoint
- `client-signup.html` - invite-only client account signup
- `p11-onboarding-dashboard.html` - intake workflow (Step 2)
- `p11-onboarding-account-access.html` - platform access workflow (Step 3)
- `internal.html` - internal operations portal
- `internal-client-editor.html` - internal client editor, client invites, and Dropbox binding tools
- `internal-company.html` - company directory manager
- `internal-signup.html` - invite-only internal signup
- `p11-onboarding-automation-flow.html` - onboarding automation reference
- `p11-onboarding-project-brief.html` - project brief and implementation notes

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Required Config

Provide Supabase config via one of these:

1. Runtime script:

```html
<script>
  window.__P11_CONFIG__ = {
    supabaseUrl: "https://YOUR_PROJECT.supabase.co",
    supabaseAnonKey: "YOUR_ANON_KEY",
    brandAssetBucket: "onboarding-brand-assets"
  };
</script>
```

2. Vite env vars:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Optional: `VITE_BRAND_ASSET_BUCKET`

## Validation

```bash
npm run test
npm run lint
npm run typecheck
npm run check:sql-invariants
npm run build
npm audit --audit-level=moderate
```

## Database

- Schema + RPC implementation: `p11_onboarding_implementation.sql`
- Includes onboarding ingest normalization, dashboard/internal RPCs, and sync queue processing helpers.
- Generated Supabase types live in `frontend/src/database.types.ts` and are wired into `frontend/src/supabase.ts`.
- After schema changes touching company mappings, run `public.internal_assert_portal_company_consistency()`.

## Production Deployment

The default production path is a Node/static deployment such as Render:

```bash
npm ci
npm run build
NODE_ENV=production npm start
```

`server.mjs` serves `dist` when it exists, injects `/runtime-config.js` from environment variables, applies the same internal route guard used by Vite preview, and sends baseline security/cache headers. Required runtime variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Optional: `VITE_BRAND_ASSET_BUCKET`

CI-only database validation also requires:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

If those CI secrets are missing, `npm run check:db-company-consistency` fails in CI instead of silently skipping. For local development it prints a warning and skips.

## Production Smoke Tests

Before promoting a deployment:

1. Open `/` unauthenticated and confirm it redirects to `/client-home.html`.
2. Sign in as a client and verify community switching, intake load/save, Step 3 platform access, and logout.
3. Sign in as an internal user and verify `/internal.html`, `/internal-client-editor.html`, and `/internal-company.html`.
4. Confirm a non-internal user is redirected away from internal static docs.
5. Run Supabase security/performance advisors and the company consistency assertion after database changes.

## UX Architecture Notes

- The canonical onboarding stage sequence and client-facing tracker copy live in `frontend/src/stages.js`.
- Shared role-aware navigation and redirect notices live in `frontend/src/navigation.js`.
- Shared cross-page CSS helpers live in `frontend/src/styles/shared.css`.
- Supabase JS is bundled through npm; do not re-add an unpinned CDN script.
- Supabase Edge Functions may restrict browser origins with `P11_ALLOWED_ORIGIN`; leave unset only for local or intentionally public deployments.

