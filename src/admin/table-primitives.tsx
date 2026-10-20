import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "../lib/cn";

/**
 * Props for the presentational {@link Table} wrapper (GTM `DataTable`).
 */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** GTM `compact` — `text-xs` instead of 13px. */
  compact?: boolean;
}

/**
 * Overflow wrapper + table. Extracted from GTM `components/ui/DataTable.tsx`.
 */
export function Table({ children, className, compact = false, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn("w-full text-left", compact ? "text-xs" : "text-body", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

/** @deprecated Use {@link Table}. Alias kept for GTM naming. */
export const DataTableRoot = Table;

/**
 * Header row: uppercase micro labels, zinc-50 wash, 1px bottom border.
 */
export function TableHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={className} {...props}>
      <tr className="border-b border-border bg-zinc-50 text-xs font-medium tracking-wider text-zinc-500 uppercase">
        {children}
      </tr>
    </thead>
  );
}

/** @deprecated Use {@link TableHeader}. */
export const DataTableHead = TableHeader;

/**
 * Body with 1px zinc-100 row dividers.
 */
export function TableBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-zinc-100", className)} {...props}>
      {children}
    </tbody>
  );
}

/** @deprecated Use {@link TableBody}. */
export const DataTableBody = TableBody;

/**
 * Props for {@link TableRow}.
 */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  highlight?: boolean;
}

/**
 * Row. Pointer + hover wash when `onClick` is set (GTM leads table).
 */
export function TableRow({
  children,
  className,
  highlight = false,
  onClick,
  ...props
}: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        onClick && "cursor-pointer hover:bg-zinc-50",
        highlight && "bg-zinc-50",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

/** @deprecated Use {@link TableRow}. */
export const DataTableRow = TableRow;

/**
 * Props for {@link TableCell}.
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  mono?: boolean;
  header?: boolean;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

/**
 * Cell or header cell. Dense `py-2 px-3` like GTM.
 */
export function TableCell({
  children,
  className,
  align = "left",
  mono = false,
  header = false,
  ...props
}: TableCellProps) {
  const classes = cn(
    "px-3 py-2",
    alignClass[align],
    header && "font-medium",
    !header && mono && "font-mono tabular-nums",
    className,
  );
  if (header) {
    return (
      <th className={classes} {...(props as ThHTMLAttributes<HTMLTableCellElement>)}>
        {children}
      </th>
    );
  }
  return (
    <td className={classes} {...props}>
      {children}
    </td>
  );
}

/** @deprecated Use {@link TableCell}. */
export const DataTableCell = TableCell;

/**
 * Centered empty / loading copy inside the table frame.
 */
export function TableMessage({
  children,
  description,
}: {
  children: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="p-8 text-center">
      <p className="text-zinc-500">{children}</p>
      {description ? <p className="mt-1 text-xs text-zinc-400">{description}</p> : null}
    </div>
  );
}
