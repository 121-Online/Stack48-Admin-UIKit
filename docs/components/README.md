# Components

Presentational kit docs. Data and formatters arrive via props — no fetching.

Index of every component doc. Import map: [`AGENTS.md`](../../AGENTS.md). App migration: [`ADOPTION.md`](../ADOPTION.md).

## Primitives (`@stack48/admin-ui/primitives`)

| Component         | Docs                                         |
| ----------------- | -------------------------------------------- |
| `Button`          | [button.md](./button.md)                     |
| `Input`           | [input.md](./input.md)                       |
| `Textarea`        | [textarea.md](./textarea.md)                 |
| `Label`           | [label.md](./label.md)                       |
| `Checkbox`        | [checkbox.md](./checkbox.md)                 |
| `Switch`          | [switch.md](./switch.md)                     |
| `Badge`           | [badge.md](./badge.md)                       |
| `StatusIndicator` | [status-indicator.md](./status-indicator.md) |
| `Section`         | [section.md](./section.md)                   |
| `Separator`       | [separator.md](./separator.md)               |
| `Skeleton`        | [skeleton.md](./skeleton.md)                 |
| `Select`          | [select.md](./select.md)                     |
| `Tabs`            | [tabs.md](./tabs.md)                         |
| `Dialog`          | [dialog.md](./dialog.md)                     |
| `DropdownMenu`    | [dropdown-menu.md](./dropdown-menu.md)       |
| `Popover`         | [popover.md](./popover.md)                   |
| `Tooltip`         | [tooltip.md](./tooltip.md)                   |
| `Toast`           | [toast.md](./toast.md)                       |

## Admin (`@stack48/admin-ui/admin`)

| Component                               | Docs                                                                         |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| `AppShell`                              | [AppShell.md](./AppShell.md)                                                 |
| `Sidebar`                               | [Sidebar.md](./Sidebar.md)                                                   |
| `PageHeader`                            | [PageHeader.md](./PageHeader.md)                                             |
| `Panel` / `SettingsGroup` / `ChartSlot` | [layout.md](./layout.md)                                                     |
| `Topbar`                                | [Topbar.md](./Topbar.md)                                                     |
| `Breadcrumbs`                           | [Breadcrumbs.md](./Breadcrumbs.md)                                           |
| `DataTable`                             | [DataTable.md](./DataTable.md)                                               |
| `Table` (primitives)                    | [Table.md](./Table.md)                                                       |
| `DataTableToolbar`                      | [DataTableToolbar.md](./DataTableToolbar.md)                                 |
| `DataTablePagination`                   | [DataTablePagination.md](./DataTablePagination.md)                           |
| `FilterSelect` / `FilterCheckbox`       | [FilterSelect.md](./FilterSelect.md)                                         |
| `MultiSelectFilter` / `ChipList`        | [MultiSelectFilter.md](./MultiSelectFilter.md), [ChipList.md](./ChipList.md) |

## Inbox (`@stack48/admin-ui/inbox`)

| Component          | Docs                                         |
| ------------------ | -------------------------------------------- |
| `InboxLayout`      | [InboxLayout.md](./InboxLayout.md)           |
| `FolderList`       | [FolderList.md](./FolderList.md)             |
| `MessageList`      | [MessageList.md](./MessageList.md)           |
| `ThreadView`       | [ThreadView.md](./ThreadView.md)             |
| `MessageMeta`      | [MessageMeta.md](./MessageMeta.md)           |
| `SandboxedHtml`    | [SandboxedHtml.md](./SandboxedHtml.md)       |
| `useInboxKeyboard` | [useInboxKeyboard.md](./useInboxKeyboard.md) |

## Charts (`@stack48/admin-ui/charts`)

| Component                             | Docs                                                 |
| ------------------------------------- | ---------------------------------------------------- |
| `Sparkline`                           | [sparkline.md](./sparkline.md)                       |
| `KpiStrip` / `KpiItem` / `KpiDivider` | [kpi-strip.md](./kpi-strip.md)                       |
| `KpiTile` / `KpiTileRow`              | [kpi-tile.md](./kpi-tile.md)                         |
| `MetricsHeader`                       | [metrics-header.md](./metrics-header.md)             |
| `DailyActivityChart`                  | [daily-activity-chart.md](./daily-activity-chart.md) |
| `StackedBars`                         | [stacked-bars.md](./stacked-bars.md)                 |
| `DeliveryFunnel` / horizontal         | [delivery-funnel.md](./delivery-funnel.md)           |
| `TaperedFunnel`                       | [tapered-funnel.md](./tapered-funnel.md)             |
| `RateTrendChart` / bounce / complaint | [reputation-charts.md](./reputation-charts.md)       |
| `WorldMap`                            | [world-map.md](./world-map.md)                       |

`recharts` is an **optional peer**. Install it in the app when you use `DailyActivityChart`, `DeliveryFunnelHorizontal`, or the reputation trend charts. Sparklines, KPI chrome, CSS funnels, stacked bars, and `WorldMap` do not need it.

## States (`@stack48/admin-ui/states`)

| Component                           | Docs                                                   |
| ----------------------------------- | ------------------------------------------------------ |
| `EmptyState`                        | [EmptyState.md](./EmptyState.md)                       |
| `LoadingState` / `Spinner`          | [LoadingState.md](./LoadingState.md)                   |
| `ErrorState`                        | [ErrorState.md](./ErrorState.md)                       |
| `InlineAlert` / `Banner`            | [InlineAlert.md](./InlineAlert.md)                     |
| `StaleWarning`                      | [StaleWarning.md](./StaleWarning.md)                   |
| `FormField`                         | [FormField.md](./FormField.md)                         |
| `FormSection`                       | [FormSection.md](./FormSection.md)                     |
| `ConfirmDialog`                     | [ConfirmDialog.md](./ConfirmDialog.md)                 |
| `MultiEmailModal` (`SendTestModal`) | [MultiEmailModal.md](./MultiEmailModal.md)             |
| `ScheduleEditor`                    | [ScheduleEditor.md](./ScheduleEditor.md)               |
| `SendingIdentityEditor`             | [SendingIdentityEditor.md](./SendingIdentityEditor.md) |
