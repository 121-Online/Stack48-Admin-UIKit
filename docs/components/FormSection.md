# FormSection

Titled form group from GTM campaign config (`Sending hours`, `From`). Full width, no cartoon card. Compose {@link FormField} inside.

## Props

| Name          | Type        | Default | Description                    |
| ------------- | ----------- | ------- | ------------------------------ |
| `title`       | `ReactNode` | —       | `text-xs font-medium` heading. |
| `description` | `ReactNode` | —       | One-line muted caption.        |
| `action`      | `ReactNode` | —       | Right-aligned reset / edit.    |
| `bordered`    | `boolean`   | `false` | 1px zinc wrap around children. |
| `children`    | `ReactNode` | —       | Fields.                        |
| `className`   | `string`    | —       | Extra classes.                 |

## Usage

```tsx
import { FormSection } from "@stack48/admin-ui/states";

<FormSection
  title="Sending hours"
  action={<button type="button">Reset to Mon-Fri 09:00-17:00</button>}
>
  <ScheduleEditor value={schedule} onChange={setSchedule} />
</FormSection>;
```

## Do / don’t

| Do                        | Don’t                              |
| ------------------------- | ---------------------------------- |
| Keep the header `text-xs` | Use a 24px marketing section title |
| Put reset in `action`     | Wrap each field in its own card    |

## Accessibility

- Title renders as `h3`. Keep page outline `h1` → `h2` (page section) → `h3`.
- `action` must be a real button (or `aria-label` if icon-only).
- The section is a landmark (`<section>`); give it `aria-labelledby` in the app if several share a page.
