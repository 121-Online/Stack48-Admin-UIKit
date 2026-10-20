---
"@stack48/admin-ui": minor
---

Add presentational empty / loading / error / alert frames and form-modal primitives extracted from the GTM ops dashboard: `EmptyState`, `LoadingState` (skeleton rows + inline spinner), `ErrorState` with retry, `InlineAlert` / `Banner`, `StaleWarning`, `FormField`, `FormSection`, `ConfirmDialog` (including type `SEND` / count), `MultiEmailModal` (chips, validation, max count), and generic `ScheduleEditor` / `SendingIdentityEditor`. Validation defaults are format checks and can be replaced via props.
