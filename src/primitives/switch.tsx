"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

/** Props for {@link Switch}. */
export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

/**
 * Dense send-style toggle. GTM exposes this as a labelled “send switch”
 * (checkbox + status); this is the Radix equivalent in the same zinc chrome.
 * On = `--primary` (zinc-900).
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Sending enabled" />
 * ```
 */
export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  function Switch({ className, ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(
          "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-zinc-300",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-3 w-3 rounded-full bg-card shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5",
          )}
        />
      </SwitchPrimitive.Root>
    );
  },
);
