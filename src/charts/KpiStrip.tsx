import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { defaultNumberFormat, type NumberFormatter } from "./format";

/**
 * Status colour for a KPI value. `ok` is accepted as an alias of `success`
 * (GTM `KpiItem` used `ok`).
 */
export type MetricStatus = "neutral" | "success" | "ok" | "warning" | "danger";

/** Optional signed change shown next to a KPI value. */
export type KpiDelta = {
  value: number;
  label?: string;
};

/** Props for {@link KpiItem}. */
export type KpiItemProps = {
  label: string;
  value: string | number;
  delta?: KpiDelta;
  hint?: string;
  status?: MetricStatus;
  formatValue?: NumberFormatter;
  className?: string;
};

const valueStatusClass: Record<"neutral" | "success" | "warning" | "danger", string> = {
  neutral: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

function resolveStatus(status: MetricStatus): "neutral" | "success" | "warning" | "danger" {
  return status === "ok" ? "success" : status;
}

function formatDisplayedValue(
  value: string | number,
  formatValue: NumberFormatter = defaultNumberFormat,
): string {
  return typeof value === "number" ? formatValue(value) : value;
}

/**
 * Single unboxed metric: uppercase micro label, tabular value, optional delta/hint.
 */
export function KpiItem({
  label,
  value,
  delta,
  hint,
  status = "neutral",
  formatValue = defaultNumberFormat,
  className,
}: KpiItemProps) {
  const tone = resolveStatus(status);
  const display = formatDisplayedValue(value, formatValue);
  const deltaColor =
    delta == null
      ? ""
      : delta.value > 0
        ? "text-success"
        : delta.value < 0
          ? "text-destructive"
          : "text-muted-foreground";

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-lg font-semibold tabular-nums", valueStatusClass[tone])}>
          {display}
        </span>
        {delta ? (
          <span className={cn("text-xs font-medium tabular-nums", deltaColor)}>
            {delta.value > 0 ? "+" : ""}
            {delta.value}%{delta.label ? ` ${delta.label}` : ""}
          </span>
        ) : null}
      </div>
      {hint ? (
        <span className="text-micro text-muted-foreground" title={hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

/** Props for {@link KpiStrip}. */
export type KpiStripProps = {
  children?: ReactNode;
  /** Optional data-driven items. Rendered before `children`. */
  items?: KpiItemProps[];
  className?: string;
};

/**
 * Horizontal strip of unboxed KPI items. Do not wrap each tile in a card —
 * GTM places the strip on one `bg-card` panel, or inline under a page title.
 */
export function KpiStrip({ children, items, className }: KpiStripProps) {
  return (
    <div className={cn("flex flex-wrap gap-6 py-3", className)}>
      {items?.map((item) => (
        <KpiItem key={item.label} {...item} />
      ))}
      {children}
    </div>
  );
}

/** Props for {@link KpiDivider}. */
export type KpiDividerProps = {
  className?: string;
};

/** 1px vertical rule between KPI groups (e.g. volume vs reputation). */
export function KpiDivider({ className }: KpiDividerProps) {
  return (
    <div
      className={cn("w-px self-stretch bg-border", className)}
      role="separator"
      aria-orientation="vertical"
    />
  );
}
