# StackedBars

100% stacked bar + legend. Replaces GTM `BufferHealthBar` and `ScoreBandBar` without baking product keys into the kit.

## Props

| Name                 | Type                                     | Default          | Description                                            |
| -------------------- | ---------------------------------------- | ---------------- | ------------------------------------------------------ |
| `segments`           | `{ key; label; value; color; share? }[]` | —                | Bar slices. `share` is 0–100; omitted → `value / sum`. |
| `caption`            | `string`                                 | —                | Line under the legend.                                 |
| `label`              | `string`                                 | `"Stacked bar"`  | Accessible name.                                       |
| `emptyLabel`         | `string`                                 | `"No data"`      | When the sum is 0.                                     |
| `formatValue`        | `(n: number) => string`                  | `toLocaleString` | Counts.                                                |
| `formatPercent`      | `(n: number, digits?: number) => string` | `12.5%`          | Share labels.                                          |
| `minInnerLabelShare` | `number`                                 | `10`             | Minimum % to print the count inside the slice.         |

## Usage

```tsx
import { StackedBars, chartColors } from "@stack48/admin-ui/charts";

<StackedBars
  label="Buffer health"
  caption={`Total with email: ${format(buffer.totalWithEmail)}`}
  segments={[
    { key: "sendable", label: "Sendable", value: buffer.sendable, color: chartColors.sendable },
    { key: "excluded", label: "Excluded", value: buffer.excluded, color: chartColors.excluded },
    { key: "bounced", label: "Bounced", value: buffer.bounced, color: chartColors.bounced },
  ]}
/>;
```

## Do / don’t

| Do                                                  | Don’t                                   |
| --------------------------------------------------- | --------------------------------------- |
| Pass colours per segment.                           | Hard-code sendable/excluded in the kit. |
| Use `share` when the API already computed percents. | Add drop shadows on slices.             |

## Accessibility

Legend text is visible. Hidden table columns: Segment, Value, Share. Native `title` on slices for pointer users. Empty state is visible text.
