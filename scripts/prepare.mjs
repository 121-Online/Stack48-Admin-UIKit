#!/usr/bin/env node
/**
 * `prepare` runs after install so git dependencies (`github:org/repo#vX.Y.Z`)
 * produce `dist/` (ESM + .d.ts + CSS). CI sets SKIP_PREPARE=1 and builds
 * explicitly so install stays a pure fetch.
 */
import { execSync } from "node:child_process";

if (process.env.SKIP_PREPARE === "1") {
  console.log("Skipping prepare build (SKIP_PREPARE=1).");
  process.exit(0);
}

execSync("pnpm run build", { stdio: "inherit" });
