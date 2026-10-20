# InboxLayout

Three-pane Gmail-style chrome extracted from the GTM inbox: a folder rail, a message list, and a reading pane. Presentational — pass the pane contents as nodes.

## Import

```ts
import { InboxLayout } from "@stack48/admin-ui/inbox";
```

## Props

| Name              | Type        | Default | Description                                                                     |
| ----------------- | ----------- | ------- | ------------------------------------------------------------------------------- |
| `list`            | `ReactNode` | —       | Centre column. Typically `MessageList`.                                         |
| `folderRail`      | `ReactNode` | —       | Left rail. Typically `FolderList`. Hidden below `md`.                           |
| `readingPane`     | `ReactNode` | —       | Right pane. Typically `ThreadView`.                                             |
| `readingPaneOpen` | `boolean`   | `false` | When true, the list shrinks (`lg`) or hides (below `lg`) and the pane is shown. |
| `toolbar`         | `ReactNode` | —       | Optional chrome above the list + pane.                                          |
| `className`       | `string`    | —       | Extra classes on the root.                                                      |

## Usage

```tsx
<InboxLayout
  readingPaneOpen={Boolean(openId)}
  folderRail={<FolderList folders={folders} selectedFolderId={folder} onSelectFolder={setFolder} />}
  list={<MessageList items={items} openId={openId} onOpen={setOpenId} />}
  readingPane={<ThreadView title={leadName} messages={messages} replySlot={composer} />}
/>
```

## Do / don’t

| Do                                           | Don’t                                                           |
| -------------------------------------------- | --------------------------------------------------------------- |
| Pass already-loaded rows and callbacks       | Fetch mail, talk to Gmail/Resend, or own routing inside the kit |
| Keep the three panes dense and full-width    | Wrap the layout in a centred `max-w-prose` card                 |
| Hide the pane with `readingPaneOpen={false}` | Mount a second copy of the list for mobile                      |

## Accessibility

- List column is a `region` named **Message list**.
- Reading pane is a `region` named **Reading pane**.
- Folder rail is an `<aside>`; `FolderList` supplies the folder `nav`.
- Keyboard: this layout does not trap focus. Compose `useInboxKeyboard` on the page (`j`/`k` move, `Enter`/`o` open, `u` back, `/` search). Below `lg`, opening a message hides the list — provide a Back control in the pane.
