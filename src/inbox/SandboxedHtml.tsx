import { useMemo } from "react";
import { cn } from "../lib/cn";

/**
 * Content-Security-Policy applied inside the iframe `srcdoc`.
 *
 * `default-src 'none'` plus a tight allowlist: images (https/data/cid),
 * inline styles (email HTML), no scripts, no forms, no framing-out.
 */
export const INBOX_HTML_CSP = [
  "default-src 'none'",
  "script-src 'none'",
  "img-src https: data: cid:",
  "style-src 'unsafe-inline'",
  "font-src data:",
  "media-src https: data:",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

/**
 * Wrap untrusted HTML in a document that carries a CSP meta tag.
 *
 * Used as the iframe `srcDoc`. Do not concatenate this into the parent
 * page, and do not run it through `dangerouslySetInnerHTML`.
 */
export function buildInboxHtmlSrcDoc(html: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${INBOX_HTML_CSP}"><base target="_blank" rel="noopener noreferrer"><style>html,body{margin:0;padding:8px;background:#fff;color:#18181b;font:13px/1.5 Inter,system-ui,sans-serif;word-wrap:break-word;}</style></head><body>${html}</body></html>`;
}

/**
 * Props for {@link SandboxedHtml}.
 */
export interface SandboxedHtmlProps {
  /** Untrusted HTML fragment. */
  html: string;
  /** Accessible name for the iframe. */
  title?: string;
  className?: string;
  /** Minimum height. Default matches GTM (`min-h-[220px]`). */
  minHeightClassName?: string;
}

/**
 * Render untrusted email HTML in a sandboxed iframe.
 *
 * `sandbox=""` disables scripts, same-origin, forms, popups, and pointer
 * lock. The `srcdoc` document also ships a CSP meta tag. This is the **only**
 * supported way to show HTML bodies in the inbox kit — never
 * `dangerouslySetInnerHTML`.
 */
export function SandboxedHtml({
  html,
  title = "Email HTML",
  className,
  minHeightClassName = "min-h-[220px]",
}: SandboxedHtmlProps) {
  const srcDoc = useMemo(() => buildInboxHtmlSrcDoc(html), [html]);

  return (
    <iframe
      sandbox=""
      referrerPolicy="no-referrer"
      srcDoc={srcDoc}
      title={title}
      className={cn(
        "w-full border border-border rounded-sm bg-card",
        minHeightClassName,
        className,
      )}
    />
  );
}
