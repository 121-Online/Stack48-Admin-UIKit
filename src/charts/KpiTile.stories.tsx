import type { Meta, StoryObj } from "@storybook/react";
import { chartColors } from "./colors";
import { sparklineSeries } from "./fixtures";
import { KpiTile, KpiTileRow } from "./KpiTile";

const meta = {
  title: "Charts/KpiTile",
  component: KpiTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Sent Today",
    value: 1240,
  },
} satisfies Meta<typeof KpiTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="border border-border bg-card p-4">
      <KpiTileRow>
        <KpiTile
          label="Sent Today"
          value={1240}
          sparklineData={sparklineSeries}
          sparklineColor={chartColors.sent}
        />
        <KpiTile
          label="Delivered Today"
          value={1198}
          hint="96.6%"
          sparklineData={sparklineSeries.map((value) => Math.round(value * 0.97))}
        />
        <KpiTile label="Opened Today" value={486} hint="39.2%" />
        <KpiTile
          label="Clicked Today"
          value={92}
          hint="7.4%"
          sparklineColor={chartColors.clicked}
        />
        <KpiTile label="Bounced" value={3} hint="0.2%" status="warning" />
        <KpiTile label="Complaints" value={0} hint="0.0%" status="neutral" />
        <KpiTile label="7d Sent" value={8400} delta={{ value: 12, label: "vs prior 7d" }} />
      </KpiTileRow>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="border border-border bg-card p-4">
      <KpiTileRow>
        <KpiTile label="Sent Today" value={0} sparklineData={[]} />
        <KpiTile label="Delivered Today" value={0} hint="—" />
        <KpiTile label="Opened Today" value="—" hint="awaiting webhooks" />
      </KpiTileRow>
    </div>
  ),
};

export const NegativeDelta: Story = {
  render: () => (
    <KpiTile label="7d Sent" value={6100} delta={{ value: -8, label: "vs prior 7d" }} />
  ),
};

export const Dark: Story = {
  ...Default,
  parameters: { themes: { themeOverride: "dark" } },
};
