# Stack48 Admin UI

Presentational React + shadcn/ui kit for Stack48 internal ops tools. Visual source of truth: the GTM dashboard at [gtm.stack48.com](https://gtm.stack48.com) (dense Inter 13px, zinc canvas, blue-500 brand, 2px radii).

This package is **not** published to npm. Apps consume it as **source from this GitHub repo** (git dependency and/or copy-in). `prepare` builds ESM + `.d.ts` on git install.

| Consume via    | Spec                                                                  |
| -------------- | --------------------------------------------------------------------- |
| Git dependency | `"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"` |
| Copy-in        | copy `src/` and import from your tree; still add the preset + CSS     |

Peer dependencies: `react`, `react-dom`, `tailwindcss` **^3.4**. Optional peer: `recharts` **^2.12** (activity / reputation / horizontal-funnel plots).

## Quickstart

### 1. Install from git

```bash
pnpm add github:121-Online/Stack48-Admin-UIKit#v0.1.0
# package name is @stack48/admin-ui — pnpm aliases it from package.json
```

In `package.json`:

```json
{
  "dependencies": {
    "@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#v0.1.0"
  }
}
```

Pin a **tag** (`#vX.Y.Z`), not `main`. GitHub Releases are created by the release workflow; nothing is pushed to a registry.

### 2. Add the Tailwind preset

`tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";
import adminUi, { adminUiContentGlobs } from "@stack48/admin-ui/preset";

export default {
  presets: [adminUi],
  content: ["./src/**/*.{ts,tsx}", ...adminUiContentGlobs],
} satisfies Config;
```

### 3. Import styles

Load kit CSS **after** Tailwind so the 13px body rules win:

```ts
import "./globals.css"; // @tailwind base/components/utilities
import "@stack48/admin-ui/styles.css";
```

`styles.css` sets shadcn CSS variables (`:root` and `.dark`), Inter + JetBrains Mono, and GTM body typography. Variables-only: `@stack48/admin-ui/theme.css`.

### 4. First screen (`AppShell` + `DataTable`)

Admin chrome lives at `@stack48/admin-ui/admin`. Pass `pathname` and a `renderLink` so the kit never imports your router. Data is props-only — no fetching.

```tsx
import { AppShell, DataTable, PageHeader, Sidebar } from "@stack48/admin-ui/admin";
import type { ColumnDef } from "@stack48/admin-ui/admin";

type Lead = { id: string; name: string; geo: string };

const columns: ColumnDef<Lead>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "geo", header: "Geo", accessor: "geo" },
];

export function LeadsPage({ leads, pathname }: { leads: Lead[]; pathname: string }) {
  return (
    <AppShell
      sidebar={<Sidebar pathname={pathname} items={[{ href: "/leads", label: "Leads" }]} />}
    >
      <main className="p-6">
        <PageHeader title="Leads" description="Browse and filter agency leads" />
        <DataTable columns={columns} data={leads} />
      </main>
    </AppShell>
  );
}
```

Other namespaces: `@stack48/admin-ui/primitives` (Button, Input, Dialog), `@stack48/admin-ui/charts`, `@stack48/admin-ui/inbox`, `@stack48/admin-ui/states`. Compose one-off controls with tokens + `cn()`:

```tsx
import { cn } from "@stack48/admin-ui";
import { tokens } from "@stack48/admin-ui/tokens";
import { KpiTile, KpiTileRow } from "@stack48/admin-ui/charts";

tokens.zinc[50]; // '#fafafa' — GTM canvas
tokens.blue[500]; // '#3b82f6' — GTM --accent / kit --brand

<KpiTileRow>
  <KpiTile label="Sent Today" value={1240} sparklineData={[12, 18, 15, 22]} />
</KpiTileRow>;
```

Activity / reputation / horizontal-funnel plots need optional peer `recharts@^2.12`. Full import map: [`AGENTS.md`](./AGENTS.md). Component docs: [`docs/components/`](./docs/components/).

## What this kit is

- Presentational only. **Data in via props.** No Supabase, Resend, fetchers, or business logic.
- A professional ops tool: dense, full-width, 1px zinc borders, 2px radii. No boxy cartoon cards, no decorative shadows on metric tiles.
- Light theme matches GTM production. `.dark` is an opt-in zinc invert (GTM does not ship dark CSS today).

House style, install details, and import map: [`AGENTS.md`](./AGENTS.md). Component PR rules: [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md). App migration: [`docs/ADOPTION.md`](./docs/ADOPTION.md).

## Scripts

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build-storybook
pnpm storybook
```

## Versioning

[Changesets](https://github.com/changesets/changesets) + [`CHANGELOG.md`](./CHANGELOG.md). Merging to `main` opens a Version PR; merging that tags **`vX.Y.Z`** and creates a GitHub Release. **No npm / GitHub Packages publish.**
