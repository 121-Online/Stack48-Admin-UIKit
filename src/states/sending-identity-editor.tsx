"use client";

import { useId, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Input } from "../primitives/input";
import { FormField } from "./form-field";
import { InlineAlert } from "./inline-alert";
import {
  previewFromAddress,
  previewReplyToAddress,
  validateFromName,
  validateLocalPart,
  validateSendingIdentity,
  type SendingIdentityValue,
  type ValidationResult,
} from "./validation";

/**
 * One option for the domain `<select>`. Label is caller-owned
 * (`agency.example · receiving on`).
 */
export interface SendingDomainOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Props for {@link SendingIdentityEditor}.
 */
export interface SendingIdentityEditorProps {
  value: SendingIdentityValue;
  onChange?: (value: SendingIdentityValue, valid: boolean) => void;
  /** Domain options. The kit does not load Resend / DNS. */
  domains: SendingDomainOption[];
  /** Shown instead of the select when domains failed to load. */
  domainsError?: ReactNode;
  disabled?: boolean;
  validate?: (value: SendingIdentityValue) => ValidationResult;
  warning?: ReactNode;
  hint?: string;
  className?: string;
}

/**
 * Sender fields from GTM `SendingIdentityEditor`, without domain policy.
 *
 * The app passes `domains` and optional `warning` / `domainsError`. From name,
 * local-part, and reply-to are format-checked unless `validate` is replaced.
 *
 * @example
 * ```tsx
 * <SendingIdentityEditor
 *   value={identity}
 *   domains={[{ value: "mail.agency.com", label: "mail.agency.com · receiving on" }]}
 *   onChange={(next, valid) => setIdentity(next, valid)}
 * />
 * ```
 */
export function SendingIdentityEditor({
  value,
  onChange,
  domains,
  domainsError,
  disabled = false,
  validate = validateSendingIdentity,
  warning,
  hint = "Human-only. DNS, MX and domain setup stay outside this form.",
  className,
}: SendingIdentityEditorProps) {
  const uid = useId();
  const readOnly = disabled || Boolean(domainsError);
  const result = validate(value);
  const localResult = validateLocalPart(value.fromLocalPart, false);
  const nameResult = validateFromName(value.fromName);
  const replyResult = validateLocalPart(value.replyToLocalPart, true);

  function emit(patch: Partial<SendingIdentityValue>) {
    const next = { ...value, ...patch };
    onChange?.(next, validate(next).valid);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <FormField
        label="Sending domain"
        htmlFor={`${uid}-domain`}
        error={
          domainsError
            ? undefined
            : !value.sendingDomain && !result.valid
              ? result.error
              : undefined
        }
      >
        {domainsError ? (
          <Input id={`${uid}-domain`} value={value.sendingDomain} readOnly disabled />
        ) : (
          <select
            id={`${uid}-domain`}
            className="flex h-auto w-full rounded-sm border border-input bg-card px-2.5 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={value.sendingDomain}
            disabled={readOnly}
            onChange={(event) => emit({ sendingDomain: event.target.value })}
          >
            {value.sendingDomain &&
            !domains.some((domain) => domain.value === value.sendingDomain) ? (
              <option value={value.sendingDomain}>{value.sendingDomain}</option>
            ) : null}
            {domains.length === 0 ? <option value="">Select a domain</option> : null}
            {domains.map((domain) => (
              <option key={domain.value} value={domain.value} disabled={domain.disabled}>
                {domain.label}
              </option>
            ))}
          </select>
        )}
      </FormField>
      {domainsError ? <InlineAlert tone="danger">{domainsError}</InlineAlert> : null}
      {warning ? <InlineAlert tone="warning">{warning}</InlineAlert> : null}

      <FormField
        label="From name"
        htmlFor={`${uid}-from-name`}
        optional
        error={!nameResult.valid ? nameResult.error : undefined}
      >
        <Input
          id={`${uid}-from-name`}
          value={value.fromName}
          onChange={(event) => emit({ fromName: event.target.value })}
          placeholder="James Gibbons"
          maxLength={100}
          disabled={readOnly}
        />
      </FormField>

      <FormField
        label="From local part"
        htmlFor={`${uid}-from-local`}
        error={value.fromLocalPart && !localResult.valid ? localResult.error : undefined}
      >
        <div className="flex items-center gap-2">
          <Input
            id={`${uid}-from-local`}
            value={value.fromLocalPart}
            onChange={(event) => emit({ fromLocalPart: event.target.value.toLowerCase() })}
            placeholder="jgibbons"
            maxLength={64}
            disabled={readOnly}
            className="font-mono"
          />
          <span className="whitespace-nowrap text-sm text-zinc-500">
            @{value.sendingDomain || "domain"}
          </span>
        </div>
      </FormField>

      <FormField
        label="Reply-To local part"
        htmlFor={`${uid}-reply`}
        optional
        hint="Leave blank to use the From address."
        error={!replyResult.valid ? replyResult.error : undefined}
      >
        <div className="flex items-center gap-2">
          <Input
            id={`${uid}-reply`}
            value={value.replyToLocalPart}
            onChange={(event) => emit({ replyToLocalPart: event.target.value.toLowerCase() })}
            placeholder={value.fromLocalPart || "same as from"}
            maxLength={64}
            disabled={readOnly}
            className="font-mono"
          />
          <span className="whitespace-nowrap text-sm text-zinc-500">
            @{value.sendingDomain || "domain"}
          </span>
        </div>
      </FormField>

      <div className="space-y-1 rounded-sm border border-border bg-zinc-50 p-3 font-mono text-xs">
        <div>
          <span className="text-zinc-500">From:</span>{" "}
          <span className="text-zinc-900">{previewFromAddress(value)}</span>
        </div>
        <div>
          <span className="text-zinc-500">Reply-To:</span>{" "}
          <span className="text-zinc-900">{previewReplyToAddress(value)}</span>
        </div>
      </div>

      {hint ? <p className="text-[10px] text-zinc-400">{hint}</p> : null}
    </div>
  );
}
