import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as inbox from "./index";

const root = dirname(fileURLToPath(import.meta.url));

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      out.push(...walk(path));
      continue;
    }
    if (/\.(ts|tsx)$/.test(name) && !name.includes(".test.") && !name.includes(".stories.")) {
      out.push(path);
    }
  }
  return out;
}

describe("inbox public API", () => {
  it("exports the Gmail-style kit", () => {
    expect(inbox.InboxLayout).toBeTypeOf("function");
    expect(inbox.FolderList).toBeTypeOf("function");
    expect(inbox.MessageList).toBeTypeOf("function");
    expect(inbox.ThreadView).toBeTypeOf("function");
    expect(inbox.MessageMeta).toBeTypeOf("function");
    expect(inbox.SandboxedHtml).toBeTypeOf("function");
    expect(inbox.useInboxKeyboard).toBeTypeOf("function");
    expect(inbox.resolveInboxKey).toBeTypeOf("function");
    expect(inbox.buildInboxHtmlSrcDoc).toBeTypeOf("function");
  });

  it("does not inject untrusted HTML with dangerouslySetInnerHTML", () => {
    const files = walk(root);
    expect(files.length).toBeGreaterThan(5);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/dangerouslySetInnerHTML\s*=/);
    }
  });
});
