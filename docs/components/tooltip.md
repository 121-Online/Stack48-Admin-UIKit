# Tooltip

Dense zinc-900 chip. GTM mostly uses native `title=`; this is the keyboard-friendly Radix equivalent (same chrome as the inbox toast).

Wrap any tree in `TooltipProvider`.

## Props

### TooltipContent

| Name         | Type                                     | Default  | Description |
| ------------ | ---------------------------------------- | -------- | ----------- |
| `side`       | `"top" \| "right" \| "bottom" \| "left"` | `"top"`  | Placement.  |
| `sideOffset` | `number`                                 | `4`      | Gap in px.  |
| `children`   | `ReactNode`                              | required | Hint copy.  |

`TooltipProvider` accepts `delayDuration` (ms).

## Usage

```tsx
import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@stack48/admin-ui/primitives";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge variant="warning" className="cursor-help">
        Soft cap
      </Badge>
    </TooltipTrigger>
    <TooltipContent>Soft cap reached</TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

## Do / don’t

**Do**

- Use for cap / health reasons that GTM stuffed into `title=`.
- Keep copy to one line.

**Don’t**

- Put essential errors only in a tooltip — use visible helper text.
- Use a light “paper” tooltip with a drop shadow balloon.

## Accessibility

- Appears on hover and focus. Esc dismisses.
- Content is not hoverable (Radix default). Do not put links inside.
- Trigger must be focusable (`Button`, link, or `tabIndex={0}`).
- `TooltipProvider` is required or nothing shows.
