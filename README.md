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

### 4. First component

Admin chrome (`AppShell`, `Sidebar`, `PageHeader`, `DataTable`) is available from `@stack48/admin-ui/admin`. Charts ship from `@stack48/admin-ui/charts`. Inbox from `@stack48/admin-ui/inbox`. Primitives (Button, Input, Dialog) from `@stack48/admin-ui/primitives`. Compose one-off controls with tokens + `cn()`:

```tsx
import { cn } from "@stack48/admin-ui";

export function SaveButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-zinc-800",
        className,
      )}
    >
      Save
    </button>
  );
}
```

```tsx
import { tokens } from "@stack48/admin-ui/tokens";

tokens.zinc[50]; // '#fafafa' — GTM canvas
tokens.blue[500]; // '#3b82f6' — GTM --accent / kit --brand
```

```tsx
import { KpiTile, KpiTileRow, Sparkline } from "@stack48/admin-ui/charts";

<KpiTileRow>
  <KpiTile label="Sent Today" value={1240} sparklineData={[12, 18, 15, 22]} />
</KpiTileRow>;
```

Activity / reputation / horizontal-funnel plots need optional peer `recharts@^2.12`. Docs: [`docs/components/`](./docs/components/).

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
