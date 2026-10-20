"use client";

import { cn } from "../lib/cn";

/**
 * Window of at most 5 page numbers, matching GTM leads / platform-users.
 */
export function pageWindow(page: number, totalPages: number, size = 5): number[] {
  if (totalPages <= 0) return [];
  if (totalPages <= size) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (page <= 3) {
    return Array.from({ length: size }, (_, index) => index + 1);
  }
  if (page >= totalPages - 2) {
    return Array.from({ length: size }, (_, index) => totalPages - size + 1 + index);
  }
  return Array.from({ length: size }, (_, index) => page - 2 + index);
}

/**
 * Props for {@link DataTablePagination}.
 */
export interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Previous / numbered window / next. Presentational — the caller fetches the
 * next page or slices locally.
 */
export function DataTablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  disabled = false,
  className,
}: DataTablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  if (totalPages <= 1) {
    return null;
  }
  const hasMore = page < totalPages;
  const pages = pageWindow(page, totalPages);

  return (
    <div className={cn("mt-4 flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange?.(page - 1)}
          disabled={page === 1 || disabled}
          className="rounded-sm border border-zinc-300 bg-card px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange?.(page + 1)}
          disabled={!hasMore || disabled}
          className="rounded-sm border border-zinc-300 bg-card px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
      <div className="flex items-center gap-1">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange?.(pageNum)}
            disabled={disabled}
            aria-current={pageNum === page ? "page" : undefined}
            className={cn(
              "h-7 w-7 rounded-sm text-xs font-medium",
              pageNum === page
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-zinc-50",
            )}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}
