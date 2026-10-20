import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Label> = {
  title: "Primitives/Label",
  component: Label,
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

export const Default: Story = {
  args: { children: "Min gap (sec)" },
};

export const Form: Story = {
  args: { variant: "form", children: "Audience" },
};

export const Inline: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="enabled" defaultChecked />
      <Label htmlFor="enabled" variant="inline">
        Sending enabled
      </Label>
    </div>
  ),
};

export const WithControl: Story = {
  render: () => (
    <div className="max-w-xs">
      <Label htmlFor="daily-cap" className="mb-1">
        Daily cap
      </Label>
      <Input id="daily-cap" type="number" defaultValue={200} />
    </div>
  ),
};
