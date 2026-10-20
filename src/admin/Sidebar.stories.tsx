import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";

const items = [
  { href: "/", label: "Overview" },
  { href: "/leads", label: "Leads", badge: 4 },
  { href: "/inbox", label: "Inbox", badge: 12 },
  { href: "/settings", label: "Settings" },
];

const meta = {
  title: "Admin/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sticky GTM left rail. Collapsible icon mode, collapsible groups, footer slot, mobile overlay. Pass `pathname` and `renderLink`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj;

export const Expanded: Story = {
  args: {
    items,
    pathname: "/leads",
    footer: <span className="truncate text-caption text-zinc-500">ops@stack48.com</span>,
  },
};

export const Collapsed: Story = {
  args: {
    items,
    pathname: "/leads",
    defaultCollapsed: true,
  },
};

export const Groups: Story = {
  args: {
    pathname: "/leads",
    groups: [
      { id: "ops", label: "Ops", items: items.slice(0, 3) },
      { id: "admin", label: "Admin", items: items.slice(3), defaultOpen: true },
    ],
  },
};

export const MobileOpen: Story = {
  args: {
    items,
    pathname: "/",
    defaultMobileOpen: true,
  },
};

export const WithBadge: Story = {
  args: {
    items,
    pathname: "/inbox",
  },
};
