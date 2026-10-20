# Adoption

Migration guide for apps that already look like the GTM ops dashboard and should switch onto `@stack48/admin-ui`.

Tokens shipped in PR1. Primitives, shell / tables, and inbox mapping is below; charts and states land in parallel PRs.

## Target apps

- GTM ops dashboard (source of visual truth): [gtm.stack48.com](https://gtm.stack48.com)
- Future Stack48 internal admin surfaces that should share chrome, tables, and density

## Planned steps

1. **Depend on a tagged kit** — `"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"`.
2. **Preset + CSS** — add `@stack48/admin-ui/preset` and import `@stack48/admin-ui/styles.css` after Tailwind. Confirm canvas `#fafafa`, body 13px Inter, focus ring blue-500.
3. **Replace local `cn()`** with `@stack48/admin-ui` / `@stack48/admin-ui/cn`.
4. **Swap primitives** (`btn-primary`, `btn-secondary`, `btn-danger`, `input-field`, `badge-*`, `stat-card`) for kit primitives when that PR ships.
5. **Swap chrome** (sidebar `w-64`, header `h-14`) for `AppShell`, `Sidebar`, `PageHeader`, and `DataTable` from `@stack48/admin-ui/admin`. Pass `pathname` and `renderLink` — do not copy GTM’s `usePathname` / `next/link` / unhandled-count fetch.
6. **Delete duplicated tokens** from the app’s `globals.css` / `tailwind.config` once the kit is the source of truth.

Do not restyle the kit to match an app. If GTM and the kit diverge, change the kit with a changeset.

## Status

| Surface                | Kit home                                                       | App migration        |
| ---------------------- | -------------------------------------------------------------- | -------------------- |
| Tokens, preset, `cn()` | `src/tokens`, `src/preset`, `src/lib/cn`                       | Ready (this release) |
| Primitives             | `src/primitives`                                               | Ready                |
| Shell / tables         | `src/admin` (`AppShell`, `Sidebar`, `PageHeader`, `DataTable`) | Ready                |
| Charts                 | `src/charts`                                                   | Pending              |
| Inbox                  | `src/inbox`                                                    | Ready (this PR)      |
| Modals / empty / error | `src/states`                                                   | Pending              |
