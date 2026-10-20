import type { Meta, StoryObj } from "@storybook/react";
import { StatusIndicator } from "./status-indicator";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof StatusIndicator> = {
  title: "Primitives/StatusIndicator",
  component: StatusIndicator,
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

export const Ok: Story = { args: { status: "ok", label: "Sending" } };

export const Pulse: Story = { args: { status: "ok", label: "Live", pulse: true } };

export const Warning: Story = { args: { status: "warning", label: "Breaker" } };

export const Danger: Story = { args: { status: "danger", label: "Halted" } };

export const Neutral: Story = { args: { status: "neutral", label: "Idle" } };

export const Off: Story = { args: { status: "off", label: "Paused" } };

export const DotOnly: Story = { args: { status: "ok" } };

export const AllStates: Story = {
  args: { status: "ok" },
  render: () => (
    <div className="flex flex-col gap-2">
      <StatusIndicator status="ok" label="Sending" pulse />
      <StatusIndicator status="warning" label="Breaker" />
      <StatusIndicator status="danger" label="Halted" />
      <StatusIndicator status="neutral" label="Idle" />
      <StatusIndicator status="off" label="Paused" />
    </div>
  ),
};
