import { useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { MessageBody } from "./_internal/MessageBody";
import { PaperclipIcon } from "./_internal/icons";
import { MessageMeta } from "./MessageMeta";
import type { InboxMessageDirection, InboxThreadMessage } from "./types";

/**
 * Props for {@link ThreadView}.
 */
export interface ThreadViewProps {
  /** Conversation heading (lead name, or “Unmatched reply”). */
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Extra header actions (replied badge, excluded, lead link). */
  headerEnd?: ReactNode;
  /** Recipients summary under the heading. */
  recipientsSummary?: string | null;
  messages: InboxThreadMessage[];
  /** Host truncated the thread server-side. */
  truncated?: boolean;
  truncatedMessage?: string;
  /** Collapse messages before the last N. Default `3`, matching GTM. */
  keepLatest?: number;
  emptyTitle?: string;
  error?: ReactNode;
  loading?: boolean;
  /** Reply composer. The kit does not send mail. */
  replySlot?: ReactNode;
  className?: string;
}

const directionFrame: Record<InboxMessageDirection, string> = {
  inbound: "border-l-2 border-brand bg-blue-50/40",
  outbound_campaign: "border-l-2 border-zinc-400 bg-muted",
  outbound_reply: "border-l-2 border-emerald-500 bg-emerald-50/40",
  unknown: "border-l-2 border-border bg-card",
};

function ThreadMessage({ message }: { message: InboxThreadMessage }) {
  const attachments = message.attachments ?? [];

  return (
    <article
      className={cn("rounded-sm p-4", directionFrame[message.direction])}
      aria-label={message.subject || message.directionLabel || "Message"}
    >
      <MessageMeta
        direction={message.direction}
        directionLabel={message.directionLabel}
        subject={message.subject}
        from={message.from}
        to={message.to}
        cc={message.cc}
        timestamp={message.atLabel}
        timestampDateTime={message.at}
        status={message.status}
        chips={message.chips}
        className="mb-1"
      />
      <MessageBody message={message} />
      {attachments.length > 0 ? (
        <ul className="mt-3 space-y-1" aria-label="Attachments">
          {attachments.map((file) => {
            const body = (
              <>
                <PaperclipIcon />
                <span className="truncate">{file.name}</span>
                {file.sizeLabel ? (
                  <span className="text-micro text-muted-foreground tabular-nums">
                    {file.sizeLabel}
                  </span>
                ) : null}
              </>
            );
            const cls =
              "flex items-center gap-1.5 text-caption text-zinc-700 hover:text-foreground";
            return (
              <li key={file.id}>
                {file.href ? (
                  <a href={file.href} className={cls} onClick={file.onClick}>
                    {body}
                  </a>
                ) : (
                  <button type="button" className={cls} onClick={file.onClick}>
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
      {message.actions ? (
        <div className="mt-3 pt-3 border-t border-blue-100 flex flex-wrap items-end gap-2">
          {message.actions}
        </div>
      ) : null}
    </article>
  );
}

/**
 * Reading-pane conversation: message headers, sandboxed HTML bodies,
 * attachments, a “show earlier” collapse, and a reply slot.
 */
export function ThreadView({
  title,
  subtitle,
  headerEnd,
  recipientsSummary,
  messages,
  truncated = false,
  truncatedMessage = "This thread was truncated. Older messages may be missing.",
  keepLatest = 3,
  emptyTitle = "No messages in this thread",
  error,
  loading = false,
  replySlot,
  className,
}: ThreadViewProps) {
  const [showOlder, setShowOlder] = useState(false);
  const olderCount = Math.max(0, messages.length - keepLatest);
  const visible = showOlder || olderCount === 0 ? messages : messages.slice(-keepLatest);

  return (
    <div className={cn("min-w-0", className)}>
      {title || subtitle || headerEnd || recipientsSummary ? (
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {title ? (
                typeof title === "string" ? (
                  <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                ) : (
                  title
                )
              ) : null}
              {subtitle ? (
                typeof subtitle === "string" ? (
                  <p className="text-sm font-mono text-zinc-600 mt-0.5">{subtitle}</p>
                ) : (
                  subtitle
                )
              ) : null}
            </div>
            {headerEnd ? <div className="flex items-center gap-2">{headerEnd}</div> : null}
          </div>
          {recipientsSummary ? (
            <p className="text-caption text-muted-foreground mt-2">{recipientsSummary}</p>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <div
          className="mb-4 bg-red-50 border border-red-200 rounded-sm p-4 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {truncated ? (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-sm p-3 text-sm text-amber-800">
          {truncatedMessage}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-muted-foreground mb-4">Loading conversation…</p> : null}

      <div className="space-y-3 mb-6">
        {messages.length === 0 && !loading ? (
          <div className="bg-card border border-border rounded-sm p-8 text-center text-muted-foreground">
            {emptyTitle}
          </div>
        ) : (
          <>
            {olderCount > 0 && !showOlder ? (
              <button
                type="button"
                className="w-full py-2 text-xs text-zinc-600 bg-card border border-border rounded-sm hover:bg-muted"
                onClick={() => setShowOlder(true)}
              >
                Show {olderCount} older {olderCount === 1 ? "message" : "messages"}
              </button>
            ) : null}
            {visible.map((message) => (
              <ThreadMessage key={`${message.direction}-${message.id}`} message={message} />
            ))}
          </>
        )}
      </div>

      {replySlot ? (
        <div className="bg-card border border-border rounded-sm p-4">{replySlot}</div>
      ) : null}
    </div>
  );
}
