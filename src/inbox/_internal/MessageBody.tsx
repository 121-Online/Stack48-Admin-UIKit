import { useState } from "react";
import { SandboxedHtml } from "../SandboxedHtml";
import type { InboxThreadMessage } from "../types";

export function MessageBody({ message }: { message: InboxThreadMessage }) {
  const hasHtml = Boolean(message.html && message.html.trim());
  const hasText = Boolean(message.text && message.text.trim());
  const [mode, setMode] = useState<"html" | "text">(hasHtml ? "html" : "text");

  if (!hasHtml && !hasText) {
    return (
      <div className="mt-2">
        <p className="text-sm text-zinc-400 italic">body not stored</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {hasHtml && hasText ? (
        <div className="mb-2">
          <button
            type="button"
            className="text-caption text-blue-600 hover:underline"
            onClick={() => setMode((value) => (value === "html" ? "text" : "html"))}
          >
            {mode === "html" ? "Show text" : "View HTML"}
          </button>
        </div>
      ) : null}
      {mode === "html" && hasHtml ? (
        <SandboxedHtml html={message.html ?? ""} title={message.subject || "Email HTML"} />
      ) : hasText ? (
        <pre className="whitespace-pre-wrap text-sm text-zinc-800 font-sans">{message.text}</pre>
      ) : (
        <p className="text-sm text-zinc-400 italic">body not stored</p>
      )}
    </div>
  );
}
