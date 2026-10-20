# Switch

Dense send-style toggle. GTM’s “send switch” is a labelled checkbox + status; this is the Radix equivalent in the same zinc chrome.

## Props

| Name              | Type                         | Default      | Description                           |
| ----------------- | ---------------------------- | ------------ | ------------------------------------- |
| `checked`         | `boolean`                    | uncontrolled | Controlled state.                     |
| `defaultChecked`  | `boolean`                    | `false`      | Uncontrolled initial.                 |
| `onCheckedChange` | `(checked: boolean) => void` | —            | Change handler.                       |
| `disabled`        | `boolean`                    | `false`      | Opacity 50.                           |
| `…`               | Radix Switch props           | —            | Includes `name`, `value`, `required`. |

## Usage

```tsx
import { Label, Switch } from "@stack48/admin-ui/primitives";

<Switch id="send-switch" checked={enabled} onCheckedChange={setEnabled} />
<Label htmlFor="send-switch" variant="inline">Sending enabled</Label>
```

## Do / don’t

**Do**

- Use for an immediate on/off that is not part of a multi-select filter.
- Pair with a status indicator if the product shows live / breaker state.

**Don’t**

- Use a large iOS-style switch or brand-blue track.
- Put product rules (caps, breaker) inside the component — pass `checked` in.

## Accessibility

- Role `switch`. Space / Enter toggles.
- Requires an accessible name (`aria-label` or `Label`).
- Focus ring is `--ring` (blue-500).
