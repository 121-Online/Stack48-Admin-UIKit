# WorldMap

Geographic distribution: view-mode toggle, proportional markers, country list.

GTM used `react-simple-maps` + `/geo/countries-110m.json`. That is a heavy optional stack (d3-geo, TopoJSON, a runtime asset). This kit keeps the same **layout and data contract** on a schematic SVG landmass — no extra deps.

## Props

| Name                            | Type                                             | Default             | Description                                  |
| ------------------------------- | ------------------------------------------------ | ------------------- | -------------------------------------------- |
| `regions`                       | `{ id; label; value?; values?; coordinates? }[]` | —                   | `values[viewMode]` or a preselected `value`. |
| `viewModes`                     | `{ id; label }[]`                                | —                   | Toggle. Omit to hide it.                     |
| `viewMode`                      | `string`                                         | uncontrolled        | Controlled mode id.                          |
| `defaultViewMode`               | `string`                                         | first view mode     | Uncontrolled start.                          |
| `onViewModeChange`              | `(id: string) => void`                           | —                   | Toggle callback.                             |
| `totalLabel`                    | `string`                                         | `"sends"`           | Suffix after the total.                      |
| `label`                         | `string`                                         | `"Sends by region"` | Accessible name.                             |
| `emptyLabel`                    | `string`                                         | `"No data"`         | Empty copy.                                  |
| `formatValue` / `formatPercent` | formatters                                       | locale / `12%`      | Counts and shares.                           |

`defaultRegionCoordinates` maps ISO3 `GBR` / `IRL` / `USA` / `CAN` (and a few others) to lon/lat. Pass `coordinates` to plot anywhere else.

## Usage

```tsx
import { WorldMap } from "@stack48/admin-ui/charts";

<WorldMap
  regions={geo.map((row) => ({
    id: row.iso3,
    label: row.country,
    values: { "7d": row.count7d, today: row.countToday },
  }))}
  viewModes={[
    { id: "7d", label: "7 Days" },
    { id: "today", label: "Today" },
  ]}
/>;
```

## Do / don’t

| Do                                                         | Don’t                                |
| ---------------------------------------------------------- | ------------------------------------ |
| Treat this as a distribution overview, not GIS.            | Add `react-simple-maps` to this kit. |
| Pass `coordinates` for regions outside the default lookup. | Fetch TopoJSON at runtime.           |

## Accessibility

- Toggle is `role="tablist"` with `aria-selected`.
- Map SVG is `role="presentation"`; the country list is visible text.
- Hidden table: Region, Value, Share.
- Hover syncs list row and marker (pointer only).
