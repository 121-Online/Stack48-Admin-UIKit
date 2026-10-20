# MultiEmailModal

Multi-address modal modelled on GTM `mailings/SendTestModal`. Chips replace the dashboard textarea. Validation and the max count are props; defaults are a loose email pattern and 5 addresses. The kit does not send mail.

## Props

| Name             | Type                 | Default              | Description                    |
| ---------------- | -------------------- | -------------------- | ------------------------------ |
| `open`           | `boolean`            | —                    | Controlled.                    |
| `onOpenChange`   | `(open) => void`     | —                    | Close handler.                 |
| `title`          | `ReactNode`          | `"Send test"`        | Dialog title.                  |
| `description`    | `ReactNode`          | GTM send-test        | “Any address… Max N per send.” |
| `emails`         | `string[]`           | —                    | Chip values (controlled).      |
| `onEmailsChange` | `(emails) => void`   | —                    | Chip updates.                  |
| `maxCount`       | `number`             | `5`                  | Hard cap.                      |
| `validateEmail`  | `(email) => boolean` | `isValidEmail`       | Format check.                  |
| `label`          | `string`             | `"Recipient emails"` | Field label.                   |
| `busy`           | `boolean`            | `false`              | Disables the field and submit. |
| `error`          | `ReactNode`          | —                    | Danger `InlineAlert`.          |
| `success`        | `ReactNode`          | —                    | Success `InlineAlert`.         |
| `onSubmit`       | `(emails) => void`   | —                    | Fires with the chip list.      |

Helpers: `parseEmailList`, `isValidEmail`, `testQueuedMessage`, `DEFAULT_MAX_EMAILS`.

## Usage

```tsx
import { MultiEmailModal } from "@stack48/admin-ui/states";

<MultiEmailModal
  open={open}
  onOpenChange={setOpen}
  emails={emails}
  onEmailsChange={setEmails}
  onSubmit={(to) => sendTest(to)}
  error={error}
  busy={sending}
/>;
```

Add chips with Enter, comma, Tab, blur, or a pasted list. Backspace on an empty draft removes the last chip.

## Do / don’t

| Do                                     | Don’t                                        |
| -------------------------------------- | -------------------------------------------- |
| Keep the cap in props (default 5)      | Parse / send inside the kit                  |
| Show server errors via `error`         | Block “any address” in the default validator |
| Use chips so each address is removable | Rebuild the GTM raw textarea                 |

## Accessibility

- Role `dialog`. Title + description name and describe the modal.
- **Focus:** `onOpenAutoFocus` focuses the chip input. Escape / overlay close restore focus to the trigger.
- Each chip has `aria-label="Remove {email}"`. The field is `aria-invalid` when the draft is rejected.
- Submit is disabled when the list is empty or any chip fails `validateEmail`.
- Live errors use `role="alert"` (local) or `InlineAlert` (server).
