# ScheduleEditor

Presentational day / time-window picker from GTM `ScheduleEditor`. Timezone typeahead, Mon–Sun rows, reset to the supplied default. No campaign types and no send-queue logic.

## Props

| Name               | Type                                | Default              | Description                      |
| ------------------ | ----------------------------------- | -------------------- | -------------------------------- |
| `value`            | `ScheduleValue`                     | —                    | Timezone + per-day windows.      |
| `onChange`         | `(value, valid) => void`            | —                    | Emits the next value + validity. |
| `disabled`         | `boolean`                           | `false`              | All controls.                    |
| `timezones`        | `string[]`                          | `Intl` list          | Override the IANA list.          |
| `validateTimezone` | `(tz) => ValidationResult`          | IANA membership      | Replace the default.             |
| `validateWindow`   | `(day, window) => ValidationResult` | HH:MM + start&lt;end | Per-day rule.                    |
| `validateSchedule` | `(value) => ValidationResult`       | all of the above     | Whole-form rule.                 |
| `defaultValue`     | `ScheduleValue`                     | London Mon–Fri 9–5   | Reset target.                    |
| `resetLabel`       | `string`                            | GTM copy             | Reset button.                    |
| `hint`             | `string`                            | GTM queue copy       | Footer note.                     |

`DAY_KEYS`, `DAY_LABELS`, `DEFAULT_SCHEDULE`, and the validators are exported.

## Usage

```tsx
import { ScheduleEditor, DEFAULT_SCHEDULE } from "@stack48/admin-ui/states";

<ScheduleEditor value={schedule} onChange={(next, valid) => save(next, valid)} />;
```

## Do / don’t

| Do                                               | Don’t                          |
| ------------------------------------------------ | ------------------------------ |
| Pass stored windows in via `value`               | Import GTM `SendWindows` types |
| Tighten “at least one day” in `validateSchedule` | Encode that as kit policy      |
| Keep reset copy sentence-case                    | Use a clock-widget popover     |

## Accessibility

- Timezone is a labelled text field with a `datalist` (native suggestions).
- Each day checkbox has `aria-label` of the weekday; start/end use `{day} start` / `{day} end`.
- Invalid enabled days show inline text (`text-red-600`). The form also exposes a `status` when the whole schedule is invalid.
- Reset is a text button — keep it in tab order after the timezone field.
- Disabled fields use native `disabled` (removed from the tab order).
