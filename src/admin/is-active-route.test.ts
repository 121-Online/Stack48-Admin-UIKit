import { describe, expect, it } from "vitest";
import { isActiveRoute } from "./is-active-route";

describe("isActiveRoute", () => {
  it("treats / as exact", () => {
    expect(isActiveRoute("/", "/")).toBe(true);
    expect(isActiveRoute("/leads", "/")).toBe(false);
  });

  it("matches prefix for nested paths", () => {
    expect(isActiveRoute("/leads", "/leads")).toBe(true);
    expect(isActiveRoute("/leads/abc", "/leads")).toBe(true);
    expect(isActiveRoute("/leads-export", "/leads")).toBe(false);
  });

  it("honours match: exact", () => {
    expect(isActiveRoute("/inbox/1", "/inbox", "exact")).toBe(false);
    expect(isActiveRoute("/inbox", "/inbox", "exact")).toBe(true);
  });

  it("is false when pathname is missing", () => {
    expect(isActiveRoute(undefined, "/leads")).toBe(false);
  });
});
