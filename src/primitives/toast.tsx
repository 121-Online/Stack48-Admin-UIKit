"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactElement,
} from "react";
import { cn } from "../lib/cn";
import { CloseIcon } from "./icons";

/**
 * Toast provider. Wrap a route (or Storybook story) once.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <Button onClick={() => setOpen(true)}>Save</Button>
 *   <Toast open={open} onOpenChange={setOpen}>
 *     <ToastTitle>Reply sent</ToastTitle>
 *   </Toast>
 *   <ToastViewport />
 * </ToastProvider>
 * ```
 */
export const ToastProvider = ToastPrimitive.Provider;

/** Props for {@link ToastViewport}. */
export type ToastViewportProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>;

/** GTM inbox toast sits `fixed bottom-4 right-4`. */
export const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        "fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2",
        className,
      )}
      {...props}
    />
  );
});

/** Props for {@link Toast}. */
export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Root>;

/**
 * GTM inbox toast: `bg-zinc-900 text-white text-sm px-3 py-2 rounded-sm shadow-lg`.
 */
export const Toast = forwardRef<ElementRef<typeof ToastPrimitive.Root>, ToastProps>(function Toast(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        "pointer-events-auto flex w-full items-center justify-between gap-3 rounded-sm bg-primary px-3 py-2 text-sm text-primary-foreground shadow-lg",
        className,
      )}
      {...props}
    />
  );
});

/** Props for {@link ToastAction}. */
export type ToastActionProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Action>;

/** Optional action button inside a toast. */
export const ToastAction = forwardRef<ElementRef<typeof ToastPrimitive.Action>, ToastActionProps>(
  function ToastAction({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Action
        ref={ref}
        className={cn(
          "inline-flex shrink-0 items-center rounded-sm border border-white/20 bg-transparent px-2 py-0.5 text-xs font-medium text-primary-foreground hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

/** Props for {@link ToastClose}. */
export type ToastCloseProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Close>;

/** Optional dismiss control. GTM toasts auto-dismiss; include when the caller wants an ×. */
export const ToastClose = forwardRef<ElementRef<typeof ToastPrimitive.Close>, ToastCloseProps>(
  function ToastClose({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Close
        ref={ref}
        className={cn(
          "rounded-sm p-0.5 text-primary-foreground/80 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className,
        )}
        toast-close=""
        {...props}
      >
        <CloseIcon />
        <span className="sr-only">Close</span>
      </ToastPrimitive.Close>
    );
  },
);

/** Props for {@link ToastTitle}. */
export type ToastTitleProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Title>;

/** Toast heading / single-line message. */
export const ToastTitle = forwardRef<ElementRef<typeof ToastPrimitive.Title>, ToastTitleProps>(
  function ToastTitle({ className, ...props }, ref) {
    return (
      <ToastPrimitive.Title ref={ref} className={cn("text-sm font-medium", className)} {...props} />
    );
  },
);

/** Props for {@link ToastDescription}. */
export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Description>;

/** Secondary toast copy. */
export const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn("text-xs text-primary-foreground/80", className)}
      {...props}
    />
  );
});

/** Convenience alias for the action element type. */
export type ToastActionElement = ReactElement<ToastActionProps>;
