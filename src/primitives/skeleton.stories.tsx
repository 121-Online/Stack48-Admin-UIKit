import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  args: { className: "h-4 w-48" },
};

export const Block: Story = {
  args: { className: "h-24 w-full max-w-md" },
};

export const TableRows: Story = {
  render: () => (
    <div className="max-w-xl space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
    </div>
  ),
};
