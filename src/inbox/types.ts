import type { MouseEventHandler, ReactNode } from "react";

/**
 * Visual direction of a thread message. Matches GTM thread colour rails:
 * inbound (blue), campaign outbound (zinc), manual reply (emerald).
 */
export type InboxMessageDirection = "inbound" | "outbound_campaign" | "outbound_reply" | "unknown";

/**
 * Named folder icons shipped with {@link FolderList}. Pass a custom
 * `icon` node on the folder to override.
 */
export type InboxFolderIconName = "inbox" | "all" | "handled" | "unmatched" | "auto";

/**
 * Chip colour used on list rows and thread headers. Maps to the GTM `Badge`
 * variants (`default`, `info`, `muted`, `warning`, `danger`, `success`).
 */
export type InboxChipVariant = "default" | "info" | "muted" | "warning" | "danger" | "success";

/**
 * A folder in the left rail (Inbox, All mail, Handled, …).
 */
export interface InboxFolder {
  /** Stable id used for selection. */
  id: string;
  /** Visible label, sentence case (GTM uses “Inbox”, “All mail”). */
  label: string;
  /** Unread / unhandled count. Hidden when `0` or omitted. */
  count?: number;
  /** Cap for the blue pill (`99` → `99+`). Default `99`. */
  countMax?: number;
  /** Built-in icon. Ignored when `icon` is set. */
  iconName?: InboxFolderIconName;
  /** Custom icon node. */
  icon?: ReactNode;
  /** Optional href so the host can use real navigation. */
  href?: string;
}

/**
 * A mailbox row under the Mailboxes heading (domain or address).
 */
export interface InboxMailbox {
  /** Stable id used for selection. */
  id: string;
  /** Visible label (`@example.com` or a full address). */
  label: string;
  /** Unhandled count, shown as muted tabular numerals. */
  count?: number;
  /** Secondary line, e.g. “receiving off”. */
  hint?: string;
  /** Optional href so the host can use real navigation. */
  href?: string;
}

/**
 * A label / chip on a list row or message header.
 */
export interface InboxChip {
  /** Stable id. */
  id: string;
  /** Chip text. */
  label: string;
  /** Colour variant. */
  variant?: InboxChipVariant;
  /** Optional href. Clicks stop row-open so the chip is independently usable. */
  href?: string;
  /** Optional click handler. */
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * One row in {@link MessageList}.
 *
 * Times and names are preformatted by the host — the kit does not guess
 * timezones or lead URLs.
 */
export interface InboxListItem {
  id: string;
  /** Display name; falls back to `fromEmail`. */
  fromName?: string | null;
  fromEmail: string;
  subject?: string | null;
  snippet?: string | null;
  /** Machine-readable timestamp for `<time dateTime>`. */
  receivedAt?: string;
  /** Visible time label (“14:02”, “Mon”, “12 Mar”). */
  timeLabel: string;
  /** Tooltip absolute time. */
  timeTitle?: string;
  /**
   * Unread / unhandled. Bold sender + subject. Defaults to `!handled` when
   * omitted.
   */
  unread?: boolean;
  /** Handled / read. Used only when `unread` is omitted. */
  handled?: boolean;
  /** Labels under the subject (lead, campaign, auto-reply, …). */
  chips?: InboxChip[];
  hasAttachments?: boolean;
  attachmentCount?: number;
}

/**
 * An attachment listed under a thread message.
 */
export interface InboxAttachment {
  id: string;
  name: string;
  /** Preformatted size (“24 KB”). */
  sizeLabel?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * One message in {@link ThreadView}.
 */
export interface InboxThreadMessage {
  id: string;
  direction: InboxMessageDirection;
  /** Eyebrow above the subject (“Inbound from jane@…”, “Campaign email · step 2”). */
  directionLabel?: string;
  from?: string | null;
  to?: string[];
  cc?: string[];
  subject?: string | null;
  /** Machine-readable timestamp. */
  at?: string | null;
  /** Visible timestamp. */
  atLabel?: string;
  status?: string | null;
  /**
   * Untrusted HTML body. Rendered only through {@link SandboxedHtml}
   * (`sandbox=""` + CSP `srcdoc`). Never injected into the parent document.
   */
  html?: string | null;
  /** Plain-text body. */
  text?: string | null;
  attachments?: InboxAttachment[];
  chips?: InboxChip[];
  /** Extra footer (mark handled, category, reply-to-this). */
  actions?: ReactNode;
}

/**
 * Cursor paging event from {@link MessageList}.
 *
 * `cursor` is the opaque token from the host’s last response (`nextCursor`)
 * when moving older; `null` when moving newer (the host owns the stack).
 */
export interface InboxPageEvent {
  direction: "older" | "newer";
  cursor: string | null;
}
