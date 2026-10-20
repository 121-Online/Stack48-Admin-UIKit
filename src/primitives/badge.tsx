import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * GTM `src/components/ui/Badge` plus `.badge-*` lead-status solids.
 */
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-caption font-medium",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-700",
        success: "bg-success-muted text-emerald-700",
        warning: "bg-warning-muted text-amber-700",
        danger: "bg-red-50 text-red-700",
        info: "bg-blue-50 text-blue-700",
        muted: "bg-zinc-50 text-zinc-500",
        /** GTM `.badge-new` — inverse zinc-900 chip. */
        inverse: "bg-primary text-primary-foreground",
        /** GTM `.badge-signed-up` — solid emerald. */
        successSolid: "bg-emerald-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const dotVariants: Record<NonNullable<VariantProps<typeof badgeVariants>["variant"]>, string> = {
  default: "bg-zinc-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  muted: "bg-zinc-400",
  inverse: "bg-white",
  successSolid: "bg-white",
};

/** Props for {@link Badge}. */
export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode;
  /** Show the 6px status dot used on GTM health chips. */
  dot?: boolean;
}

/**
 * Compact status / taxonomy chip from the GTM dashboard.
 *
 * @example
 * ```tsx
 * <Badge variant="success" dot>Healthy</Badge>
 * <Badge variant="inverse">New</Badge>
 * ```
 */
export function Badge({
  children,
  variant = "default",
  className,
  dot = false,
  title,
  ...props
}: BadgeProps) {
  const resolved = variant ?? "default";
  return (
    <span className={cn(badgeVariants({ variant: resolved }), className)} title={title} {...props}>
      {dot ? <span className={cn("h-1.5 w-1.5 rounded-full", dotVariants[resolved])} /> : null}
      {children}
    </span>
  );
}
