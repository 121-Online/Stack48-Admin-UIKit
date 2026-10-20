# AGENTS.md — Stack48 Admin UI

Instructions for coding agents working in this repo or consuming the kit from an app.

This kit is **presentational**. It is consumed as **git source**, not from npm.

## Install

```json
"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"
```

Pin a release tag. `pnpm install` runs `prepare`, which builds `dist/` (ESM + `.d.ts` + CSS).

Copy-in: copy `src/` into the app and import from that path. Still add the preset and CSS.

Peer deps (do not bundle): `react` >= 18, `react-dom` >= 18, `tailwindcss` ^3.4.

## Theme

1. Tailwind **v3** config:

```ts
import adminUi, { adminUiContentGlobs } from "@stack48/admin-ui/preset";

export default {
  presets: [adminUi],
  content: ["./src/**/*.{ts,tsx}", ...adminUiContentGlobs],
};
```

2. CSS, **after** `@tailwind` directives:

```ts
import "@stack48/admin-ui/styles.css";
```

3. Dark mode is class-based (`.dark` on `html`). GTM production is light-only; do not enable dark unless the app asks.

Do not restyle tokens to “look nicer”. Match GTM: Inter 13px, zinc-50 canvas, zinc-900 primary buttons, blue-500 brand/focus, 2px radius, 1px `border-border`, no drop shadow on stat tiles.

## Import

```ts
import { cn } from "@stack48/admin-ui";
import { tokens } from "@stack48/admin-ui/tokens";
import preset from "@stack48/admin-ui/preset";
import "@stack48/admin-ui/styles.css";

// later PRs
import { Button } from "@stack48/admin-ui/primitives";
import { AppShell } from "@stack48/admin-ui/admin";
import { Sparkline } from "@stack48/admin-ui/charts";
import { MessageList } from "@stack48/admin-ui/inbox";
import { EmptyState } from "@stack48/admin-ui/states";

// equivalent
import { Button } from "@stack48/admin-ui/components/primitives";
```

Root barrel (`@stack48/admin-ui`) re-exports `cn`, tokens, and the preset. Prefer subpaths in apps.

## Compose

```
src/primitives   customised shadcn (Button, Input, Dialog, Table, …)
src/admin        composed chrome (shell, sidebar, header, page, table toolbar)
src/charts       presentational charts
src/inbox        thread / message surfaces
src/states       empty / loading / error / modal frames
```

- New components go in the matching folder, with a Storybook story, TSDoc, a docs page, and a changeset.
- Export from the folder `index.ts` **and** `src/components/<namespace>.ts` so both subpaths work.
- Apps compose primitives into pages. Do not hide product rules inside the kit.

## House style rules

1. **Professional ops tool.** This is Linear/Stripe-dashboard density, not a marketing site and not a consumer toy.
2. **Dense.** Default type is 13px. Prefer `text-caption` (11px) and `text-xs` (12px) for chrome. Do not inflate padding to “breathe”.
3. **Full-width layouts.** Content uses the viewport. No centered max-w-prose marketing columns inside the admin shell. Sidebars are `w-sidebar` (16rem); the header is `h-header` (3.5rem).
4. **No boxy cartoon cards.** Surfaces are `bg-card` with `border border-border` and `rounded-sm` (2px). Do not use large radius, colored shadows, gradients, or stacked equal-weight cards. GTM `.stat-card` is 1px zinc-200, 2px radius, 16px padding, **no shadow**.
5. **Data via props.** Every component is presentational. Callers pass rows, counts, labels, and callbacks.
6. **Presentational only.** No Supabase, Resend, `fetch`, React Query, cookies, auth, or domain rules. No hidden I/O. If it needs a server, it does not belong in this kit.

## Do / don’t (visual)

| Do                                               | Don’t                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `rounded-sm`, 1px `border-border`                | `rounded-2xl`, `shadow-xl` metric tiles                                 |
| `bg-background` canvas, `bg-card` panels         | Rainbow section cards                                                   |
| `bg-primary` for the main action (zinc-900)      | Make every button brand-blue                                            |
| `text-brand` / `border-ring` for links and focus | Recolor `--primary` to blue                                             |
| `tabular-nums` on metrics                        | Title-case every label; GTM uses sentence case + uppercase micro labels |

## Token names (stable for later PRs)

shadcn CSS variables: `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--radius`.

Stack48 extras: `--brand`, `--brand-foreground`, `--brand-hover`, `--success`, `--success-foreground`, `--success-muted`, `--warning`, `--warning-foreground`, `--warning-muted`, `--sidebar`, `--sidebar-foreground`, `--sidebar-border`, `--sidebar-accent`, `--sidebar-width`, `--header-height`, `--font-sans`, `--font-mono`, `--font-size-body`, `--shadow-sm`, `--shadow-lg`.

`--primary` is zinc-900 (GTM `.btn-primary`). `--brand` / `--ring` is blue-500 (GTM `--accent`). shadcn `--accent` is the zinc-100 hover wash — do not confuse them.

JS: `tokens`, `zinc`, `blue`, `red`, `emerald`, `amber`, `lightSemantic`, `darkSemantic`, `radii`, `shadows`, `typography`, `spacing`, `layout`, `semanticCssVarNames`.

Tailwind: `bg-background`, `bg-card`, `bg-primary`, `bg-brand`, `bg-success`, `bg-warning`, `w-sidebar`, `h-header`, `text-body`, `text-caption`, `text-micro`, `text-2xs`, `rounded-sm`.

## Changing this kit

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm build-storybook` must pass.
- Every component PR: docs page, stories for every state, TSDoc on exports, a changeset. See `docs/CONTRIBUTING.md`.
- Do not modify the GTM dashboard repo from this project.
- Do not add a registry publish step.
