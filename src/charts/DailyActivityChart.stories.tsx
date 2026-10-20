import type { Meta, StoryObj } from "@storybook/react";
import { DailyActivityChart } from "./DailyActivityChart";
import { dailyActivity } from "./fixtures";

const meta = {
  title: "Charts/DailyActivityChart",
  component: DailyActivityChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    data: dailyActivity,
    height: 260,
    label: "30-day activity",
  },
} satisfies Meta<typeof DailyActivityChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { data: [], emptyLabel: "No activity in this window" },
};

export const Compact: Story = {
  args: { height: 160 },
};

export const Dark: Story = {
  parameters: { themes: { themeOverride: "dark" } },
};
