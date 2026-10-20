import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

/** Props for {@link Skeleton}. */
export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Dense loading placeholder. GTM pages use copy (“Loading…”) more than bones;
 * this is the token-styled equivalent (`bg-zinc-200`, 2px radius, pulse).
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-40" />
 * <Skeleton className="h-8 w-full" />
 * ```
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-sm bg-zinc-200", className)} {...props} />;
}
