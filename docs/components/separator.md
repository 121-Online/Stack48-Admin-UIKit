# Separator

1px rule. Default colour is `--border` (zinc-200). Use `bg-zinc-100` for the lighter GTM section rule.

## Props

| Name          | Type                         | Default        | Description                                      |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------ |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Axis. Vertical needs an explicit height (`h-6`). |
| `decorative`  | `boolean`                    | `true`         | When true, no `separator` role (purely visual).  |
| `className`   | `string`                     | —              | Colour / spacing.                                |

## Usage

```tsx
import { Separator } from "@stack48/admin-ui/primitives";

<Separator />
<Separator orientation="vertical" className="h-6" />
```

## Do / don’t

**Do**

- Use `SectionDivider` between page sections (`my-6 bg-zinc-100`).
- Use this primitive for in-panel rules and menu dividers.

**Don’t**

- Draw a 4px gradient “accent bar”.
- Use a shadow to separate regions.

## Accessibility

- Decorative by default (hidden from AT).
- Set `decorative={false}` and give an accessible name if the rule is the only boundary between labelled regions.
