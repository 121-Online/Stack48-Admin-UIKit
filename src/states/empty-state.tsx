import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Props for {@link EmptyState}.
 */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Primary sentence (`No campaigns found`). */
  title: ReactNode;
  /** Optional caption under the title. */
  description?: ReactNode;
  /** Optional CTA (filter reset, create). */
  action?: ReactNode;
  /** 1px zinc card. Default true to match GTM platform-users empty. */
  bordered?: boolean;
}

/**
 * Centered empty copy from GTM list pages (`No leads found`,
 * `No platform accounts found`). Presentational — title and action via props.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="No campaigns found"
 *   description="Try adjusting your filters"
 *   action={<Button variant="secondary">Clear filters</Button>}
 * />
 * ```
 */
export function EmptyState({
  title,
  description,
  action,
  bordered = true,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "p-8 text-center",
        bordered && "rounded-sm border border-border bg-card",
        className,
      )}
      {...props}
    >
      <p className="text-sm text-zinc-500">{title}</p>
      {description ? <p className="mt-1 text-xs text-zinc-400">{description}</p> : null}
      {action ? <div className="mt-3 flex justify-center">{action}</div> : null}
    </div>
  );
}
