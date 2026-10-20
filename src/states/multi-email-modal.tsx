"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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
import { Label } from "../primitives/label";
import { InlineAlert } from "./inline-alert";
import { DEFAULT_MAX_EMAILS, isValidEmail, parseEmailList } from "./validation";

/**
 * Props for {@link MultiEmailModal}.
 */
export interface MultiEmailModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  /** Chip values. Controlled. */
  emails: string[];
  onEmailsChange?: (emails: string[]) => void;
  /** Hard cap. Default 5 (GTM send-test). */
  maxCount?: number;
  /** Format check. Default {@link isValidEmail}. */
  validateEmail?: (email: string) => boolean;
  label?: string;
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  busyLabel?: string;
  error?: ReactNode;
  success?: ReactNode;
  onSubmit?: (emails: string[]) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Multi-address modal modelled on GTM `mailings/SendTestModal`.
 *
 * Chips replace the dashboard textarea so callers can see each address.
 * Validation and the max count are props — defaults are a loose email pattern
 * and 5 addresses. The kit does not send mail.
 *
 * @example
 * ```tsx
 * <MultiEmailModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   emails={emails}
 *   onEmailsChange={setEmails}
 *   onSubmit={(to) => sendTest(to)}
 *   error={error}
 *   busy={sending}
 * />
 * ```
 */
export function MultiEmailModal({
  open,
  defaultOpen,
  onOpenChange,
  title = "Send test",
  description,
  emails,
  onEmailsChange,
  maxCount = DEFAULT_MAX_EMAILS,
  validateEmail = isValidEmail,
  label = "Recipient emails",
  placeholder = "you@agency.com",
  confirmLabel = "Send test",
  cancelLabel = "Close",
  busy = false,
  busyLabel = "Sending…",
  error,
  success,
  onSubmit,
  onCancel,
  className,
}: MultiEmailModalProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const atCap = emails.length >= maxCount;
  const invalid = emails.filter((email) => !validateEmail(email));
  const submitReady = emails.length > 0 && invalid.length === 0 && !busy;

  const resolvedDescription =
    description ??
    `Any address is allowed. Separate with commas or new lines. Max ${maxCount} per send.`;

  function commit(raw: string) {
    const incoming = parseEmailList(raw);
    if (incoming.length === 0) return;
    const next = [...emails];
    let message: string | null = null;
    for (const email of incoming) {
      if (next.includes(email)) {
        message = "Already added";
        continue;
      }
      if (!validateEmail(email)) {
        message = "Not a valid email";
        continue;
      }
      if (next.length >= maxCount) {
        message = `Max ${maxCount} addresses`;
        break;
      }
      next.push(email);
    }
    setLocalError(message);
    if (next.length !== emails.length) onEmailsChange?.(next);
  }

  function addFromDraft() {
    if (!draft.trim()) return;
    commit(draft);
    setDraft("");
  }

  function remove(email: string) {
    onEmailsChange?.(emails.filter((item) => item !== email));
    setLocalError(null);
    inputRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (draft.trim()) {
        event.preventDefault();
        addFromDraft();
      }
    }
    if (event.key === "Backspace" && draft === "" && emails.length > 0) {
      remove(emails[emails.length - 1]!);
    }
  }

  function handleCancel() {
    onCancel?.();
    onOpenChange?.(false);
  }

  const fieldError = localError;

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(className)}
        onOpenAutoFocus={(event) => {
          if (inputRef.current) {
            event.preventDefault();
            inputRef.current.focus();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{resolvedDescription}</DialogDescription>
        </DialogHeader>

        <div>
          <Label htmlFor={inputId} className="mb-1">
            {label}
          </Label>
          <div
            className={cn(
              "flex min-h-16 flex-wrap items-center gap-1 rounded-sm border border-input bg-card px-2 py-1.5",
              busy && "opacity-60",
              fieldError && "border-red-300",
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {emails.map((email) => {
              const ok = validateEmail(email);
              return (
                <span
                  key={email}
                  className={cn(
                    "inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-caption",
                    ok ? "bg-zinc-100 text-zinc-700" : "bg-red-50 text-red-700",
                  )}
                >
                  {email}
                  <button
                    type="button"
                    className="text-zinc-400 hover:text-zinc-700"
                    aria-label={`Remove ${email}`}
                    disabled={busy}
                    onClick={(event) => {
                      event.stopPropagation();
                      remove(email);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
            <Input
              ref={inputRef}
              id={inputId}
              value={draft}
              disabled={busy}
              placeholder={emails.length === 0 ? placeholder : atCap ? `Max ${maxCount}` : ""}
              className="min-w-[8rem] flex-1 border-0 px-1 py-0.5 font-mono shadow-none focus-visible:ring-0"
              autoComplete="off"
              onChange={(event) => {
                setDraft(event.target.value);
                if (localError) setLocalError(null);
              }}
              onKeyDown={onKeyDown}
              onPaste={(event) => {
                const text = event.clipboardData.getData("text");
                if (/[,;\s]/.test(text)) {
                  event.preventDefault();
                  commit(`${draft} ${text}`);
                  setDraft("");
                }
              }}
              onBlur={addFromDraft}
              aria-invalid={Boolean(fieldError) || invalid.length > 0}
              aria-describedby={fieldError ? `${inputId}-error` : undefined}
            />
          </div>
          <p className="mt-1 text-[10px] text-zinc-400 tabular-nums">
            {emails.length} / {maxCount}
          </p>
          {fieldError ? (
            <p id={`${inputId}-error`} role="alert" className="mt-1 text-xs text-red-700">
              {fieldError}
            </p>
          ) : null}
        </div>

        {error ? <InlineAlert tone="danger">{error}</InlineAlert> : null}
        {success ? <InlineAlert tone="success">{success}</InlineAlert> : null}

        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button onClick={() => onSubmit?.(emails)} disabled={!submitReady}>
            {busy ? busyLabel : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** GTM `testQueuedMessage` helper — presentational copy only. */
export function testQueuedMessage(count: number): string {
  return `Test queued to ${count} address${count === 1 ? "" : "es"}, arrives within ~1 min`;
}
