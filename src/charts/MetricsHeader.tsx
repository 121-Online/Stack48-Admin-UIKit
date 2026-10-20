import { cn } from "../lib/cn";
import { defaultNumberFormat, type NumberFormatter } from "./format";
import { Sparkline } from "./Sparkline";

/** Inline count in {@link MetricsHeader}. */
export type MetricsHeaderStat = {
  /** Unit / noun shown after the value (`accounts`, `new 24h`). */
  label: string;
  value: string | number;
  /** Wrap the value in `<strong>` (GTM total count). */
  emphasize?: boolean;
};

/** One bucket in a {@link MetricsHeaderBreakdown}. */
export type MetricsHeaderBreakdownItem = {
  key: string;
  count: number;
};

/** Labelled set of counts in {@link MetricsHeader}. */
export type MetricsHeaderBreakdown = {
  label: string;
  items: MetricsHeaderBreakdownItem[];
};

/** Label/value pair in {@link MetricsHeader}. */
export type MetricsHeaderFact = {
  label: string;
  value: string | number;
};

/** Props for {@link MetricsHeader}. */
export type MetricsHeaderProps = {
  stats?: MetricsHeaderStat[];
  breakdowns?: MetricsHeaderBreakdown[];
  facts?: MetricsHeaderFact[];
  /** Prefix for the sync line (`Last sync`). */
  syncLabel?: string;
  syncValue?: string | null;
  sparklineData?: number[];
  sparklineLabel?: string;
  /** Stale / warning copy, rendered in warning colour (not a boxed alert). */
  warning?: string | null;
  footnote?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatBreakdown?: (items: MetricsHeaderBreakdownItem[], formatValue: NumberFormatter) => string;
  className?: string;
};

function defaultBreakdownFormat(
  items: MetricsHeaderBreakdownItem[],
  formatValue: NumberFormatter,
): string {
  if (items.length === 0) return "—";
  return items.map((item) => `${item.key} ${formatValue(item.count)}`).join(" · ");
}

function display(value: string | number, formatValue: NumberFormatter): string {
  return typeof value === "number" ? formatValue(value) : value;
}

/**
 * Dense inline metrics header from GTM platform-users.
 *
 * Stat row, plan/status breakdowns, a tiny sparkline, and an optional stale
 * warning — all as text, **no boxed cards**.
 */
export function MetricsHeader({
  stats = [],
  breakdowns = [],
  facts = [],
  syncLabel,
  syncValue,
  sparklineData,
  sparklineLabel = "Trend",
  warning,
  footnote,
  emptyLabel = "No metrics",
  formatValue = defaultNumberFormat,
  formatBreakdown = defaultBreakdownFormat,
  className,
}: MetricsHeaderProps) {
  const hasStats = stats.length > 0;
  const hasBreakdowns = breakdowns.length > 0 || facts.length > 0;
  const hasSync = syncLabel != null || sparklineData != null || warning;

  if (!hasStats && !hasBreakdowns && !hasSync) {
    return <div className={cn("text-body text-muted-foreground", className)}>{emptyLabel}</div>;
  }

  return (
    <div className={cn("space-y-1 text-body text-foreground", className)}>
      {hasStats ? (
        <p className="tabular-nums">
          {stats.map((stat, index) => (
            <span key={stat.label}>
              {index > 0 ? " · " : null}
              {stat.emphasize ? (
                <strong>{display(stat.value, formatValue)}</strong>
              ) : (
                display(stat.value, formatValue)
              )}{" "}
              {stat.label}
            </span>
          ))}
        </p>
      ) : null}

      {hasBreakdowns ? (
        <p className="tabular-nums text-xs text-muted-foreground">
          {breakdowns.map((breakdown, index) => (
            <span key={breakdown.label}>
              {index > 0 ? " · " : null}
              {breakdown.label} {formatBreakdown(breakdown.items, formatValue)}
            </span>
          ))}
          {facts.map((fact, index) => (
            <span key={fact.label}>
              {breakdowns.length > 0 || index > 0 ? " · " : null}
              {fact.label} {display(fact.value, formatValue)}
            </span>
          ))}
        </p>
      ) : null}

      {hasSync ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {syncLabel != null ? (
            <span className="tabular-nums">
              {syncLabel} {syncValue ?? "—"}
            </span>
          ) : null}
          {sparklineData != null ? (
            <Sparkline
              data={sparklineData}
              width={84}
              height={16}
              strokeWidth={1.2}
              color="currentColor"
              label={sparklineLabel}
              formatValue={formatValue}
              className="text-muted-foreground"
            />
          ) : null}
          {warning ? (
            <span className="text-amber-700" role="status">
              {warning}
            </span>
          ) : null}
        </div>
      ) : null}

      {footnote ? <p className="text-micro text-muted-foreground">{footnote}</p> : null}
    </div>
  );
}
