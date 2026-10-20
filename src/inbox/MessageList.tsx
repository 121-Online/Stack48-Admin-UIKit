import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Chip } from "./_internal/Chip";
import { btnPrimary, btnSecondary, inputField } from "./_internal/chrome";
import { PaperclipIcon, RefreshIcon } from "./_internal/icons";
import type { InboxListItem, InboxPageEvent } from "./types";

/**
 * Props for {@link MessageList}.
 *
 * Selection, search, and paging are controlled. The kit never fetches.
 */
export interface MessageListProps {
  items: InboxListItem[];
  /** Currently ticked row ids. */
  selectedIds?: readonly string[];
  onToggleSelect?: (id: string) => void;
  onToggleSelectAll?: () => void;
  /** Keyboard / visual focus (the `j`/`k` row). */
  focusedId?: string | null;
  /** Row open in the reading pane. */
  openId?: string | null;
  onOpen?: (id: string) => void;
  /** Controlled search value. Hidden when omitted and `searchSlot` is unset. */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  /** Replaces the built-in search field. */
  searchSlot?: ReactNode;
  /** Filter chips / extra controls under the search row. */
  filterSlot?: ReactNode;
  /** Extra buttons on the search row (refresh, shortcuts, …). */
  toolbarEndSlot?: ReactNode;
  onRefresh?: () => void;
  refreshLabel?: string;
  onHelp?: () => void;
  /** Unhandled count shown next to select-all. */
  unhandledCount?: number;
  unhandledLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  error?: ReactNode;
  emptyTitle?: string;
  emptyBody?: string;
  /** Opaque cursor for the *next older* page. */
  nextCursor?: string | null;
  /** True when a newer page exists (host-owned cursor stack). */
  hasNewer?: boolean;
  /** Cursor paging. `cursor` is `nextCursor` when moving older. */
  onPage?: (event: InboxPageEvent) => void;
  /** Bulk-action callbacks. The bar appears when `selectedIds` is non-empty. */
  onBulkMarkHandled?: (ids: readonly string[]) => void;
  onBulkMarkUnhandled?: (ids: readonly string[]) => void;
  /** Extra bulk controls (category select, …). */
  bulkSlot?: ReactNode;
  bulkBusy?: boolean;
  pageCountLabel?: string;
  className?: string;
}

function isUnread(item: InboxListItem): boolean {
  if (item.unread != null) return item.unread;
  if (item.handled != null) return !item.handled;
  return true;
}

function MessageRow({
  item,
  selected,
  focused,
  open,
  disabled,
  onOpen,
  onToggleSelect,
}: {
  item: InboxListItem;
  selected: boolean;
  focused: boolean;
  open: boolean;
  disabled?: boolean;
  onOpen?: (id: string) => void;
  onToggleSelect?: (id: string) => void;
}) {
  const unread = isUnread(item);
  const sender = item.fromName || item.fromEmail;
  const subject = item.subject || "(no subject)";

  function onRowKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen?.(item.id);
    }
  }

  return (
    <div
      role="listitem"
      data-inbox-row={item.id}
      data-focused={focused ? "true" : undefined}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 border-b border-zinc-100 cursor-pointer",
        open
          ? "bg-zinc-100"
          : focused
            ? "bg-blue-50"
            : selected
              ? "bg-blue-50/40"
              : "hover:bg-zinc-50",
      )}
      onClick={() => onOpen?.(item.id)}
      onKeyDown={onRowKeyDown}
      tabIndex={focused ? 0 : -1}
      aria-selected={selected}
    >
      <input
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={() => onToggleSelect?.(item.id)}
        onClick={(event) => event.stopPropagation()}
        className="w-4 h-4 rounded-sm flex-shrink-0 accent-brand"
        aria-label={`Select ${subject}`}
      />
      <div
        className={cn(
          "w-[28%] min-w-[7rem] max-w-[14rem] truncate text-body",
          unread ? "font-semibold text-foreground" : "font-medium text-zinc-700",
        )}
      >
        <span className="block truncate">{sender}</span>
        {item.fromName ? (
          <span className="block truncate text-micro font-normal font-mono text-zinc-400">
            {item.fromEmail}
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={cn(
              "truncate text-body",
              unread ? "font-semibold text-foreground" : "text-zinc-800",
            )}
          >
            {subject}
          </span>
          {item.snippet ? (
            <span className="hidden sm:inline truncate text-xs text-zinc-400">
              — {item.snippet}
            </span>
          ) : null}
        </div>
        {item.chips && item.chips.length > 0 ? (
          <div className="mt-0.5 flex flex-wrap items-center gap-1">
            {item.chips.map((chip) => (
              <Chip
                key={chip.id}
                variant={chip.variant}
                href={chip.href}
                onClick={(event) => {
                  event.stopPropagation();
                  chip.onClick?.(event);
                }}
              >
                {chip.label}
              </Chip>
            ))}
            {item.hasAttachments ? (
              <span
                className="text-zinc-400"
                title={
                  item.attachmentCount ? `${item.attachmentCount} attachments` : "Has attachments"
                }
              >
                <PaperclipIcon />
              </span>
            ) : null}
          </div>
        ) : item.hasAttachments ? (
          <div className="mt-0.5">
            <span
              className="text-zinc-400"
              title={
                item.attachmentCount ? `${item.attachmentCount} attachments` : "Has attachments"
              }
            >
              <PaperclipIcon />
            </span>
          </div>
        ) : null}
      </div>
      <time
        className="flex-shrink-0 w-16 text-right text-caption text-muted-foreground tabular-nums"
        dateTime={item.receivedAt}
        title={item.timeTitle}
      >
        {item.timeLabel}
      </time>
    </div>
  );
}

