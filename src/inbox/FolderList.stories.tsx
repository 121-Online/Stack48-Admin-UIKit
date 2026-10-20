import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { FolderList } from "./FolderList";
import { demoFolders, demoMailboxes } from "./_internal/demo";

const meta = {
  title: "Inbox/FolderList",
  component: FolderList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Folder rail with unread count pills and a Mailboxes section of domains / addresses.",
      },
    },
  },
  args: {
    folders: demoFolders,
    selectedFolderId: "inbox",
    mailboxes: demoMailboxes,
  },
} satisfies Meta<typeof FolderList>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: ReactNode }) {
  return <div className="h-[480px] w-52 border-r border-border bg-zinc-50/60">{children}</div>;
}

export const Default: Story = {
  render: function Render(args) {
    const [folderId, setFolderId] = useState(args.selectedFolderId ?? "inbox");
    const [mailboxId, setMailboxId] = useState<string | null>(null);
    return (
      <Frame>
        <FolderList
          {...args}
          selectedFolderId={folderId}
          selectedMailboxId={mailboxId}
          onSelectFolder={(id) => {
            setFolderId(id);
            setMailboxId(null);
          }}
          onSelectMailbox={setMailboxId}
        />
      </Frame>
    );
  },
};

export const EmptyMailboxes: Story = {
  args: { mailboxes: [] },
  render: (args) => (
    <Frame>
      <FolderList {...args} />
    </Frame>
  ),
};

export const TruncatedMailboxes: Story = {
  args: { mailboxesTruncated: true },
  render: (args) => (
    <Frame>
      <FolderList {...args} />
    </Frame>
  ),
};

export const HighCount: Story = {
  args: {
    folders: demoFolders.map((folder) =>
      folder.id === "inbox" ? { ...folder, count: 128 } : folder,
    ),
  },
  render: (args) => (
    <Frame>
      <FolderList {...args} />
    </Frame>
  ),
};

export const NoMailboxesSection: Story = {
  args: { mailboxes: undefined },
  render: (args) => (
    <Frame>
      <FolderList {...args} />
    </Frame>
  ),
};

export const Dark: Story = {
  globals: { theme: "dark" },
  render: (args) => (
    <Frame>
      <FolderList {...args} />
    </Frame>
  ),
};
