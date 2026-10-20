import { cn } from "../lib/cn";
import { ChartA11y, ChartEmpty } from "./a11y";
import {
  defaultNumberFormat,
  defaultPercentFormat,
  type NumberFormatter,
  type PercentFormatter,
} from "./format";

/** One slice of {@link StackedBars}. */
export type StackedBarSegment = {
  key: string;
  label: string;
  value: number;
  color: string;
  /**
   * Share of the bar (0–100). When omitted, computed from `value / sum(values)`.
   */
  share?: number;
};

/** Props for {@link StackedBars}. */
export type StackedBarsProps = {
  segments: StackedBarSegment[];
  /** Caption under the legend (GTM “Total with email: …”). */
  caption?: string;
  label?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatPercent?: PercentFormatter;
  /** Show the count inside a segment when its share exceeds this percent. */
  minInnerLabelShare?: number;
  className?: string;
};

function shareOf(segment: StackedBarSegment, total: number): number {
  if (segment.share != null) return segment.share;
  if (total <= 0) return 0;
  return (segment.value / total) * 100;
}

/**
 * Single 100% stacked bar plus a legend. Covers GTM buffer-health and
 * score-band rows — pass segments via props, do not hard-code product keys.
 */
export function StackedBars({
  segments,
  caption,
  label = "Stacked bar",
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatPercent = defaultPercentFormat,
  minInnerLabelShare = 10,
  className,
}: StackedBarsProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const rows = segments.map((segment) => [
    segment.label,
    formatValue(segment.value),
    formatPercent(shareOf(segment, total)),
  ]);

  return (
    <ChartA11y
      label={label}
      columns={["Segment", "Value", "Share"]}
      rows={rows}
      className={className}
    >
      {total === 0 ? (
        <ChartEmpty>{emptyLabel}</ChartEmpty>
      ) : (
        <div className="space-y-2">
          <div className="flex h-6 overflow-hidden rounded-sm bg-muted">
            {segments.map((segment) => {
              const share = shareOf(segment, total);
              if (share <= 0) return null;
              return (
                <div
                  key={segment.key}
                  className="relative h-full"
                  style={{ width: `${share}%`, backgroundColor: segment.color }}
                  title={`${segment.label}: ${formatValue(segment.value)} (${formatPercent(share)})`}
                >
                  {share > minInnerLabelShare ? (
                    <span className="absolute inset-0 flex items-center justify-center text-micro font-medium text-white">
                      {formatValue(segment.value)}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption">
            {segments.map((segment) => (
              <div key={segment.key} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: segment.color }} />
                <span className="text-muted-foreground">{segment.label}</span>
                <span className="font-medium tabular-nums">{formatValue(segment.value)}</span>
                <span className="text-muted-foreground">
                  ({formatPercent(shareOf(segment, total), 0)})
                </span>
              </div>
            ))}
          </div>
          {caption ? <div className={cn("text-micro text-muted-foreground")}>{caption}</div> : null}
        </div>
      )}
    </ChartA11y>
  );
}
