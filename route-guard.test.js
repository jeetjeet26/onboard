import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRouteGuardMiddleware, parseCookieHeader } from "./route-guard.mjs";

function createResponse() {
  return {
    headers: {},
    ended: false,
    statusCode: 200,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    end() {
      this.ended = true;
    },
  };
}

async function runGuard({ url = "/", cookie = "", fetchResponse = { ok: false, json: async () => null } } = {}) {
  global.fetch = vi.fn().mockResolvedValue(fetchResponse);
  const guard = createRouteGuardMiddleware({
    supabaseUrl: "https://example.supabase.co",
    supabaseAnonKey: "anon-key",
  });
  const req = { method: "GET", url, headers: { cookie } };
  const res = createResponse();
  const next = vi.fn();

  await guard(req, res, next);
  return { req, res, next };
}

describe("parseCookieHeader", () => {
  it("decodes cookie pairs", () => {
    expect(parseCookieHeader("p11_access_token=a%20b; other=value")).toEqual({
      p11_access_token: "a b",
      other: "value",
    });
  });
});

describe("route guard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("redirects unauthenticated root requests to client home", async () => {
    const { res, next } = await runGuard();

    expect(res.statusCode).toBe(302);
    expect(res.headers.Location).toBe("/client-home.html");
    expect(res.ended).toBe(true);
    expect(next).not.toHaveBeenCalled();
  });

  it("blocks internal static docs for non-internal tokens", async () => {
    const { res, next } = await runGuard({
      url: "/internal-client-editor.html",
      cookie: "p11_access_token=client-token",
      fetchResponse: { ok: false, json: async () => null },
    });

    expect(res.statusCode).toBe(302);
    expect(res.headers.Location).toBe("/client-home.html");
    expect(next).not.toHaveBeenCalled();
  });

  it("allows internal static docs for internal tokens", async () => {
    const { res, next } = await runGuard({
      url: "/internal-client-editor.html",
      cookie: "p11_access_token=internal-token",
      fetchResponse: { ok: true, json: async () => ({ portal_role: "internal" }) },
    });

    expect(res.ended).toBe(false);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
