import type { Meta, StoryObj } from "@storybook/react";
import { LoadingState } from "./loading-state";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/LoadingState",
  component: LoadingState,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SkeletonRows: Story = {
  args: { variant: "rows", rows: 6, columns: 3, label: "Loading leads" },
};

export const DenseRows: Story = {
  args: { variant: "rows", rows: 3, columns: 4, label: "Loading" },
};

export const InlineSpinner: Story = {
  args: { variant: "spinner", label: "Sending" },
};

export const CheckingSpinner: Story = {
  args: { variant: "spinner", label: "Checking…" },
};
