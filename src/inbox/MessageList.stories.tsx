import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import { MessageList } from "./MessageList";
import { demoListItems } from "./_internal/demo";

const meta = {
  title: "Inbox/MessageList",
  component: MessageList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dense inbox rows with unread/handled weight, chips, selection + bulk actions, search/filter slot, and cursor paging.",
      },
    },
  },
  args: {
    items: demoListItems,
    unhandledCount: 12,
    nextCursor: "older-cursor",
    hasNewer: true,
  },
} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

function Stateful(args: ComponentProps<typeof MessageList>) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    args.selectedIds ? [...args.selectedIds] : [],
  );
  const [query, setQuery] = useState(args.searchValue ?? "");
  const [openId, setOpenId] = useState<string | null>(args.openId ?? null);
  const [focusedId, setFocusedId] = useState<string | null>(
    args.focusedId ?? args.items[0]?.id ?? null,
  );

  return (
    <div className="flex h-[520px] min-h-0 flex-col border border-border bg-card">
      <MessageList
        {...args}
        selectedIds={selectedIds}
        searchValue={query}
        onSearchChange={args.onSearchChange ? setQuery : args.onSearchChange}
        openId={openId}
        focusedId={focusedId}
        onOpen={(id) => {
          setOpenId(id);
          setFocusedId(id);
        }}
        onToggleSelect={(id) =>
          setSelectedIds((current) =>
            current.includes(id) ? current.filter((row) => row !== id) : [...current, id],
          )
        }
        onToggleSelectAll={() =>
          setSelectedIds((current) =>
            current.length === args.items.length ? [] : args.items.map((item) => item.id),
          )
        }
      />
    </div>
  );
}

export const Default: Story = {
  args: { onSearchChange: () => undefined, onRefresh: () => undefined, onHelp: () => undefined },
  render: (args) => <Stateful {...args} />,
};

export const UnreadAndHandled: Story = {
  args: { focusedId: "m1", openId: "m1" },
  render: (args) => <Stateful {...args} />,
};

export const Selected: Story = {
  args: {
    selectedIds: ["m1", "m2"],
    onBulkMarkHandled: () => undefined,
    onBulkMarkUnhandled: () => undefined,
  },
  render: (args) => <Stateful {...args} />,
};

export const Empty: Story = {
  args: {
    items: [],
    emptyTitle: "Inbox is empty",
    emptyBody: "No unhandled mail in this folder.",
    nextCursor: null,
    hasNewer: false,
  },
  render: (args) => <Stateful {...args} />,
};

export const Loading: Story = {
  args: { loading: true, items: [] },
  render: (args) => <Stateful {...args} />,
};

export const ErrorState: Story = {
  args: { error: "Could not load inbox (502): bad gateway" },
  render: (args) => <Stateful {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    selectedIds: ["m1"],
    onSearchChange: () => undefined,
    onBulkMarkHandled: () => undefined,
  },
  render: (args) => <Stateful {...args} />,
};

export const LoadMoreEmptyPage: Story = {
  args: {
    items: [],
    nextCursor: "next",
    hasNewer: true,
    emptyTitle: "No messages on this page",
    emptyBody: "There is older mail past this page. Load more to keep going.",
  },
  render: (args) => <Stateful {...args} />,
};

export const WithFilters: Story = {
  args: {
    onSearchChange: () => undefined,
    filterSlot: (
      <button
        type="button"
        className="inline-flex items-center gap-1 px-2 py-0.5 text-caption bg-blue-50 text-blue-700 border border-blue-200 rounded-sm"
      >
        To @stack48.com
        <span aria-hidden="true">×</span>
      </button>
    ),
  },
  render: (args) => <Stateful {...args} />,
};

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { onSearchChange: () => undefined },
  render: (args) => <Stateful {...args} />,
};
