# useInboxKeyboard

Optional window-level hook for GTM / Gmail inbox shortcuts. Callbacks only — the kit never marks, deletes, or navigates on its own.

Also exported: `resolveInboxKey`, `isEditableKeyboardTarget`, `nextFocusedIndex`, `INBOX_SHORTCUTS`.

## Import

```ts
import { useInboxKeyboard, nextFocusedIndex, INBOX_SHORTCUTS } from "@stack48/admin-ui/inbox";
```

## Callbacks / options

| Name            | Type                       | Description                                            |
| --------------- | -------------------------- | ------------------------------------------------------ |
| `onMove`        | `(delta: 1 \| -1) => void` | `j` / `k`                                              |
| `onOpen`        | `() => void`               | `Enter` / `o`                                          |
| `onSelect`      | `() => void`               | `x`                                                    |
| `onMarkHandled` | `() => void`               | `e`                                                    |
| `onDelete`      | `() => void`               | `#`                                                    |
| `onBack`        | `() => void`               | `u` / `Escape`                                         |
| `onSearch`      | `() => void`               | `/`                                                    |
| `onHelp`        | `() => void`               | `?`                                                    |
| `enabled`       | `boolean`                  | Default `true`. When `false`, no listener is attached. |

While the event target is editable (text input, search, textarea, select, `contenteditable`), every shortcut is ignored except `Escape` (blur + `onBack`), matching GTM.

## Usage

```tsx
useInboxKeyboard({
  onMove: (delta) => setFocused((i) => nextFocusedIndex(i, delta, items.length)),
  onOpen: () => open(items[focused]?.id),
  onSelect: () => toggle(items[focused]?.id),
  onMarkHandled: () => mark(selectedIds.length ? selectedIds : [items[focused]?.id]),
  onDelete: () => destroy(selectedIds),
  onBack: () => setOpenId(null),
  onSearch: () => document.querySelector<HTMLInputElement>("[data-inbox-search]")?.focus(),
  onHelp: () => setHelpOpen((v) => !v),
});
```

## Do / don’t

| Do                                                        | Don’t                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| Bind only the actions the host implements                 | Put fetch / mark-handled inside the hook                            |
| Use `nextFocusedIndex` to clamp `j`/`k`                   | Wrap every key in `preventDefault` yourself — the hook already does |
| Render `INBOX_SHORTCUTS` in a `role="dialog"` cheat-sheet | Capture keys while the user is typing a reply                       |

## Accessibility

| Key            | Action                             |
| -------------- | ---------------------------------- |
| `j` / `k`      | Move down / up                     |
| `Enter` / `o`  | Open focused row                   |
| `e`            | Mark handled                       |
| `#`            | Delete                             |
| `x`            | Toggle selection                   |
| `/`            | Focus search (`data-inbox-search`) |
| `u` / `Escape` | Back to list / blur                |
| `?`            | Shortcuts overlay                  |

- The hook calls `event.preventDefault()` only when it recognises a shortcut.
- Cmd/Ctrl/Alt chords are ignored so browser shortcuts keep working.
- Checkboxes are **not** treated as editable, so `j`/`k` still move after a row is ticked.
- Announce focus changes in the host if you move `aria-activedescendant`; the kit styles the focused row but does not manage a listbox activedescendant.
