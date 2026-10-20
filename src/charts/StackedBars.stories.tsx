import type { Meta, StoryObj } from "@storybook/react";
import { bufferSegments, scoreSegments } from "./fixtures";
import { StackedBars } from "./StackedBars";

const meta = {
  title: "Charts/StackedBars",
  component: StackedBars,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof StackedBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BufferHealth: Story = {
  args: {
    label: "Buffer health",
    segments: bufferSegments,
    caption: "Total with email: 1,006",
  },
};

export const ScoreBands: Story = {
  args: {
    label: "Email score bands",
    segments: scoreSegments,
  },
};

export const Empty: Story = {
  args: {
    label: "Buffer health",
    segments: bufferSegments.map((segment) => ({ ...segment, value: 0, share: 0 })),
    emptyLabel: "No data",
  },
};

export const Dark: Story = {
  args: BufferHealth.args,
  parameters: { themes: { themeOverride: "dark" } },
};
