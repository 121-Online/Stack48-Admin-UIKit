# Badge

GTM `src/components/ui/Badge` plus `.badge-new` / `.badge-signed-up` solids. 11px, `rounded` (4px), optional 6px status dot.

## Props

| Name        | Type                                                                                                  | Default     | Description                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `variant`   | `"default" \| "success" \| "warning" \| "danger" \| "info" \| "muted" \| "inverse" \| "successSolid"` | `"default"` | Colour. `inverse` = `.badge-new`. `successSolid` = `.badge-signed-up`. |
| `dot`       | `boolean`                                                                                             | `false`     | 6px status dot used on health chips.                                   |
| `title`     | `string`                                                                                              | —           | Native tooltip (GTM health reasons).                                   |
| `children`  | `ReactNode`                                                                                           | required    | Chip label.                                                            |
| `className` | `string`                                                                                              | —           | e.g. `cursor-help`.                                                    |

## Usage

```tsx
import { Badge } from "@stack48/admin-ui/primitives";

<Badge variant="success" dot>Healthy</Badge>
<Badge variant="inverse">New</Badge>
<Badge variant="danger">Bounced</Badge>
```

## Do / don’t

**Do**

- Use sentence-case labels (`Email 1 sent`, not `EMAIL 1 SENT`).
- Pass long explanations through `title` / a Tooltip, not by enlarging the chip.

**Don’t**

- Use pill `rounded-full` on these chips (the 6px _dot_ is the only circle).
- Encode lead-status business rules here — map status → variant in the app.

## Accessibility

- Renders a `<span>`. Not a button. Do not put click handlers on it; wrap a control if it is interactive.
- Colour is not the only signal when `dot` is set.
- `title` is a weak tooltip; prefer `Tooltip` for keyboard users.
