"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "../lib/cn";
import type { FilterOption } from "./FilterSelect";

/**
 * Props for {@link MultiSelectFilter}.
 */
export interface MultiSelectFilterProps {
  options: FilterOption[];
  /** Selected option values. */
  value: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  emptyMessage?: string;
}

/**
 * Searchable multi-select extracted from GTM `VocabMultiSelect`.
 *
 * Chips for selected values, typeahead for the rest. No domain vocab — pass
 * `options` and `value` from the app.
 */
export function MultiSelectFilter({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  disabled = false,
  label,
  className,
  emptyMessage,
}: MultiSelectFilterProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedSet = new Set(value);
  const selectedOptions = options.filter((option) => selectedSet.has(option.value));
  const filtered = options.filter(
    (option) =>
      !selectedSet.has(option.value) && option.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function add(next: string) {
    onValueChange?.([...value, next]);
    setSearch("");
    inputRef.current?.focus();
  }

  function remove(next: string) {
    onValueChange?.(value.filter((item) => item !== next));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && search === "" && value.length > 0) {
      const last = value[value.length - 1];
      if (last) remove(last);
    }
    if (event.key === "Escape") {
      setOpen(false);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const first = filtered[0];
      if (first) add(first.value);
    }
  }

  const fieldId = label ? `multiselect-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined;

  return (
    <div className={cn("relative min-w-[180px] flex-1", className)} ref={rootRef}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="mb-1 block text-caption font-medium tracking-wider text-zinc-500 uppercase"
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          "flex min-h-8 flex-wrap items-center gap-1 rounded-sm border border-input bg-card px-2 py-1",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-text",
          open && "border-ring ring-1 ring-ring",
        )}
        onClick={() => {
          if (!disabled) {
            setOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        {selectedOptions.map((option) => (
          <span
            key={option.value}
            className="inline-flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 text-caption"
          >
            {option.label}
            {!disabled ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  remove(option.value);
                }}
                className="text-zinc-400 hover:text-zinc-700"
                aria-label={`Remove ${option.label}`}
              >
                ×
              </button>
            ) : null}
          </span>
        ))}
        <input
          id={fieldId}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          disabled={disabled}
          className="min-w-[80px] flex-1 border-0 bg-transparent p-0 text-sm outline-none"
          placeholder={value.length === 0 ? placeholder : ""}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
      {open && !disabled ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-sm border border-border bg-popover shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="p-2 text-sm text-zinc-500">
              {emptyMessage ?? (search ? "No matching values" : "No more values")}
            </li>
          ) : (
            filtered.map((option) => (
              <li key={option.value} role="option" aria-selected={false}>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-50"
                  onClick={() => add(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Props for {@link ChipList}.
 */
export interface ChipListProps {
  values: string[] | null | undefined;
  labels?: Record<string, string>;
  maxVisible?: number;
}

/**
 * Read-only chip row from GTM `VocabChipList` — for table cells.
 */
export function ChipList({ values, labels = {}, maxVisible = 3 }: ChipListProps) {
  if (!values || values.length === 0) {
    return <span className="text-xs text-zinc-400">—</span>;
  }
  const visible = values.slice(0, maxVisible);
  const remaining = values.length - maxVisible;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((value) => (
        <span
          key={value}
          className="inline-flex rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-700"
        >
          {labels[value] ?? value}
        </span>
      ))}
      {remaining > 0 ? (
        <span className="px-1 py-0.5 text-[10px] text-zinc-500">+{remaining}</span>
      ) : null}
    </div>
  );
}
