#!/usr/bin/env node
/**
 * `prepare` runs after install so git dependencies (`github:org/repo#vX.Y.Z`)
 * produce `dist/` (ESM + .d.ts + CSS). CI sets SKIP_PREPARE=1 and builds
 * explicitly so install stays a pure fetch.
 *
 * Packed tarballs already include `dist/`; skip the rebuild there so
 * consumers do not need `tsup` as a production dependency.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

if (process.env.SKIP_PREPARE === "1") {
  console.log("Skipping prepare build (SKIP_PREPARE=1).");
  process.exit(0);
}

const distJs = join(root, "dist/index.js");
const distCss = join(root, "dist/styles.css");
if (existsSync(distJs) && existsSync(distCss)) {
  console.log("Skipping prepare build (dist/ already present).");
  process.exit(0);
}

const tsup = join(root, "node_modules", ".bin", "tsup");
if (!existsSync(tsup)) {
  console.error("prepare: tsup is not installed; cannot build dist/.");
  process.exit(1);
}

execFileSync(tsup, [], { stdio: "inherit", cwd: root, env: process.env });
