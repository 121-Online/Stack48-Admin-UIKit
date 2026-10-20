# Select

Radix Select styled as GTM `.input-field` (the dashboard uses a native `<select>`). Overlay is white, 1px zinc, 2px radius, `shadow-lg`.

## Props

Root (`Select`) takes Radix `value` / `defaultValue` / `onValueChange` / `disabled`.

### SelectTrigger

| Name        | Type          | Default | Description                   |
| ----------- | ------------- | ------- | ----------------------------- |
| `className` | `string`      | —       | `w-auto` for toolbar filters. |
| `…`         | Radix Trigger | —       | Includes `aria-label`.        |

### SelectItem

| Name       | Type      | Default  | Description                   |
| ---------- | --------- | -------- | ----------------------------- |
| `value`    | `string`  | required | Must be unique and non-empty. |
| `disabled` | `boolean` | `false`  | Dimmed row.                   |

## Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stack48/admin-ui/primitives";

<Select value={status} onValueChange={setStatus}>
  <SelectTrigger aria-label="Status">
    <SelectValue placeholder="All" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
    <SelectItem value="new">New</SelectItem>
  </SelectContent>
</Select>;
```

## Do / don’t

**Do**

- Use for single-select filters (audience, status, region).
- Keep trigger height identical to `Input`.

**Don’t**

- Build a custom 40px rounded-lg select.
- Put multi-select chips here — that is a Popover + Checkbox pattern (VocabMultiSelect).

## Accessibility

- Trigger is `combobox`. Listbox opens on Enter / Space / ArrowDown.
- Typeahead is provided by Radix.
- Always set `aria-label` on the trigger when there is no visible `Label`.
- Disabled items are skipped.
