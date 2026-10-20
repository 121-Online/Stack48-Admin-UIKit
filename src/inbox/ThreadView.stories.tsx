import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { Button } from "../primitives/button";
import { Textarea } from "../primitives/textarea";
import { ThreadView } from "./ThreadView";
import { demoLongThread, demoThread } from "./_internal/demo";
import type { InboxThreadMessage } from "./types";

const meta = {
  title: "Inbox/ThreadView",
  component: ThreadView,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Conversation reading pane: headers, sandboxed HTML bodies, attachments, collapsed earlier messages, and a reply slot.",
      },
    },
  },
  args: {
    title: "Jane Cooper",
    subtitle: "jane@northwind.test",
    recipientsSummary: "To hello@stack48.com · Cc ops@northwind.test",
    messages: demoThread,
  },
} satisfies Meta<typeof ThreadView>;

export default meta;
type Story = StoryObj<typeof meta>;

function ReplySlot({
  disabled = false,
  excluded = false,
}: {
  disabled?: boolean;
  excluded?: boolean;
}) {
  const [text, setText] = useState("");
  if (excluded) {
    return <p className="text-sm text-red-700">This lead is excluded. Replies are disabled.</p>;
  }
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground mb-1">Reply</h2>
      <Textarea
        className="min-h-[120px]"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a plain-text reply…"
        disabled={disabled}
      />
      <div className="mt-3 flex justify-end">
        <Button disabled={disabled || text.trim().length === 0}>
          {disabled ? "Sending…" : "Send"}
        </Button>
      </div>
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl bg-zinc-50 p-4">{children}</div>;
}

const withActions: InboxThreadMessage[] = demoThread.map((message) =>
  message.direction === "inbound"
    ? {
        ...message,
        actions: <Button size="sm">Mark handled</Button>,
      }
    : message,
);

export const Default: Story = {
  args: { messages: withActions, replySlot: <ReplySlot /> },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const CollapsedEarlier: Story = {
  args: { messages: demoLongThread, keepLatest: 3, replySlot: <ReplySlot /> },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const Empty: Story = {
  args: { messages: [], title: "Unmatched reply", subtitle: "unknown sender" },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const Loading: Story = {
  args: { messages: [], loading: true },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const ErrorState: Story = {
  args: { error: "Could not load conversation (404): thread missing" },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const Truncated: Story = {
  args: { truncated: true, messages: demoLongThread },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const TextOnly: Story = {
  args: {
    messages: [
      {
        id: "text",
        direction: "inbound",
        directionLabel: "Inbound from billing@acme.test",
        subject: "Invoice",
        atLabel: "20 Oct 2026, 09:00",
        text: "Please find invoice 1044 attached.",
      },
    ],
  },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const HtmlOnly: Story = {
  args: {
    messages: [
      {
        id: "html",
        direction: "inbound",
        directionLabel: "Inbound from jane@northwind.test",
        subject: "HTML mail",
        atLabel: "20 Oct 2026, 09:00",
        html: "<h1>Hello</h1><p>This HTML is rendered in a <em>sandboxed</em> iframe.</p><script>alert('xss')</script>",
      },
    ],
  },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const NoBody: Story = {
  args: {
    messages: [
      {
        id: "empty-body",
        direction: "outbound_campaign",
        directionLabel: "Campaign email · step 2",
        subject: "Follow-up",
        atLabel: "20 Oct 2026, 09:00",
      },
    ],
  },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const ExcludedReply: Story = {
  args: {
    headerEnd: (
      <span className="inline-flex items-center px-2 py-0.5 text-caption font-medium rounded bg-red-50 text-red-700">
        Excluded
      </span>
    ),
    replySlot: <ReplySlot excluded />,
  },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { replySlot: <ReplySlot /> },
  render: (args) => (
    <Frame>
      <ThreadView {...args} />
    </Frame>
  ),
};
