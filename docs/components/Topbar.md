# Topbar

Optional `h-header` (3.5rem) strip above the main column. GTM list pages usually put the title in [`PageHeader`](./PageHeader.md) inside `<main>`; use Topbar when the app wants sticky chrome (breadcrumbs, clock, actions) pinned to the top of the content column.

## Props

| Name          | Type               | Default | Description                |
| ------------- | ------------------ | ------- | -------------------------- |
| `children`    | `ReactNode`        | —       | Left cluster.              |
| `actions`     | `ReactNode`        | —       | Right cluster.             |
| `breadcrumbs` | `BreadcrumbItem[]` | —       | Data-driven trail.         |
| `renderLink`  | `RenderLink`       | `<a>`   | Router adapter for crumbs. |
| `sticky`      | `boolean`          | `true`  | `sticky top-0`.            |
| `className`   | `string`           | —       | Extra classes.             |

## Usage

```tsx
<AppShell
  sidebar={<Sidebar items={nav} pathname={pathname} renderLink={renderLink} />}
  topbar={
    <Topbar
      breadcrumbs={[{ label: "Ops", href: "/" }, { label: "Daily Snapshot" }]}
      actions={<span className="text-caption text-muted-foreground">Europe/London</span>}
      renderLink={renderLink}
    />
  }
>
  <main className="p-6">…</main>
</AppShell>
```

## Do / don’t

| Do                                      | Don’t                                   |
| --------------------------------------- | --------------------------------------- |
| Keep it `h-header`, 1px `border-border` | Drop-shadow hero bars                   |
| Pass crumbs / actions as props          | Fetch the clock timezone inside the kit |

## Accessibility

- Not a landmark by default. If it contains the only breadcrumbs, they already expose `nav aria-label="Breadcrumb"`.
- Interactive actions in the right cluster must have accessible names.
