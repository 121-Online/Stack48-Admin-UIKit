"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "../primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../primitives/dialog";
import { Input } from "../primitives/input";
import { DEFAULT_CONFIRM_TOKEN, isTypeConfirmAccepted } from "./validation";

/**
 * Confirm interaction. `type` is the GTM mailing “type SEND / the count” gate.
 */
export type ConfirmMode = "click" | "type";

/**
 * Props for {@link ConfirmDialog}.
 */
export interface ConfirmDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  /** Extra body (settings summary, recipient count). */
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** `destructive` uses the danger button (delete / archive). */
  variant?: "default" | "destructive";
  confirmMode?: ConfirmMode;
  /** Phrase accepted in `type` mode. Default `SEND`. */
  confirmToken?: string;
  /** Alternate accepted value in `type` mode (the OK count). */
  confirmCount?: number;
  /** Override the default token-or-count check. */
  validateConfirm?: (value: string) => boolean;
  confirmValue?: string;
  defaultConfirmValue?: string;
  onConfirmValueChange?: (value: string) => void;
  /** Placeholder for the type-in field. */
  confirmPlaceholder?: string;
  hint?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  busy?: boolean;
  /** Disable the confirm action even when the phrase matches. */
  confirmDisabled?: boolean;
  className?: string;
}

/**
 * Modal confirm extracted from GTM mailing send + `window.confirm` pauses.
 *
 * `confirmMode="type"` requires the caller-facing token (`SEND` by default)
 * or `confirmCount`. Pass `validateConfirm` to replace that rule.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Confirm send"
 *   description="This will send to 1,240 pre-flight OK recipients."
 *   confirmMode="type"
 *   confirmCount={1240}
 *   confirmLabel="Send mailing"
 *   onConfirm={send}
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  confirmMode = "click",
  confirmToken = DEFAULT_CONFIRM_TOKEN,
  confirmCount,
  validateConfirm,
  confirmValue,
  defaultConfirmValue = "",
  onConfirmValueChange,
  confirmPlaceholder,
  hint,
  onConfirm,
  onCancel,
  busy = false,
  confirmDisabled = false,
  className,
}: ConfirmDialogProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolled, setUncontrolled] = useState(defaultConfirmValue);
  const typed = confirmValue ?? uncontrolled;
  const typeMode = confirmMode === "type";

  useEffect(() => {
    if (open === false && confirmValue === undefined) {
      setUncontrolled("");
    }
  }, [open, confirmValue]);

  const accepted = typeMode
    ? (
        validateConfirm ??
        ((value: string) =>
          isTypeConfirmAccepted(value, { token: confirmToken, count: confirmCount }))
      )(typed)
    : true;
  const canConfirm = accepted && !busy && !confirmDisabled;

  function setTyped(next: string) {
    if (confirmValue === undefined) setUncontrolled(next);
    onConfirmValueChange?.(next);
  }

  function handleCancel() {
    onCancel?.();
    onOpenChange?.(false);
  }

  const placeholder =
    confirmPlaceholder ??
    (confirmCount != null ? `${confirmCount} or ${confirmToken}` : confirmToken);

  const defaultHint =
    hint ??
    (typeMode ? (
      <>
        Type {confirmCount != null ? <>the count or </> : null}
        <span className="font-mono">{confirmToken}</span> to confirm.
      </>
    ) : null);

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(className)}
        onOpenAutoFocus={(event) => {
          if (typeMode && inputRef.current) {
            event.preventDefault();
            inputRef.current.focus();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {children}
        {typeMode ? (
          <div className="space-y-2">
            {defaultHint ? <p className="text-xs text-zinc-500">{defaultHint}</p> : null}
            <Input
              ref={inputRef}
              id={inputId}
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              placeholder={placeholder}
              className="font-mono"
              autoComplete="off"
              disabled={busy}
              aria-label={`Type ${placeholder} to confirm`}
              onKeyDown={(event) => {
                if (event.key === "Enter" && canConfirm) {
                  event.preventDefault();
                  onConfirm?.();
                }
              }}
            />
          </div>
        ) : defaultHint ? (
          <p className="text-xs text-zinc-500">{defaultHint}</p>
        ) : null}
        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={!canConfirm}
          >
            {busy ? "Working…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
