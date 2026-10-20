# Changelog

## 0.1.0

### Minor Changes

- [#1](https://github.com/121-Online/Stack48-Admin-UIKit/pull/1) [`1d3b782`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/1d3b782eb157fe0a95680dcc6b9c8d4f133c3c3e) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Initial kit scaffold: TypeScript + pnpm + tsup, Stack48 design tokens extracted from the GTM dashboard, Tailwind preset, `cn()`, Storybook Foundations, and git-dependency release tooling (semver tags, no npm publish).

- [#2](https://github.com/121-Online/Stack48-Admin-UIKit/pull/2) [`9c4ee4e`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/9c4ee4eee6d3f81ebe498a546eea3d07a61289f4) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Add GTM-styled shadcn primitives: Button, Input, Textarea, Select, Checkbox, Switch, Label, Badge, StatusIndicator, Section, Tabs, Dialog, DropdownMenu, Popover, Tooltip, Separator, Skeleton, and Toast.

- [#3](https://github.com/121-Online/Stack48-Admin-UIKit/pull/3) [`0cefcbc`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/0cefcbc17862e9863d7385836ffb312be1f4a68f) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Add presentational admin chrome extracted from the GTM ops dashboard: `AppShell`, `Sidebar` (collapsible groups, footer slot, `renderLink`), `Topbar` / `PageHeader` / `Breadcrumbs`, and a dense full-width `DataTable` with toolbar filters (`FilterSelect`, `MultiSelectFilter`), row selection, sticky header, and client or controlled server pagination.

  Note: DataTable selection uses a minimal checkbox under `src/admin/_internal` until the primitives Checkbox lands.

- [#5](https://github.com/121-Online/Stack48-Admin-UIKit/pull/5) [`0bd8c59`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/0bd8c5951f705e38b289da403c7d46960eb97b31) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Presentational charts namespace: unboxed KPI strip/tiles, dense metrics header, SVG sparklines, Recharts activity and reputation trends, stacked bars, delivery/tapered funnels, and a lightweight schematic world map. Data and formatters arrive via props; each plot includes an accessible hidden table.

- [#4](https://github.com/121-Online/Stack48-Admin-UIKit/pull/4) [`65acf5d`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/65acf5dbd3cbcec2c295dc848757f40cf1ed37e2) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Add the presentational Gmail-style inbox kit (`InboxLayout`, `FolderList`, `MessageList`, `ThreadView`, `MessageMeta`, `SandboxedHtml`, `useInboxKeyboard`). Untrusted HTML renders only through a sandboxed iframe with a CSP `srcdoc`.

- [#6](https://github.com/121-Online/Stack48-Admin-UIKit/pull/6) [`6e00449`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/6e00449c1aba1a8cd83b4e14ea09234420e66e16) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Add presentational empty / loading / error / alert frames and form-modal primitives extracted from the GTM ops dashboard: `EmptyState`, `LoadingState` (skeleton rows + inline spinner), `ErrorState` with retry, `InlineAlert` / `Banner`, `StaleWarning`, `FormField`, `FormSection`, `ConfirmDialog` (including type `SEND` / count), `MultiEmailModal` (chips, validation, max count), and generic `ScheduleEditor` / `SendingIdentityEditor`. Validation defaults are format checks and can be replaced via props.

- [#7](https://github.com/121-Online/Stack48-Admin-UIKit/pull/7) [`72c9b20`](https://github.com/121-Online/Stack48-Admin-UIKit/commit/72c9b203dc7ccd914f8eda00a0d6b66ff43f1cb9) Thanks [@JamesFNGibbons](https://github.com/JamesFNGibbons)! - Polish the first tagged release (v0.1.0): compose admin and inbox chrome on primitives instead of duplicated `_internal` copies, complete git-dependency docs (README quickstart, ADOPTION mapping, AGENTS/llms export catalog, components index), and keep `prepare` as the dist build on git install.

All notable changes to `@stack48/admin-ui` are documented in this file.

Versioning is [semver](https://semver.org/) via [changesets](https://github.com/changesets/changesets).
Releases are **Git tags** of the form `vX.Y.Z` plus a GitHub Release. This package is **not** published to npm or GitHub Packages.

Consume a release with:

```json
"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"
```

## Unreleased

See `.changeset/` until the Version PR lands. The first tagged release will be **v0.1.0** (scaffold, tokens, preset, docs).
