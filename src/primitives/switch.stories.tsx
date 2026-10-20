import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { StoryFrame } from "./story-frame";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Primitives/Switch",
  component: Switch,
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
  args: { "aria-label": "Sending" },
};

export const On: Story = {
  args: { defaultChecked: true, "aria-label": "Sending on" },
};

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Sending disabled" },
};

export const DisabledOn: Story = {
  args: { disabled: true, defaultChecked: true, "aria-label": "Sending locked on" },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="send-switch" defaultChecked />
      <Label htmlFor="send-switch" variant="inline">
        Sending enabled
      </Label>
    </div>
  ),
};
