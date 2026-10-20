import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Skeleton } from "../primitives/skeleton";

/**
 * Visual treatment for {@link LoadingState}.
 * `rows` is the GTM table pulse; `spinner` is the inline refresh glyph.
 */
export type LoadingStateVariant = "rows" | "spinner";

/**
 * Props for {@link LoadingState}.
 */
export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LoadingStateVariant;
  /** Skeleton row count when `variant="rows"`. */
  rows?: number;
  /** Pulse bars per row. */
  columns?: number;
  /** Accessible name. Default `Loading`. */
  label?: string;
}

/**
 * Dense loading placeholder. Skeleton rows match the GTM / DataTable pulse
 * (`h-3` zinc-100 bars). The spinner is the 14px stroke used on Delivery refresh.
 *
 * @example
 * ```tsx
 * <LoadingState variant="rows" rows={6} aria-label="Loading leads" />
 * <LoadingState variant="spinner" label="Sending" />
 * ```
 */
export function LoadingState({
  variant = "rows",
  rows = 6,
  columns = 3,
  label = "Loading",
  className,
  ...props
}: LoadingStateProps) {
  if (variant === "spinner") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={label}
        className={cn("inline-flex items-center gap-1.5 text-xs text-zinc-500", className)}
        {...props}
      >
        <Spinner className="text-zinc-500" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={cn("overflow-hidden rounded-sm border border-border bg-card", className)}
      {...props}
    >
      <div className="divide-y divide-zinc-100">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex items-center gap-3 px-3 py-2">
            {Array.from({ length: columns }, (_, column) => (
              <Skeleton
                key={column}
                className={cn("h-3 bg-zinc-100", column === 0 ? "w-28" : "w-16")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Props for {@link Spinner}.
 */
export interface SpinnerProps {
  className?: string;
}

/**
 * 14px stroke spinner from GTM Delivery refresh. Decorative — parent supplies
 * the accessible name.
 */
export function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      className={cn("h-3.5 w-3.5 animate-spin", className)}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z" />
    </svg>
  );
}
