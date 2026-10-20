#!/usr/bin/env node
/**
 * GitHub-only release. Never publishes to npm or GitHub Packages.
 *
 * Runs after a Changesets Version PR is merged: package.json is already
 * bumped and CHANGELOG.md updated. This script builds, tags `vX.Y.Z`,
 * and opens a GitHub Release for git-dependency consumers:
 *
 *   "@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const version = pkg.version;
if (!version || version === "0.0.0") {
  throw new Error(`Refusing to release invalid version: ${JSON.stringify(version)}`);
}

const tag = `v${version}`;

run("pnpm run build");

const existing = execSync("git tag --list " + JSON.stringify(tag), { encoding: "utf8" }).trim();
if (!existing) {
  run(`git tag ${tag}`);
  run(`git push origin ${tag}`);
} else {
  console.log(`Tag ${tag} already exists; skipping git tag.`);
}

try {
  execSync(`gh release view ${tag}`, { stdio: "pipe" });
  console.log(`GitHub Release ${tag} already exists; skipping.`);
} catch {
  run(`gh release create ${tag} --title "${pkg.name} ${tag}" --notes-file CHANGELOG.md --latest`);
}

console.log(`Released ${tag} (no registry publish).`);
