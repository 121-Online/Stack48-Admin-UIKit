# DataTablePagination

Previous / numbered window / next, matching GTM leads and platform-users. Hidden when `total` fits on one page. Presentational — the caller fetches the next page or lets [`DataTable`](./DataTable.md) slice client-side.

## Props

| Name           | Type                     | Default | Description            |
| -------------- | ------------------------ | ------- | ---------------------- |
| `page`         | `number`                 | —       | 1-based page.          |
| `pageSize`     | `number`                 | —       | Rows per page.         |
| `total`        | `number`                 | —       | Total row count.       |
| `onPageChange` | `(page: number) => void` | —       | Page callback.         |
| `disabled`     | `boolean`                | `false` | Disable while loading. |
| `className`    | `string`                 | —       | Extra classes.         |

`pageWindow(page, totalPages, size?)` is also exported for tests / custom pagers. It returns at most 5 page numbers with a sliding window.

## Usage

```tsx
<DataTablePagination
  page={page}
  pageSize={50}
  total={total}
  disabled={isPending}
  onPageChange={goToPage}
/>
```

## Do / don’t

| Do                                          | Don’t                        |
| ------------------------------------------- | ---------------------------- |
| Drive `page` from the URL in server mode    | Fetch inside the pager       |
| Use primary (zinc-900) for the current page | Brand-blue every page button |

## Accessibility

- Current page: `aria-current="page"`.
- Previous / next are disabled (not removed) on the ends.
- Visible “Page x of y” text supplements the numbered buttons.
