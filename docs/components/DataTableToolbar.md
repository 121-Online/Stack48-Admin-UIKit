# DataTableToolbar

Full-width filter strip from GTM leads / platform-users: search, filter slots, optional second row (vocab multi-selects), extras (checkboxes / clear), count meta on the right. 1px border, `rounded-sm`, `p-4` — not a cartoon card.

## Props

| Name                | Type                      | Default     | Description                                                          |
| ------------------- | ------------------------- | ----------- | -------------------------------------------------------------------- |
| `search`            | `string`                  | —           | Controlled search. Passing it (or `onSearchChange`) shows the field. |
| `onSearchChange`    | `(value: string) => void` | —           | No debounce — the app owns that (GTM uses 300ms).                    |
| `searchPlaceholder` | `string`                  | `"Search…"` | Input placeholder.                                                   |
| `searchLabel`       | `string`                  | `"Search"`  | Uppercase micro label.                                               |
| `filters`           | `ReactNode`               | —           | First row (status, geo, audience).                                   |
| `secondaryFilters`  | `ReactNode`               | —           | Second row (industry multi-select).                                  |
| `extras`            | `ReactNode`               | —           | Bottom strip (checkboxes, clear).                                    |
| `meta`              | `ReactNode`               | —           | Right-aligned count.                                                 |
| `className`         | `string`                  | —           | Extra classes.                                                       |
| `children`          | `ReactNode`               | —           | Extra first-row nodes.                                               |

Also accepted as the `toolbar` object on [`DataTable`](./DataTable.md).

## Usage

```tsx
<DataTableToolbar
  search={search}
  onSearchChange={setSearch}
  searchPlaceholder="Name, email, or website..."
  filters={
    <FilterSelect
      label="Audience"
      value={audience}
      options={audienceOptions}
      onValueChange={setAudience}
    />
  }
  secondaryFilters={
    <MultiSelectFilter
      label="Industry"
      options={industryOptions}
      value={industries}
      onValueChange={setIndustries}
    />
  }
  extras={
    <FilterCheckbox label="Sendable Queue Only" checked={sendable} onCheckedChange={setSendable} />
  }
  meta={isPending ? "Loading..." : `${rows.length} of ${total.toLocaleString()} leads`}
/>
```

## Do / don’t

| Do                                         | Don’t                            |
| ------------------------------------------ | -------------------------------- |
| Keep labels uppercase `text-caption`       | Use large floating filter chips  |
| Debounce search in the page                | Sleep / fetch inside the toolbar |
| Slot domain filters; don’t hard-code vocab | Import GTM industry enums        |

## Accessibility

- Search and selects are labelled (`<label>` + `htmlFor`).
- Meta text is informational; announce pending loads in the page if needed (`aria-live` is the caller’s job).
