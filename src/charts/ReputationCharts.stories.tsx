import type { Meta, StoryObj } from "@storybook/react";
import { bounceTrend, complaintTrend } from "./fixtures";
import { BounceRateChart, ComplaintRateChart, RateTrendChart } from "./ReputationCharts";

const meta = {
  title: "Charts/ReputationCharts",
  component: RateTrendChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    data: bounceTrend,
  },
} satisfies Meta<typeof RateTrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BounceRate: Story = {
  render: () => <BounceRateChart data={bounceTrend} height={180} />,
};

export const ComplaintRate: Story = {
  render: () => <ComplaintRateChart data={complaintTrend} height={180} />,
};

export const AboveLimit: Story = {
  render: () => (
    <BounceRateChart
      data={bounceTrend.map((point) => ({ ...point, rate: point.rate + 3.5 }))}
      height={180}
    />
  ),
};

export const Empty: Story = {
  render: () => <BounceRateChart data={[]} emptyLabel="No reputation samples" />,
};

export const Dark: Story = {
  ...BounceRate,
  parameters: { themes: { themeOverride: "dark" } },
};
