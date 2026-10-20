"use client";

import { useMemo, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Checkbox } from "../primitives/checkbox";
import { SortIcon } from "./_internal/icons";
import { useControllableState } from "./_internal/use-controllable-state";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar, type DataTableToolbarProps } from "./DataTableToolbar";
import { defaultRenderLink, type RenderLink } from "./render-link";
import { TableMessage } from "./table-primitives";

/**
 * Sort state for a single column.
 */
export interface SortState {
  id: string;
  direction: "asc" | "desc";
}

/**
 * Pagination state shared by client and server modes.
 */
export interface PaginationState {
  page: number;
  pageSize: number;
  /** Total row count. Required for server mode; inferred from `data` in client mode. */
  total?: number;
}

/**
 * Column definition. Accessors are presentational — no fetching.
 */
export interface ColumnDef<T> {
  id: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  cell?: (ctx: { row: T; value: unknown; rowId: string }) => ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  mono?: boolean;
  width?: string | number;
  className?: string;
  headerClassName?: string;
}

/**
 * Props for {@link DataTable}.
 */
export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => string;
  /** Controlled sort. Omit together with `onSortChange` for internal client sort. */
  sort?: SortState | null;
  defaultSort?: SortState | null;
  onSortChange?: (sort: SortState | null) => void;
  /**
   * `client` (default) sorts and pages `data` in memory.
   * `server` renders `data` as-is and emits page/sort changes for the caller.
   */
  mode?: "client" | "server";
  pagination?: PaginationState;
  defaultPagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  /** Show the pager. Default true when there is more than one page. */
  showPagination?: boolean;
  selectable?: boolean;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  /** Actions shown in the bulk bar when at least one row is selected. */
  bulkActions?: ReactNode;
  onRowClick?: (row: T, event: MouseEvent<HTMLTableRowElement>) => void;
  /** When set, rows are keyboard-activatable and render as links via `renderLink`. */
  getRowHref?: (row: T) => string | undefined;
  renderLink?: RenderLink;
  loading?: boolean;
  loadingRowCount?: number;
  emptyMessage?: ReactNode;
  emptyDescription?: ReactNode;
  stickyHeader?: boolean;
  maxHeight?: string;
  compact?: boolean;
  highlightRowIds?: string[];
  toolbar?: DataTableToolbarProps | ReactNode | null;
  className?: string;
  caption?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

function defaultGetRowId<T>(row: T, index: number): string {
  if (row && typeof row === "object" && "id" in row && (row as { id: unknown }).id != null) {
    return String((row as { id: unknown }).id);
  }
  return String(index);
}

function getCellValue<T>(row: T, column: ColumnDef<T>): unknown {
  if (!column.accessor) return undefined;
  if (typeof column.accessor === "function") return column.accessor(row);
  return row[column.accessor];
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a, button, input, select, textarea, label, [role='checkbox'], [role='combobox']",
    ),
  );
}

function widthStyle(width: string | number | undefined) {
  if (width == null) return undefined;
  return { width: typeof width === "number" ? `${width}px` : width };
}

/**
 * Dense, full-width ops table extracted from GTM `ui/DataTable` plus the
 * leads, campaigns, and platform-users pages.
 *
 * Column defs, sortable headers, toolbar/filter slots, row selection with a
 * bulk-actions bar, client or controlled server paging, sticky header,
 * empty/loading rows, and row click. Data in via props only.
 */
