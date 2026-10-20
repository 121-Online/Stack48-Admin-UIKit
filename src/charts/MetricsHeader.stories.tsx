import type { Meta, StoryObj } from "@storybook/react";
import { sparklineSeries } from "./fixtures";
import { MetricsHeader } from "./MetricsHeader";

const meta = {
  title: "Charts/MetricsHeader",
  component: MetricsHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MetricsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: [
      { label: "accounts", value: 1280, emphasize: true },
      { label: "new 24h", value: 14 },
      { label: "new 7d", value: 61 },
      { label: "deleted", value: 3 },
      { label: "suspended", value: 7 },
      { label: "linked to lead", value: 890 },
    ],
    breakdowns: [
      {
        label: "Plan",
        items: [
          { key: "Pro", count: 40 },
          { key: "Starter", count: 12 },
        ],
      },
      {
        label: "Sub",
        items: [
          { key: "active", count: 44 },
          { key: "trialing", count: 8 },
        ],
      },
    ],
    facts: [
      { label: "Claimed", value: 30 },
      { label: "unclaimed", value: 22 },
    ],
    syncLabel: "Last sync",
    syncValue: "20 Oct 14:02 · 18 synced 24h",
    sparklineData: sparklineSeries,
    sparklineLabel: "Accounts last synced per day over 14 days",
    footnote: "Sparkline is last synced_at per account (not a sync log), by London day.",
  },
};

export const StaleWarning: Story = {
  args: {
    ...Default.args,
    warning: "Last sync older than 24h",
  },
};

export const NoSyncTime: Story = {
  args: {
    ...Default.args,
    syncValue: null,
    warning: "No sync time",
  },
};

export const Empty: Story = {
  args: {
    stats: [],
    emptyLabel: "No account metrics",
  },
};

export const Dark: Story = {
  args: Default.args,
  parameters: { themes: { themeOverride: "dark" } },
};
