import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
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

export const Default: Story = { args: { children: "Save changes" } };

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancel" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Edit" },
};

export const Link: Story = {
  args: { variant: "link", children: "View lead" },
};

export const Small: Story = {
  args: { size: "sm", children: "Compact" },
};

export const Large: Story = {
  args: { size: "lg", children: "Continue with SSO" },
};

export const Icon: Story = {
  args: { size: "icon", variant: "ghost", children: "×", "aria-label": "Close" },
};

export const Disabled: Story = {
  args: { children: "Saving…", disabled: true },
};

export const Loading: Story = {
  args: { children: "Saving…", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="ghost">Edit</Button>
      <Button variant="link">Open thread</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
