import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

/** GTM `StatusIndicator` statuses (`src/components/ui/StatusIndicator`). */
export type StatusIndicatorStatus = "ok" | "warning" | "danger" | "neutral" | "off";

const statusColors: Record<StatusIndicatorStatus, { dot: string; text: string }> = {
  ok: { dot: "bg-emerald-500", text: "text-emerald-700" },
  warning: { dot: "bg-amber-500", text: "text-amber-700" },
  danger: { dot: "bg-red-500", text: "text-red-700" },
  neutral: { dot: "bg-zinc-400", text: "text-zinc-600" },
  off: { dot: "bg-zinc-300", text: "text-zinc-500" },
};

/** Props for {@link StatusIndicator}. */
export interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic status. Controls dot (and label) colour. */
  status: StatusIndicatorStatus;
  /** Optional text shown after the 8px dot. */
  label?: string;
  /** Pulse the emerald ring when `status="ok"` (live send). */
  pulse?: boolean;
}

/**
 * 8px status dot from the GTM dashboard. Presentational only.
 *
 * @example
 * ```tsx
 * <StatusIndicator status="ok" label="Sending" pulse />
 * <StatusIndicator status="off" label="Paused" />
 * ```
 */
export function StatusIndicator({
  status,
  label,
  className,
  pulse = false,
  ...props
}: StatusIndicatorProps) {
  const colors = statusColors[status];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <span className="relative flex h-2 w-2">
        {pulse && status === "ok" ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              colors.dot,
            )}
          />
        ) : null}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", colors.dot)} />
      </span>
      {label ? <span className={cn("text-xs font-medium", colors.text)}>{label}</span> : null}
    </div>
  );
}
