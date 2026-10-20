"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

/** Props for {@link Separator}. */
export type SeparatorProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

/**
 * 1px rule. Default colour is `--border` (zinc-200). Use `bg-zinc-100` for the
 * lighter GTM section rule.
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" className="h-6" />
 * ```
 */
export const Separator = forwardRef<ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  function Separator({ className, orientation = "horizontal", decorative = true, ...props }, ref) {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className,
        )}
        {...props}
      />
    );
  },
);
