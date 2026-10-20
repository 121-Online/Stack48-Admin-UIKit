# ThreadView

Reading-pane conversation: message headers, sandboxed HTML bodies, an attachments list, collapsed earlier messages, and a reply slot.

## Import

```ts
import { ThreadView } from "@stack48/admin-ui/inbox";
```

## Props

| Name                | Type                   | Default                        | Description                                        |
| ------------------- | ---------------------- | ------------------------------ | -------------------------------------------------- |
| `messages`          | `InboxThreadMessage[]` | —                              | Thread, oldest first.                              |
| `title`             | `ReactNode`            | —                              | Heading (lead name, or “Unmatched reply”).         |
| `subtitle`          | `ReactNode`            | —                              | Mono email under the title.                        |
| `headerEnd`         | `ReactNode`            | —                              | Badges / actions on the right of the header.       |
| `recipientsSummary` | `string \| null`       | —                              | Recipients line under the heading.                 |
| `truncated`         | `boolean`              | `false`                        | Amber banner when the host truncated the thread.   |
| `truncatedMessage`  | `string`               | see component                  | Banner copy.                                       |
| `keepLatest`        | `number`               | `3`                            | Collapse messages before the last N (GTM default). |
| `emptyTitle`        | `string`               | `"No messages in this thread"` | Empty copy.                                        |
| `error`             | `ReactNode`            | —                              | Error banner.                                      |
| `loading`           | `boolean`              | `false`                        | Loading copy.                                      |
| `replySlot`         | `ReactNode`            | —                              | Composer. The kit does not send mail.              |
| `className`         | `string`               | —                              | Extra classes on the root.                         |

HTML bodies render only through `SandboxedHtml`. Each message may also set `text`, `attachments`, `chips`, and `actions` (mark handled, category, …).

## Usage

```tsx
<ThreadView
  title={lead?.name ?? "Unmatched reply"}
  subtitle={lead?.email}
  messages={messages}
  truncated={truncated}
  replySlot={<ReplyForm disabled={excluded} onSend={onSend} />}
/>
```

## Do / don’t

| Do                                                                         | Don’t                                   |
| -------------------------------------------------------------------------- | --------------------------------------- |
| Pass `html` through as-is and let `SandboxedHtml` isolate it               | `dangerouslySetInnerHTML` the body      |
| Put send/mark-handled in `replySlot` / `message.actions`                   | Fetch `/api/inbox/reply` inside the kit |
| Collapse long threads with `keepLatest={3}`                                | Render 500 messages expanded by default |
| Colour by `direction` (`inbound` / `outbound_campaign` / `outbound_reply`) | Invent rainbow message cards            |

## Accessibility

- Each message is an `<article>` labelled by subject / direction.
- Attachments are a list named **Attachments**; names are the accessible text (paperclip is `aria-hidden`).
- HTML/text toggle is a text button (“Show text” / “View HTML”).
- “Show N older messages” is a button; activating it reveals the rest of the thread.
- The reply slot is host-owned — label the textarea and disable Send when empty.
- Keyboard: thread content is tabbable (toggle, attachments, actions, reply). List shortcuts stay on `useInboxKeyboard` at page level (`u` to close the pane).
