import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Button } from "../primitives/button";
import { ConfirmDialog } from "./confirm-dialog";
import { StoryFrame } from "./story-frame";

const meta = {
  title: "States/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    open: true,
    title: "Pause this campaign?",
    description: "It will stop sending new emails.",
    confirmLabel: "Pause",
    onConfirm: fn(),
    onOpenChange: fn(),
  },
};

export const Destructive: Story = {
  args: {
    open: true,
    title: "Delete this draft?",
    description: "This cannot be undone.",
    confirmLabel: "Delete",
    variant: "destructive",
    onConfirm: fn(),
    onOpenChange: fn(),
  },
};

export const TypeSendOrCount: Story = {
  args: {
    open: true,
    title: "Confirm send",
    description: (
      <>
        This will send to <strong className="tabular-nums">1,240</strong> pre-flight OK recipients.
      </>
    ),
    confirmMode: "type",
    confirmCount: 1240,
    confirmLabel: "Send mailing",
    onConfirm: fn(),
    onOpenChange: fn(),
    children: (
      <div className="space-y-1 rounded-sm border border-border bg-zinc-50 p-3">
        <p className="text-xs text-zinc-700">20/hour · 09:00–17:00 Europe/London</p>
        <p className="text-xs text-zinc-500">Estimated duration: ~3 days for 1,240 OK</p>
      </div>
    ),
  },
};

export const TypeBusy: Story = {
  args: {
    open: true,
    title: "Confirm send",
    description: "Sending to 12 recipients.",
    confirmMode: "type",
    confirmCount: 12,
    confirmValue: "SEND",
    busy: true,
    confirmLabel: "Send mailing",
    onConfirm: fn(),
    onOpenChange: fn(),
  },
};

export const ClosedTrigger: Story = {
  render: function Closed() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Send mailing</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Confirm send"
          confirmMode="type"
          confirmCount={5}
          confirmLabel="Send mailing"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};
