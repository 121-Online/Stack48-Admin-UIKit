import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
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

export const Default: Story = { args: { children: "Email 1 sent" } };

export const Success: Story = { args: { variant: "success", children: "Engaged" } };

export const Warning: Story = { args: { variant: "warning", children: "Opted out" } };

export const Danger: Story = { args: { variant: "danger", children: "Bounced" } };

export const Info: Story = { args: { variant: "info", children: "Low sample" } };

export const Muted: Story = { args: { variant: "muted", children: "Draft" } };

export const Inverse: Story = { args: { variant: "inverse", children: "New" } };

export const SuccessSolid: Story = { args: { variant: "successSolid", children: "Signed up" } };

export const WithDot: Story = { args: { variant: "success", dot: true, children: "Healthy" } };

export const AllVariants: Story = {
  args: { children: "Badge" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="success" dot>
        Success
      </Badge>
      <Badge variant="warning" dot>
        Warning
      </Badge>
      <Badge variant="danger" dot>
        Danger
      </Badge>
      <Badge variant="info" dot>
        Info
      </Badge>
      <Badge variant="muted" dot>
        Muted
      </Badge>
      <Badge variant="inverse">New</Badge>
      <Badge variant="successSolid">Signed up</Badge>
    </div>
  ),
};
