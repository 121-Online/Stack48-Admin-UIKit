"use client";

import type { SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Checkbox } from "../primitives/checkbox";

/**
 * Option for {@link FilterSelect}.
 */
export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
}

/**
 * Props for {@link FilterSelect}.
 */
export interface FilterSelectProps<T extends string = string> extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value"
> {
  /** Uppercase micro label (GTM toolbar). */
  label?: string;
  options: FilterOption<T>[];
  value: T | "";
  onValueChange?: (value: T) => void;
  widthClassName?: string;
}

const fieldClassName =
  "h-8 w-full rounded-sm border border-input bg-card px-2.5 text-sm text-foreground focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none";

/**
 * Labelled `<select>` extracted from GTM `AudienceFilter` and the leads /
 * platform-users toolbars. Presentational — options and value come from props.
 */
export function FilterSelect<T extends string = string>({
  label,
  options,
  value,
  onValueChange,
  widthClassName = "w-28",
  className,
  id,
  ...props
}: FilterSelectProps<T>) {
  const selectId = id ?? (label ? `filter-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  return (
    <div className={cn("min-w-0", widthClassName)}>
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-1 block text-caption font-medium tracking-wider text-zinc-500 uppercase"
        >
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={cn(fieldClassName, className)}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value as T)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Props for {@link FilterCheckbox}.
 */
export interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Toolbar checkbox (GTM “Sendable Queue Only”, “Show Deleted”).
 */
export function FilterCheckbox({
  label,
  checked,
  onCheckedChange,
  disabled,
  className,
}: FilterCheckboxProps) {
  return (
    <label
      className={cn(
        "flex select-none items-center gap-2 text-sm font-medium",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
      />
      {label}
    </label>
  );
}
