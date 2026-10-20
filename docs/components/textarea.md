# Textarea

Same chrome as `Input` (`input-field`) on a multiline control. Used for talking points, mailing HTML, and send-test recipients.

## Props

| Name          | Type                     | Default | Description                                                           |
| ------------- | ------------------------ | ------- | --------------------------------------------------------------------- |
| `rows`        | `number`                 | browser | Hint for height. Prefer `min-h-*` via `className` for composer panes. |
| `disabled`    | `boolean`                | `false` | Opacity 50.                                                           |
| `placeholder` | `string`                 | —       | zinc-400.                                                             |
| `className`   | `string`                 | —       | GTM composers add `font-mono text-xs` / `min-h-[280px]`.              |
| `…`           | `TextareaHTMLAttributes` | —       | Native textarea attributes and events.                                |

## Usage

```tsx
import { Label, Textarea } from "@stack48/admin-ui/primitives";

<Label htmlFor="talking-points">Talking points</Label>
<Textarea id="talking-points" rows={3} className="font-mono text-xs" />
```

## Do / don’t

**Do**

- Use `font-mono` for templates and recipient lists.
- Size with `min-h-*` rather than giant default padding.

**Don’t**

- Use a rich-text editor chrome or rounded-xl composer card.
- Forget a visible label — placeholders are not labels.

## Accessibility

- Native `<textarea>`. Requires a `<Label>` or `aria-label`.
- Same 1px blue-500 focus ring as `Input`.
- Keep `maxLength` in the app if the product rule needs it — the kit does not enforce it.
