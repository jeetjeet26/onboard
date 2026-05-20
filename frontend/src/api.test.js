import { beforeEach, describe, expect, it, vi } from "vitest";

const supabaseMock = vi.hoisted(() => ({
  rpc: vi.fn(),
  schema: vi.fn(),
}));

vi.mock("./supabase.ts", () => ({
  supabase: supabaseMock,
}));

describe("getLatestSubmissionPayload", () => {
  beforeEach(() => {
    supabaseMock.rpc.mockReset();
    supabaseMock.schema.mockReset();
  });

  it("returns the RPC payload when available", async () => {
    supabaseMock.rpc.mockResolvedValue({
      data: { community_name: "P11 Gardens" },
      error: null,
    });
    const { getLatestSubmissionPayload } = await import("./api.js");

    await expect(getLatestSubmissionPayload(42)).resolves.toEqual({
      community_name: "P11 Gardens",
    });
  });

  it("does not fall back to direct onboarding table access when the RPC fails", async () => {
    supabaseMock.rpc.mockResolvedValue({
      data: null,
      error: { message: "permission denied" },
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { getLatestSubmissionPayload } = await import("./api.js");

    await expect(getLatestSubmissionPayload(42)).resolves.toBeNull();
    expect(supabaseMock.schema).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
