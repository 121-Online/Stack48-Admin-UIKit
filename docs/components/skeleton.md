# Skeleton

Dense loading placeholder. GTM pages more often show “Loading…” copy; this is the token-styled bone (`bg-zinc-200`, 2px radius, pulse).

## Props

| Name        | Type                             | Default | Description                                     |
| ----------- | -------------------------------- | ------- | ----------------------------------------------- |
| `className` | `string`                         | —       | **Required in practice** — set `h-*` and `w-*`. |
| `…`         | `HTMLAttributes<HTMLDivElement>` | —       | Spread onto the `div`.                          |

## Usage

```tsx
import { Skeleton } from "@stack48/admin-ui/primitives";

<Skeleton className="h-4 w-40" />
<Skeleton className="h-8 w-full" />
```

## Do / don’t

**Do**

- Mirror the dense row / tile you are replacing.
- Prefer a single line of copy (“Loading leads…”) when the wait is short.

**Don’t**

- Use shimmer gradients or rounded-2xl cards.
- Animate colour — pulse opacity on zinc-200 only.

## Accessibility

- Decorative `div`. Wrap a list in `aria-busy="true"` on the parent and keep a visually hidden “Loading” status if the wait is long.
- Do not put the skeleton on a focusable control.
