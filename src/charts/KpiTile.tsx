import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { chartColors } from "./colors";
import { defaultNumberFormat, type NumberFormatter } from "./format";
import { type KpiDelta, type MetricStatus } from "./KpiStrip";
import { Sparkline } from "./Sparkline";

/** Props for {@link KpiTile}. */
export type KpiTileProps = {
  label: string;
  value: string | number;
  delta?: KpiDelta;
  hint?: string;
  sparklineData?: number[];
  sparklineColor?: string;
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

/**
 * Dense unboxed KPI tile (GTM overview / delivery metrics). Optional sparkline
 * sits beside the value; do not put a drop shadow or large radius on it.
 */
export function KpiTile({
  label,
  value,
  delta,
  hint,
  sparklineData,
  sparklineColor = chartColors.delivered,
  status = "neutral",
  formatValue = defaultNumberFormat,
  className,
}: KpiTileProps) {
  const tone = resolveStatus(status);
  const display = typeof value === "number" ? formatValue(value) : value;
  const showSparkline = sparklineData != null && sparklineData.length > 2;
  const deltaTone =
    delta == null
      ? ""
      : delta.value > 0
        ? "text-success"
        : delta.value < 0
          ? "text-destructive"
          : "text-muted-foreground";
  const deltaArrow = delta == null ? "" : delta.value > 0 ? "↑" : delta.value < 0 ? "↓" : "→";

  const aria = [
    label,
    display,
    delta ? `${deltaArrow} ${Math.abs(delta.value)}%${delta.label ? ` ${delta.label}` : ""}` : hint,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={cn("min-w-[120px] flex-1", className)} aria-label={aria}>
      <div className="mb-1 text-micro font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex items-end gap-2">
        <div className={cn("text-2xl font-semibold tabular-nums", valueStatusClass[tone])}>
          {display}
        </div>
        {showSparkline ? (
          <Sparkline
            data={sparklineData}
            width={64}
            height={24}
            color={sparklineColor}
            fill
            strokeWidth={1}
            label={`${label} trend`}
            formatValue={formatValue}
            className="opacity-60"
          />
        ) : null}
      </div>
      <div className="mt-0.5 flex items-center gap-2">
        {delta ? (
          <span className={cn("text-micro font-medium", deltaTone)}>
            {deltaArrow} {Math.abs(delta.value)}%{" "}
            {delta.label ? (
              <span className="font-normal text-muted-foreground">{delta.label}</span>
            ) : null}
          </span>
        ) : null}
        {hint && !delta ? <span className="text-micro text-muted-foreground">{hint}</span> : null}
      </div>
    </div>
  );
}

/** Props for {@link KpiTileRow}. */
export type KpiTileRowProps = {
  children: ReactNode;
  className?: string;
};

/** Flex row of `KpiTile`s. Parent supplies any panel border — the row itself is not a card. */
export function KpiTileRow({ children, className }: KpiTileRowProps) {
  return <div className={cn("flex flex-wrap gap-6", className)}>{children}</div>;
}
