import { useMemo, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InboxLayout } from "./InboxLayout";
import { FolderList } from "./FolderList";
import { MessageList } from "./MessageList";
import { ThreadView } from "./ThreadView";
import { useInboxKeyboard } from "./useInboxKeyboard";
import { nextFocusedIndex } from "./keyboard";
import { Button } from "../primitives/button";
import { Textarea } from "../primitives/textarea";
import { demoFolders, demoListItems, demoLongThread, demoMailboxes } from "./_internal/demo";

const meta = {
  title: "Inbox/InboxLayout",
  component: InboxLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Three-pane Gmail-style chrome: folder rail, dense list, reading pane. Presentational — compose FolderList, MessageList, and ThreadView.",
      },
    },
  },
} satisfies Meta<typeof InboxLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

function Pane({ children }: { children: ReactNode }) {
  return <div className="flex h-[640px] min-h-0 flex-col bg-background">{children}</div>;
}

function ReplyBox() {
  const [text, setText] = useState("");
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground mb-1">Reply</h2>
      <p className="text-xs text-muted-foreground mb-3">Sending as the original campaign address</p>
      <Textarea
        className="min-h-[140px]"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a plain-text reply…"
        rows={5}
      />
      <div className="mt-3 flex justify-end">
        <Button disabled={text.trim().length === 0}>Send</Button>
      </div>
    </div>
  );
}

function FullInbox({
  readingPaneOpen = true,
  empty = false,
  loading = false,
  error = false,
}: {
  readingPaneOpen?: boolean;
  empty?: boolean;
  loading?: boolean;
  error?: boolean;
}) {
  const items = useMemo(() => (empty ? [] : demoListItems), [empty]);
  const [folderId, setFolderId] = useState("inbox");
  const [mailboxId, setMailboxId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(readingPaneOpen ? "m1" : null);
  const [query, setQuery] = useState("");
  const focusedId = items[focusedIndex]?.id ?? null;

  useInboxKeyboard({
    onMove: (delta) => setFocusedIndex((current) => nextFocusedIndex(current, delta, items.length)),
    onOpen: () => {
      if (focusedId) setOpenId(focusedId);
    },
    onSelect: () => {
      if (!focusedId) return;
      setSelectedIds((current) =>
        current.includes(focusedId)
          ? current.filter((id) => id !== focusedId)
          : [...current, focusedId],
      );
    },
    onSearch: () => {
      const el = document.querySelector<HTMLInputElement>("[data-inbox-search]");
      el?.focus();
      el?.select();
    },
    onBack: () => setOpenId(null),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.subject?.toLowerCase().includes(q) ||
        item.fromEmail.toLowerCase().includes(q) ||
        item.fromName?.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <InboxLayout
      readingPaneOpen={Boolean(openId)}
      folderRail={
        <FolderList
          folders={demoFolders}
          selectedFolderId={folderId}
          onSelectFolder={(id) => {
            setFolderId(id);
            setMailboxId(null);
          }}
          mailboxes={demoMailboxes}
          selectedMailboxId={mailboxId}
          onSelectMailbox={setMailboxId}
        />
      }
      list={
        <MessageList
          items={filtered}
          selectedIds={selectedIds}
          focusedId={focusedId}
          openId={openId}
          onOpen={setOpenId}
          onToggleSelect={(id) =>
            setSelectedIds((current) =>
              current.includes(id) ? current.filter((row) => row !== id) : [...current, id],
            )
          }
          onToggleSelectAll={() =>
            setSelectedIds((current) =>
              current.length === filtered.length ? [] : filtered.map((item) => item.id),
            )
          }
          searchValue={query}
          onSearchChange={setQuery}
          unhandledCount={12}
          loading={loading}
          error={error ? "Could not load inbox (500): upstream timeout" : undefined}
          emptyTitle={query ? "No matching mail" : "Inbox is empty"}
          emptyBody={query ? `Nothing matched “${query}”.` : "No unhandled mail in this folder."}
          nextCursor="cursor-older"
          hasNewer
          onPage={() => undefined}
          onBulkMarkHandled={() => setSelectedIds([])}
          onBulkMarkUnhandled={() => setSelectedIds([])}
          onRefresh={() => undefined}
          onHelp={() => undefined}
        />
      }
      readingPane={
        <div className="p-4">
          <ThreadView
            title="Jane Cooper"
            subtitle="jane@northwind.test"
            recipientsSummary="To hello@stack48.com · Cc ops@northwind.test"
            messages={demoLongThread}
            replySlot={<ReplyBox />}
          />
        </div>
      }
    />
  );
}

const listArg = <div />;

export const Default: Story = {
  args: { list: listArg },
  render: () => (
    <Pane>
      <FullInbox />
    </Pane>
  ),
};

export const ListOnly: Story = {
  args: { list: listArg },
  render: () => (
    <Pane>
      <FullInbox readingPaneOpen={false} />
    </Pane>
  ),
};

export const Empty: Story = {
  args: { list: listArg },
  render: () => (
    <Pane>
      <FullInbox empty readingPaneOpen={false} />
    </Pane>
  ),
};

export const Loading: Story = {
  args: { list: listArg },
  render: () => (
    <Pane>
      <FullInbox loading readingPaneOpen={false} />
    </Pane>
  ),
};

export const ErrorState: Story = {
  args: { list: listArg },
  render: () => (
    <Pane>
      <FullInbox error readingPaneOpen={false} />
    </Pane>
  ),
};

export const Dark: Story = {
  args: { list: listArg },
  globals: { theme: "dark" },
  render: () => (
    <Pane>
      <FullInbox />
    </Pane>
  ),
};
