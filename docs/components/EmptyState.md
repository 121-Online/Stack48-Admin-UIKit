# EmptyState

Centered empty copy from GTM list pages (`No campaigns found`, `No platform accounts found`). Optional description and CTA. Default surface is a 1px zinc card, `p-8`, 2px radius — not a marketing illustration.

## Props

| Name          | Type        | Default | Description                                        |
| ------------- | ----------- | ------- | -------------------------------------------------- |
| `title`       | `ReactNode` | —       | Primary sentence.                                  |
| `description` | `ReactNode` | —       | Caption under the title (`text-xs text-zinc-400`). |
| `action`      | `ReactNode` | —       | Optional CTA (clear filters, create).              |
| `bordered`    | `boolean`   | `true`  | 1px zinc card. Set false inside an existing frame. |
| `className`   | `string`    | —       | Extra classes.                                     |
| `…`           | `div` attrs | —       | Native attributes.                                 |

## Usage

```tsx
import { EmptyState } from "@stack48/admin-ui/states";
import { Button } from "@stack48/admin-ui/primitives";

<EmptyState
  title="No campaigns found"
  description="Try adjusting your filters"
  action={<Button variant="secondary">Clear filters</Button>}
/>;
```

## Do / don’t

| Do                           | Don’t                                        |
| ---------------------------- | -------------------------------------------- |
| Sentence-case, GTM copy      | “Oops! Nothing here yet ✨”                  |
| Keep the card 2px / 1px zinc | Add a large illustration or `rounded-2xl`    |
| Put the CTA in `action`      | Nest a second empty card inside a table cell |

## Accessibility

- Decorative only: no live region. The surrounding page heading stays the `h1`.
- If `action` is icon-only, give that control an `aria-label`.
- Prefer this outside `DataTable` — the table already has `emptyMessage`.
