import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Separator> = {
  title: "Primitives/Separator",
  component: Separator,
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

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <p className="text-sm">Above</p>
      <Separator />
      <p className="text-sm">Below</p>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <p className="text-sm">Section A</p>
      <Separator className="bg-zinc-100" />
      <p className="text-sm">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Sent</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Delivered</span>
    </div>
  ),
};
