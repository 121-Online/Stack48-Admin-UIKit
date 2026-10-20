import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  darkSemantic,
  layout,
  lightSemantic,
  radii,
  semanticCssVarNames,
  typography,
  zinc,
} from "./tokens";

const root = dirname(fileURLToPath(import.meta.url));
const themeCss = readFileSync(join(root, "styles/theme.css"), "utf8");

describe("design tokens", () => {
  it("matches GTM canvas, ink, and brand hex", () => {
    expect(zinc[50]).toBe("#fafafa");
    expect(zinc[900]).toBe("#18181b");
    expect(typography.bodySize).toBe("13px");
    expect(typography.fontSans.startsWith("Inter")).toBe(true);
    expect(radii.sm).toBe("0.125rem");
    expect(layout.sidebarWidth).toBe("16rem");
    expect(layout.headerHeight).toBe("3.5rem");
  });

  it("declares every semantic CSS variable in :root and .dark", () => {
    const rootBlock = themeCss.slice(themeCss.indexOf(":root {"), themeCss.indexOf(".dark {"));
    const darkBlock = themeCss.slice(themeCss.indexOf(".dark {"));

    for (const name of semanticCssVarNames) {
      expect(rootBlock, `:root missing --${name}`).toContain(`--${name}:`);
      if (
        name === "radius" ||
        name === "sidebar-width" ||
        name === "header-height" ||
        name === "font-sans" ||
        name === "font-mono" ||
        name === "font-size-body" ||
        name === "shadow-sm" ||
        name === "shadow-lg"
      ) {
        continue;
      }
      expect(darkBlock, `.dark missing --${name}`).toContain(`--${name}:`);
    }
  });

  it("keeps light semantic HSL in sync with theme.css", () => {
    expect(themeCss).toContain(`--background: ${lightSemantic.background};`);
    expect(themeCss).toContain(`--foreground: ${lightSemantic.foreground};`);
    expect(themeCss).toContain(`--brand: ${lightSemantic.brand};`);
    expect(themeCss).toContain(`--primary: ${lightSemantic.primary};`);
    expect(themeCss).toContain(`--ring: ${lightSemantic.ring};`);
    expect(themeCss).toContain(`--radius: ${radii.sm};`);
  });

  it("keeps dark semantic HSL in sync with theme.css", () => {
    expect(themeCss).toContain(`--background: ${darkSemantic.background};`);
    expect(themeCss).toContain(`--foreground: ${darkSemantic.foreground};`);
  });
});
