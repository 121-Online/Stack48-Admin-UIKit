# InlineAlert / Banner

GTM notice box: `p-3` tinted wash, 1px border, 2px radius. Tones map to send-test / pre-flight / identity warnings.

`Banner` is the same component.

## Props

| Name        | Type                                           | Default  | Description                     |
| ----------- | ---------------------------------------------- | -------- | ------------------------------- |
| `tone`      | `"info" \| "warning" \| "danger" \| "success"` | `"info"` | Colour.                         |
| `title`     | `ReactNode`                                    | —        | Optional bold lead-in.          |
| `children`  | `ReactNode`                                    | —        | Body copy.                      |
| `role`      | `"alert" \| "status"`                          | auto     | Override the default live role. |
| `className` | `string`                                       | —        | Extra classes.                  |

Defaults: `danger` / `warning` → `alert`; `info` / `success` → `status`.

## Usage

```tsx
import { Banner, InlineAlert } from "@stack48/admin-ui/states";

<InlineAlert tone="warning" title="Audience changed.">
  Pre-flight is stale — re-run before sending.
</InlineAlert>;
```

## Do / don’t

| Do                                    | Don’t                            |
| ------------------------------------- | -------------------------------- |
| One tone per notice                   | Stack equal-weight rainbow cards |
| Keep copy to one or two lines         | Drop a shadow or 16px radius     |
| Use `StaleWarning` for a compact chip | Recolor `--destructive` to amber |

## Accessibility

- Live role is announced once when mounted. Do not flicker the node on every keystroke.
- Colour is not the only signal — the title / body carries the meaning.
- Contrast: red-800 / amber-800 / emerald-900 / blue-800 on the muted wash.
