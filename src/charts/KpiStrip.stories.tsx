import type { Meta, StoryObj } from "@storybook/react";
import { KpiDivider, KpiItem, KpiStrip } from "./KpiStrip";

const meta = {
  title: "Charts/KpiStrip",
  component: KpiStrip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof KpiStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="border border-border bg-card px-4">
      <KpiStrip>
        <KpiItem label="Sent" value={1240} />
        <KpiItem label="Delivered" value={1198} hint="96.6%" />
        <KpiItem label="Opened" value={486} hint="39.2%" />
        <KpiDivider />
        <KpiItem label="Bounced" value={3} status="warning" hint="0.2%" />
        <KpiItem
          label="7d sent"
          value={8400}
          delta={{ value: 12, label: "vs prior" }}
          status="ok"
        />
      </KpiStrip>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="border border-border bg-card px-4">
      <KpiStrip>
        <KpiItem label="Sent" value={0} />
        <KpiItem label="Delivered" value={0} hint="—" />
        <KpiItem label="Opened" value={0} hint="—" />
      </KpiStrip>
    </div>
  ),
};

export const Danger: Story = {
  render: () => (
    <KpiStrip items={[{ label: "Complaints", value: 6, status: "danger", hint: "0.08%" }]} />
  ),
};

export const Dark: Story = {
  ...Default,
  parameters: { themes: { themeOverride: "dark" } },
};
