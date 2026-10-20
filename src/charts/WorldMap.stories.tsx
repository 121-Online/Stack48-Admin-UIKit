import type { Meta, StoryObj } from "@storybook/react";
import { worldRegions } from "./fixtures";
import { WorldMap } from "./WorldMap";

const meta = {
  title: "Charts/WorldMap",
  component: WorldMap,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    regions: worldRegions,
    viewModes: [
      { id: "7d", label: "7 Days" },
      { id: "today", label: "Today" },
    ],
    defaultViewMode: "7d",
    totalLabel: "sends",
  },
} satisfies Meta<typeof WorldMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Today: Story = {
  args: { defaultViewMode: "today" },
};

export const Empty: Story = {
  args: { regions: [], emptyLabel: "No geographic data" },
};

export const Dark: Story = {
  parameters: { themes: { themeOverride: "dark" } },
};
