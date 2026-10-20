# ReputationCharts

Line trend with limit / warning reference lines. `BounceRateChart` and `ComplaintRateChart` are coloured wrappers. Requires the `recharts` optional peer.

## Props (`RateTrendChart`)

| Name                         | Type                                          | Default                | Description                                                   |
| ---------------------------- | --------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| `data`                       | `{ date; rate; numerator?; denominator? }[]`  | —                      | `rate` in **percent units** (4 = 4%) unless `rateIsFraction`. |
| `height`                     | `number`                                      | `160`                  | Plot height.                                                  |
| `color`                      | `string`                                      | bounce red             | Line colour.                                                  |
| `seriesName`                 | `string`                                      | `"Rate"`               | Legend / tooltip / table column.                              |
| `thresholds`                 | `{ value; label; color; strokeDasharray? }[]` | `[]`                   | Reference lines in percent units.                             |
| `rateIsFraction`             | `boolean`                                     | `false`                | Multiply `rate` by 100 (GTM stored 0–1).                      |
| `yDigits`                    | `number`                                      | `1`                    | Y-axis percent digits.                                        |
| `label`                      | `string`                                      | `seriesName`           | Accessible name.                                              |
| `emptyLabel`                 | `string`                                      | `"No data"`            | Empty copy.                                                   |
| `formatValue`                | `(n: number) => string`                       | `toLocaleString`       | Numerator / denominator.                                      |
| `formatRate`                 | `(n: number, digits?: number) => string`      | `12.5%`                | Axis, tooltip, table.                                         |
| `formatTick` / `formatLabel` | `(iso: string) => string`                     | `20/10` / `20/10/2026` | Dates.                                                        |

### Wrappers

| Component            | Defaults                                |
| -------------------- | --------------------------------------- |
| `BounceRateChart`    | red line, thresholds 4% limit / 2% warn |
| `ComplaintRateChart` | amber line, thresholds 0.08% / 0.04%    |

Thresholds are props — the kit does not import Resend product constants.

## Usage

```tsx
import { BounceRateChart } from "@stack48/admin-ui/charts";

<BounceRateChart
  data={trend.map((d) => ({
    date: d.date,
    rate: d.bounceRate * 100,
    numerator: d.bounced,
    denominator: d.sent,
  }))}
  height={180}
/>;
```

## Do / don’t

| Do                                                          | Don’t                                               |
| ----------------------------------------------------------- | --------------------------------------------------- |
| Convert 0–1 fractions in the app (or set `rateIsFraction`). | Bake Resend limits into callers that are not email. |
| Pass custom `thresholds` when the product rule differs.     | Fetch windows inside the chart.                     |

## Accessibility

Plot is `aria-hidden`. Hidden table: Date, series name, Count, Sent. Empty state is visible text. Reference-line labels are visual-only; the table holds the series.
