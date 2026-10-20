# FilterSelect

Labelled `<select>` extracted from GTM `AudienceFilter` and the leads / platform-users toolbars. Options and value are caller-owned.

`FilterCheckbox` covers the “Sendable Queue Only” / “Show Deleted” pattern.

## Props (`FilterSelect`)

| Name             | Type                 | Default  | Description            |
| ---------------- | -------------------- | -------- | ---------------------- |
| `label`          | `string`             | —        | Uppercase micro label. |
| `options`        | `FilterOption<T>[]`  | —        | `{ value, label }`.    |
| `value`          | `T \| ""`            | —        | Controlled value.      |
| `onValueChange`  | `(value: T) => void` | —        | Change callback.       |
| `widthClassName` | `string`             | `"w-28"` | Wrapper width.         |
| `className`      | `string`             | —        | Classes on `<select>`. |

Native `<select>` attributes (`disabled`, `id`, …) are forwarded.

## Props (`FilterCheckbox`)

| Name              | Type                         | Default | Description      |
| ----------------- | ---------------------------- | ------- | ---------------- |
| `label`           | `string`                     | —       | Visible label.   |
| `checked`         | `boolean`                    | —       | Controlled.      |
| `onCheckedChange` | `(checked: boolean) => void` | —       | Change callback. |
| `disabled`        | `boolean`                    | —       | Dims + blocks.   |

## Usage

```tsx
<FilterSelect
  label="Audience"
  value={audience}
  onValueChange={setAudience}
  widthClassName="w-40"
  options={[
    { value: "agency", label: "Agency" },
    { value: "end_user", label: "End-user" },
    { value: "all", label: "All" },
  ]}
/>
```

## Do / don’t

| Do                                  | Don’t                                     |
| ----------------------------------- | ----------------------------------------- |
| Pass options from the app           | Hard-code GTM audience enums              |
| Use this in the toolbar filter slot | Build a custom dropdown with large radius |

## Accessibility

- Label is associated via `htmlFor`.
- Native `<select>` keyboard behaviour for `FilterSelect`.
- `FilterCheckbox` is the primitives `Checkbox` (role `checkbox`, Space to toggle).
- Disabled checkbox sets `cursor-not-allowed` and `disabled` on the control.
