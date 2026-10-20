# PageHeader

List-page title block from GTM (`Leads`, `Campaigns`, `Platform Users`): `text-lg font-semibold` title, caption description, right-aligned actions, optional breadcrumbs above. Full width — not a card.

## Props

| Name          | Type               | Default | Description                                        |
| ------------- | ------------------ | ------- | -------------------------------------------------- |
| `title`       | `ReactNode`        | —       | Heading, or a custom element (campaign slug `h1`). |
| `description` | `ReactNode`        | —       | One-line subtitle.                                 |
| `breadcrumbs` | `BreadcrumbItem[]` | —       | Trail above the title.                             |
| `actions`     | `ReactNode`        | —       | Primary button, filters.                           |
| `renderLink`  | `RenderLink`       | `<a>`   | Router adapter for crumbs.                         |
| `className`   | `string`           | —       | Extra classes on `<header>`.                       |
| `children`    | `ReactNode`        | —       | Extra content under the description.               |

## Usage

```tsx
<PageHeader
  title="Campaigns"
  description="Campaign monitoring and management · Europe/London"
  actions={
    <Link
      href="/campaigns/new"
      className="rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
    >
      Create Campaign
    </Link>
  }
/>
```

Detail pages (GTM campaign slug):

```tsx
<PageHeader
  title={<h1 className="font-mono text-xl font-semibold">launch-uk</h1>}
  description="agency · No owner"
  breadcrumbs={[{ label: "Campaigns", href: "/campaigns" }, { label: "launch-uk" }]}
  renderLink={renderLink}
/>
```

## Do / don’t

| Do                                  | Don’t                                    |
| ----------------------------------- | ---------------------------------------- |
| Sentence-case titles like GTM       | Title-Case Every Word                    |
| Put the primary action on the right | Wrap the header in a `rounded-2xl` card  |
| Use breadcrumbs on detail pages     | Invent a second page title in the topbar |

## Accessibility

- Default title renders as `<h1>`. If you pass a custom `title` element, keep a single `h1` per page.
- Breadcrumbs: see [`Breadcrumbs`](./Breadcrumbs.md).
- Actions are a plain flex group — label icon-only buttons yourself.
