# KpiTile

Denser unboxed tile used on the GTM overview and delivery pages. Optional sparkline sits beside the value.

## Props

| Name             | Type                                | Default          | Description                                 |
| ---------------- | ----------------------------------- | ---------------- | ------------------------------------------- |
| `label`          | `string`                            | —                | Uppercase micro label.                      |
| `value`          | `string \| number`                  | —                | Tabular value.                              |
| `delta`          | `{ value: number; label?: string }` | —                | `↑ 12% vs prior 7d`. Hides `hint` when set. |
| `hint`           | `string`                            | —                | Rate / footnote under the value.            |
| `sparklineData`  | `number[]`                          | —                | Shown when length > 2.                      |
| `sparklineColor` | `string`                            | brand blue       | Line + area fill.                           |
| `status`         | `MetricStatus`                      | `"neutral"`      | Value colour.                               |
| `formatValue`    | `(n: number) => string`             | `toLocaleString` | Number formatter.                           |
| `className`      | `string`                            | —                | Tile classes.                               |

`KpiTileRow` is a `flex flex-wrap gap-6` wrapper.

## Usage

```tsx
import { KpiTile, KpiTileRow } from "@stack48/admin-ui/charts";

<KpiTileRow>
  <KpiTile
    label="Sent Today"
    value={metrics.sent}
    sparklineData={sent7d}
    sparklineColor="#18181b"
  />
  <KpiTile label="Delivered Today" value={metrics.delivered} hint={formatPercent(rate)} />
  <KpiTile label="7d Sent" value={metrics.sent7d} delta={{ value: 12, label: "vs prior 7d" }} />
</KpiTileRow>;
```

## Do / don’t

| Do                                        | Don’t                                                        |
| ----------------------------------------- | ------------------------------------------------------------ |
| Put the **row** on one `bg-card` panel.   | Box each tile (GTM `.stat-card` is the panel, not the tile). |
| Use `status` for bounce / complaint only. | Recolor healthy volume tiles brand-blue.                     |

## Accessibility

The tile has a concatenated `aria-label` (`label`, value, delta/hint). The sparkline is its own labelled figure + hidden table.
