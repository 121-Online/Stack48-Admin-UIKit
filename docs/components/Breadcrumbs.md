# Breadcrumbs

GTM campaign-detail trail: `Campaigns / slug` with zinc separators. Data-driven `items` or composed [`Breadcrumb`](#breadcrumb) children. Links go through `renderLink` or `asChild`.

## Props (`Breadcrumbs`)

| Name         | Type               | Default | Description                                         |
| ------------ | ------------------ | ------- | --------------------------------------------------- |
| `items`      | `BreadcrumbItem[]` | —       | Data-driven crumbs. Last item is current (no link). |
| `children`   | `ReactNode`        | —       | Composed [`Breadcrumb`](#breadcrumb) nodes.         |
| `renderLink` | `RenderLink`       | `<a>`   | Router adapter.                                     |
| `className`  | `string`           | —       | Extra classes on `<nav>`.                           |

### `BreadcrumbItem`

| Name      | Type        | Default | Description                     |
| --------- | ----------- | ------- | ------------------------------- |
| `label`   | `ReactNode` | —       | Visible text.                   |
| `href`    | `string`    | —       | Link for non-current crumbs.    |
| `asChild` | `boolean`   | —       | Reserved for composed children. |

## Breadcrumb

Composable crumb.

| Name         | Type         | Default | Description                                 |
| ------------ | ------------ | ------- | ------------------------------------------- |
| `href`       | `string`     | —       | Link when not `current`.                    |
| `asChild`    | `boolean`    | `false` | Merge props onto the child (router `Link`). |
| `current`    | `boolean`    | `false` | Last crumb; no trailing slash.              |
| `renderLink` | `RenderLink` | `<a>`   | Router adapter when not `asChild`.          |
| `children`   | `ReactNode`  | —       | Label.                                      |

## Usage

```tsx
<Breadcrumbs
  items={[{ label: "Campaigns", href: "/campaigns" }, { label: "launch-uk" }]}
  renderLink={renderLink}
/>
```

```tsx
<Breadcrumbs>
  <Breadcrumb asChild>
    <Link href="/campaigns">Campaigns</Link>
  </Breadcrumb>
  <Breadcrumb current>launch-uk</Breadcrumb>
</Breadcrumbs>
```

## Do / don’t

| Do                            | Don’t                           |
| ----------------------------- | ------------------------------- |
| Mark the last crumb `current` | Link the current page to itself |
| Use `asChild` / `renderLink`  | Import `next/link` in the kit   |

## Accessibility

- `<nav aria-label="Breadcrumb">` wrapping an `<ol>`.
- Current page is text, not a link.
- Separators are visual `/` characters, not announced as list items of their own.
