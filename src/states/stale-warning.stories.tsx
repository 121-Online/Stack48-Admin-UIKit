import type { Meta, StoryObj } from "@storybook/react";
import { StaleWarning } from "./stale-warning";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/StaleWarning",
  component: StaleWarning,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof StaleWarning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: { title: "Audience changed. Pre-flight is stale — re-run before sending." },
};

export const CustomLabel: Story = {
  args: { children: "Sync stale", title: "No sync time in the last 24h" },
};
