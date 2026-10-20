import type { Meta, StoryObj } from "@storybook/react";
import { Banner, InlineAlert } from "./inline-alert";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/InlineAlert",
  component: InlineAlert,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-lg space-y-3">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof InlineAlert>;

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    tone: "info",
    children: "Save the draft, then run pre-flight.",
  },
};

export const Warning: Story = {
  args: {
    tone: "warning",
    title: "Audience changed.",
    children: "Pre-flight is stale — re-run before sending.",
  },
};

export const Danger: Story = {
  args: {
    tone: "danger",
    title: "Error loading platform data:",
    children: "The page may show incomplete or empty data.",
  },
};

export const Success: Story = {
  args: {
    tone: "success",
    children: "Test queued to 2 addresses, arrives within ~1 min",
  },
};

export const BannerAlias: Story = {
  render: () => (
    <Banner tone="warning" title="Receiving is off">
      Replies will not land in inbox for this domain.
    </Banner>
  ),
};
