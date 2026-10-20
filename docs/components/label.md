# Label

Accessible field label. Defaults to GTM settings style: 11px uppercase, tracking-wider, zinc-500.

## Props

| Name        | Type                              | Default     | Description                                                                             |
| ----------- | --------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `variant`   | `"default" \| "form" \| "inline"` | `"default"` | `default` = uppercase micro; `form` = `text-xs text-zinc-700`; `inline` = checkbox row. |
| `htmlFor`   | `string`                          | —           | Id of the labelled control.                                                             |
| `className` | `string`                          | —           | Add `mb-1` when stacked above an input.                                                 |
| `…`         | Radix Label props                 | —           | Includes `onMouseDown` (prevents text-selection stealing focus).                        |

## Usage

```tsx
import { Input, Label } from "@stack48/admin-ui/primitives";

<Label htmlFor="daily-cap" className="mb-1">Daily cap</Label>
<Input id="daily-cap" type="number" />
```

## Do / don’t

**Do**

- Use `default` on settings grids, `form` on campaign config, `inline` beside checkboxes.
- Keep sentence case inside the string; `default` already uppercases via CSS.

**Don’t**

- Title-case every label in the markup (`HOURLY CAP`). GTM writes “Hourly Cap” / “Min Gap (sec)” and lets CSS uppercase.
- Skip `htmlFor` and rely on wrapping alone for Radix checkbox / switch.

## Accessibility

- Renders Radix `Label` (`<label>`). Clicking focuses the control.
- `peer-disabled` styles fade the label when the control is disabled.
- Colour is zinc-500 on zinc-50 — verify if you place it on a coloured surface.
