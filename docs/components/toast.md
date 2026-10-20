# Toast

GTM inbox toast: `fixed bottom-4 right-4`, zinc-900, white 13px, `px-3 py-2`, 2px radius, `shadow-lg`.

Presentational Radix toast. The app owns when to open it and what the copy says.

## Props

### Toast

| Name           | Type                      | Default       | Description                  |
| -------------- | ------------------------- | ------------- | ---------------------------- |
| `open`         | `boolean`                 | uncontrolled  | Controlled visibility.       |
| `onOpenChange` | `(open: boolean) => void` | —             | Called on dismiss / timeout. |
| `duration`     | `number`                  | Radix default | Ms before auto-dismiss.      |

Also: `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`, `ToastViewport`, `ToastProvider`.

## Usage

```tsx
import { Toast, ToastProvider, ToastTitle, ToastViewport } from "@stack48/admin-ui/primitives";

<ToastProvider>
  <Toast open={open} onOpenChange={setOpen}>
    <ToastTitle>Reply sent</ToastTitle>
  </Toast>
  <ToastViewport />
</ToastProvider>;
```

## Do / don’t

**Do**

- One line of confirmation (“Reply sent”, “Test queued”).
- Sit it bottom-right. Do not move it to a top banner.

**Don’t**

- Use colour variants for success/error — GTM’s toast is always zinc-900. Put errors in the form.
- Build a stacked notification centre.

## Accessibility

- Role `status` (Radix). Announced politely.
- `ToastClose` includes a visually hidden “Close”.
- Keep `duration` long enough to read (~4s). Do not flash.
- Viewport is `z-[100]` so it sits above dialogs only if you want that — GTM toasts appear on the page, not over modals.
