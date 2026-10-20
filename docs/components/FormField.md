# FormField

Label + control + hint / error. GTM campaign-config density: `text-xs` label, `text-xs` red error, `text-[10px]` muted hint.

A single element child is wired with `id`, `aria-describedby`, and `aria-invalid`. Composite controls (input + `@domain`) should set `htmlFor` and the child `id` themselves.

## Props

| Name           | Type                  | Default  | Description                                    |
| -------------- | --------------------- | -------- | ---------------------------------------------- |
| `label`        | `ReactNode`           | —        | Visible label.                                 |
| `labelVariant` | `"default" \| "form"` | `"form"` | Uppercase micro vs campaign `text-xs`.         |
| `htmlFor`      | `string`              | `useId`  | Control id when the child has none.            |
| `hint`         | `ReactNode`           | —        | Helper under the control.                      |
| `error`        | `ReactNode`           | —        | Validation message (`role="alert"`).           |
| `optional`     | `boolean`             | `false`  | Appends `(optional)`.                          |
| `required`     | `boolean`             | `false`  | Visual `*`. Set `required` on the control too. |
| `children`     | `ReactNode`           | —        | The control.                                   |
| `className`    | `string`              | —        | Extra classes.                                 |

## Usage

```tsx
import { FormField } from "@stack48/admin-ui/states";
import { Input } from "@stack48/admin-ui/primitives";

<FormField label="Hourly cap" hint="Max sends per hour" error={capError}>
  <Input type="number" min={0} />
</FormField>;
```

## Do / don’t

| Do                                         | Don’t                             |
| ------------------------------------------ | --------------------------------- |
| One control per field                      | Float the label over the input    |
| Pass the error string from the app         | Validate domain policy in the kit |
| Use `labelVariant="default"` for send-test | Title-Case Every Label            |

## Accessibility

- Label uses Radix `Label` + `htmlFor`.
- Hint and error ids are concatenated onto `aria-describedby`.
- `error` sets `aria-invalid="true"` and `role="alert"` on the message (announced when it appears).
- Do not move focus on every invalid keystroke; focus the first invalid field on submit in the app.
