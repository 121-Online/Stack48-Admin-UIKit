import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../primitives/input";
import { FormField } from "./form-field";
import { FormSection } from "./form-section";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/FormSection",
  component: FormSection,
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
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sending identity",
    description: "From address and reply-to for this campaign.",
    children: (
      <div className="space-y-3">
        <FormField label="From name" optional>
          <Input placeholder="James Gibbons" />
        </FormField>
        <FormField label="From local part">
          <Input className="font-mono" placeholder="jgibbons" />
        </FormField>
      </div>
    ),
  },
};

export const WithAction: Story = {
  args: {
    title: "Sending hours",
    action: (
      <button type="button" className="text-[10px] text-brand hover:underline">
        Reset to Mon-Fri 09:00-17:00
      </button>
    ),
    children: <p className="text-sm text-zinc-500">Monday–Friday 09:00–17:00</p>,
  },
};

export const Bordered: Story = {
  args: {
    title: "Preview",
    bordered: true,
    children: <p className="p-3 font-mono text-xs">From: hello@mail.agency.com</p>,
  },
};
