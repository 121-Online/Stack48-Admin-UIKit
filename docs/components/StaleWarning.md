# StaleWarning

Amber “Stale” chip for outdated snapshots (GTM pre-flight, platform sync). Built on the primitives `Badge`.

## Props

| Name        | Type         | Default                                   | Description        |
| ----------- | ------------ | ----------------------------------------- | ------------------ |
| `children`  | `ReactNode`  | `"Stale"`                                 | Chip copy.         |
| `title`     | `string`     | `"Data is stale — refresh before acting"` | Native tooltip.    |
| `className` | `string`     | —                                         | Extra classes.     |
| `…`         | `span` attrs | —                                         | Native attributes. |

## Usage

```tsx
import { StaleWarning } from "@stack48/admin-ui/states";

<StaleWarning title="Audience changed. Re-run pre-flight." />;
```

## Do / don’t

| Do                                                 | Don’t                              |
| -------------------------------------------------- | ---------------------------------- |
| Pair with an `InlineAlert` when action is required | Use this as the only error on send |
| Keep the label uppercase micro                     | Animate or pulse the chip          |

## Accessibility

- Tooltip is the native `title` attribute (hover / long-focus). Put the full sentence there.
- Not a live region — mount it next to the control the user is about to use.
- Colour + the word “Stale” together; do not rely on amber alone.
