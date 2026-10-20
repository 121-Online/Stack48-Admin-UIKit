import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode, SVGProps } from "react";
import { AppShell } from "./AppShell";
import { PageHeader } from "./PageHeader";
import { Sidebar, type SidebarNavGroup, type SidebarNavItem } from "./Sidebar";

function NavIcon({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const items: SidebarNavItem[] = [
  {
    href: "/",
    label: "Overview",
    icon: (
      <NavIcon>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </NavIcon>
    ),
  },
  {
    href: "/campaigns",
    label: "Campaigns",
    icon: (
      <NavIcon>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </NavIcon>
    ),
  },
  {
    href: "/leads",
    label: "Leads",
    icon: (
      <NavIcon>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </NavIcon>
    ),
  },
  {
    href: "/inbox",
    label: "Inbox",
    badge: 12,
    icon: (
      <NavIcon>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </NavIcon>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (
      <NavIcon>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </NavIcon>
    ),
  },
];

const groups: SidebarNavGroup[] = [
  { id: "main", label: "Workspace", items: items.slice(0, 4) },
  { id: "admin", label: "Admin", items: items.slice(4), defaultOpen: false },
];

function ShellDemo({
  pathname = "/leads",
  collapsed,
  grouped = false,
}: {
  pathname?: string;
  collapsed?: boolean;
  grouped?: boolean;
}) {
  return (
    <AppShell
      sidebar={
        <Sidebar
          pathname={pathname}
          items={grouped ? undefined : items}
          groups={grouped ? groups : undefined}
          defaultCollapsed={collapsed}
          footer={
            collapsed ? null : (
              <span className="flex-1 truncate text-caption text-zinc-500">ops@stack48.com</span>
            )
          }
        />
      }
    >
      <main className="p-6">
        <PageHeader title="Leads" description="Browse and filter agency leads" />
        <div className="rounded-sm border border-border bg-card p-4 text-body text-muted-foreground">
          Page body — full width, no boxed marketing column.
        </div>
      </main>
    </AppShell>
  );
}

const meta = {
  title: "Admin/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "GTM ops chrome: zinc-50 canvas, sticky sidebar, dense page header. Pass `renderLink` from the app router.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ShellDemo />,
};

export const CollapsedRail: Story = {
  render: () => <ShellDemo collapsed />,
};

export const CollapsibleGroups: Story = {
  render: () => <ShellDemo grouped />,
};

export const ActiveNestedRoute: Story = {
  render: () => <ShellDemo pathname="/inbox/lead-1" />,
};

export const Dark: Story = {
  render: () => (
    <div className="dark">
      <ShellDemo />
    </div>
  ),
};
