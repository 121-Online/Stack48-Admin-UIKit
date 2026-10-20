# ErrorState

Failed-load frame from GTM campaign pages (`Error loading campaigns` in red) plus an optional retry. Compact mode is the inline red notice used on platform-users.

## Props

| Name         | Type         | Default                  | Description                             |
| ------------ | ------------ | ------------------------ | --------------------------------------- |
| `title`      | `ReactNode`  | `"Something went wrong"` | Heading.                                |
| `message`    | `ReactNode`  | —                        | Supporting copy from the app.           |
| `onRetry`    | `() => void` | —                        | Hide the button when omitted.           |
| `retryLabel` | `string`     | `"Retry"`                | Button label.                           |
| `retrying`   | `boolean`    | `false`                  | Disables the button, shows “Retrying…”. |
| `compact`    | `boolean`    | `false`                  | Inline strip vs centred page frame.     |
| `className`  | `string`     | —                        | Extra classes.                          |

## Usage

```tsx
import { ErrorState } from "@stack48/admin-ui/states";

<ErrorState title="Error loading campaigns" message={error} onRetry={() => refetch()} />;
```

## Do / don’t

| Do                                       | Don’t                                  |
| ---------------------------------------- | -------------------------------------- |
| Pass the real error string via `message` | Swallow the failure into an empty card |
| Keep retry in the app (no fetch here)    | Auto-retry in a loop inside the kit    |
| Use `compact` under a page header        | Recolor the heading to brand blue      |

## Accessibility

- `role="alert"` so the failure is announced.
- Retry is a real `<button>`. Disabled while `retrying` (removed from the tab order).
- Page frame: heading is `h2` so the app can keep a single `h1`.
- After a successful retry, move focus to the recovered content in the app — the kit does not steal focus.
