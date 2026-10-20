# Input

GTM `.input-field` as a shadcn `Input`. Full width, 2px radius, zinc-300 border, blue-500 focus.

## Props

| Name          | Type                  | Default  | Description                               |
| ------------- | --------------------- | -------- | ----------------------------------------- |
| `type`        | `HTML input type`     | `"text"` | `text`, `number`, `email`, `search`, etc. |
| `disabled`    | `boolean`             | `false`  | Opacity 50, not-allowed cursor.           |
| `placeholder` | `string`              | —        | Rendered in zinc-400.                     |
| `className`   | `string`              | —        | e.g. `w-auto`, `text-xs`, `font-mono`.    |
| `…`           | `InputHTMLAttributes` | —        | Native input attributes and events.       |

## Usage

```tsx
import { Input, Label } from "@stack48/admin-ui/primitives";

<Label htmlFor="hourly-cap">Hourly cap</Label>
<Input id="hourly-cap" type="number" min={0} />
```

## Do / don’t

**Do**

- Always pair with a {@link Label} (or `aria-label`) — GTM settings use uppercase micro labels.
- Keep `w-full` in forms; use `w-auto` / `w-20` for toolbar filters.
- Use `type="number"` for caps and gaps.

**Don’t**

- Add inner shadows, large radius, or a floating label.
- Use a 16px marketing input. GTM is `text-sm` / `py-1.5`.

## Accessibility

- Native `<input>`. Label with `htmlFor` / `id` or `aria-label`.
- Focus ring is `--ring` (blue-500) at 1px, matching GTM `.input-field:focus`.
- Errors: set `aria-invalid` and describe with `aria-describedby`. Contrast on the red border still needs the helper text.
