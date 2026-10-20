import type { Meta, StoryObj } from "@storybook/react";
import { conversionStages } from "./fixtures";
import { TaperedFunnel } from "./TaperedFunnel";

const meta = {
  title: "Charts/TaperedFunnel",
  component: TaperedFunnel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { stages: conversionStages },
} satisfies Meta<typeof TaperedFunnel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { stages: [], emptyLabel: "No conversion data" },
};

export const ZeroDownstream: Story = {
  args: {
    stages: [
      { name: "Leads", value: 120, color: "#71717a" },
      { name: "Paid", value: 0, color: "#f59e0b" },
    ],
  },
};

export const Dark: Story = {
  parameters: { themes: { themeOverride: "dark" } },
};
