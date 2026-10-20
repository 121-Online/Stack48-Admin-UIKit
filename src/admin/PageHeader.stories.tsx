import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Breadcrumb, Breadcrumbs, PageHeader, Topbar } from "./PageHeader";

const meta = {
  title: "Admin/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "GTM list-page title block: `text-lg` title, caption description, right-aligned actions, optional breadcrumbs.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj;

function Frame({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background p-6">{children}</div>;
}

export const Default: Story = {
  render: () => (
    <Frame>
      <PageHeader title="Leads" description="Browse and filter agency leads" />
    </Frame>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Frame>
      <PageHeader
        title="Campaigns"
        description="Campaign monitoring and management · Europe/London"
        actions={
          <button
            type="button"
            className="rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-zinc-800"
          >
            Create Campaign
          </button>
        }
      />
    </Frame>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <Frame>
      <PageHeader
        title={<h1 className="font-mono text-xl font-semibold text-foreground">launch-uk</h1>}
        description="agency · No owner"
        breadcrumbs={[{ label: "Campaigns", href: "/campaigns" }, { label: "launch-uk" }]}
        actions={
          <button
            type="button"
            className="rounded-sm border border-zinc-300 bg-card px-3 py-1.5 text-xs font-medium text-zinc-700"
          >
            Pause
          </button>
        }
      />
    </Frame>
  ),
};

export const ComposedBreadcrumbs: Story = {
  render: () => (
    <Frame>
      <Breadcrumbs>
        <Breadcrumb href="/campaigns">Campaigns</Breadcrumb>
        <Breadcrumb asChild>
          <a href="/campaigns/uk" className="text-zinc-500 hover:text-zinc-900">
            UK
          </a>
        </Breadcrumb>
        <Breadcrumb current>launch-uk</Breadcrumb>
      </Breadcrumbs>
      <PageHeader title="launch-uk" />
    </Frame>
  ),
};

export const TopbarBar: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <Topbar
        breadcrumbs={[{ label: "Ops", href: "/" }, { label: "Daily Snapshot" }]}
        actions={<span className="text-caption text-muted-foreground">Europe/London</span>}
      />
      <main className="p-6">
        <PageHeader title="Daily Snapshot" description="Agency · Europe/London · 14:02" />
      </main>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Frame>
      <PageHeader title="Settings" />
    </Frame>
  ),
};
