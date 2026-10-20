# Popover

Anchored overlay. Same chrome as the inbox shortcut panel and VocabMultiSelect list.

## Props

Root: `open` / `defaultOpen` / `onOpenChange`.

### PopoverContent

| Name         | Type                           | Default   | Description                                 |
| ------------ | ------------------------------ | --------- | ------------------------------------------- |
| `align`      | `"start" \| "center" \| "end"` | `"start"` | GTM lists align to the trigger start.       |
| `sideOffset` | `number`                       | `4`       | Gap in px.                                  |
| `className`  | `string`                       | —         | Default width `w-72`. Inbox help is `w-64`. |

## Usage

```tsx
import { Button, Popover, PopoverContent, PopoverTrigger } from "@stack48/admin-ui/primitives";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Shortcuts</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">…</PopoverContent>
</Popover>;
```

## Do / don’t

**Do**

- Use for filters, shortcut help, and multi-select lists.
- Keep padding dense (`p-3`).

**Don’t**

- Use a Dialog when the content is a short anchored list.
- Add a coloured arrow / speech-bubble tail.

## Accessibility

- Focus moves into the content when opened.
- Escape and outside click close.
- The trigger must be a real button (`asChild` + `Button`).
- If the popover is labelled, set `aria-label` on `PopoverContent`.
