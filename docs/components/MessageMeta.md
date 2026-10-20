# MessageMeta

Header block for a single thread message: direction eyebrow, subject, recipients, timestamp, status, and chips.

## Import

```ts
import { MessageMeta } from "@stack48/admin-ui/inbox";
```

## Props

| Name                | Type                    | Default     | Description                                                               |
| ------------------- | ----------------------- | ----------- | ------------------------------------------------------------------------- |
| `direction`         | `InboxMessageDirection` | `"unknown"` | Colours the eyebrow (`inbound`, `outbound_campaign`, `outbound_reply`).   |
| `directionLabel`    | `string`                | —           | Eyebrow copy (“Inbound from jane@…”).                                     |
| `subject`           | `string \| null`        | —           | Subject line.                                                             |
| `from`              | `string \| null`        | —           | Accepted for host spreads; put the visible from-line in `directionLabel`. |
| `to` / `cc`         | `string[]`              | —           | Used to build “To … · Cc …”.                                              |
| `recipientsLabel`   | `string \| null`        | —           | Overrides `to` / `cc`.                                                    |
| `timestamp`         | `string \| null`        | —           | Visible time (host-formatted).                                            |
| `timestampDateTime` | `string \| null`        | —           | `dateTime` on `<time>`.                                                   |
| `status`            | `string \| null`        | —           | Hidden when `"received"`.                                                 |
| `chips`             | `InboxChip[]`           | —           | Auto-reply, category, unhandled, failed, …                                |
| `className`         | `string`                | —           | Extra classes on the root.                                                |

## Usage

```tsx
<MessageMeta
  direction="inbound"
  directionLabel={`Inbound from ${from}`}
  subject={subject}
  to={to}
  cc={cc}
  timestamp={formatLondonDateTime(at)}
  timestampDateTime={at}
  chips={[{ id: "unhandled", label: "Unhandled", variant: "warning" }]}
/>
```

## Do / don’t

| Do                                         | Don’t                                   |
| ------------------------------------------ | --------------------------------------- |
| Format times in the host (GTM uses London) | Bake a timezone into the kit            |
| Keep the eyebrow sentence-case             | Title-case every label                  |
| Use chips for handled / auto-reply         | Draw a large status card above the body |

## Accessibility

- Timestamp is a `<time>` with `dateTime` when provided.
- Chips with `href` are links; chips with `onClick` are buttons; otherwise they are text.
- Direction colour is supplementary — the `directionLabel` text is the accessible name for that line.
- Contrast: inbound eyebrow is `text-blue-800` on the blue-tinted article; outbound reply is `text-emerald-800`.
