/**
 * Composed admin chrome: shell, sidebar, header, page, table toolbar.
 *
 * Presentational only — data, routing, and auth stay in the app. Pass a
 * `renderLink` (or `asChild` on breadcrumbs) so links work with any router.
 *
 * @packageDocumentation
 */

export { AppShell } from "./AppShell";
export type { AppShellProps } from "./AppShell";

export { Sidebar } from "./Sidebar";
export type { SidebarNavGroup, SidebarNavItem, SidebarProps } from "./Sidebar";

export { ChartSlot, Panel, SettingsGroup } from "./layout";
export type { ChartSlotProps, PanelProps, SettingsGroupProps } from "./layout";

export { Breadcrumb, Breadcrumbs, PageHeader, Topbar } from "./PageHeader";
export type {
  BreadcrumbItem,
  BreadcrumbProps,
  BreadcrumbsProps,
  PageHeaderProps,
  TopbarProps,
} from "./PageHeader";

export { DataTable } from "./DataTable";
export type { ColumnDef, DataTableProps, PaginationState, SortState } from "./DataTable";

export { DataTableToolbar } from "./DataTableToolbar";
export type { DataTableToolbarProps } from "./DataTableToolbar";

export { DataTablePagination, pageWindow } from "./DataTablePagination";
export type { DataTablePaginationProps } from "./DataTablePagination";

export { FilterCheckbox, FilterSelect } from "./FilterSelect";
export type { FilterCheckboxProps, FilterOption, FilterSelectProps } from "./FilterSelect";

export { ChipList, MultiSelectFilter } from "./MultiSelectFilter";
export type { ChipListProps, MultiSelectFilterProps } from "./MultiSelectFilter";

export {
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableRoot,
  DataTableRow,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableMessage,
  TableRow,
} from "./table-primitives";
export type { TableCellProps, TableProps, TableRowProps } from "./table-primitives";

export { isActiveRoute } from "./is-active-route";
export { defaultRenderLink } from "./render-link";
export type { RenderLink, RenderLinkProps } from "./render-link";
