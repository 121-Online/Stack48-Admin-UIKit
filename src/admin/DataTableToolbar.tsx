"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Input } from "../primitives/input";

/**
 * Props for {@link DataTableToolbar}.
 */
export interface DataTableToolbarProps {
  /** Controlled search string. No debounce — the caller owns that. */
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchLabel?: string;
  /** Filter controls ({@link FilterSelect}, {@link MultiSelectFilter}, …). */
  filters?: ReactNode;
  /** Extra row of filters (GTM leads vocab row). */
  secondaryFilters?: ReactNode;
  /** Checkboxes / clear, bottom strip. */
  extras?: ReactNode;
  /** Right-aligned meta (`12 of 1,240 leads · Page 1/25`). */
  meta?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Full-width table toolbar from GTM leads / platform-users: search, filter
 * slots, optional extras row, count meta. Not a card with heavy padding.
 */
export function DataTableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  searchLabel = "Search",
  filters,
  secondaryFilters,
  extras,
  meta,
  className,
  children,
}: DataTableToolbarProps) {
  const showSearch = search !== undefined || onSearchChange;
  return (
    <div className={cn("mb-4 rounded-sm border border-border bg-card p-4", className)}>
      <div className="flex flex-wrap items-end gap-3">
        {showSearch ? (
          <div className="min-w-[180px] flex-1">
            <label className="mb-1 block text-caption font-medium tracking-wider text-zinc-500 uppercase">
              {searchLabel}
            </label>
            <Input
              type="search"
              value={search ?? ""}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 py-0"
            />
          </div>
        ) : null}
        {filters}
        {children}
      </div>
      {secondaryFilters ? (
        <div className="mt-3 flex flex-wrap items-end gap-3 border-t border-zinc-100 pt-3">
          {secondaryFilters}
        </div>
      ) : null}
      {extras || meta ? (
        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-zinc-100 pt-3">
          {extras}
          {meta ? <div className="ml-auto text-xs text-zinc-500">{meta}</div> : null}
        </div>
      ) : meta ? (
        <div className="mt-3 text-right text-xs text-zinc-500">{meta}</div>
      ) : null}
    </div>
  );
}
