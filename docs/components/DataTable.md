# DataTable

Dense, full-width ops table extracted from GTM `components/ui/DataTable.tsx` plus the leads, campaigns, and platform-users pages.

Column defs, sortable headers, toolbar/filter slots, row selection with a bulk-actions bar, client or controlled server paging, sticky header, empty/loading rows, and row click. **Data in via props only.**

## Props

| Name                  | Type                                         | Default                        | Description                                             |
| --------------------- | -------------------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `columns`             | `ColumnDef<T>[]`                             | —                              | Column defs.                                            |
| `data`                | `T[]`                                        | —                              | Rows to render (current page in `server` mode).         |
| `getRowId`            | `(row, index) => string`                     | `row.id`                       | Stable row id.                                          |
| `sort`                | `SortState \| null`                          | uncontrolled                   | Active sort.                                            |
| `defaultSort`         | `SortState \| null`                          | `null`                         | Uncontrolled initial sort.                              |
| `onSortChange`        | `(sort) => void`                             | —                              | Sort callback.                                          |
| `mode`                | `"client" \| "server"`                       | `"client"`                     | Client sorts/pages `data`; server renders `data` as-is. |
| `pagination`          | `PaginationState`                            | uncontrolled                   | `{ page, pageSize, total? }`.                           |
| `defaultPagination`   | `PaginationState`                            | `{ page: 1, pageSize: 50 }`    | Uncontrolled paging.                                    |
| `onPaginationChange`  | `(pagination) => void`                       | —                              | Page callback.                                          |
| `showPagination`      | `boolean`                                    | auto                           | Force pager on/off.                                     |
| `selectable`          | `boolean`                                    | `false`                        | Checkbox column.                                        |
| `selectedIds`         | `string[]`                                   | uncontrolled                   | Selected row ids.                                       |
| `onSelectedIdsChange` | `(ids) => void`                              | —                              | Selection callback.                                     |
| `bulkActions`         | `ReactNode`                                  | —                              | Shown when selection is non-empty.                      |
| `onRowClick`          | `(row, event) => void`                       | —                              | Ignored when the target is a link/input/button.         |
| `getRowHref`          | `(row) => string \| undefined`               | —                              | Turns the first column into a link via `renderLink`.    |
| `renderLink`          | `RenderLink`                                 | `<a>`                          | Router adapter.                                         |
| `loading`             | `boolean`                                    | `false`                        | Pulse placeholder rows.                                 |
| `loadingRowCount`     | `number`                                     | `8`                            | Placeholder count.                                      |
| `emptyMessage`        | `ReactNode`                                  | `"No results"`                 | Empty title.                                            |
| `emptyDescription`    | `ReactNode`                                  | `"Try adjusting your filters"` | Empty subtitle.                                         |
| `stickyHeader`        | `boolean`                                    | `true`                         | Sticky `thead`.                                         |
| `maxHeight`           | `string`                                     | `min(36rem, 70vh)`             | Scrollport when sticky.                                 |
| `compact`             | `boolean`                                    | `false`                        | `text-xs` (GTM compact).                                |
| `highlightRowIds`     | `string[]`                                   | —                              | Zinc wash on matching rows.                             |
| `toolbar`             | `DataTableToolbarProps \| ReactNode \| null` | —                              | Toolbar object, custom node, or `null` to hide.         |
| `caption`             | `string`                                     | —                              | `sr-only` table caption.                                |
| `className`           | `string`                                     | —                              | Extra classes.                                          |

### `ColumnDef<T>`

| Name              | Type                            | Default  | Description                    |
| ----------------- | ------------------------------- | -------- | ------------------------------ |
| `id`              | `string`                        | —        | Sort/key.                      |
| `header`          | `ReactNode`                     | —        | Header label.                  |
| `accessor`        | `keyof T \| ((row) => unknown)` | —        | Value for sort + default cell. |
| `cell`            | `(ctx) => ReactNode`            | string   | Custom cell.                   |
| `sortable`        | `boolean`                       | `false`  | Clickable header.              |
| `align`           | `"left" \| "center" \| "right"` | `"left"` | Alignment.                     |
| `mono`            | `boolean`                       | `false`  | `font-mono tabular-nums`.      |
| `width`           | `string \| number`              | —        | Column width.                  |
| `className`       | `string`                        | —        | `td` classes.                  |
| `headerClassName` | `string`                        | —        | `th` classes.                  |

Low-level GTM primitives (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`) are also exported for fully custom tables.

## Usage

```tsx
<DataTable
  columns={[
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "email", header: "Email", accessor: "email", mono: true },
  ]}
  data={leads}
  mode="server"
  pagination={{ page, pageSize: 50, total }}
  onPaginationChange={({ page }) => goToPage(page)}
  getRowHref={(row) => `/leads/${row.id}`}
  renderLink={renderLink}
  selectable
  bulkActions={<button type="button">Enroll</button>}
  toolbar={{
    search,
    onSearchChange: setSearch,
    searchPlaceholder: "Name, email, or website...",
    filters: (
      <FilterSelect
        label="Status"
        value={status}
        options={statusOptions}
        onValueChange={setStatus}
      />
    ),
    secondaryFilters: (
      <MultiSelectFilter
        label="Industry"
        options={industryOptions}
        value={industries}
        onValueChange={setIndustries}
      />
    ),
    meta: `${leads.length} of ${total.toLocaleString()} leads`,
  }}
/>
```

## Do / don’t

| Do                                                     | Don’t                                      |
| ------------------------------------------------------ | ------------------------------------------ |
| Pass already-fetched rows                              | Fetch, React Query, or Supabase in the kit |
| Use `mode="server"` when the URL owns `page` / `sort`  | Re-slice server data on the client         |
| Keep `py-2 px-3`, uppercase micro headers, 1px borders | Card-ify each row                          |
| Put links in cells (or `getRowHref`) via `renderLink`  | Import `next/link` here                    |

## Accessibility

- Sortable headers: `<th aria-sort>` + button (Enter / Space). Cycle is asc → desc → none.
- Selection: labelled checkboxes; select-all uses `indeterminate` for mixed page state.
- Bulk bar: `role="region"` `aria-label="Bulk actions"`.
- Loading body: `aria-busy="true"`.
- Optional `caption` is visually hidden.
- Row click ignores interactive descendants so nested links stay usable.
- Keyboard: clickable rows are `tabIndex={0}` and activate on Enter / Space.

## Internal checkbox

Row selection uses a minimal checkbox under `src/admin/_internal`. Replace it with the primitives `Checkbox` when that PR lands.
