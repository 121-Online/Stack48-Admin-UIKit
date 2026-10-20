# DeliveryFunnel

CSS bar funnel (GTM 7-day pipeline) and a Recharts horizontal variant.

## Props (`DeliveryFunnel` / `DeliveryFunnelHorizontal`)

| Name            | Type                        | Default             | Description                                                   |
| --------------- | --------------------------- | ------------------- | ------------------------------------------------------------- |
| `stages`        | `{ name; value; color? }[]` | —                   | Ordered stages. Default colours: ink / blue / green / purple. |
| `label`         | `string`                    | `"Delivery funnel"` | Accessible name.                                              |
| `emptyLabel`    | `string`                    | `"No data"`         | Empty copy.                                                   |
| `formatValue`   | `(n: number) => string`     | `toLocaleString`    | Counts.                                                       |
| `formatPercent` | `(n: number) => string`     | `12.5%`             | Conversion vs the **first** stage.                            |
| `height`        | `number`                    | `48`                | Horizontal variant only (floor is `stages × 28`).             |

Conversion % is vs stage 0 (GTM sent → delivered/opened/clicked), not vs the previous stage — use `TaperedFunnel` for that.

## Usage

```tsx
import { DeliveryFunnel } from "@stack48/admin-ui/charts";

<DeliveryFunnel
  stages={[
    { name: "Sent", value: funnel.sent },
    { name: "Delivered", value: funnel.delivered },
    { name: "Opened", value: funnel.opened },
    { name: "Clicked", value: funnel.clicked },
  ]}
/>;
```

## Do / don’t

| Do                                       | Don’t                                                      |
| ---------------------------------------- | ---------------------------------------------------------- |
| Keep bars 24px tall, 2px radius.         | Use the Recharts variant when the CSS funnel already fits. |
| Pass empty `stages` for the empty state. | Hide a zero funnel behind a skeleton in this kit.          |

## Accessibility

Stage names and counts are visible text. Hidden table: Stage, Value, Of first. Horizontal variant hides the Recharts SVG and keeps the same table.
