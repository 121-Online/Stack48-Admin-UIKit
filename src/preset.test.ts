import { describe, expect, it } from "vitest";
import preset, { adminUiContentGlobs } from "./preset";

describe("tailwind preset", () => {
  it("is class-based dark mode", () => {
    expect(preset.darkMode).toBe("class");
  });

  it("exposes shadcn and Stack48 colour tokens", () => {
    const colors = preset.theme.extend.colors;
    expect(colors).toBeDefined();
    if (!colors || Array.isArray(colors) || typeof colors === "function") {
      throw new Error("expected a colour map");
    }
    for (const key of [
      "background",
      "foreground",
      "primary",
      "secondary",
      "muted",
      "accent",
      "destructive",
      "border",
      "input",
      "ring",
      "card",
      "popover",
      "brand",
      "success",
      "warning",
      "sidebar",
    ]) {
      expect(colors).toHaveProperty(key);
    }
  });

  it("maps compact GTM radii and Inter / JetBrains Mono", () => {
    expect(preset.theme.extend.borderRadius?.sm).toBe("var(--radius)");
    expect(preset.theme.extend.fontFamily?.sans?.[0]).toBe("Inter");
    expect(preset.theme.extend.fontFamily?.mono?.[0]).toBe("JetBrains Mono");
    expect(preset.theme.extend.fontSize?.body).toEqual(["13px", { lineHeight: "20px" }]);
  });

  it("includes content globs for git-installed dist and source", () => {
    expect(adminUiContentGlobs.length).toBeGreaterThan(0);
    expect(preset.content).toEqual([...adminUiContentGlobs]);
  });
});
