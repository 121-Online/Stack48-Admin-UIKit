import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const srcRoot = dirname(fileURLToPath(import.meta.url));

const SKIP_NAME =
  /\.(test|stories)\.(ts|tsx)$|story-frame\.tsx$|fixtures\.ts$|world-land\.tsx$|setup\.ts$/;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (name === "_internal" || name === "test") continue;
    if (statSync(path).isDirectory()) {
      out.push(...walk(path));
      continue;
    }
    if (!/\.(ts|tsx)$/.test(name) || SKIP_NAME.test(name)) continue;
    out.push(path);
  }
  return out;
}

const EXPORT = /^export (async )?(function|const|class|type|interface|enum) /;

describe("TSDoc on public source exports", () => {
  it("every local export has a /** block immediately above it", () => {
    const missing: string[] = [];
    for (const file of walk(srcRoot)) {
      const rel = relative(srcRoot, file);
      if (rel === "index.ts" || rel.endsWith("/index.ts") || rel.startsWith("components/")) {
        continue;
      }
      const lines = readFileSync(file, "utf8").split("\n");
      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? "";
        if (!EXPORT.test(line)) continue;
        let cursor = index - 1;
        while (cursor >= 0 && (lines[cursor] ?? "").trim() === "") cursor -= 1;
        const prev = lines[cursor] ?? "";
        if (!prev.trim().endsWith("*/")) {
          missing.push(`${rel}:${index + 1}: ${line.slice(0, 80)}`);
        }
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });
});
