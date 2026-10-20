# Dialog

Centred modal. Overlay `bg-black/30`. Panel is white, 1px zinc, 2px radius, `shadow-lg`. No default close “×” — GTM puts Cancel in the footer.

## Props

Root: Radix `open` / `defaultOpen` / `onOpenChange` / `modal`.

### DialogContent

| Name   | Type                   | Default | Description                                                          |
| ------ | ---------------------- | ------- | -------------------------------------------------------------------- |
| `size` | `"md" \| "lg" \| "xl"` | `"md"`  | `md` = `max-w-lg` (send test). `lg` = `max-w-2xl` (campaign config). |
| `…`    | Radix Content          | —       | Includes `onOpenAutoFocus`.                                          |

`DialogTitle` and `DialogDescription` are required for an accessible name.

## Usage

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@stack48/admin-ui/primitives";

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Send test</DialogTitle>
      <DialogDescription>Max 5 addresses per send.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Close
      </Button>
      <Button>Send test</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

## Do / don’t

**Do**

- Keep the footer `justify-end gap-2` with secondary then primary.
- Use `size="lg"` for multi-tab config, `md` for confirm / send-test.

**Don’t**

- Add a decorative header gradient or a large close icon.
- Nest a second modal. GTM uses `window.confirm` for the rare extra prompt — do that in the app.

## Accessibility

- Role `dialog`, `aria-modal="true"`.
- Title is the accessible name; description is `aria-describedby`.
- Focus is trapped. Escape closes (`onOpenChange(false)`).
- Overlay click dismisses (Radix default). Do not disable that unless the action is destructive and you handle it in the app.
