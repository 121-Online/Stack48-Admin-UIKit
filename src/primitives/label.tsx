"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

/**
 * GTM field labels: uppercase micro copy on settings forms, body labels on
 * campaign config, inline labels next to checkboxes.
 */
export const labelVariants = cva(
  "font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Settings / send-test: `text-[11px] uppercase tracking-wider text-zinc-500`. */
        default: "block text-caption uppercase tracking-wider text-muted-foreground",
        /** Campaign config: `text-xs font-medium text-zinc-700`. */
        form: "block text-xs text-zinc-700",
        /** Checkbox row: `text-sm font-medium`. */
        inline: "text-sm text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for {@link Label}. */
export interface LabelProps
  extends
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

/**
 * Accessible label. Pair with `htmlFor` / `id` on the control.
 *
 * @example
 * ```tsx
 * <Label htmlFor="hourly-cap">Hourly cap</Label>
 * <Input id="hourly-cap" type="number" />
 * ```
 */
export const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(function Label(
  { className, variant, ...props },
  ref,
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant }), className)}
      {...props}
    />
  );
});
