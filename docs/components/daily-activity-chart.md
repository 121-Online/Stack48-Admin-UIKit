# DailyActivityChart

Recharts area trend for sent / delivered / opened / clicked (GTM 30-day activity). `recharts` is an optional peer.

## Props

| Name          | Type                                                  | Default                           | Description           |
| ------------- | ----------------------------------------------------- | --------------------------------- | --------------------- |
| `data`        | `{ date: string; [key: string]: string \| number }[]` | —                                 | One row per day.      |
| `series`      | `{ dataKey; name; color }[]`                          | GTM sent/delivered/opened/clicked | Areas to plot.        |
| `xKey`        | `string`                                              | `"date"`                          | Category key.         |
| `height`      | `number`                                              | `240`                             | Plot height.          |
| `label`       | `string`                                              | `"Daily activity"`                | Accessible name.      |
| `emptyLabel`  | `string`                                              | `"No data"`                       | Empty copy.           |
| `formatValue` | `(n: number) => string`                               | `toLocaleString`                  | Axis, tooltip, table. |
| `formatTick`  | `(iso: string) => string`                             | `20/10`                           | X tick.               |
| `formatLabel` | `(iso: string) => string`                             | `20/10/2026`                      | Tooltip / table date. |

## Usage

```tsx
import { DailyActivityChart } from "@stack48/admin-ui/charts";

<DailyActivityChart
  data={daily}
  height={260}
  label="30-day activity"
  formatTick={(iso) => iso.slice(5)}
/>;
```

## Do / don’t

| Do                                                 | Don’t                                        |
| -------------------------------------------------- | -------------------------------------------- |
| Install `recharts@^2.12` in the app.               | Swap in a different chart lib for this plot. |
| Pass series colours from `chartColors` or the app. | Fetch the series inside the component.       |
| Keep height dense (240–260).                       | Inflate to a marketing hero chart.           |

## Accessibility

Visual plot is `aria-hidden`. A hidden table has one column per series plus the formatted date. Empty state is visible text (`emptyLabel`). Keyboard: Recharts tooltip is pointer-driven; the table is the AT equivalent.
