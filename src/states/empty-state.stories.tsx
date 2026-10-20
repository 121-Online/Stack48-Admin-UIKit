import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../primitives/button";
import { EmptyState } from "./empty-state";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "No campaigns found" },
};

export const WithDescription: Story = {
  args: {
    title: "No platform accounts found",
    description: "Try adjusting your filters or the table is empty",
  },
};

export const WithAction: Story = {
  args: {
    title: "No matching mail",
    description: "Nothing matched “acme”.",
    action: <Button variant="secondary">Clear search</Button>,
  },
};

export const Unbordered: Story = {
  args: {
    title: "No steps defined",
    bordered: false,
  },
};
