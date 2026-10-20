import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { FolderIcon } from "./_internal/icons";
import type { InboxFolder, InboxMailbox } from "./types";

/**
 * Props for {@link FolderList}.
 */
export interface FolderListProps {
  folders: InboxFolder[];
  /** Currently selected folder id. */
  selectedFolderId?: string | null;
  onSelectFolder?: (id: string) => void;
  mailboxes?: InboxMailbox[];
  /** Currently selected mailbox id. */
  selectedMailboxId?: string | null;
  onSelectMailbox?: (id: string) => void;
  /** Heading above the mailbox list. Default `"Mailboxes"`. */
  mailboxesHeading?: string;
  /** Shown when `mailboxes` is empty. */
  mailboxesEmptyLabel?: string;
  /** Trailing note when the host truncated the mailbox query. */
  mailboxesTruncated?: boolean;
  mailboxesTruncatedLabel?: string;
  className?: string;
  /** Extra content below the mailbox list (e.g. a “manage” link). */
  footer?: ReactNode;
}

function formatCount(count: number, countMax = 99): string {
  return count > countMax ? `${countMax}+` : String(count);
}

function FolderRow({
  folder,
  active,
  onSelect,
}: {
  folder: InboxFolder;
  active: boolean;
  onSelect?: (id: string) => void;
}) {
  const className = cn(
    "flex w-full items-center gap-2 px-2 py-1.5 text-body rounded-sm text-left",
    active
      ? "bg-card text-foreground font-semibold border border-border"
      : "text-zinc-600 hover:bg-white/80 hover:text-foreground",
  );

  const content = (
    <>
      <span className={active ? "text-blue-600" : "text-zinc-400"}>
        {folder.icon ?? <FolderIcon name={folder.iconName ?? "inbox"} />}
      </span>
      <span className="flex-1 truncate">{folder.label}</span>
      {folder.count != null && folder.count > 0 ? (
        <span className="ml-auto min-w-[1.25rem] px-1 py-0.5 text-micro font-semibold leading-none text-center rounded-full bg-brand text-brand-foreground">
          {formatCount(folder.count, folder.countMax)}
        </span>
      ) : null}
    </>
  );

  if (folder.href) {
    return (
      <a
        href={folder.href}
        className={className}
        aria-current={active ? "page" : undefined}
        onClick={() => onSelect?.(folder.id)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-current={active ? "true" : undefined}
      onClick={() => onSelect?.(folder.id)}
    >
      {content}
    </button>
  );
}

function MailboxRow({
  mailbox,
  active,
  onSelect,
}: {
  mailbox: InboxMailbox;
  active: boolean;
  onSelect?: (id: string) => void;
}) {
  const className = cn(
    "flex w-full items-start gap-2 px-2 py-1.5 text-xs rounded-sm text-left",
    active
      ? "bg-card border border-border text-foreground font-medium"
      : "text-zinc-600 hover:bg-white/80",
  );

  const content = (
    <>
      <span className="flex-1 min-w-0">
        <span className="block truncate font-medium">{mailbox.label}</span>
        {mailbox.hint ? (
          <span className="block text-micro text-zinc-400">{mailbox.hint}</span>
        ) : null}
      </span>
      {mailbox.count != null && mailbox.count > 0 ? (
        <span className="text-micro text-zinc-400 tabular-nums">{mailbox.count}</span>
      ) : null}
    </>
  );

  if (mailbox.href) {
    return (
      <a
        href={mailbox.href}
        className={className}
        title={mailbox.label}
        aria-current={active ? "page" : undefined}
        onClick={() => onSelect?.(mailbox.id)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      title={mailbox.label}
      aria-current={active ? "true" : undefined}
      onClick={() => onSelect?.(mailbox.id)}
    >
      {content}
    </button>
  );
}

/**
 * Gmail-style folder rail: folders with unread counts, then a Mailboxes
 * section of domains / addresses. Selection is controlled via props.
 */
export function FolderList({
  folders,
  selectedFolderId,
  onSelectFolder,
  mailboxes,
  selectedMailboxId,
  onSelectMailbox,
  mailboxesHeading = "Mailboxes",
  mailboxesEmptyLabel = "No mailboxes yet",
  mailboxesTruncated = false,
  mailboxesTruncatedLabel = "Mailbox list is truncated",
  className,
  footer,
}: FolderListProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <nav className="p-2 space-y-0.5" aria-label="Inbox folders">
        {folders.map((folder) => (
          <FolderRow
            key={folder.id}
            folder={folder}
            active={selectedFolderId === folder.id && !selectedMailboxId}
            onSelect={onSelectFolder}
          />
        ))}
      </nav>

      {mailboxes ? (
        <div className="mt-3 px-3 pb-4">
          <p className="text-micro font-medium uppercase tracking-wider text-zinc-400 mb-2">
            {mailboxesHeading}
          </p>
          <div className="space-y-0.5" aria-label={mailboxesHeading}>
            {mailboxes.length === 0 ? (
              <p className="text-caption text-zinc-400 px-1">{mailboxesEmptyLabel}</p>
            ) : (
              mailboxes.map((mailbox) => (
                <MailboxRow
                  key={mailbox.id}
                  mailbox={mailbox}
                  active={selectedMailboxId === mailbox.id}
                  onSelect={onSelectMailbox}
                />
              ))
            )}
            {mailboxesTruncated ? (
              <p className="text-micro text-zinc-400 px-2 pt-2">{mailboxesTruncatedLabel}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {footer}
    </div>
  );
}
