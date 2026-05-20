# P11 Onboarding Frontend

This folder contains the operational frontend wiring for the multi-page onboarding portal:

- `../p11-onboarding-dashboard.html` (main UI)
- `../client-home.html` (client community switcher and entry point)
- `../client-signup.html` (invite-only client signup)
- `../p11-onboarding-account-access.html` (Step 3 platform access workflow)
- `../internal.html` (internal operations overview)
- `../internal-client-editor.html` (internal client, invite, and Dropbox editor)
- `../internal-company.html` (company directory manager)
- `../internal-signup.html` (invite-only internal signup)
- `src/config.js` (Supabase config)
- `src/supabase.ts` (typed Supabase client)
- `src/database.types.ts` (generated Supabase database types)
- `src/api.js` (RPC wrappers)
- `src/stages.js` (canonical seven-stage tracker labels and display rules)
- `src/navigation.js` (shared role-aware navigation and notices)
- `src/styles/shared.css` (shared tokens, focus states, notices, and cross-page helpers)
- `src/main.js` (dashboard UI behavior + data mapping + submit/load flow)

## Run locally

From the repository root:

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/p11-onboarding-dashboard.html`
- `http://localhost:3000/client-home.html`
- `http://localhost:3000/internal.html`

## Build + test

```bash
npm run test
npm run lint
npm run typecheck
npm run check:sql-invariants
npm run build
```

## Production notes

- Run `npm run build` before `npm start`; the Node server serves `dist` when present.
- Internal static pages are guarded both by the production server and by `src/internal-static-guard.js`.
- Supabase config is injected via `/runtime-config.js` at runtime; do not bake production keys into HTML.
- The Supabase browser client is bundled from npm instead of loaded from a CDN.
- Keep browser data access behind authenticated RPCs. Do not add direct fallback reads from onboarding tables unless the RLS/policy contract is reviewed.

## Notes

- The portal is now login-required.
- Users must sign up or log in with Supabase Auth before the dashboard becomes available.
- Signup includes company search against the data lake and fuzzy matching for near matches.
- Internal users can generate client invite links from the client editor; redemption creates a `client` membership for the invited community.
- Company membership is completed via authenticated RPCs and linked through `portal_user_company_access`.
- Intake submission uses authenticated RPCs, not the old public token flow.
- Step labels and tracker logic should come from `src/stages.js`; do not duplicate stage arrays in page modules.
- Internal-only static pages use `src/internal-static-guard.js` and explain redirects through shared portal notices.
- Dropbox uploads use the community binding when available; otherwise the dashboard copy tells clients that portal storage is used until the folder is linked.
- Supabase config must be provided via `window.__P11_CONFIG__` or Vite env vars:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - Optional: `VITE_BRAND_ASSET_BUCKET` (defaults to `onboarding-brand-assets`)
