# Table

Presentational table primitives extracted from GTM `components/ui/DataTable.tsx`. Prefer `DataTable` for sortable / selectable / paged tables; use these when you need a custom layout with the same chrome.

GTM aliases `DataTableRoot`, `DataTableHead`, `DataTableBody`, `DataTableRow`, and `DataTableCell` are deprecated wrappers of the names below.

## Import

```ts
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableMessage,
} from "@stack48/admin-ui/admin";
```

## Props

| Component      | Extra props                         | Description                                     |
| -------------- | ----------------------------------- | ----------------------------------------------- |
| `Table`        | `compact?: boolean`                 | Overflow wrapper + `<table>`. `compact` → 12px. |
| `TableHeader`  | native `<thead>` attrs              | Uppercase micro labels, zinc-50 wash.           |
| `TableBody`    | native `<tbody>` attrs              | 1px zinc-100 row dividers.                      |
| `TableRow`     | `highlight?: boolean`               | Pointer + hover when `onClick` is set.          |
| `TableCell`    | `align`, `mono`, `header?: boolean` | Dense `py-2 px-3`. `header` renders a `<th>`.   |
| `TableMessage` | `description?: ReactNode`           | Centered empty / loading copy inside the frame. |

## Usage

```tsx
<Table>
  <TableHeader>
    <TableCell header>Name</TableCell>
    <TableCell header align="right">
      Score
    </TableCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Acme</TableCell>
      <TableCell align="right" mono>
        92
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Do / don’t

**Do**

- Keep 1px `border-border` and `rounded-sm` on the surrounding frame.
- Use `DataTable` when you need sort, selection, or paging.

**Don’t**

- Add drop shadows or large radius to the table card.
- Fetch rows inside the primitive.

## Accessibility

- Header cells use `<th>`. Pass `scope="col"` when composing custom markup.
- `TableMessage` is visual copy only — pair with `aria-busy` / live regions in the host when loading.
