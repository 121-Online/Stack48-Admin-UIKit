# Contributing

## Workflow

1. Branch from `main`.
2. Implement in the correct namespace (`src/primitives`, `src/admin`, `src/charts`, `src/inbox`, `src/states`).
3. Add a [changeset](https://github.com/changesets/changesets): `pnpm changeset`. Use `patch` for fixes, `minor` for new components, `major` for breaking token/export changes.
4. Open a PR against `main`. Do not merge Version PRs unless you intend to cut `vX.Y.Z`.

Required checks (must pass locally and in CI):

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build-storybook
```

## Every component PR

A component is not done until the PR includes **all** of the following:

1. **Docs page** (Storybook Docs or `src/<ns>/docs/*.mdx`) with:
   - Props table (name, type, default, description)
   - Usage example (copy-pasteable)
   - Do / don’t (visual + API)
   - Accessibility notes (roles, keyboard, labelling, contrast)
2. **Storybook stories for every state** the component can render: default, loading, empty, error, disabled, compact / dense if applicable, dark if colours change.
3. **TSDoc on all public exports** — every function, component, and type that leaves the package.
4. **A changeset** describing the user-facing change.

Also:

- Re-export from the namespace `index.ts` and from `src/components/<namespace>.ts`.
- Keep components presentational (props in, events out). No data fetching.
- Match house style in `AGENTS.md`. Do not introduce large radius, decorative shadows, or marketing layout.
- Prefer tokens (`bg-background`, `text-muted-foreground`, `rounded-sm`) over raw hex.

## Tokens

If you change a CSS variable, update `src/styles/theme.css`, `src/tokens.ts`, `src/preset.ts`, the Foundations story, and tests in the same PR. Token **names** are a public API used by parallel PRs.

## Releases

Maintainers merge to `main`. The Release workflow either opens a Version PR (when changesets are pending) or, after that PR merges, tags `vX.Y.Z` and creates a GitHub Release. **Do not publish to npm or GitHub Packages.**
