# StatusIndicator

8px status dot from GTM `src/components/ui/StatusIndicator`. Optional label and ping on `ok`.

## Props

| Name        | Type                                                  | Default  | Description                                 |
| ----------- | ----------------------------------------------------- | -------- | ------------------------------------------- |
| `status`    | `"ok" \| "warning" \| "danger" \| "neutral" \| "off"` | required | Dot (and label) colour.                     |
| `label`     | `string`                                              | —        | Text after the dot (`text-xs font-medium`). |
| `pulse`     | `boolean`                                             | `false`  | Ping ring. Only drawn when `status="ok"`.   |
| `className` | `string`                                              | —        | Layout hooks.                               |

## Usage

```tsx
import { StatusIndicator } from "@stack48/admin-ui/primitives";

<StatusIndicator status="ok" label="Sending" pulse />
<StatusIndicator status="off" label="Paused" />
```

## Do / don’t

**Do**

- Use for live send / breaker / queue health.
- Pass the label — colour alone is not enough.

**Don’t**

- Pulse on warning/danger (the GTM component only pings `ok`).
- Replace this with a large traffic-light illustration.

## Accessibility

- Renders a `<div>`. Colour is supplemented by `label`.
- If you omit `label`, set `aria-label` on the root (spread onto the `div`).
- `animate-ping` is decorative; do not rely on motion to convey state.
