# TaperedFunnel

Trapezoid funnel (GTM campaign + platform conversion). Conversion labels are “x% of previous stage”.

## Props

| Name            | Type                       | Default          | Description                              |
| --------------- | -------------------------- | ---------------- | ---------------------------------------- |
| `stages`        | `{ name; value; color }[]` | —                | Colour is required (no default palette). |
| `label`         | `string`                   | `"Funnel"`       | Accessible name.                         |
| `emptyLabel`    | `string`                   | `"No data"`      | Empty / all-zero.                        |
| `formatValue`   | `(n: number) => string`    | `toLocaleString` | Counts.                                  |
| `formatPercent` | `(n: number) => string`    | `12.5%`          | Of previous.                             |

## Usage

```tsx
import { TaperedFunnel } from "@stack48/admin-ui/charts";

<TaperedFunnel
  stages={[
    { name: "Enrolled", value: total, color: "#71717a" },
    { name: "Sent", value: sent, color: "#18181b" },
    { name: "Delivered", value: delivered, color: "#3b82f6" },
    { name: "Opened", value: opened, color: "#22c55e" },
    { name: "Clicked", value: clicked, color: "#a855f7" },
  ]}
/>;
```

## Do / don’t

| Do                                                          | Don’t                                    |
| ----------------------------------------------------------- | ---------------------------------------- |
| Pass GTM hex so trapezoids match production.                | Compute conversion rates inside the kit. |
| Show empty when `leads === 0 && signedUp === 0` (app rule). | Return `null` without an empty label.    |

## Accessibility

Stage name + count are visible. Hidden table: Stage, Value, Of previous. Label colour flips to zinc-800 on light fills (luminance check).
