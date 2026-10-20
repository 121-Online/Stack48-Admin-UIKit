# MultiSelectFilter

Searchable multi-select extracted from GTM `VocabMultiSelect`. Selected values render as chips; typeahead lists remaining options. No domain vocab — pass `options` and `value`.

`ChipList` is the read-only cell companion (`VocabChipList`).

## Props (`MultiSelectFilter`)

| Name            | Type                        | Default     | Description            |
| --------------- | --------------------------- | ----------- | ---------------------- |
| `options`       | `FilterOption[]`            | —           | All choices.           |
| `value`         | `string[]`                  | —           | Selected values.       |
| `onValueChange` | `(value: string[]) => void` | —           | Change callback.       |
| `placeholder`   | `string`                    | `"Select…"` | Shown when empty.      |
| `disabled`      | `boolean`                   | `false`     | Locks the field.       |
| `label`         | `string`                    | —           | Uppercase micro label. |
| `emptyMessage`  | `string`                    | auto        | Empty list copy.       |
| `className`     | `string`                    | —           | Wrapper classes.       |

## Props (`ChipList`)

| Name         | Type                            | Default | Description                    |
| ------------ | ------------------------------- | ------- | ------------------------------ |
| `values`     | `string[] \| null \| undefined` | —       | Chip values.                   |
| `labels`     | `Record<string, string>`        | `{}`    | Display map.                   |
| `maxVisible` | `number`                        | `3`     | Extra values collapse to `+N`. |

## Usage

```tsx
<MultiSelectFilter
  label="Industry"
  options={industryOptions}
  value={industries}
  onValueChange={setIndustries}
  placeholder="Filter by industry..."
/>
```

```tsx
<ChipList values={lead.platforms} labels={PLATFORM_LABELS} maxVisible={3} />
```

## Do / don’t

| Do                                      | Don’t                               |
| --------------------------------------- | ----------------------------------- |
| Keep selected values in page/URL state  | Persist inside the kit              |
| Use chips + typeahead for multi vocab   | A `<select multiple>`               |
| Pair with `FilterSelect` in the toolbar | Restyle chips as pills with shadows |

## Accessibility

- Combobox: `role="combobox"` `aria-expanded` `aria-controls` on the input; list is `role="listbox"`.
- Chip remove buttons: `aria-label="Remove {label}"`.
- Escape closes the list; Enter adds the first match; Backspace on an empty query removes the last chip.
- Pointer-down outside closes the list.
