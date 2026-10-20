import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Button } from "../primitives/button";
import { MultiEmailModal } from "./multi-email-modal";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/MultiEmailModal",
  component: MultiEmailModal,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof MultiEmailModal>;

export default meta;
type Story = StoryObj;

export const Empty: Story = {
  args: {
    open: true,
    emails: [],
    onEmailsChange: fn(),
    onSubmit: fn(),
    onOpenChange: fn(),
  },
};

export const WithChips: Story = {
  args: {
    open: true,
    emails: ["you@agency.com", "ops@agency.com"],
    onEmailsChange: fn(),
    onSubmit: fn(),
    onOpenChange: fn(),
  },
};

export const AtMax: Story = {
  args: {
    open: true,
    emails: ["a@agency.com", "b@agency.com", "c@agency.com", "d@agency.com", "e@agency.com"],
    onEmailsChange: fn(),
    onSubmit: fn(),
    onOpenChange: fn(),
  },
};

export const Error: Story = {
  args: {
    open: true,
    emails: ["you@agency.com"],
    error: "Failed to send test",
    onEmailsChange: fn(),
    onSubmit: fn(),
    onOpenChange: fn(),
  },
};

export const Success: Story = {
  args: {
    open: true,
    emails: ["you@agency.com", "ops@agency.com"],
    success: "Test queued to 2 addresses, arrives within ~1 min",
    onEmailsChange: fn(),
    onSubmit: fn(),
    onOpenChange: fn(),
  },
};

export const Busy: Story = {
  args: {
    open: true,
    emails: ["you@agency.com"],
    busy: true,
    onEmailsChange: fn(),
    onSubmit: fn(),
    onOpenChange: fn(),
  },
};

export const Interactive: Story = {
  render: function InteractiveModal() {
    const [open, setOpen] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Send test</Button>
        <MultiEmailModal
          open={open}
          onOpenChange={setOpen}
          emails={emails}
          onEmailsChange={setEmails}
          onSubmit={() => setOpen(false)}
        />
      </>
    );
  },
};
