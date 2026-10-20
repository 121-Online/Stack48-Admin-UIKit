"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

/**
 * GTM `.btn-primary` / `.btn-secondary` / `.btn-danger` as a shadcn Button.
 * Default is zinc-900 (`bg-primary`), not brand blue.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-zinc-800 active:bg-zinc-950",
        secondary:
          "border border-zinc-300 bg-secondary text-secondary-foreground hover:border-zinc-400 hover:bg-zinc-50 active:bg-zinc-100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-700 active:bg-red-800",
        ghost: "border border-border bg-transparent text-foreground hover:bg-zinc-50",
        link: "h-auto px-0 py-0 text-brand hover:text-brand-hover hover:underline",
      },
      size: {
        default: "px-3 py-1.5",
        sm: "px-2 py-1 text-[11px]",
        lg: "px-4 py-2 text-sm",
        icon: "h-7 w-7 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Props for {@link Button}.
 * Extends the native button element; set `asChild` to merge styles onto a child.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render the child element instead of a `<button>` (Radix Slot). */
  asChild?: boolean;
}

/**
 * Dense ops-tool button matching GTM `.btn-*`.
 *
 * @example
 * ```tsx
 * <Button>Save</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button variant="destructive">Delete</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, type = "button", ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...(asChild ? props : { type, ...props })}
    />
  );
});
