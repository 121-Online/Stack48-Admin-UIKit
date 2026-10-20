import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildInboxHtmlSrcDoc, INBOX_HTML_CSP, SandboxedHtml } from "./SandboxedHtml";

describe("SandboxedHtml", () => {
  it("renders untrusted HTML through a sandbox iframe with CSP srcdoc", () => {
    const html = `<img src=x onerror="alert(1)"><script>alert(1)</script><p>Hello</p>`;
    const { container } = render(<SandboxedHtml html={html} title="Mail body" />);
    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe).toHaveAttribute("sandbox", "");
    expect(iframe).toHaveAttribute("referrerpolicy", "no-referrer");
    expect(iframe).toHaveAttribute("title", "Mail body");
    expect(iframe?.getAttribute("srcdoc")).toContain("Content-Security-Policy");
    expect(iframe?.getAttribute("srcdoc")).toContain(INBOX_HTML_CSP);
    expect(iframe?.getAttribute("srcdoc")).toContain(html);
    expect(container.querySelector("script")).toBeNull();
  });

  it("never uses dangerouslySetInnerHTML on the host document", () => {
    const { container } = render(<SandboxedHtml html="<b>x</b>" />);
    expect(container.innerHTML).not.toContain("dangerouslySetInnerHTML");
    expect(container.querySelector("b")).toBeNull();
  });
});

describe("buildInboxHtmlSrcDoc", () => {
  it("wraps HTML in a CSP document", () => {
    const src = buildInboxHtmlSrcDoc("<p>Hi</p>");
    expect(src.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(src).toContain(`content="${INBOX_HTML_CSP}"`);
    expect(src).toContain("<p>Hi</p>");
  });
});
