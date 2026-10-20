"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

/**
 * Provider required around any tree that uses {@link Tooltip}.
 * GTM uses native `title=` for most hints; this is the Radix equivalent.
 */
export const TooltipProvider = TooltipPrimitive.Provider;
/** Tooltip root. */
export const Tooltip = TooltipPrimitive.Root;
/** Element that shows the tooltip on hover / focus. */
export const TooltipTrigger = TooltipPrimitive.Trigger;

/** Props for {@link TooltipContent}. */
export type TooltipContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

/**
 * Dense zinc-900 chip (same chrome as the GTM inbox toast).
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild><Button variant="ghost" size="icon">?</Button></TooltipTrigger>
 *     <TooltipContent>Soft cap reached</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-sm bg-primary px-2 py-1 text-caption text-primary-foreground shadow-lg",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
