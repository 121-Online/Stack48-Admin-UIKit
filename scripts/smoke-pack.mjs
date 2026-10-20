#!/usr/bin/env node
/**
 * Smoke: build → pnpm pack → install the tarball in a temp app → import
 * public subpaths. Mirrors a git-dependency consumer after `prepare` has
 * produced `dist/`.
 */
import { execFileSync, execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pnpm = process.env.PNPM ?? "pnpm";

function run(command, cwd = root) {
  console.log(`$ ${command}`);
  execSync(command, { cwd, stdio: "inherit", env: { ...process.env, SKIP_PREPARE: "1" } });
}

run("pnpm run build");

const packDir = mkdtempSync(join(tmpdir(), "admin-ui-pack-"));
const consumerDir = mkdtempSync(join(tmpdir(), "admin-ui-consumer-"));

try {
  const packed = execFileSync(pnpm, ["pack", "--pack-destination", packDir], {
    cwd: root,
    encoding: "utf8",
    env: process.env,
  }).trim();
  const tarballLine = packed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .at(-1);
  const tarball = tarballLine?.startsWith("/") ? tarballLine : join(packDir, tarballLine ?? "");
  if (!tarball.endsWith(".tgz")) {
    throw new Error(`pnpm pack did not print a tarball path:\n${packed}`);
  }
  console.log(`packed ${tarball}`);

  writeFileSync(
    join(consumerDir, "package.json"),
    JSON.stringify(
      {
        name: "admin-ui-smoke",
        private: true,
        type: "module",
        dependencies: {
          "@stack48/admin-ui": `file:${tarball}`,
          react: "^19.1.1",
          "react-dom": "^19.1.1",
          recharts: "2.15.4",
        },
      },
      null,
      2,
    ),
  );

  run(`${pnpm} install`, consumerDir);

  writeFileSync(
    join(consumerDir, "smoke.mjs"),
    `import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const pkg = require("@stack48/admin-ui/package.json");
const root = dirname(require.resolve("@stack48/admin-ui/package.json"));

for (const file of ["dist/index.js", "dist/index.d.ts", "dist/styles.css", "dist/preset.js", "dist/admin/index.js", "dist/primitives/index.js"]) {
  const path = join(root, file);
  if (!existsSync(path)) throw new Error("missing " + path);
}

const { cn } = await import("@stack48/admin-ui/cn");
if (typeof cn !== "function") throw new Error("cn missing");
const { tokens } = await import("@stack48/admin-ui/tokens");
if (!tokens?.zinc?.[50]) throw new Error("tokens missing");
await import("@stack48/admin-ui/preset");

const { Button } = await import("@stack48/admin-ui/primitives");
if (typeof Button !== "function" && typeof Button !== "object") throw new Error("Button missing");

const { AppShell, DataTable } = await import("@stack48/admin-ui/admin");
if (typeof AppShell !== "function") throw new Error("AppShell missing");
if (typeof DataTable !== "function") throw new Error("DataTable missing");

const { Sparkline } = await import("@stack48/admin-ui/charts");
if (typeof Sparkline !== "function") throw new Error("Sparkline missing");

const { InboxLayout } = await import("@stack48/admin-ui/inbox");
if (typeof InboxLayout !== "function") throw new Error("InboxLayout missing");

const { EmptyState } = await import("@stack48/admin-ui/states");
if (typeof EmptyState !== "function") throw new Error("EmptyState missing");

console.log("smoke ok", pkg.name, pkg.version);
`,
  );

  run("node ./smoke.mjs", consumerDir);
  console.log("pack/install smoke passed");

  const gitSim = mkdtempSync(join(tmpdir(), "admin-ui-git-"));
  try {
    for (const name of [
      "package.json",
      "tsup.config.ts",
      "tsconfig.json",
      "postcss.config.js",
      "tailwind.config.ts",
    ]) {
      cpSync(join(root, name), join(gitSim, name));
    }
    cpSync(join(root, "src"), join(gitSim, "src"), { recursive: true });
    mkdirSync(join(gitSim, "scripts"));
    cpSync(join(root, "scripts/prepare.mjs"), join(gitSim, "scripts/prepare.mjs"));
    symlinkSync(join(root, "node_modules"), join(gitSim, "node_modules"));
    const env = { ...process.env };
    delete env.SKIP_PREPARE;
    console.log("$ node scripts/prepare.mjs (no dist/, git-style)");
    execFileSync(process.execPath, [join(gitSim, "scripts/prepare.mjs")], {
      cwd: gitSim,
      stdio: "inherit",
      env,
    });
    if (
      !existsSync(join(gitSim, "dist/index.js")) ||
      !existsSync(join(gitSim, "dist/styles.css"))
    ) {
      throw new Error("prepare did not build dist/");
    }
    console.log("prepare (git-style) smoke passed");
  } finally {
    rmSync(gitSim, { recursive: true, force: true });
  }
} finally {
  rmSync(packDir, { recursive: true, force: true });
  rmSync(consumerDir, { recursive: true, force: true });
}
