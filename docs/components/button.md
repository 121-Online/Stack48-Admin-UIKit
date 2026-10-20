# Button

GTM `.btn-primary` / `.btn-secondary` / `.btn-danger` as a shadcn `Button`. Default fill is zinc-900 (`bg-primary`), not brand blue.

## Props

| Name        | Type                                                             | Default     | Description                                                                             |
| ----------- | ---------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `variant`   | `"default" \| "secondary" \| "destructive" \| "ghost" \| "link"` | `"default"` | Visual style. `default` = `.btn-primary`.                                               |
| `size`      | `"default" \| "sm" \| "lg" \| "icon"`                            | `"default"` | `default` is `px-3 py-1.5 text-xs`. `sm` is inbox `text-[11px]`. `lg` is the login CTA. |
| `asChild`   | `boolean`                                                        | `false`     | Merge styles onto the child via Radix Slot (e.g. a `Link`).                             |
| `disabled`  | `boolean`                                                        | `false`     | Native disabled. Opacity 50, `not-allowed` cursor.                                      |
| `type`      | `"button" \| "submit" \| "reset"`                                | `"button"`  | Defaults to `button` so forms are not submitted by accident.                            |
| `className` | `string`                                                         | —           | Merged with `cn()`.                                                                     |
| `…`         | `ButtonHTMLAttributes`                                           | —           | Native button attributes and events.                                                    |

## Usage

```tsx
import { Button } from "@stack48/admin-ui/primitives";

<Button>Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete</Button>
```

## Do / don’t

**Do**

- Use one `default` (zinc-900) action per toolbar or dialog footer.
- Keep the default size. Inbox chips can use `size="sm"`.
- Pair destructive with a secondary Cancel.

**Don’t**

- Recolor `--primary` or the button to brand blue. Links use `variant="link"` (`text-brand`).
- Inflate padding to “breathe” or use `rounded-2xl` / drop shadows.
- Put every action in a filled zinc-900 button.

## Accessibility

- Renders a native `<button>` unless `asChild`.
- Disabled uses the native `disabled` attribute (removed from tab order).
- `focus-visible` ring is `--ring` (blue-500).
- Icon-only buttons must set `aria-label`.
- When `asChild` wraps a link, the child must be a real `<a>` or router `Link`.
