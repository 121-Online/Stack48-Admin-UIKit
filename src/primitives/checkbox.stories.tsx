import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
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
  args: { "aria-label": "Unchecked" },
};

export const Checked: Story = {
  args: { defaultChecked: true, "aria-label": "Checked" },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate", "aria-label": "Indeterminate" },
};

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Disabled" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, "aria-label": "Disabled checked" },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer select-none items-center gap-2">
        <Checkbox id="sendable" defaultChecked />
        <Label htmlFor="sendable" variant="inline">
          Sendable queue only
        </Label>
      </label>
      <label className="flex cursor-not-allowed select-none items-center gap-2 opacity-50">
        <Checkbox id="unknown" disabled />
        <Label htmlFor="unknown" variant="inline">
          Unknown industry
        </Label>
      </label>
    </div>
  ),
};
