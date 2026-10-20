import type { Meta, StoryObj } from "@storybook/react";
import { sparklineSeries } from "./fixtures";
import { Sparkline } from "./Sparkline";

const meta = {
  title: "Charts/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    data: sparklineSeries,
    label: "Sends (7d)",
    width: 120,
    height: 32,
  },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { fill: true, color: "#3b82f6" },
};

export const Empty: Story = {
  args: { data: [], label: "Sends (empty)" },
};

export const SinglePoint: Story = {
  args: { data: [12], label: "Sends (one point)" },
};

export const Dark: Story = {
  args: { fill: true, color: "#60a5fa" },
  parameters: { themes: { themeOverride: "dark" } },
};
