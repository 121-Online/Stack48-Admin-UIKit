## Summary

<!-- What changed, and why. -->

## Kit checklist

- [ ] Presentational only (no fetch / Supabase / Resend / domain logic)
- [ ] House style: dense, full-width, no cartoon cards (`AGENTS.md`)
- [ ] Docs page with props table, usage, do/don't, accessibility
- [ ] Storybook stories for every state
- [ ] TSDoc on public exports
- [ ] Changeset included (`pnpm changeset`)

## Checks

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm build-storybook
```
