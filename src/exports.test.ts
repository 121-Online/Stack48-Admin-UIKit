import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../package.json"), "utf8"),
) as {
  name: string;
  private: boolean;
  type: string;
  sideEffects: string[];
  peerDependencies: Record<string, string>;
  exports: Record<string, unknown>;
  scripts: Record<string, string>;
};

describe("package contract", () => {
  it("is a private ESM git-consumed kit", () => {
    expect(pkg.name).toBe("@stack48/admin-ui");
    expect(pkg.private).toBe(true);
    expect(pkg.type).toBe("module");
    expect(pkg.sideEffects).toEqual(["**/*.css"]);
    expect(pkg.scripts.prepare).toContain("prepare.mjs");
    expect(pkg.scripts.release).toContain("scripts/release.mjs");
    expect(pkg.scripts.release).not.toMatch(/npm publish|changeset publish/);
  });

  it("declares react, react-dom, and tailwindcss as peers", () => {
    expect(pkg.peerDependencies.react).toBe(">=18");
    expect(pkg.peerDependencies["react-dom"]).toBe(">=18");
    expect(pkg.peerDependencies.tailwindcss).toMatch(/\^3/);
    expect(pkg.peerDependencies.recharts).toMatch(/\^2/);
  });

  it("re-exports the inbox kit from the root barrel", async () => {
    const inbox = await import("./inbox");
    expect(inbox.InboxLayout).toBeTypeOf("function");
    expect(inbox.MessageList).toBeTypeOf("function");
    expect(inbox.SandboxedHtml).toBeTypeOf("function");
    expect(inbox.useInboxKeyboard).toBeTypeOf("function");
  });

  it("exposes the documented subpath export map", () => {
    const keys = Object.keys(pkg.exports);
    for (const key of [
      ".",
      "./tokens",
      "./preset",
      "./cn",
      "./styles.css",
      "./theme.css",
      "./primitives",
      "./admin",
      "./charts",
      "./inbox",
      "./states",
      "./components/*",
    ]) {
      expect(keys).toContain(key);
    }
  });
});

describe("admin namespace", async () => {
  const admin = await import("./admin");

  it("exports shell and table entry points", () => {
    for (const name of [
      "AppShell",
      "Sidebar",
      "PageHeader",
      "Topbar",
      "Breadcrumbs",
      "DataTable",
      "DataTableToolbar",
      "DataTablePagination",
      "FilterSelect",
      "MultiSelectFilter",
    ] as const) {
      expect(admin[name]).toBeTypeOf("function");
    }
  });
});
