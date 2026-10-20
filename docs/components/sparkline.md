# Sparkline

Tiny SVG trend line used beside KPI values and in the dense metrics header.

## Props

| Name          | Type                    | Default          | Description                                     |
| ------------- | ----------------------- | ---------------- | ----------------------------------------------- |
| `data`        | `number[]`              | —                | Values left → right.                            |
| `width`       | `number`                | `80`             | SVG width in px.                                |
| `height`      | `number`                | `24`             | SVG height in px.                               |
| `color`       | `string`                | `currentColor`   | Stroke / fill.                                  |
| `fill`        | `boolean`               | `false`          | Translucent area under the line (GTM KPI tile). |
| `fillOpacity` | `number`                | `0.3`            | Area opacity when `fill` is set.                |
| `strokeWidth` | `number`                | `1.5`            | Line weight.                                    |
| `label`       | `string`                | `"Sparkline"`    | Accessible name (figcaption + table caption).   |
| `formatValue` | `(n: number) => string` | `toLocaleString` | Hidden-table formatter.                         |
| `className`   | `string`                | —                | Extra classes on the figure.                    |

## Usage

```tsx
import { Sparkline } from "@stack48/admin-ui/charts";

<Sparkline data={[12, 18, 15, 22]} label="Sends (7d)" fill color="#3b82f6" />;
```

## Do / don’t

| Do                                         | Don’t                                                                |
| ------------------------------------------ | -------------------------------------------------------------------- |
| Pass a `label` that names the metric.      | Use Tailwind arbitrary `w-[${width}px]` — width is an SVG attribute. |
| Treat fewer than two points as empty.      | Invent a line from a single value.                                   |
| Keep it inline (`currentColor` in chrome). | Wrap it in a shadowed card.                                          |

## Accessibility

- `figure` + sr-only `figcaption`.
- Visual plot is `aria-hidden`; a hidden table lists point index and formatted value.
- Empty data still exposes the labelled table (no rows of values).
