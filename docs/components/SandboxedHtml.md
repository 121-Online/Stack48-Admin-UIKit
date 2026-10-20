# SandboxedHtml

The **only** supported way to render untrusted email HTML in this kit.

The fragment is placed in an iframe `srcdoc` that carries a Content-Security-Policy meta tag. The iframe uses `sandbox=""` (no scripts, no same-origin, no forms, no popups). The kit never calls `dangerouslySetInnerHTML`.

## Import

```ts
import { SandboxedHtml, buildInboxHtmlSrcDoc } from "@stack48/admin-ui/inbox";
```

## Props

| Name                 | Type     | Default           | Description                     |
| -------------------- | -------- | ----------------- | ------------------------------- |
| `html`               | `string` | —                 | Untrusted HTML fragment.        |
| `title`              | `string` | `"Email HTML"`    | Accessible name for the iframe. |
| `className`          | `string` | —                 | Extra classes on the iframe.    |
| `minHeightClassName` | `string` | `"min-h-[220px]"` | Minimum height utility.         |

`buildInboxHtmlSrcDoc(html)` is the same wrapper `SandboxedHtml` feeds to `srcDoc` (useful in tests). `INBOX_HTML_CSP` is the policy string.

## Usage

```tsx
<SandboxedHtml html={message.html} title={message.subject ?? "Email HTML"} />
```

## Do / don’t

| Do                                           | Don’t                                                |
| -------------------------------------------- | ---------------------------------------------------- |
| Pass the stored HTML through unchanged       | `dangerouslySetInnerHTML={{ __html: message.html }}` |
| Keep `sandbox=""` empty (no `allow-scripts`) | Relax the iframe sandbox to debug layout             |
| Use this component for every HTML body       | Render HTML in the parent document “just this once”  |

## Accessibility

- The iframe has a `title` (default **Email HTML**). Prefer the message subject.
- `referrerPolicy="no-referrer"` so remote images do not leak the host URL.
- Keyboard: iframe content is a nested document. Users tab to the iframe; inner links are limited by `sandbox=""` (no navigation). Prefer offering a “Show text” alternative, as `ThreadView` does when both HTML and text exist.
- Scripts, `onerror` handlers, and forms in the fragment do not run.
