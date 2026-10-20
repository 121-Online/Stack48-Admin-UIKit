import type { Meta, StoryObj } from "@storybook/react";
import { DeliveryFunnel, DeliveryFunnelHorizontal } from "./DeliveryFunnel";
import { funnelStages } from "./fixtures";

const meta = {
  title: "Charts/DeliveryFunnel",
  component: DeliveryFunnel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { stages: funnelStages },
} satisfies Meta<typeof DeliveryFunnel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  render: (args) => <DeliveryFunnelHorizontal {...args} height={160} />,
};

export const Empty: Story = {
  args: { stages: [], emptyLabel: "No funnel data" },
};

export const Dark: Story = {
  parameters: { themes: { themeOverride: "dark" } },
};
