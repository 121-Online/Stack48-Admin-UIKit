import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { StoryFrame } from "./story-frame";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-lg">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Talking points", rows: 4 },
};

export const Mono: Story = {
  args: {
    className: "font-mono text-xs",
    defaultValue: "Hello {{first_name}},\n\nFollowing up on…",
    rows: 6,
  },
};

export const Disabled: Story = {
  args: { defaultValue: "Read-only copy", disabled: true, rows: 3 },
};

export const Empty: Story = {
  args: { placeholder: "you@agency.com", rows: 3 },
};

export const WithLabel: Story = {
  render: () => (
    <div>
      <Label htmlFor="test-emails" className="mb-1">
        Recipient emails
      </Label>
      <Textarea id="test-emails" className="font-mono min-h-24" placeholder="you@agency.com" />
    </div>
  ),
};
