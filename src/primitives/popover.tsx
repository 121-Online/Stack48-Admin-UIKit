"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

/**
 * Anchored overlay. Matches GTM VocabMultiSelect / inbox shortcut panel:
 * white, 1px zinc border, 2px radius, `shadow-lg`.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild><Button variant="secondary">Filters</Button></PopoverTrigger>
 *   <PopoverContent>…</PopoverContent>
 * </Popover>
 * ```
 */
export const Popover = PopoverPrimitive.Root;
/** Button (or Slot) that opens the popover. */
export const PopoverTrigger = PopoverPrimitive.Trigger;
/** Alternative positioning anchor. */
export const PopoverAnchor = PopoverPrimitive.Anchor;

/** Props for {@link PopoverContent}. */
export type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

/** Floating panel. */
export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent({ className, align = "start", sideOffset = 4, ...props }, ref) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-sm border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
