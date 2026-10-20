# ConfirmDialog

Modal confirm extracted from GTM mailing send and the dashboard’s `window.confirm` pauses. Built on the primitives `Dialog`.

`confirmMode="type"` is the “type `SEND` / the count” gate. Pass `validateConfirm` to replace that rule — the kit does not send mail.

## Props

| Name                   | Type                         | Default      | Description                           |
| ---------------------- | ---------------------------- | ------------ | ------------------------------------- |
| `open` / `defaultOpen` | `boolean`                    | —            | Controlled / uncontrolled.            |
| `onOpenChange`         | `(open) => void`             | —            | Radix close (Escape, overlay).        |
| `title`                | `ReactNode`                  | —            | Dialog title (required for the name). |
| `description`          | `ReactNode`                  | —            | Supporting copy.                      |
| `children`             | `ReactNode`                  | —            | Extra body (settings summary).        |
| `confirmLabel`         | `string`                     | `"Confirm"`  | Primary action.                       |
| `cancelLabel`          | `string`                     | `"Cancel"`   | Secondary action.                     |
| `variant`              | `"default" \| "destructive"` | `"default"`  | Danger button for delete.             |
| `confirmMode`          | `"click" \| "type"`          | `"click"`    | Type-to-confirm gate.                 |
| `confirmToken`         | `string`                     | `"SEND"`     | Accepted phrase.                      |
| `confirmCount`         | `number`                     | —            | Alternate accepted value.             |
| `validateConfirm`      | `(value) => boolean`         | token/count  | Override the default gate.            |
| `confirmValue`         | `string`                     | uncontrolled | Typed value.                          |
| `onConfirm`            | `() => void`                 | —            | Primary action.                       |
| `busy`                 | `boolean`                    | `false`      | Disables actions.                     |
| `confirmDisabled`      | `boolean`                    | `false`      | Extra disable (app-side preflight).   |

`isTypeConfirmAccepted` is exported for apps that want the same rule outside the dialog.

## Usage

```tsx
import { ConfirmDialog } from "@stack48/admin-ui/states";

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Confirm send"
  description="This will send to 1,240 pre-flight OK recipients."
  confirmMode="type"
  confirmCount={1240}
  confirmLabel="Send mailing"
  onConfirm={send}
/>;
```

## Do / don’t

| Do                                    | Don’t                            |
| ------------------------------------- | -------------------------------- |
| Use `type` for irreversible sends     | Nest a second modal              |
| Put Cancel then Confirm in that order | Add a decorative close “×”       |
| Keep product counts in the app        | Compute preflight inside the kit |

## Accessibility

- Role `dialog`, `aria-modal="true"`. Title is the accessible name.
- Focus is trapped by Radix. Escape and overlay click call `onOpenChange(false)`.
- **Type mode:** `onOpenAutoFocus` moves focus to the confirm input (not the first footer button). Enter submits when the phrase matches.
- Confirm stays disabled until the phrase/count matches, so keyboard users cannot tab-activate a half-typed send.
- After close, Radix restores focus to the trigger. Keep the trigger mounted.
