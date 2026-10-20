import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "../primitives/button";

/**
 * Props for {@link ErrorState}.
 */
export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Heading. Default `Something went wrong`. */
  title?: ReactNode;
  /** Supporting copy (error string from the app). */
  message?: ReactNode;
  /** Retry callback. Omit to hide the button. */
  onRetry?: () => void;
  retryLabel?: string;
  retrying?: boolean;
  /** Compact inline strip instead of the centred page frame. */
  compact?: boolean;
}

/**
 * Failed-load frame from GTM campaign / campaigns pages, plus an optional
 * retry. Copy and the retry handler come from the caller — no fetching here.
 *
 * @example
 * ```tsx
 * <ErrorState
 *   title="Error loading campaigns"
 *   message={error}
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Retry",
  retrying = false,
  compact = false,
  className,
  ...props
}: ErrorStateProps) {
  if (compact) {
    return (
      <div
        role="alert"
        className={cn(
          "flex items-start justify-between gap-3 rounded-sm border border-red-200 bg-red-50 p-3",
          className,
        )}
        {...props}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-red-800">{title}</p>
          {message ? <p className="mt-0.5 text-xs text-red-700">{message}</p> : null}
        </div>
        {onRetry ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            disabled={retrying}
            className="shrink-0"
          >
            {retrying ? "Retrying…" : retryLabel}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={cn("flex min-h-[16rem] items-center justify-center p-8", className)}
      {...props}
    >
      <div className="max-w-md text-center">
        <h2 className="text-lg font-semibold text-red-700">{title}</h2>
        {message ? <p className="mt-2 text-sm text-zinc-500">{message}</p> : null}
        {onRetry ? (
          <div className="mt-4 flex justify-center">
            <Button variant="secondary" onClick={onRetry} disabled={retrying}>
              {retrying ? "Retrying…" : retryLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
