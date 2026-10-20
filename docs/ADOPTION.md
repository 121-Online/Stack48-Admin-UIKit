# Adoption

Migration guide for apps that already look like the GTM ops dashboard and should switch onto `@stack48/admin-ui`.

This kit is **presentational**. Replace markup and class names; keep fetching, auth, and domain rules in the app. Pin a git tag — do not install from npm.

```json
"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#v0.1.0"
```

Install steps (Tailwind preset + `styles.css`) are in the [README](../README.md). Import map: [AGENTS.md](../AGENTS.md).

## Target apps

- GTM ops dashboard (source of visual truth): [gtm.stack48.com](https://gtm.stack48.com)
- Future Stack48 internal admin surfaces that should share chrome, tables, and density

## Planned steps

1. **Depend on a tagged kit** — `"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"`.
2. **Preset + CSS** — add `@stack48/admin-ui/preset` and import `@stack48/admin-ui/styles.css` after Tailwind. Confirm canvas `#fafafa`, body 13px Inter, focus ring blue-500.
3. **Replace local `cn()`** with `@stack48/admin-ui` / `@stack48/admin-ui/cn`.
4. **Swap primitives** — see the CSS and `ui/*` tables below.
5. **Swap chrome** — `AppShell`, `Sidebar`, `PageHeader`, `DataTable` from `@stack48/admin-ui/admin`. Pass `pathname` and `renderLink` — do not copy GTM’s `usePathname` / `next/link` / unhandled-count fetch.
6. **Swap charts / inbox / states** — tables below. Install optional peer `recharts@^2.12` if you use activity / reputation / horizontal-funnel plots.
7. **Delete duplicated tokens** from the app’s `globals.css` / `tailwind.config` once the kit is the source of truth.

Do not restyle the kit to match an app. If GTM and the kit diverge, change the kit with a changeset.

## Status

| Surface                | Kit home                                 | App migration |
| ---------------------- | ---------------------------------------- | ------------- |
| Tokens, preset, `cn()` | `src/tokens`, `src/preset`, `src/lib/cn` | Ready         |
| Primitives             | `@stack48/admin-ui/primitives`           | Ready         |
| Shell / tables         | `@stack48/admin-ui/admin`                | Ready         |
| Charts                 | `@stack48/admin-ui/charts`               | Ready         |
| Inbox                  | `@stack48/admin-ui/inbox`                | Ready         |
| Modals / empty / error | `@stack48/admin-ui/states`               | Ready         |

## CSS classes (GTM → kit)

| GTM                         | Kit                                                                                      | Notes                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `.btn-primary`              | `Button`                                                                                 | Default variant. Zinc-900 (`bg-primary`), not brand blue.                                   |
| `.btn-secondary`            | `Button variant="secondary"`                                                             | 1px zinc border.                                                                            |
| `.btn-danger`               | `Button variant="destructive"`                                                           |                                                                                             |
| ghost / border-only control | `Button variant="ghost"`                                                                 |                                                                                             |
| text link                   | `Button variant="link"`                                                                  | `text-brand`.                                                                               |
| `.input-field`              | `Input`, `Textarea`, `SelectTrigger`                                                     | 2px radius, zinc-300 border, blue-500 focus. Native `<select>` toolbars use `FilterSelect`. |
| `.badge`                    | `Badge`                                                                                  | Default zinc chip.                                                                          |
| `.badge-new`                | `Badge variant="inverse"`                                                                | Zinc-900 fill.                                                                              |
| `.badge-signed-up`          | `Badge variant="successSolid"`                                                           | Solid emerald.                                                                              |
| health / taxonomy chips     | `Badge variant="success" \| "warning" \| "danger" \| "info" \| "muted"` + optional `dot` |                                                                                             |
| `.stat-card`                | `bg-card border border-border rounded-sm p-4` or `Section` / `KpiTile`                   | **No shadow.** Do not wrap every metric in a boxed card.                                    |
| body 13px Inter             | `@stack48/admin-ui/styles.css`                                                           | Load after `@tailwind` so body rules win.                                                   |
| `w-64` sidebar / `h-14` bar | `w-sidebar` / `h-header` (`AppShell`, `Sidebar`, `Topbar`)                               |                                                                                             |

## `components/ui/*` (GTM → kit)

| GTM                                                                                         | Kit                                                                            | Import                         |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| `ui/Badge`                                                                                  | `Badge`                                                                        | `@stack48/admin-ui/primitives` |
| `ui/StatusIndicator`                                                                        | `StatusIndicator`                                                              | `@stack48/admin-ui/primitives` |
| `ui/Section`                                                                                | `Section`, `SectionDivider`                                                    | `@stack48/admin-ui/primitives` |
| `ui/KpiStrip`, `KpiItem`, `KpiDivider`                                                      | `KpiStrip`, `KpiItem`, `KpiDivider`                                            | `@stack48/admin-ui/charts`     |
| `ui/Sparkline`                                                                              | `Sparkline`                                                                    | `@stack48/admin-ui/charts`     |
| `ui/DataTable`                                                                              | `DataTable` + `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableCell` | `@stack48/admin-ui/admin`      |
| `Sidebar.tsx` (rail + `AppShell` frame)                                                     | `Sidebar`, `AppShell`                                                          | `@stack48/admin-ui/admin`      |
| list-page title / crumbs                                                                    | `PageHeader`, `Topbar`, `Breadcrumbs`                                          | `@stack48/admin-ui/admin`      |
| `VocabMultiSelect`                                                                          | `MultiSelectFilter`                                                            | `@stack48/admin-ui/admin`      |
| `VocabChipList`                                                                             | `ChipList`                                                                     | `@stack48/admin-ui/admin`      |
| `AudienceFilter`                                                                            | `FilterSelect`                                                                 | `@stack48/admin-ui/admin`      |
| “Sendable Queue Only” / “Show Deleted”                                                      | `FilterCheckbox`                                                               | `@stack48/admin-ui/admin`      |
| native checkbox / Radix shadcn Checkbox                                                     | `Checkbox`                                                                     | `@stack48/admin-ui/primitives` |
| labelled field                                                                              | `Label` + `FormField`                                                          | primitives / states            |
| shadcn Dialog / dropdown / popover / tabs / toast / tooltip / switch / skeleton / separator | same names                                                                     | `@stack48/admin-ui/primitives` |

Pass `renderLink` (or `asChild` on breadcrumbs) so links work with Next.js `Link`, React Router, or a plain `<a>`.

## Charts mapping (GTM → kit)

| GTM                                         | Kit                                 | Notes                                                                |
| ------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| `ui/KpiStrip`, `KpiItem`, `KpiDivider`      | `KpiStrip`, `KpiItem`, `KpiDivider` | Unboxed strip. One panel around the row, not per tile.               |
| `charts/KpiTile`, `KpiTileRow`              | `KpiTile`, `KpiTileRow`             | Sparkline is SVG (not Recharts).                                     |
| `PlatformAccountMetricsHeader`              | `MetricsHeader`                     | Pass stats / breakdowns / warning copy. App owns “24h stale” rules.  |
| `ui/Sparkline`                              | `Sparkline`                         | Optional `fill` for KPI tiles.                                       |
| `DailyActivityChart`                        | `DailyActivityChart`                | Same Recharts areas. Default series = sent/delivered/opened/clicked. |
| `BufferHealthBar`, `ScoreBandBar`           | `StackedBars`                       | Generic `segments`; no product keys.                                 |
| `DeliveryFunnel`                            | `DeliveryFunnel`                    | `stages[]` instead of `{ sent, delivered, opened, clicked }`.        |
| `DeliveryFunnelHorizontal`                  | `DeliveryFunnelHorizontal`          | Recharts peer.                                                       |
| `TaperedFunnel`                             | `TaperedFunnel`                     | Same trapezoids. Empty state instead of `null`.                      |
| `BounceRateChart`, `ComplaintRateChart`     | same names, plus `RateTrendChart`   | Pass `rate` in percent (or `rateIsFraction`). Thresholds are props.  |
| `WorldMap` + `react-simple-maps` + TopoJSON | `WorldMap`                          | Schematic SVG, same toggle + list. No geo fetch.                     |

Formatters (`formatValue`, `formatPercent`, `formatTick`, `formatLabel`) are props on every plot. Each chart includes a hidden data table (or visible text for KPI chrome).

## Inbox pages (GTM `src/app/inbox/**` → kit)

| GTM                    | Kit                                    | Notes                                                                         |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| `InboxContent` layout  | `InboxLayout`                          | Folder rail / list / reading pane. Host owns `md`/`lg` data, not breakpoints. |
| folder rail            | `FolderList`                           | Counts via props. No unhandled fetch.                                         |
| message list           | `MessageList`                          | Search, selection, bulk, cursor paging via `onPage`.                          |
| thread / reading pane  | `ThreadView`                           | `replySlot` is caller-owned.                                                  |
| message headers        | `MessageMeta`                          |                                                                               |
| HTML body              | `SandboxedHtml`                        | **Only** supported HTML path. Never `dangerouslySetInnerHTML`.                |
| keyboard overlay (`?`) | `useInboxKeyboard` + `INBOX_SHORTCUTS` | Callbacks API (`j`/`k`, `Enter`/`o`, `e`, `#`, `u`, `/`, `x`, `?`).           |
| Gmail toast            | `Toast`                                | `@stack48/admin-ui/primitives`                                                |

## Modals, forms, empty / error (GTM → kit)

| GTM                                     | Kit                                    | Notes                                                                  |
| --------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| `mailings/SendTestModal`                | `MultiEmailModal`                      | Chips + max count + format check. Kit does **not** send mail.          |
| type `SEND` / the count gate            | `ConfirmDialog` (`confirmMode="type"`) | Override with `validateConfirm`.                                       |
| `window.confirm` pauses                 | `ConfirmDialog`                        |                                                                        |
| `ScheduleEditor`                        | `ScheduleEditor`                       | Day windows + timezone typeahead. Validation defaults are format-only. |
| `SendingIdentityEditor`                 | `SendingIdentityEditor`                | Domain options via props. No domain policy.                            |
| campaign-config field                   | `FormField`, `FormSection`             |                                                                        |
| empty list (`No leads found`, …)        | `EmptyState`                           |                                                                        |
| table pulse / inline refresh            | `LoadingState`, `Spinner`              |                                                                        |
| failed load + retry                     | `ErrorState`                           |                                                                        |
| red / amber / emerald / blue notice box | `InlineAlert` / `Banner`               |                                                                        |
| pre-flight “Stale” chip                 | `StaleWarning`                         | App decides when to show it.                                           |

## Stay in the app

Do **not** move these into the kit:

- `fetch`, React Query, Supabase, Resend, Gmail, cookies, auth
- `usePathname`, `next/link` (pass `renderLink` instead)
- unhandled-count / mailbox queries
- audience enums, send-test I/O, “24h stale” product rules
- `dangerouslySetInnerHTML` for email HTML

Every replacement is props in, events out. Docs for each component: [`docs/components/`](./components/).
