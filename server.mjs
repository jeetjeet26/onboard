import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRouteGuardMiddleware } from "./route-guard.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const rootDir = fs.existsSync(distDir) ? distDir : __dirname;
const port = Number(process.env.PORT) || 3000;
const runtimeConfig = {
  supabaseUrl: process.env.VITE_SUPABASE_URL || "",
  supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY || "",
  brandAssetBucket: process.env.VITE_BRAND_ASSET_BUCKET || "onboarding-brand-assets",
};
const routeGuard = createRouteGuardMiddleware({
  supabaseUrl: runtimeConfig.supabaseUrl,
  supabaseAnonKey: runtimeConfig.supabaseAnonKey,
});

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function applyBaseHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      `connect-src 'self' ${runtimeConfig.supabaseUrl || ""}`.trim(),
    ].join("; ")
  );
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

function writePlain(res, statusCode, message) {
  applyBaseHeaders(res);
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = decoded === "/" ? "/index.html" : decoded;
  return path.resolve(rootDir, `.${path.normalize(safePath)}`);
}

function serveRequest(req, res) {
  const requestPath = (req.url || "/").split("?")[0];
  applyBaseHeaders(res);
  if (requestPath === "/runtime-config.js") {
    res.writeHead(200, {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    });
    const serialized = JSON.stringify(runtimeConfig).replace(/</g, "\\u003c");
    res.end(`window.__P11_CONFIG__ = ${serialized};`);
    return;
  }

  const filePath = resolvePath(req.url || "/");
  const relativePath = path.relative(rootDir, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    writePlain(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      writePlain(res, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[ext] || "application/octet-stream";
    const cacheControl =
      ext === ".html"
        ? "no-store, max-age=0"
        : "public, max-age=31536000, immutable";
    res.writeHead(200, { "Content-Type": contentType, "Cache-Control": cacheControl });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  routeGuard(req, res, () => serveRequest(req, res)).catch(() => {
    writePlain(res, 503, "Unable to verify access");
  });
});

if (process.env.NODE_ENV === "production" && rootDir !== distDir) {
  console.warn("dist directory not found; serving repository root as a fallback.");
}

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  });
}

export { applyBaseHeaders, resolvePath, routeGuard, serveRequest, server };
