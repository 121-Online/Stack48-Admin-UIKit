"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../lib/cn";
import { CheckIcon, ChevronDownIcon } from "./icons";

/**
 * Radix Select root. Controlled via `value` / `onValueChange`.
 *
 * @example
 * ```tsx
 * <Select value={status} onValueChange={setStatus}>
 *   <SelectTrigger aria-label="Status"><SelectValue placeholder="All" /></SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="all">All</SelectItem>
 *     <SelectItem value="new">New</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Select = SelectPrimitive.Root;
/**
 * Groups {@link SelectItem}s under an optional {@link SelectLabel}.
 */
export const SelectGroup = SelectPrimitive.Group;
/** Displays the selected item’s text inside {@link SelectTrigger}. */
export const SelectValue = SelectPrimitive.Value;

/** Props for {@link SelectTrigger}. */
export type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

/**
 * GTM `.input-field` chrome on a Radix select trigger (native `<select>` in the dashboard).
 */
export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-auto w-full items-center justify-between gap-2 rounded-sm border border-input bg-card px-2.5 py-1.5 text-sm text-foreground transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-zinc-400 [&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="shrink-0 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

/** Props for {@link SelectContent}. */
export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

/** Overlay list — white, 1px zinc border, 2px radius, `shadow-lg`. */
export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent({ className, children, position = "popper", ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-sm border border-border bg-popover text-popover-foreground shadow-lg",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

/** Props for {@link SelectLabel}. */
export type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

/** Uppercase group label inside the list. */
export const SelectLabel = forwardRef<ElementRef<typeof SelectPrimitive.Label>, SelectLabelProps>(
  function SelectLabel({ className, ...props }, ref) {
    return (
      <SelectPrimitive.Label
        ref={ref}
        className={cn(
          "px-2 py-1.5 text-caption font-medium uppercase tracking-wider text-muted-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);

/** Props for {@link SelectItem}. */
export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

/** One option — `text-sm`, hover wash `bg-zinc-50`. */
export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  function SelectItem({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-50 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <CheckIcon />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);

/** Props for {@link SelectSeparator}. */
export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

/** Hairline between option groups. */
export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
});
