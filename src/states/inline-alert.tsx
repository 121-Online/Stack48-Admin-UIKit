import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Semantic tone for {@link InlineAlert} / {@link Banner}.
 * Maps to GTM’s red / amber / emerald / blue notice boxes.
 */
export type AlertTone = "info" | "warning" | "danger" | "success";

const toneClass: Record<AlertTone, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
};

const titleClass: Record<AlertTone, string> = {
  info: "text-blue-900",
  warning: "text-amber-900",
  danger: "text-red-900",
  success: "text-emerald-950",
};

/**
 * Props for {@link InlineAlert}.
 */
export interface InlineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  /** Optional bold lead-in (`Error loading platform data:`). */
  title?: ReactNode;
  children?: ReactNode;
}

/**
 * GTM notice box (`p-3` tinted wash, 1px border, 2px radius).
 * Used for send-test errors, stale pre-flight, and receiving-domain warnings.
 *
 * {@link Banner} is the same component — use either name.
 *
 * @example
 * ```tsx
 * <InlineAlert tone="warning" title="Audience changed.">
 *   Pre-flight is stale — re-run before sending.
 * </InlineAlert>
 * ```
 */
export function InlineAlert({
  tone = "info",
  title,
  children,
  className,
  role,
  ...props
}: InlineAlertProps) {
  const resolvedRole = role ?? (tone === "danger" || tone === "warning" ? "alert" : "status");
  return (
    <div
      role={resolvedRole}
      className={cn("rounded-sm border p-3 text-sm", toneClass[tone], className)}
      {...props}
    >
      {title ? <p className={cn("font-medium", titleClass[tone])}>{title}</p> : null}
      {children ? (
        <p className={cn(title ? "mt-0.5 text-xs" : null, title && "opacity-90")}>{children}</p>
      ) : null}
    </div>
  );
}

/**
 * Alias of {@link InlineAlert} for full-width page notices.
 */
export const Banner = InlineAlert;
