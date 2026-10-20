import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { MessageMeta } from "./MessageMeta";

const meta = {
  title: "Inbox/MessageMeta",
  component: MessageMeta,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Message header: direction, subject, recipients, timestamp, status, and chips.",
      },
    },
  },
  args: {
    direction: "inbound",
    directionLabel: "Inbound from Jane Cooper",
    subject: "Re: Intro to Stack48",
    to: ["hello@stack48.com"],
    cc: ["ops@northwind.test"],
    timestamp: "20 Oct 2026, 14:02",
    timestampDateTime: "2026-10-20T13:02:00.000Z",
    chips: [{ id: "unhandled", label: "Unhandled", variant: "warning" }],
  },
} satisfies Meta<typeof MessageMeta>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-xl border border-border bg-blue-50/40 p-4 rounded-sm">{children}</div>
  );
}

export const Inbound: Story = {
  render: (args) => (
    <Frame>
      <MessageMeta {...args} />
    </Frame>
  ),
};

export const CampaignOutbound: Story = {
  args: {
    direction: "outbound_campaign",
    directionLabel: "Campaign email · step 2 · q4-intro",
    subject: "Intro to Stack48",
    to: ["jane@northwind.test"],
    cc: [],
    chips: [],
    timestamp: "18 Oct 2026, 10:00",
  },
  render: (args) => (
    <div className="max-w-xl border-l-2 border-zinc-400 bg-muted p-4 rounded-sm">
      <MessageMeta {...args} />
    </div>
  ),
};

export const ReplySent: Story = {
  args: {
    direction: "outbound_reply",
    directionLabel: "Reply sent by alex@stack48.com",
    subject: "Re: Intro to Stack48",
    to: ["jane@northwind.test"],
    cc: [],
    chips: [],
    status: "sent",
    timestamp: "20 Oct 2026, 14:40",
  },
  render: (args) => (
    <div className="max-w-xl border-l-2 border-emerald-500 bg-emerald-50/40 p-4 rounded-sm">
      <MessageMeta {...args} />
    </div>
  ),
};

export const Failed: Story = {
  args: {
    direction: "outbound_reply",
    directionLabel: "Reply sent by alex@stack48.com",
    status: "failed",
    chips: [{ id: "failed", label: "Failed", variant: "danger" }],
  },
  render: (args) => (
    <div className="max-w-xl border-l-2 border-emerald-500 bg-emerald-50/40 p-4 rounded-sm">
      <MessageMeta {...args} />
    </div>
  ),
};

export const Minimal: Story = {
  args: {
    direction: "unknown",
    directionLabel: undefined,
    subject: undefined,
    to: [],
    cc: [],
    chips: [],
    timestamp: "—",
  },
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: (args) => (
    <Frame>
      <MessageMeta {...args} />
    </Frame>
  ),
};
