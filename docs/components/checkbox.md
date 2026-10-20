# Checkbox

16px GTM checkbox (`w-4 h-4 rounded-sm`). Checked fill is `--primary` (zinc-900).

## Props

| Name              | Type                                            | Default      | Description                           |
| ----------------- | ----------------------------------------------- | ------------ | ------------------------------------- |
| `checked`         | `boolean \| "indeterminate"`                    | uncontrolled | Controlled state.                     |
| `defaultChecked`  | `boolean`                                       | `false`      | Uncontrolled initial state.           |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | —            | Change handler.                       |
| `disabled`        | `boolean`                                       | `false`      | Opacity 50.                           |
| `…`               | Radix Checkbox props                            | —            | Includes `name`, `value`, `required`. |

## Usage

```tsx
import { Checkbox, Label } from "@stack48/admin-ui/primitives";

<div className="flex items-center gap-2">
  <Checkbox id="sendable" />
  <Label htmlFor="sendable" variant="inline">
    Sendable queue only
  </Label>
</div>;
```

## Do / don’t

**Do**

- Use for binary filters and “sending enabled”.
- Keep 16px. Do not scale up to a marketing checkbox.

**Don’t**

- Use brand-blue fill. Primary is zinc-900.
- Build a custom 20px rounded-md box.

## Accessibility

- Role `checkbox`. Space toggles. Indeterminate is announced.
- Must have an accessible name (`aria-label` or associated `Label`).
- Disabled is `aria-disabled` / removed from interaction.
