# AppShell

Full-viewport admin frame extracted from GTM `AppShell` in `Sidebar.tsx`. Sidebar slot on the left, optional topbar, main column fills the rest. Canvas is `bg-background` (zinc-50). Presentational — no auth, routing, or data fetching.

## Props

| Name        | Type        | Default | Description                                          |
| ----------- | ----------- | ------- | ---------------------------------------------------- |
| `children`  | `ReactNode` | —       | Main column (usually `<main className="p-6">`).      |
| `sidebar`   | `ReactNode` | —       | Left rail. Pass [`Sidebar`](./Sidebar.md).           |
| `topbar`    | `ReactNode` | —       | Optional sticky strip. Pass [`Topbar`](./Topbar.md). |
| `className` | `string`    | —       | Extra classes on the outer flex container.           |

## Usage

```tsx
import { AppShell, PageHeader, Sidebar } from "@stack48/admin-ui/admin";
import Link from "next/link";
import { usePathname } from "next/navigation";

const renderLink = ({ href, children, className, ...rest }) => (
  <Link href={href} className={className} {...rest}>
    {children}
  </Link>
);

export function LeadsLayout({ children, email }: { children: React.ReactNode; email: string }) {
  const pathname = usePathname();
  return (
    <AppShell
      sidebar={
        <Sidebar
          pathname={pathname}
          items={[{ href: "/leads", label: "Leads" }]}
          footer={<span className="truncate text-caption text-zinc-500">{email}</span>}
          renderLink={renderLink}
        />
      }
    >
      <main className="p-6">
        <PageHeader title="Leads" description="Browse and filter agency leads" />
        {children}
      </main>
    </AppShell>
  );
}
```

## Do / don’t

| Do                                                        | Don’t                                         |
| --------------------------------------------------------- | --------------------------------------------- |
| Pass `Sidebar` / `Topbar` as slots                        | Fetch the user or nav inside the shell        |
| Keep the main column full-width (`p-6`, no `max-w-prose`) | Wrap the page in a centered marketing card    |
| Use `bg-background` canvas                                | Restyle to a boxed dashboard with large radii |

## Accessibility

- The shell is a layout `div`, not a landmark. Put `nav` on `Sidebar` and wrap page copy in `<main>`.
- Do not nest interactive controls in a way that traps focus between the mobile overlay and the rail — `Sidebar` owns that.
- Colour contrast follows GTM zinc / brand tokens (`AGENTS.md`).
