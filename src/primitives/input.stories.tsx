import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-sm">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Search mail" },
};

export const WithValue: Story = {
  args: { defaultValue: "ops@stack48.com" },
};

export const Number: Story = {
  args: { type: "number", defaultValue: 120, min: 0 },
};

export const Disabled: Story = {
  args: { defaultValue: "locked", disabled: true },
};

export const Error: Story = {
  args: {
    defaultValue: "not-an-email",
    "aria-invalid": true,
    className: "border-red-500 focus-visible:ring-red-500",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div>
      <Label htmlFor="hourly-cap" className="mb-1">
        Hourly cap
      </Label>
      <Input id="hourly-cap" type="number" defaultValue={40} />
    </div>
  ),
};
