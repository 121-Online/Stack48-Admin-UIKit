"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { Label } from "../primitives/label";

/**
 * Props for {@link FormField}.
 */
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label. Pair with `htmlFor` / child `id`. */
  label: ReactNode;
  /** Label treatment. `form` is campaign config; `default` is uppercase micro. */
  labelVariant?: "default" | "form";
  /** `id` forwarded onto the control when the child has none. */
  htmlFor?: string;
  /** Muted helper under the control. */
  hint?: ReactNode;
  /** Validation message. Sets `aria-invalid` on a single element child. */
  error?: ReactNode;
  /** Shows an optional marker next to the label. */
  optional?: boolean;
  /** Shows a required marker. */
  required?: boolean;
  /** The control (`Input`, `Select`, `Textarea`, or a cluster). */
  children: ReactNode;
}

/**
 * Label + control + hint / error. GTM campaign-config density
 * (`text-xs` label, `text-xs` red error, `text-[10px]` hint).
 *
 * A single element child is wired with `id`, `aria-describedby`, and
 * `aria-invalid`. Pass your own ids for composite controls.
 *
 * @example
 * ```tsx
 * <FormField label="Hourly cap" hint="Max sends per hour" error={capError}>
 *   <Input type="number" min={0} />
 * </FormField>
 * ```
 */
export function FormField({
  label,
  labelVariant = "form",
  htmlFor,
  hint,
  error,
  optional = false,
  required = false,
  children,
  className,
  ...props
}: FormFieldProps) {
  const uid = useId();
  const controlId = htmlFor ?? uid;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  const childArray = Children.toArray(children);
  const only = childArray.length === 1 ? childArray[0] : null;
  const control =
    isValidElement(only) && !hasOwnChildrenCluster(only)
      ? cloneElement(
          only as ReactElement<{
            id?: string;
            "aria-describedby"?: string;
            "aria-invalid"?: boolean;
          }>,
          {
            id: (only.props as { id?: string }).id ?? controlId,
            "aria-describedby": mergeDescribedBy(
              (only.props as { "aria-describedby"?: string })["aria-describedby"],
              describedBy,
            ),
            "aria-invalid": error
              ? true
              : (only.props as { "aria-invalid"?: boolean })["aria-invalid"],
          },
        )
      : children;

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <Label htmlFor={controlId} variant={labelVariant}>
        {label}
        {optional ? <span className="font-normal text-zinc-400"> (optional)</span> : null}
        {required ? (
          <span className="font-normal text-zinc-400" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </Label>
      {control}
      {hint ? (
        <p id={hintId} className="text-[10px] text-zinc-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function mergeDescribedBy(
  existing: string | undefined,
  next: string | undefined,
): string | undefined {
  return [existing, next].filter(Boolean).join(" ") || undefined;
}

function hasOwnChildrenCluster(element: ReactElement): boolean {
  return typeof element.type === "string" && element.type === "div";
}
