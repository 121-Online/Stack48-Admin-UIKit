# Sidebar

Sticky left rail extracted from GTM `src/components/Sidebar.tsx`. Collapses to a 3.5rem icon rail, supports labelled collapsible groups, `aria-current="page"` active items, a footer slot, and a mobile overlay. No `localStorage`, `fetch`, or router hooks.

## Props

| Name                 | Type                           | Default      | Description                                       |
| -------------------- | ------------------------------ | ------------ | ------------------------------------------------- |
| `items`              | `SidebarNavItem[]`             | —            | Flat nav. Wrapped as one unlabelled group.        |
| `groups`             | `SidebarNavGroup[]`            | —            | Labelled collapsible sections. Wins over `items`. |
| `pathname`           | `string`                       | —            | Current path from the app router.                 |
| `collapsed`          | `boolean`                      | uncontrolled | Icon-rail mode.                                   |
| `defaultCollapsed`   | `boolean`                      | `false`      | Uncontrolled initial rail state.                  |
| `onCollapsedChange`  | `(collapsed: boolean) => void` | —            | Collapse callback.                                |
| `mobileOpen`         | `boolean`                      | uncontrolled | Mobile drawer.                                    |
| `defaultMobileOpen`  | `boolean`                      | `false`      | Uncontrolled initial drawer.                      |
| `onMobileOpenChange` | `(open: boolean) => void`      | —            | Drawer callback.                                  |
| `brand`              | `ReactNode`                    | Stack48 mark | Custom brand.                                     |
| `brandHref`          | `string`                       | `"/"`        | Brand link.                                       |
| `brandLabel`         | `string`                       | `"Stack48"`  | Wordmark + `aria-label`.                          |
| `footer`             | `ReactNode`                    | —            | User / sign-out slot above Collapse.              |
| `hideCollapseButton` | `boolean`                      | `false`      | Hide the built-in collapse control.               |
| `renderLink`         | `RenderLink`                   | `<a>`        | Router adapter.                                   |
| `className`          | `string`                       | —            | Extra classes on `<aside>`.                       |

### `SidebarNavItem`

| Name    | Type                  | Default                    | Description                                   |
| ------- | --------------------- | -------------------------- | --------------------------------------------- |
| `href`  | `string`              | —                          | Destination.                                  |
| `label` | `string`              | —                          | Visible label.                                |
| `icon`  | `ReactNode`           | —                          | 16px stroke icon.                             |
| `badge` | `ReactNode`           | —                          | Count pill; collapsed mode shows a brand dot. |
| `match` | `"exact" \| "prefix"` | exact for `/`, else prefix | Active matching.                              |
| `title` | `string`              | label when collapsed       | Tooltip.                                      |

### `SidebarNavGroup`

| Name          | Type               | Default               | Description                          |
| ------------- | ------------------ | --------------------- | ------------------------------------ |
| `id`          | `string`           | —                     | Stable key.                          |
| `label`       | `string`           | —                     | Section label. Omit for a flat list. |
| `items`       | `SidebarNavItem[]` | —                     | Children.                            |
| `defaultOpen` | `boolean`          | `true`                | Uncontrolled open.                   |
| `collapsible` | `boolean`          | `true` if `label` set | When false the group cannot fold.    |

## Usage

```tsx
<Sidebar
  pathname={pathname}
  groups={[
    {
      id: "ops",
      label: "Ops",
      items: [
        { href: "/leads", label: "Leads", icon: <LeadsIcon />, badge: unhandled },
        { href: "/inbox", label: "Inbox", icon: <InboxIcon /> },
      ],
    },
  ]}
  footer={<span className="truncate text-caption text-zinc-500">{email}</span>}
  renderLink={({ href, children, className, ...rest }) => (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )}
/>
```

## Do / don’t

| Do                                                 | Don’t                                            |
| -------------------------------------------------- | ------------------------------------------------ |
| Pass `pathname` from the app router                | Call `usePathname` inside the kit                |
| Pass badge counts as props                         | `fetch('/api/inbox/unhandled-count')` in the kit |
| Use `renderLink` with the app `Link`               | Hard-code `next/link`                            |
| Keep density (`text-body`, `py-1.5`, `rounded-sm`) | Inflate to a marketing nav                       |

## Accessibility

- Landmark: `<nav aria-label="Admin">`.
- Active item: `aria-current="page"`.
- Collapse control: `aria-pressed`. Group labels: `aria-expanded`.
- Mobile menu button: `aria-expanded` + `aria-controls="admin-sidebar"`. Overlay is `aria-hidden`.
- Badge pills are visible text; collapsed mode keeps a tooltip via `title`.
