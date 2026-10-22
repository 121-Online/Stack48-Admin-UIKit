# Panel, SettingsGroup, ChartSlot

Page layout for settings and dashboards. The group title sits above the panels. A panel is the bordered surface. A chart slot caps area charts at 240px.

## Props

### SettingsGroup

| Name          | Type        | Description                       |
| ------------- | ----------- | --------------------------------- |
| `title`       | `string`    | Sentence-case group title.        |
| `description` | `string`    | One-line muted description.       |
| `children`    | `ReactNode` | Panels and sections in the group. |
| `className`   | `string`    | Extra classes.                    |

### Panel

| Name        | Type        | Description                          |
| ----------- | ----------- | ------------------------------------ |
| `children`  | `ReactNode` | Body. Titles stay outside the panel. |
| `className` | `string`    | Extra classes.                       |

### ChartSlot

| Name        | Type        | Description                             |
| ----------- | ----------- | --------------------------------------- |
| `children`  | `ReactNode` | Chart. Height and max-height are 240px. |
| `className` | `string`    | Extra classes.                          |

## Usage

```tsx
import { ChartSlot, Panel, SettingsGroup } from "@stack48/admin-ui/admin";

<SettingsGroup title="Preview runtime" description="The software that runs each live preview.">
  <Panel>
    <ChartSlot>{chart}</ChartSlot>
  </Panel>
</SettingsGroup>;
```
