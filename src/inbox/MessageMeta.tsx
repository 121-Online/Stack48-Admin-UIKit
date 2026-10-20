import { cn } from "../lib/cn";
import { Chip } from "./_internal/Chip";
import type { InboxChip, InboxMessageDirection } from "./types";

/**
 * Props for {@link MessageMeta}.
 */
export interface MessageMetaProps {
  /** Eyebrow (“Inbound from jane@…”, “Reply sent by Alex”). */
  directionLabel?: string;
  direction?: InboxMessageDirection;
  subject?: string | null;
  from?: string | null;
  to?: string[];
  cc?: string[];
  /** Preformatted recipients line. Overrides `to` / `cc` when set. */
  recipientsLabel?: string | null;
  /** Visible timestamp. */
  timestamp?: string | null;
  /** Machine-readable timestamp for `<time dateTime>`. */
  timestampDateTime?: string | null;
  status?: string | null;
  chips?: InboxChip[];
  className?: string;
}

const directionEyebrowClass: Record<InboxMessageDirection, string> = {
  inbound: "text-blue-800",
  outbound_campaign: "text-zinc-600",
  outbound_reply: "text-emerald-800",
  unknown: "text-muted-foreground",
};

function formatRecipients(to?: string[], cc?: string[]): string {
  const parts: string[] = [];
  if (to && to.length > 0) parts.push(`To ${to.join(", ")}`);
  if (cc && cc.length > 0) parts.push(`Cc ${cc.join(", ")}`);
  return parts.join(" · ");
}

/**
 * Header block for a thread message: direction, subject, recipients, time,
 * status, and chips. Purely presentational — pass already-formatted strings.
 */
export function MessageMeta({
  directionLabel,
  direction = "unknown",
  subject,
  to,
  cc,
  recipientsLabel,
  timestamp,
  timestampDateTime,
  status,
  chips,
  className,
}: MessageMetaProps) {
  const recipients = recipientsLabel ?? formatRecipients(to, cc);

  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        {directionLabel ? (
          <p className={cn("text-xs font-medium", directionEyebrowClass[direction])}>
            {directionLabel}
          </p>
        ) : null}
        {subject ? <p className="text-sm font-medium text-foreground mt-0.5">{subject}</p> : null}
        {recipients ? (
          <p className="text-caption text-muted-foreground mt-0.5">{recipients}</p>
        ) : null}
        {chips && chips.length > 0 ? (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {chips.map((chip) => (
              <Chip key={chip.id} variant={chip.variant} href={chip.href} onClick={chip.onClick}>
                {chip.label}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>
      <div className="text-right shrink-0">
        {timestamp ? (
          <time
            className="block text-caption font-mono text-muted-foreground whitespace-nowrap"
            dateTime={timestampDateTime ?? undefined}
          >
            {timestamp}
          </time>
        ) : null}
        {status && status !== "received" ? (
          <p className="text-micro text-muted-foreground mt-0.5">{status}</p>
        ) : null}
      </div>
    </div>
  );
}
