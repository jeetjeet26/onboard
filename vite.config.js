import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRouteGuardMiddleware } from "./route-guard.mjs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const routeGuard = createRouteGuardMiddleware({
    supabaseUrl: env.VITE_SUPABASE_URL || "",
    supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY || "",
  });

  const guardedPlugin = {
    name: "p11-route-guard",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        routeGuard(req, res, next).catch(() => next());
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        routeGuard(req, res, next).catch(() => next());
      });
    },
  };

  return {
    plugins: [guardedPlugin],
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
    },
    preview: {
      host: "localhost",
      port: 3000,
      strictPort: true,
    },
    build: {
      rollupOptions: {
        input: {
          home: path.resolve(rootDir, "index.html"),
          dashboard: path.resolve(rootDir, "p11-onboarding-dashboard.html"),
          accountAccess: path.resolve(rootDir, "p11-onboarding-account-access.html"),
          onboardingThankYou: path.resolve(rootDir, "p11-onboarding-thank-you.html"),
          clientHome: path.resolve(rootDir, "client-home.html"),
          clientSignup: path.resolve(rootDir, "client-signup.html"),
          internal: path.resolve(rootDir, "internal.html"),
          internalClientEditor: path.resolve(rootDir, "internal-client-editor.html"),
          internalCompany: path.resolve(rootDir, "internal-company.html"),
          internalSignup: path.resolve(rootDir, "internal-signup.html"),
          automationFlow: path.resolve(rootDir, "p11-onboarding-automation-flow.html"),
          projectBrief: path.resolve(rootDir, "p11-onboarding-project-brief.html"),
        },
      },
    },
  };
});
