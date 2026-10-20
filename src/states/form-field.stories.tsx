import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../primitives/input";
import { Textarea } from "../primitives/textarea";
import { FormField } from "./form-field";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-md">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Hourly cap",
    children: <Input type="number" min={0} defaultValue={40} />,
  },
};

export const WithHint: Story = {
  args: {
    label: "Reply-To local part",
    optional: true,
    hint: "Leave blank to use the From address.",
    children: <Input className="font-mono" placeholder="same as from" />,
  },
};

export const Error: Story = {
  args: {
    label: "From local part",
    error: "Use lowercase letters, numbers, dots, underscores, or hyphens",
    children: <Input className="font-mono" defaultValue="James Gibbons" />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Sending domain",
    children: <Input defaultValue="mail.agency.com" disabled />,
  },
};

export const UppercaseLabel: Story = {
  args: {
    label: "Recipient emails",
    labelVariant: "default",
    children: <Textarea className="font-mono min-h-24" placeholder="you@agency.com" />,
  },
};
