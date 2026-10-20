---
"@stack48/admin-ui": minor
---

Add presentational admin chrome extracted from the GTM ops dashboard: `AppShell`, `Sidebar` (collapsible groups, footer slot, `renderLink`), `Topbar` / `PageHeader` / `Breadcrumbs`, and a dense full-width `DataTable` with toolbar filters (`FilterSelect`, `MultiSelectFilter`), row selection, sticky header, and client or controlled server pagination.

Note: DataTable selection uses a minimal checkbox under `src/admin/_internal` until the primitives Checkbox lands.
