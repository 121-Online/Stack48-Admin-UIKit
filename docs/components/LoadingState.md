# LoadingState

Dense loading placeholder. `rows` is the GTM / DataTable pulse (`h-3` zinc-100 bars in a 1px card). `spinner` is the 14px stroke used on Delivery refresh.

## Props

| Name        | Type                  | Default     | Description                         |
| ----------- | --------------------- | ----------- | ----------------------------------- |
| `variant`   | `"rows" \| "spinner"` | `"rows"`    | Skeleton table vs inline spinner.   |
| `rows`      | `number`              | `6`         | Skeleton row count.                 |
| `columns`   | `number`              | `3`         | Pulse bars per row.                 |
| `label`     | `string`              | `"Loading"` | Accessible name (and spinner copy). |
| `className` | `string`              | —           | Extra classes.                      |
| `…`         | `div` attrs           | —           | Native attributes.                  |

`Spinner` is also exported for composing next to a button label.

## Usage

```tsx
import { LoadingState } from "@stack48/admin-ui/states";

<LoadingState variant="rows" rows={8} label="Loading leads" />
<LoadingState variant="spinner" label="Sending" />
```

## Do / don’t

| Do                                         | Don’t                                       |
| ------------------------------------------ | ------------------------------------------- |
| Prefer copy + pulse bars over bones        | Use a full-page branded splash              |
| Keep spinner 14px next to `text-xs` chrome | Inflate to a 48px circular loader           |
| Use `DataTable`’s own `loading` for tables | Duplicate skeleton headers that don’t match |

## Accessibility

- `role="status"`, `aria-live="polite"`, `aria-busy="true"`.
- `label` is the accessible name. The SVG spinner is `aria-hidden`.
- Do not move focus into a skeleton. Keep focus on the control that triggered the load (refresh, submit).
