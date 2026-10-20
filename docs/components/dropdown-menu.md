# DropdownMenu

Radix menu styled like GTM overlays (VocabMultiSelect list): white, 1px zinc, 2px radius, `shadow-lg`, `text-sm` rows with `hover:bg-zinc-50`.

## Props

Root: `open` / `onOpenChange` / `modal`.

### DropdownMenuItem

| Name       | Type          | Default | Description                                                       |
| ---------- | ------------- | ------- | ----------------------------------------------------------------- |
| `inset`    | `boolean`     | `false` | Extra left padding to align with checkbox items.                  |
| `disabled` | `boolean`     | `false` | Dimmed.                                                           |
| `onSelect` | `(e) => void` | —       | Fires on choose. Call `e.preventDefault()` to keep the menu open. |

Also: `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub*`.

## Usage

```tsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@stack48/admin-ui/primitives";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Do / don’t

**Do**

- Trigger with a secondary / ghost button.
- Use shortcuts in `DropdownMenuShortcut` (`font-mono`).

**Don’t**

- Use this for a single-select filter — use `Select`.
- Style items as large rounded cards.

## Accessibility

- Trigger is a button. Enter / Space / ArrowDown opens.
- Typeahead, arrow navigation, Escape closes.
- Checkbox / radio items expose the correct roles.
- Disabled items are skipped.
