"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";
import { cn } from "../lib/cn";

/**
 * Modal root. GTM dialogs are centred, `bg-black/30` overlay, white panel,
 * 1px zinc border, 2px radius. No default close “×” — actions live in the footer.
 *
 * @example
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Send test</DialogTitle>
 *       <DialogDescription>Any address is allowed. Max 5 per send.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
 *       <Button>Send test</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const Dialog = DialogPrimitive.Root;
/** Renders the dialog in a portal. */
export const DialogPortal = DialogPrimitive.Portal;
/** Button (or Slot) that opens the dialog. */
export const DialogTrigger = DialogPrimitive.Trigger;
/** Button (or Slot) that closes the dialog. */
export const DialogClose = DialogPrimitive.Close;

/** Props for {@link DialogOverlay}. */
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

/** GTM `fixed inset-0 bg-black/30`. */
export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/30", className)}
      {...props}
    />
  );
});

/** Props for {@link DialogContent}. */
export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /** Max width token. GTM send-test is `max-w-lg`; campaign config is `max-w-2xl`. */
  size?: "md" | "lg" | "xl";
}

/** Centred panel. Default `max-w-lg p-5` like Send test / Confirm send. */
export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ className, children, size = "md", ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-card p-5 shadow-lg rounded-sm",
          size === "md" && "max-w-lg",
          size === "lg" && "max-w-2xl",
          size === "xl" && "max-w-4xl",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

/** Title + description stack. */
export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />;
}

/** Right-aligned action row (`flex justify-end gap-2`). */
export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex justify-end gap-2", className)} {...props} />;
}

/** Props for {@link DialogTitle}. */
export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

/** `text-sm font-semibold text-zinc-900`. */
export const DialogTitle = forwardRef<ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  function DialogTitle({ className, ...props }, ref) {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn("text-sm font-semibold text-foreground", className)}
        {...props}
      />
    );
  },
);

/** Props for {@link DialogDescription}. */
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

/** `text-sm text-zinc-600`. */
export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-zinc-600", className)}
      {...props}
    />
  );
});