/**
 * Dense Gmail-style message list: unread/handled rows, chips, selection with
 * a bulk-action bar, a search/filter slot, and cursor paging via `onPage`.
 */
export function MessageList({
  items,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  focusedId,
  openId,
  onOpen,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search mail",
  searchAriaLabel = "Search mail",
  searchSlot,
  filterSlot,
  toolbarEndSlot,
  onRefresh,
  refreshLabel = "Refresh",
  onHelp,
  unhandledCount,
  unhandledLabel,
  loading = false,
  disabled = false,
  error,
  emptyTitle = "No messages",
  emptyBody,
  nextCursor = null,
  hasNewer = false,
  onPage,
  onBulkMarkHandled,
  onBulkMarkUnhandled,
  bulkSlot,
  bulkBusy = false,
  pageCountLabel,
  className,
}: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const selected = new Set(selectedIds);
  const allSelected = items.length > 0 && items.every((item) => selected.has(item.id));
  const selectedCount = selectedIds.length;
  const showSearch = searchSlot != null || onSearchChange != null;

  useEffect(() => {
    if (!focusedId) return;
    const row = listRef.current?.querySelector(`[data-inbox-row="${focusedId}"]`);
    if (row instanceof HTMLElement && typeof row.scrollIntoView === "function") {
      row.scrollIntoView({ block: "nearest" });
    }
  }, [focusedId]);

  const countLabel =
    unhandledLabel ??
    (typeof unhandledCount === "number" ? `${unhandledCount.toLocaleString()} unhandled` : null);

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {showSearch || toolbarEndSlot || onRefresh || onHelp ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
          {searchSlot ??
            (onSearchChange ? (
              <div className="relative flex-1 min-w-[160px]">
                <input
                  type="search"
                  className={inputField}
                  placeholder={searchPlaceholder}
                  value={searchValue ?? ""}
                  onChange={(event) => onSearchChange(event.target.value)}
                  aria-label={searchAriaLabel}
                  disabled={disabled}
                  data-inbox-search=""
                />
              </div>
            ) : (
              <div className="flex-1 min-w-[160px]" />
            ))}
          {toolbarEndSlot}
          {onRefresh ? (
            <button
              type="button"
              className={cn(btnSecondary, "inline-flex items-center gap-1.5")}
              onClick={onRefresh}
              disabled={disabled || loading}
            >
              <RefreshIcon />
              {refreshLabel}
            </button>
          ) : null}
          {onHelp ? (
            <button
              type="button"
              className={btnSecondary}
              onClick={onHelp}
              aria-label="Keyboard shortcuts"
              disabled={disabled}
            >
              ?
            </button>
          ) : null}
        </div>
      ) : null}

      {filterSlot ? (
        <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-100 px-3 py-2">
          {filterSlot}
        </div>
      ) : null}

      {selectedCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-blue-100 bg-blue-50 px-3 py-2">
          <span className="text-xs font-medium text-blue-800">{selectedCount} selected</span>
          {onBulkMarkHandled ? (
            <button
              type="button"
              className={cn(btnPrimary, "text-[11px]")}
              disabled={disabled || bulkBusy}
              onClick={() => onBulkMarkHandled(selectedIds)}
            >
              Mark handled
            </button>
          ) : null}
          {onBulkMarkUnhandled ? (
            <button
              type="button"
              className={cn(btnSecondary, "text-[11px]")}
              disabled={disabled || bulkBusy}
              onClick={() => onBulkMarkUnhandled(selectedIds)}
            >
              Mark unhandled
            </button>
          ) : null}
          {bulkSlot}
        </div>
      ) : null}

      {error ? (
        <div
          className="px-3 py-2 text-sm text-red-800 bg-red-50 border-b border-red-200"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className="flex items-center gap-2 border-b border-zinc-100 px-3 py-1.5 text-caption text-muted-foreground">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => onToggleSelectAll?.()}
          className="w-4 h-4 rounded-sm accent-brand"
          aria-label="Select all on page"
          disabled={disabled || items.length === 0}
        />
        <span>{loading ? "Loading…" : countLabel}</span>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-sm font-medium text-zinc-700">{emptyTitle}</p>
            {emptyBody ? (
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">{emptyBody}</p>
            ) : null}
          </div>
        </div>
      ) : (
        <div ref={listRef} className="flex-1 overflow-y-auto" role="list" aria-label="Messages">
          {items.map((item) => (
            <MessageRow
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              focused={focusedId === item.id}
              open={openId === item.id}
              disabled={disabled}
              onOpen={onOpen}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <div className="flex items-center gap-2">
          {hasNewer ? (
            <button
              type="button"
              className={cn(btnSecondary, "text-xs")}
              disabled={disabled}
              onClick={() => onPage?.({ direction: "newer", cursor: null })}
            >
              Newer
            </button>
          ) : null}
          {nextCursor ? (
            <button
              type="button"
              className={cn(btnSecondary, "text-xs")}
              disabled={disabled}
              onClick={() => onPage?.({ direction: "older", cursor: nextCursor })}
            >
              {items.length === 0 ? "Load more" : "Older"}
            </button>
          ) : null}
        </div>
        <p className="text-caption text-zinc-400">
          {pageCountLabel ?? `${items.length} on this page`}
        </p>
      </div>
    </div>
  );
}
