import { ChartA11y, ChartEmpty } from "./a11y";
import {
  defaultNumberFormat,
  defaultPercentFormat,
  type NumberFormatter,
  type PercentFormatter,
} from "./format";

export type TaperedFunnelStage = {
  name: string;
  value: number;
  color: string;
};

export type TaperedFunnelProps = {
  stages: TaperedFunnelStage[];
  label?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatPercent?: PercentFormatter;
  className?: string;
};

function isLightColor(hex: string): boolean {
  const raw = hex.replace("#", "");
  if (raw.length < 6) return false;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  if (![r, g, b].every(Number.isFinite)) return false;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}

/**
 * Trapezoid funnel (GTM campaign / platform conversion). Conversion labels
 * are “x% of previous stage”, passed through `formatPercent`.
 */
export function TaperedFunnel({
  stages,
  label = "Funnel",
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatPercent = defaultPercentFormat,
  className,
}: TaperedFunnelProps) {
  const valid = stages.filter((stage) => stage.value >= 0);
  const maxValue = Math.max(...valid.map((stage) => stage.value), 0);
  const minWidthPct = 40;
  const maxWidthPct = 100;
  const rows = valid.map((stage, index) => {
    const previous = valid[index - 1];
    return [
      stage.name,
      formatValue(stage.value),
      previous ? formatPercent((stage.value / Math.max(previous.value, 1)) * 100) : "—",
    ];
  });

  return (
    <ChartA11y
      label={label}
      columns={["Stage", "Value", "Of previous"]}
      rows={rows}
      className={className}
    >
      {valid.length === 0 || maxValue <= 0 ? (
        <ChartEmpty>{emptyLabel}</ChartEmpty>
      ) : (
        <div className="flex flex-col gap-0.5">
          {valid.map((stage, index) => {
            const previous = index > 0 ? valid[index - 1] : undefined;
            const widthPct = minWidthPct + (stage.value / maxValue) * (maxWidthPct - minWidthPct);
            const next = valid[index + 1];
            const nextWidthPct = next
              ? minWidthPct + (next.value / maxValue) * (maxWidthPct - minWidthPct)
              : widthPct * 0.7;
            const clipPath = `polygon(${(100 - widthPct) / 2}% 0, ${(100 + widthPct) / 2}% 0, ${(100 + nextWidthPct) / 2}% 100%, ${(100 - nextWidthPct) / 2}% 100%)`;
            const textColor = isLightColor(stage.color) ? "text-zinc-800" : "text-white";

            return (
              <div key={stage.name} className="flex items-center gap-3">
                <div
                  className="relative flex h-7 flex-shrink-0 items-center justify-center"
                  style={{
                    width: 120,
                    backgroundColor: stage.color,
                    clipPath,
                  }}
                >
                  <span className={`truncate px-1 text-micro font-medium ${textColor}`}>
                    {stage.name}
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-2 text-xs">
                  <span className="font-medium tabular-nums text-foreground">
                    {formatValue(stage.value)}
                  </span>
                  {previous ? (
                    <span className="tabular-nums text-caption text-muted-foreground">
                      {formatPercent((stage.value / Math.max(previous.value, 1)) * 100)} of{" "}
                      {previous.name}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ChartA11y>
  );
}
