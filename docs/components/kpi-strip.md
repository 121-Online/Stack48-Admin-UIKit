# KpiStrip

Unboxed horizontal metrics row (`KpiItem`, optional `KpiDivider`). GTM uses this density for page-level counts.

## Props

### `KpiStrip`

| Name        | Type             | Default | Description                        |
| ----------- | ---------------- | ------- | ---------------------------------- |
| `items`     | `KpiItemProps[]` | —       | Data-driven items, rendered first. |
| `children`  | `ReactNode`      | —       | Composed `KpiItem` / `KpiDivider`. |
| `className` | `string`         | —       | Flex container classes.            |

### `KpiItem`

| Name          | Type                                                      | Default          | Description                                      |
| ------------- | --------------------------------------------------------- | ---------------- | ------------------------------------------------ |
| `label`       | `string`                                                  | —                | Uppercase micro label.                           |
| `value`       | `string \| number`                                        | —                | Tabular value. Numbers go through `formatValue`. |
| `delta`       | `{ value: number; label?: string }`                       | —                | Signed percent + optional period label.          |
| `hint`        | `string`                                                  | —                | Caption under the value.                         |
| `status`      | `"neutral" \| "success" \| "ok" \| "warning" \| "danger"` | `"neutral"`      | Value colour. `ok` = `success`.                  |
| `formatValue` | `(n: number) => string`                                   | `toLocaleString` | Number formatter.                                |

### `KpiDivider`

1px vertical rule (`role="separator"`).

## Usage

```tsx
import { KpiDivider, KpiItem, KpiStrip } from "@stack48/admin-ui/charts";

<KpiStrip>
  <KpiItem label="Sent" value={1240} />
  <KpiItem label="Delivered" value={1198} hint="96.6%" />
  <KpiDivider />
  <KpiItem label="Bounced" value={3} status="warning" />
</KpiStrip>;
```

## Do / don’t

| Do                                          | Don’t                                        |
| ------------------------------------------- | -------------------------------------------- |
| One shared panel around the strip, or none. | A card per KPI (`rounded-2xl`, `shadow-xl`). |
| `tabular-nums` values (built in).           | Title-case the micro labels.                 |
| Pass formatters from the app locale.        | Fetch counts inside the strip.               |

## Accessibility

Text content is the name/value. Delta is visible text (`+12% vs prior`). Divider is a vertical separator. Contrast uses `--foreground` / `--success` / `--warning` / `--destructive`.
