# MessageList

Dense Gmail-style message rows: unread/handled weight, chips, selection with a bulk-action bar, a search/filter slot, and cursor paging.

## Import

```ts
import { MessageList } from "@stack48/admin-ui/inbox";
```

## Props

| Name                       | Type                              | Default         | Description                                         |
| -------------------------- | --------------------------------- | --------------- | --------------------------------------------------- |
| `items`                    | `InboxListItem[]`                 | —               | Rows. Times and names are preformatted by the host. |
| `selectedIds`              | `string[]`                        | `[]`            | Ticked row ids (controlled).                        |
| `onToggleSelect`           | `(id: string) => void`            | —               | Checkbox on a row.                                  |
| `onToggleSelectAll`        | `() => void`                      | —               | Header checkbox.                                    |
| `focusedId`                | `string \| null`                  | —               | `j`/`k` focus. The row is scrolled into view.       |
| `openId`                   | `string \| null`                  | —               | Row open in the reading pane (zinc wash).           |
| `onOpen`                   | `(id: string) => void`            | —               | Row click / Enter.                                  |
| `searchValue`              | `string`                          | —               | Controlled search.                                  |
| `onSearchChange`           | `(value: string) => void`         | —               | Shows the built-in search field.                    |
| `searchSlot`               | `ReactNode`                       | —               | Replaces the built-in search field.                 |
| `filterSlot`               | `ReactNode`                       | —               | Filter chips under the search row.                  |
| `toolbarEndSlot`           | `ReactNode`                       | —               | Extra toolbar controls.                             |
| `onRefresh`                | `() => void`                      | —               | Refresh button.                                     |
| `onHelp`                   | `() => void`                      | —               | “?” shortcuts button.                               |
| `unhandledCount`           | `number`                          | —               | Shown next to select-all.                           |
| `loading`                  | `boolean`                         | `false`         | Replaces the count with “Loading…”.                 |
| `disabled`                 | `boolean`                         | `false`         | Disables inputs and buttons.                        |
| `error`                    | `ReactNode`                       | —               | Error banner.                                       |
| `emptyTitle` / `emptyBody` | `string`                          | `"No messages"` | Empty copy.                                         |
| `nextCursor`               | `string \| null`                  | `null`          | Opaque cursor for the next older page.              |
| `hasNewer`                 | `boolean`                         | `false`         | Show **Newer**.                                     |
| `onPage`                   | `(event: InboxPageEvent) => void` | —               | `{ direction: "older" \| "newer", cursor }`.        |
| `onBulkMarkHandled`        | `(ids) => void`                   | —               | Bulk bar action.                                    |
| `onBulkMarkUnhandled`      | `(ids) => void`                   | —               | Bulk bar action.                                    |
| `bulkSlot`                 | `ReactNode`                       | —               | Extra bulk controls (category, …).                  |
| `bulkBusy`                 | `boolean`                         | `false`         | Disables bulk buttons.                              |
| `className`                | `string`                          | —               | Extra classes on the root.                          |

`InboxPageEvent.cursor` is `nextCursor` when moving older, and `null` when moving newer (the host owns the cursor stack).

## Usage

```tsx
<MessageList
  items={items}
  selectedIds={selectedIds}
  focusedId={items[focused]?.id}
  openId={openId}
  onOpen={setOpenId}
  onToggleSelect={toggle}
  onToggleSelectAll={toggleAll}
  searchValue={q}
  onSearchChange={setQ}
  unhandledCount={12}
  nextCursor={nextCursor}
  hasNewer={canGoNewer}
  onPage={({ direction, cursor }) => loadPage(direction, cursor)}
  onBulkMarkHandled={(ids) => mark(ids, true)}
/>
```

## Do / don’t

| Do                                      | Don’t                                        |
| --------------------------------------- | -------------------------------------------- |
| Bold unread via `unread` / `handled`    | Fetch or debounce search inside the kit      |
| Put lead/campaign/auto-reply in `chips` | Nest `dangerouslySetInnerHTML` in a snippet  |
| Page with `onPage` + an opaque cursor   | Invent offset/limit UI that GTM does not use |
| Keep rows at `py-1.5` density           | Inflate padding so the list “breathes”       |

## Accessibility

- Rows are a `list` named **Messages**; each row is a `listitem` with `aria-selected`.
- The focused row is `tabIndex={0}` and uses `data-inbox-row` for scroll-into-view.
- Checkboxes are labelled (“Select {subject}”, “Select all on page”).
- Search is `type="search"` with `aria-label="Search mail"` and `data-inbox-search` so `/` can focus it.
- Keyboard (via `useInboxKeyboard`): `j`/`k` move, `x` select, `Enter`/`o` open, `e` mark handled, `#` delete, `/` search, `u` back, `?` help. The list itself does not bind those keys.
