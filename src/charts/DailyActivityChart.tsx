import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartA11y, ChartEmpty } from "./a11y";
import { ChartTooltip } from "./ChartTooltip";
import { chartColors } from "./colors";
import {
  defaultDateLabel,
  defaultDateTick,
  defaultNumberFormat,
  type DateFormatter,
  type NumberFormatter,
} from "./format";

/** One day in {@link DailyActivityChart}. Extra keys are series values. */
export type DailyActivityPoint = {
  date: string;
  [key: string]: string | number;
};

/** Named area/line in {@link DailyActivityChart}. */
export type ChartSeries = {
  dataKey: string;
  name: string;
  color: string;
};

/** GTM 30-day activity series: sent, delivered, opened, clicked. */
export const defaultDailyActivitySeries: ChartSeries[] = [
  { dataKey: "sent", name: "Sent", color: chartColors.sent },
  { dataKey: "delivered", name: "Delivered", color: chartColors.delivered },
  { dataKey: "opened", name: "Opened", color: chartColors.opened },
  { dataKey: "clicked", name: "Clicked", color: chartColors.clicked },
];

/** Props for {@link DailyActivityChart}. */
export type DailyActivityChartProps = {
  data: DailyActivityPoint[];
  series?: ChartSeries[];
  xKey?: string;
  height?: number;
  label?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatTick?: DateFormatter;
  formatLabel?: DateFormatter;
  className?: string;
};

/**
 * Stacked-looking area trend (GTM Daily Snapshot / campaign 30-day activity).
 * Rendering stays on Recharts to match the dashboard.
 */
export function DailyActivityChart({
  data,
  series = defaultDailyActivitySeries,
  xKey = "date",
  height = 240,
  label = "Daily activity",
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatTick = defaultDateTick,
  formatLabel = defaultDateLabel,
  className,
}: DailyActivityChartProps) {
  const uid = useId().replace(/:/g, "");
  const columns = [xKey, ...series.map((item) => item.name)];
  const rows = data.map((point) => [
    formatLabel(String(point[xKey] ?? "")),
    ...series.map((item) => formatValue(Number(point[item.dataKey] ?? 0))),
  ]);

  return (
    <ChartA11y
      label={label}
      columns={columns}
      rows={rows}
      hideVisual
      className={className}
      style={{ height }}
    >
      {data.length === 0 ? (
        <ChartEmpty>{emptyLabel}</ChartEmpty>
      ) : (
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                {series.map((item) => (
                  <linearGradient
                    key={item.dataKey}
                    id={`${uid}-${item.dataKey}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={item.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={item.color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis
                dataKey={xKey}
                tickFormatter={(value: string) => formatTick(value)}
                tick={{ fontSize: 10, fill: chartColors.tick }}
                axisLine={{ stroke: chartColors.grid }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: chartColors.tick }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => formatValue(value)}
              />
              <Tooltip
                content={({ active, payload, label: tickLabel }) => (
                  <ChartTooltip
                    active={active}
                    label={formatLabel(String(tickLabel ?? ""))}
                    items={(payload ?? []).map((entry) => ({
                      name: String(entry.name ?? ""),
                      value: Number(entry.value ?? 0),
                      color: typeof entry.color === "string" ? entry.color : undefined,
                    }))}
                    formatValue={formatValue}
                  />
                )}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="rect" iconSize={8} />
              {series.map((item) => (
                <Area
                  key={item.dataKey}
                  type="monotone"
                  dataKey={item.dataKey}
                  name={item.name}
                  stroke={item.color}
                  fill={`url(#${uid}-${item.dataKey})`}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartA11y>
  );
}
