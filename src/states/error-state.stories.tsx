import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ErrorState } from "./error-state";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof ErrorState> = {
  title: "States/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
  args: { onRetry: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Error loading campaigns",
    message: "Could not reach the campaigns RPC.",
  },
};

export const Retrying: Story = {
  args: {
    title: "Error loading campaign",
    message: "Network error",
    retrying: true,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
    title: "Error loading platform data",
    message: "The page may show incomplete or empty data.",
  },
};

export const CompactRetrying: Story = {
  args: {
    compact: true,
    title: "Resend API failure",
    message: "These addresses are never sent until you retry.",
    retrying: true,
    retryLabel: "Retry errors",
  },
};

export const WithoutRetry: Story = {
  args: {
    title: "Error loading campaigns",
    message: "Forbidden",
    onRetry: undefined,
  },
};
