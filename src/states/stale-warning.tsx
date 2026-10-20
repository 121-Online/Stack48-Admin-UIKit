import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "../primitives/badge";

/**
 * Props for {@link StaleWarning}.
 */
export interface StaleWarningProps extends HTMLAttributes<HTMLSpanElement> {
  /** Chip copy. Default `Stale`. */
  children?: ReactNode;
  /** Native tooltip (e.g. why the snapshot is stale). */
  title?: string;
}

/**
 * Amber “Stale” chip for outdated snapshots (GTM pre-flight, platform sync).
 * Presentational — the app decides when to show it.
 *
 * @example
 * ```tsx
 * <StaleWarning title="Audience changed. Re-run pre-flight." />
 * ```
 */
export function StaleWarning({
  children = "Stale",
  title = "Data is stale — refresh before acting",
  className,
  ...props
}: StaleWarningProps) {
  return (
    <Badge
      variant="warning"
      className={cn("uppercase tracking-wider", className)}
      title={title}
      {...props}
    >
      {children}
    </Badge>
  );
}
