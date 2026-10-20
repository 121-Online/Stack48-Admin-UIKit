# FolderList

Left-rail folder list with unread counts and a Mailboxes section (domains and addresses). Matches GTM `InboxContent` aside.

## Import

```ts
import { FolderList } from "@stack48/admin-ui/inbox";
```

## Props

| Name                      | Type                   | Default                       | Description                                                        |
| ------------------------- | ---------------------- | ----------------------------- | ------------------------------------------------------------------ |
| `folders`                 | `InboxFolder[]`        | —                             | Folder rows (`id`, `label`, optional `count`, `iconName`, `href`). |
| `selectedFolderId`        | `string \| null`       | —                             | Selected folder. Cleared visually when a mailbox is selected.      |
| `onSelectFolder`          | `(id: string) => void` | —                             | Folder click.                                                      |
| `mailboxes`               | `InboxMailbox[]`       | —                             | Mailbox rows. Omit to hide the section.                            |
| `selectedMailboxId`       | `string \| null`       | —                             | Selected mailbox.                                                  |
| `onSelectMailbox`         | `(id: string) => void` | —                             | Mailbox click.                                                     |
| `mailboxesHeading`        | `string`               | `"Mailboxes"`                 | Section heading.                                                   |
| `mailboxesEmptyLabel`     | `string`               | `"No mailboxes yet"`          | Empty copy.                                                        |
| `mailboxesTruncated`      | `boolean`              | `false`                       | Show the truncated note.                                           |
| `mailboxesTruncatedLabel` | `string`               | `"Mailbox list is truncated"` | Truncation copy.                                                   |
| `footer`                  | `ReactNode`            | —                             | Extra content under the list.                                      |
| `className`               | `string`               | —                             | Extra classes on the root.                                         |

`InboxFolder.count` renders a blue pill (`99+` when over `countMax`, default 99). Mailbox counts are muted tabular numerals.

## Usage

```tsx
<FolderList
  folders={[
    { id: "inbox", label: "Inbox", iconName: "inbox", count: unhandledCount },
    { id: "handled", label: "Handled", iconName: "handled" },
  ]}
  selectedFolderId={folder}
  onSelectFolder={setFolder}
  mailboxes={[{ id: "hello@acme.test", label: "hello@acme.test", count: 3 }]}
  selectedMailboxId={mailbox}
  onSelectMailbox={setMailbox}
/>
```

## Do / don’t

| Do                                                              | Don’t                                 |
| --------------------------------------------------------------- | ------------------------------------- |
| Pass counts from the host                                       | Fetch mailbox stats inside the kit    |
| Use `iconName` (`inbox`, `all`, `handled`, `unmatched`, `auto`) | Invent large illustrated folder tiles |
| Mark receiving-off domains with `hint`                          | Hide the empty mailboxes state        |

## Accessibility

- Folders live in `nav aria-label="Inbox folders"`.
- The selected row uses `aria-current="page"` when it has an `href`, otherwise `aria-current="true"`.
- Rows are buttons (or links when `href` is set) and are keyboard-activable with Enter/Space.
- Count pills are text (`12`, `99+`), not icon-only.
