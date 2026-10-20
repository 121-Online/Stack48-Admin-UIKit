"use client";

import { cn } from "../lib/cn";
import { Button } from "../primitives/button";

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
        <Button
          variant="secondary"
          onClick={() => onPageChange?.(page - 1)}
          disabled={page === 1 || disabled}
        >
          ← Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange?.(page + 1)}
          disabled={!hasMore || disabled}
        >
          Next →
        </Button>
      </div>
      <div className="flex items-center gap-1">
        {pages.map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === page ? "default" : "ghost"}
            size="icon"
            onClick={() => onPageChange?.(pageNum)}
            disabled={disabled}
            aria-current={pageNum === page ? "page" : undefined}
            className="h-7 w-7"
          >
            {pageNum}
          </Button>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}
