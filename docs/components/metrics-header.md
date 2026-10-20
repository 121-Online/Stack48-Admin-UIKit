# MetricsHeader

Dense inline metrics from GTM `PlatformAccountMetricsHeader`: stat row, breakdown lists, sparkline, stale warning. **No boxed cards.**

## Props

| Name              | Type                                   | Default          | Description                                     |
| ----------------- | -------------------------------------- | ---------------- | ----------------------------------------------- |
| `stats`           | `{ label; value; emphasize? }[]`       | `[]`             | First line (`**1,280** accounts · 14 new 24h`). |
| `breakdowns`      | `{ label; items: { key; count }[] }[]` | `[]`             | `Plan Pro 40 · Starter 12`.                     |
| `facts`           | `{ label; value }[]`                   | `[]`             | Extra inline pairs (`Claimed 30`).              |
| `syncLabel`       | `string`                               | —                | Prefix for the sync line.                       |
| `syncValue`       | `string \| null`                       | —                | Formatted timestamp (caller formats).           |
| `sparklineData`   | `number[]`                             | —                | Tiny 14-day (or any) series.                    |
| `sparklineLabel`  | `string`                               | `"Trend"`        | Sparkline accessible name.                      |
| `warning`         | `string \| null`                       | —                | Stale copy in warning colour.                   |
| `footnote`        | `string`                               | —                | Micro caption.                                  |
| `emptyLabel`      | `string`                               | `"No metrics"`   | Shown when every list is empty.                 |
| `formatValue`     | `(n: number) => string`                | `toLocaleString` | Counts.                                         |
| `formatBreakdown` | `(items, formatValue) => string`       | `key count · …`  | Override joining.                               |

## Usage

```tsx
import { MetricsHeader } from "@stack48/admin-ui/charts";

<MetricsHeader
  stats={[
    { label: "accounts", value: snapshot.total, emphasize: true },
    { label: "new 24h", value: snapshot.new24h },
  ]}
  breakdowns={[{ label: "Plan", items: snapshot.byPlanTier }]}
  syncLabel="Last sync"
  syncValue={snapshot.lastSyncedAtLondon}
  sparklineData={snapshot.syncedPerDay.map((d) => d.count)}
  warning={snapshot.syncStaleReason === "older_than_24h" ? "Last sync older than 24h" : null}
/>;
```

## Do / don’t

| Do                                         | Don’t                                  |
| ------------------------------------------ | -------------------------------------- |
| Keep it as body text under the page title. | Wrap each figure in a `stat-card`.     |
| Let the **app** decide stale copy.         | Encode “24h” product rules in the kit. |
| Sentence-case labels like GTM.             | Title-Case Every Label.                |

## Accessibility

Copy is plain text. Warning uses `role="status"`. Sparkline ships a hidden data table.
