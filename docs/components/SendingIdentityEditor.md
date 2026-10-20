# SendingIdentityEditor

Sender fields from GTM `SendingIdentityEditor`, without Resend / DNS policy. The app passes `domains` (labels included) and optional `warning` / `domainsError`.

## Props

| Name           | Type                          | Default  | Description                                                |
| -------------- | ----------------------------- | -------- | ---------------------------------------------------------- |
| `value`        | `SendingIdentityValue`        | —        | Domain + local-parts + from name.                          |
| `onChange`     | `(value, valid) => void`      | —        | Next value + format validity.                              |
| `domains`      | `SendingDomainOption[]`       | —        | `{ value, label, disabled? }`.                             |
| `domainsError` | `ReactNode`                   | —        | Replaces the select with a read-only field + danger alert. |
| `warning`      | `ReactNode`                   | —        | Amber notice (receiving off, etc.).                        |
| `validate`     | `(value) => ValidationResult` | format   | Replace local-part / name / domain-required.               |
| `disabled`     | `boolean`                     | `false`  | All fields.                                                |
| `hint`         | `string`                      | GTM note | Footer.                                                    |

`SendingIdentityValue` uses camelCase (`sendingDomain`, `fromLocalPart`) — map to GTM snake_case in the app.

## Usage

```tsx
import { SendingIdentityEditor } from "@stack48/admin-ui/states";

<SendingIdentityEditor
  value={identity}
  domains={[{ value: "mail.agency.com", label: "mail.agency.com · receiving on" }]}
  onChange={(next, valid) => setIdentity(next, valid)}
/>;
```

## Do / don’t

| Do                                           | Don’t                         |
| -------------------------------------------- | ----------------------------- |
| Build option labels in the app               | Call Resend from the kit      |
| Pass “not allowed” as `disabled` + `warning` | Hard-code forbidden domains   |
| Keep the mono preview                        | Restyle it as a coloured card |

## Accessibility

- Every field has a visible label (`From name (optional)`, `From local part`, …).
- Domain is a native `<select>` (or a disabled input when `domainsError` is set).
- Field errors are `role="alert"` via `FormField`. The preview is text only.
- Do not move focus when `onChange` reports `valid: false` on each keystroke; focus the first invalid field on save in the app.
- `domainsError` is an `InlineAlert` (`role="alert"`).
