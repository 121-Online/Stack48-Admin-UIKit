"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";

/**
 * Radix Tabs root. GTM campaign-config uses compact zinc pills, not underline
 * marketing tabs.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="targeting">
 *   <TabsList>
 *     <TabsTrigger value="targeting">Targeting / ICP</TabsTrigger>
 *     <TabsTrigger value="volume">Volume</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="targeting">…</TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = TabsPrimitive.Root;

/** Props for {@link TabsList}. */
export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

/** Horizontal row of compact tab pills (`gap-1`). */
export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  function TabsList({ className, ...props }, ref) {
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn("inline-flex flex-wrap items-center gap-1", className)}
        {...props}
      />
    );
  },
);

/** Props for {@link TabsTrigger}. */
export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

/**
 * Active = zinc-900 (`bg-primary`). Inactive = zinc-100.
 * Matches Campaign Configuration section buttons.
 */
export const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  function TabsTrigger({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-muted data-[state=inactive]:text-zinc-600 data-[state=inactive]:hover:bg-zinc-200",
          className,
        )}
        {...props}
      />
    );
  },
);

/** Props for {@link TabsContent}. */
export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

/** Panel shown for the active tab. */
export const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  function TabsContent({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "mt-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className,
        )}
        {...props}
      />
    );
  },
);
