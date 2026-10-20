import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    const hidden = false;
    expect(cn("px-2", hidden && "hidden", "py-1")).toBe("px-2 py-1");
  });

  it("resolves conflicting Tailwind padding so the last token wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("merges conditional objects from clsx", () => {
    expect(cn({ "text-zinc-900": true, "text-zinc-400": false }, "font-medium")).toBe(
      "text-zinc-900 font-medium",
    );
  });
});
