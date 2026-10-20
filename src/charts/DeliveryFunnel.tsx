import { useId } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../lib/cn";
import { ChartA11y, ChartEmpty } from "./a11y";
import { ChartTooltip } from "./ChartTooltip";
import { chartColors } from "./colors";
import {
  defaultNumberFormat,
  defaultPercentFormat,
  type NumberFormatter,
  type PercentFormatter,
} from "./format";

/** One named value in {@link DeliveryFunnel}. */
export type FunnelStage = {
  name: string;
  value: number;
  color?: string;
};

/** Default ink / blue / green / purple stage colours. */
export const defaultFunnelColors = [
  chartColors.sent,
  chartColors.delivered,
  chartColors.opened,
  chartColors.clicked,
] as const;

/** Props for {@link DeliveryFunnel}. */
export type DeliveryFunnelProps = {
  stages: FunnelStage[];
  label?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatPercent?: PercentFormatter;
  className?: string;
};

function withColors(stages: FunnelStage[]): Array<FunnelStage & { color: string }> {
  return stages.map((stage, index) => ({
    ...stage,
    color:
      stage.color ?? defaultFunnelColors[index % defaultFunnelColors.length] ?? chartColors.sent,
  }));
}

/**
 * Horizontal CSS funnel (GTM 7-day delivery pipeline). Width is relative to
 * the largest stage; conversion % is relative to the first stage.
 */
export function DeliveryFunnel({
  stages,
  label = "Delivery funnel",
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatPercent = defaultPercentFormat,
  className,
}: DeliveryFunnelProps) {
  const colored = withColors(stages);
  const maxValue = Math.max(...colored.map((stage) => stage.value), 0);
  const baseline = colored[0]?.value ?? 0;
  const rows = colored.map((stage) => [
    stage.name,
    formatValue(stage.value),
    baseline > 0 ? formatPercent((stage.value / baseline) * 100) : "—",
  ]);

  return (
    <ChartA11y
      label={label}
      columns={["Stage", "Value", "Of first"]}
      rows={rows}
      className={className}
    >
      {maxValue <= 0 ? (
        <ChartEmpty>{emptyLabel}</ChartEmpty>
      ) : (
        <div className="space-y-1">
          {colored.map((stage, index) => {
            const width = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
            const ofFirst = baseline > 0 ? (stage.value / baseline) * 100 : 0;
            return (
              <div key={stage.name} className="flex items-center gap-3">
                <div className="w-16 text-right text-caption text-muted-foreground">
                  {stage.name}
                </div>
                <div className="relative h-6 flex-1 overflow-hidden rounded-sm bg-muted">
                  <div
                    className="h-full rounded-sm"
                    style={{ width: `${width}%`, backgroundColor: stage.color }}
                  />
                  <div className="absolute inset-0 flex items-center px-2">
                    <span
                      className={cn(
                        "text-caption font-medium tabular-nums",
                        width > 30 ? "text-white" : "text-foreground",
                      )}
                    >
                      {formatValue(stage.value)}
                      {index > 0 && baseline > 0 ? (
                        <span className="ml-1 text-micro opacity-75">
                          ({formatPercent(ofFirst)})
                        </span>
                      ) : null}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ChartA11y>
  );
}

/** Props for {@link DeliveryFunnelHorizontal}. */
export type DeliveryFunnelHorizontalProps = DeliveryFunnelProps & {
  height?: number;
};

/**
 * Recharts vertical-bar variant of the delivery funnel (same data contract).
 */
export function DeliveryFunnelHorizontal({
  stages,
  height = 48,
  label = "Delivery funnel",
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatPercent = defaultPercentFormat,
  className,
}: DeliveryFunnelHorizontalProps) {
  const uid = useId().replace(/:/g, "");
  const colored = withColors(stages);
  const baseline = colored[0]?.value ?? 0;
  const maxValue = Math.max(...colored.map((stage) => stage.value), 0);
  const rows = colored.map((stage) => [
    stage.name,
    formatValue(stage.value),
    baseline > 0 ? formatPercent((stage.value / baseline) * 100) : "—",
  ]);
  const chartHeight = Math.max(height, colored.length * 28);

  return (
    <ChartA11y
      label={label}
      columns={["Stage", "Value", "Of first"]}
      rows={rows}
      hideVisual
      className={className}
      style={{ height: chartHeight }}
    >
      {maxValue <= 0 ? (
        <ChartEmpty>{emptyLabel}</ChartEmpty>
      ) : (
        <div style={{ width: "100%", height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart
              layout="vertical"
              data={colored}
              margin={{ top: 0, right: 40, left: 60, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: chartColors.tick }}
                axisLine={{ stroke: chartColors.grid }}
                tickLine={false}
                tickFormatter={formatValue}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10, fill: chartColors.tick }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                content={({ active, payload }) => {
                  const item = payload?.[0]?.payload as FunnelStage | undefined;
                  if (!item) return null;
                  const ofFirst = baseline > 0 ? (item.value / baseline) * 100 : 0;
                  return (
                    <ChartTooltip
                      active={active}
                      label={item.name}
                      items={[
                        {
                          name: item.name,
                          value: item.value,
                          color: item.color,
                          detail: baseline > 0 ? `(${formatPercent(ofFirst)})` : undefined,
                        },
                      ]}
                      formatValue={formatValue}
                    />
                  );
                }}
              />
              <Bar dataKey="value" radius={[0, 2, 2, 0]} isAnimationActive={false}>
                {colored.map((stage, index) => (
                  <Cell key={`${uid}-${stage.name}-${index}`} fill={stage.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartA11y>
  );
}