export function DataTable<T>({
  columns,
  data,
  getRowId = defaultGetRowId,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  mode = "client",
  pagination: paginationProp,
  defaultPagination = { page: 1, pageSize: 50 },
  onPaginationChange,
  showPagination,
  selectable = false,
  selectedIds: selectedIdsProp,
  defaultSelectedIds = [],
  onSelectedIdsChange,
  bulkActions,
  onRowClick,
  getRowHref,
  renderLink = defaultRenderLink,
  loading = false,
  loadingRowCount = 8,
  emptyMessage = "No results",
  emptyDescription = "Try adjusting your filters",
  stickyHeader = true,
  maxHeight = "min(36rem, 70vh)",
  compact = false,
  highlightRowIds,
  toolbar,
  className,
  caption,
}: DataTableProps<T>) {
  const [sort, setSort] = useControllableState<SortState | null>({
    value: sortProp,
    defaultValue: defaultSort,
    onChange: onSortChange,
  });
  const [pagination, setPagination] = useControllableState<PaginationState>({
    value: paginationProp,
    defaultValue: defaultPagination,
    onChange: onPaginationChange,
  });
  const [selectedIds, setSelectedIds] = useControllableState<string[]>({
    value: selectedIdsProp,
    defaultValue: defaultSelectedIds,
    onChange: onSelectedIdsChange,
  });

  const highlight = useMemo(() => new Set(highlightRowIds ?? []), [highlightRowIds]);
  const selected = useMemo(() => new Set(selectedIds), [selectedIds]);

  const sorted = useMemo(() => {
    if (mode !== "client" || !sort) return data;
    const column = columns.find((item) => item.id === sort.id);
    if (!column) return data;
    const next = [...data];
    next.sort((left, right) => {
      const result = compareValues(getCellValue(left, column), getCellValue(right, column));
      return sort.direction === "asc" ? result : -result;
    });
    return next;
  }, [columns, data, mode, sort]);

  const total = mode === "server" ? (pagination.total ?? data.length) : sorted.length;
  const pageSize = pagination.pageSize || 50;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const page = Math.min(Math.max(1, pagination.page), totalPages);

  const pageRows = useMemo(() => {
    if (mode === "server") return sorted;
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [mode, page, pageSize, sorted]);

  const pageIds = pageRows.map((row, index) => getRowId(row, index));
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const somePageSelected = pageIds.some((id) => selected.has(id));

  function toggleSort(column: ColumnDef<T>) {
    if (!column.sortable) return;
    const next: SortState | null =
      sort?.id === column.id
        ? sort.direction === "asc"
          ? { id: column.id, direction: "desc" }
          : null
        : { id: column.id, direction: "asc" };
    setSort(next);
    if (mode === "client") {
      setPagination({ ...pagination, page: 1, total: undefined });
    }
  }

  function toggleAll(checked: boolean) {
    if (checked) {
      const next = new Set(selectedIds);
      for (const id of pageIds) next.add(id);
      setSelectedIds([...next]);
    } else {
      const drop = new Set(pageIds);
      setSelectedIds(selectedIds.filter((id) => !drop.has(id)));
    }
  }

  function toggleRow(id: string, checked: boolean) {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  }

  function onHeaderKeyDown(event: KeyboardEvent<HTMLButtonElement>, column: ColumnDef<T>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSort(column);
    }
  }

  const pagerVisible =
    showPagination ?? (totalPages > 1 || (mode === "server" && (pagination.total ?? 0) > pageSize));

  const toolbarNode =
    toolbar == null ? null : isToolbarProps(toolbar) ? <DataTableToolbar {...toolbar} /> : toolbar;

  return (
    <div className={cn("w-full", className)}>
      {toolbarNode}
      {selectable && selectedIds.length > 0 ? (
        <div
          role="region"
          aria-label="Bulk actions"
          className="mb-2 flex items-center gap-3 rounded-sm border border-border bg-zinc-50 px-3 py-1.5 text-caption"
        >
          <span className="font-medium text-foreground tabular-nums">
            {selectedIds.length} selected
          </span>
          {bulkActions}
          <button
            type="button"
            className="ml-auto text-zinc-500 hover:text-zinc-900"
            onClick={() => setSelectedIds([])}
          >
            Clear
          </button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        {loading ? (
          <LoadingTable
            columns={columns}
            selectable={selectable}
            compact={compact}
            stickyHeader={stickyHeader}
            maxHeight={maxHeight}
            rowCount={loadingRowCount}
          />
        ) : pageRows.length === 0 ? (
          <TableMessage description={emptyDescription}>{emptyMessage}</TableMessage>
        ) : (
          <div className="overflow-auto" style={stickyHeader ? { maxHeight } : undefined}>
            <table className={cn("w-full text-left", compact ? "text-xs" : "text-body")}>
              {caption ? <caption className="sr-only">{caption}</caption> : null}
              <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
                <tr className="border-b border-border bg-zinc-50 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  {selectable ? (
                    <th className="w-8 px-3 py-2">
                      <Checkbox
                        checked={
                          allPageSelected ? true : somePageSelected ? "indeterminate" : false
                        }
                        onCheckedChange={(value) => toggleAll(value === true)}
                        aria-label="Select all rows on this page"
                      />
                    </th>
                  ) : null}
                  {columns.map((column) => {
                    const direction = sort?.id === column.id ? sort.direction : null;
                    return (
                      <th
                        key={column.id}
                        scope="col"
                        aria-sort={
                          column.sortable
                            ? direction === "asc"
                              ? "ascending"
                              : direction === "desc"
                                ? "descending"
                                : "none"
                            : undefined
                        }
                        style={widthStyle(column.width)}
                        className={cn(
                          "px-3 py-2 font-medium",
                          alignClass[column.align ?? "left"],
                          column.headerClassName,
                        )}
                      >
                        {column.sortable ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 uppercase"
                            onClick={() => toggleSort(column)}
                            onKeyDown={(event) => onHeaderKeyDown(event, column)}
                          >
                            {column.header}
                            <SortIcon direction={direction} />
                          </button>
                        ) : (
                          column.header
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pageRows.map((row, index) => {
                  const rowId = getRowId(row, index);
                  const href = getRowHref?.(row);
                  const clickable = Boolean(onRowClick || href);
                  return (
                    <tr
                      key={rowId}
                      data-row-id={rowId}
                      tabIndex={clickable ? 0 : undefined}
                      onClick={(event) => {
                        if (isInteractiveTarget(event.target)) return;
                        onRowClick?.(row, event);
                        if (href && event.metaKey) return;
                      }}
                      onKeyDown={(event) => {
                        if (!clickable) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.currentTarget.click();
                        }
                      }}
                      className={cn(
                        clickable && "cursor-pointer hover:bg-zinc-50",
                        highlight.has(rowId) && "bg-zinc-50",
                        selected.has(rowId) && "bg-brand/5",
                      )}
                    >
                      {selectable ? (
                        <td className="px-3 py-2" onClick={(event) => event.stopPropagation()}>
                          <Checkbox
                            checked={selected.has(rowId)}
                            onCheckedChange={(value) => toggleRow(rowId, value === true)}
                            aria-label={`Select row ${rowId}`}
                          />
                        </td>
                      ) : null}
                      {columns.map((column) => {
                        const value = getCellValue(row, column);
                        const content = column.cell ? (
                          column.cell({ row, value, rowId })
                        ) : value == null || value === "" ? (
                          <span className="text-zinc-400">—</span>
                        ) : (
                          String(value)
                        );
                        const isPrimary = column === columns[0] && href;
                        return (
                          <td
                            key={column.id}
                            className={cn(
                              "px-3 py-2",
                              alignClass[column.align ?? "left"],
                              column.mono && "font-mono tabular-nums",
                              column.className,
                            )}
                          >
                            {isPrimary
                              ? renderLink({
                                  href,
                                  className: "font-medium text-brand hover:underline",
                                  children: content,
                                })
                              : content}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pagerVisible && !loading ? (
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          total={total}
          disabled={loading}
          onPageChange={(nextPage) => setPagination({ ...pagination, page: nextPage, total })}
        />
      ) : null}
    </div>
  );
}

function isToolbarProps(value: DataTableToolbarProps | ReactNode): value is DataTableToolbarProps {
  if (value == null || typeof value !== "object" || Array.isArray(value)) return false;
  if ("$$typeof" in value) return false;
  return [
    "search",
    "onSearchChange",
    "filters",
    "searchPlaceholder",
    "meta",
    "extras",
    "secondaryFilters",
    "searchLabel",
  ].some((key) => key in value);
}

function LoadingTable<T>({
  columns,
  selectable,
  compact,
  stickyHeader,
  maxHeight,
  rowCount,
}: {
  columns: ColumnDef<T>[];
  selectable: boolean;
  compact: boolean;
  stickyHeader: boolean;
  maxHeight: string;
  rowCount: number;
}) {
  return (
    <div className="overflow-auto" style={stickyHeader ? { maxHeight } : undefined}>
      <table className={cn("w-full text-left", compact ? "text-xs" : "text-body")}>
        <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
          <tr className="border-b border-border bg-zinc-50 text-xs font-medium tracking-wider text-zinc-500 uppercase">
            {selectable ? <th className="w-8 px-3 py-2" /> : null}
            {columns.map((column) => (
              <th key={column.id} className={cn("px-3 py-2", alignClass[column.align ?? "left"])}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100" aria-busy="true">
          {Array.from({ length: rowCount }, (_, index) => (
            <tr key={index}>
              {selectable ? (
                <td className="px-3 py-2">
                  <div className="h-3.5 w-3.5 animate-pulse rounded-sm bg-zinc-100" />
                </td>
              ) : null}
              {columns.map((column) => (
                <td key={column.id} className="px-3 py-2">
                  <div className="h-3 max-w-[8rem] animate-pulse rounded-sm bg-zinc-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
