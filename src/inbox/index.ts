/**
 * Inbox / thread / message list surfaces used by GTM mailings and similar.
 *
 * Presentational only. Pass rows, counts, and callbacks — the kit never
 * fetches, never talks to Gmail/Resend, and never injects untrusted HTML
 * into the parent document (see {@link SandboxedHtml}).
 *
 * @packageDocumentation
 */
export { InboxLayout } from "./InboxLayout";
export type { InboxLayoutProps } from "./InboxLayout";

export { FolderList } from "./FolderList";
export type { FolderListProps } from "./FolderList";

export { MessageList } from "./MessageList";
export type { MessageListProps } from "./MessageList";

export { ThreadView } from "./ThreadView";
export type { ThreadViewProps } from "./ThreadView";

export { MessageMeta } from "./MessageMeta";
export type { MessageMetaProps } from "./MessageMeta";

export { SandboxedHtml, buildInboxHtmlSrcDoc, INBOX_HTML_CSP } from "./SandboxedHtml";
export type { SandboxedHtmlProps } from "./SandboxedHtml";

export { useInboxKeyboard } from "./useInboxKeyboard";
export type { InboxKeyboardCallbacks, InboxKeyboardOptions } from "./useInboxKeyboard";

export {
  INBOX_SHORTCUTS,
  isEditableKeyboardTarget,
  nextFocusedIndex,
  resolveInboxKey,
} from "./keyboard";
export type { InboxKeyAction, InboxKeyEvent, InboxShortcut } from "./keyboard";

export type {
  InboxAttachment,
  InboxChip,
  InboxChipVariant,
  InboxFolder,
  InboxFolderIconName,
  InboxListItem,
  InboxMailbox,
  InboxMessageDirection,
  InboxPageEvent,
  InboxThreadMessage,
} from "./types";
