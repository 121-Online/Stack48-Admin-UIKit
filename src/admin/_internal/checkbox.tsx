import { useEffect, useRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface InternalCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  /** Visual checked state. */
  checked: boolean;
  /** Native indeterminate (select-all mixed). */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Minimal checkbox used by DataTable selection.
 *
 * Temporary: replace with `@stack48/admin-ui/primitives` Checkbox when that PR
 * ships. Kept under `src/admin/_internal` so this PR does not touch primitives.
 */
export function InternalCheckbox({
  checked,
  indeterminate = false,
  onCheckedChange,
  className,
  ...props
}: InternalCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate && !checked;
    }
  }, [checked, indeterminate]);

  return (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(event) => onCheckedChange?.(event.target.checked)}
      className={cn(
        "h-3.5 w-3.5 shrink-0 rounded-sm border-input accent-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
    />
  );
}
