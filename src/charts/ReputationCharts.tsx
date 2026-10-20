import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
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
  defaultPercentFormat,
  type DateFormatter,
  type NumberFormatter,
  type PercentFormatter,
} from "./format";

/** One sample in {@link RateTrendChart}. */
export type RateTrendPoint = {
  date: string;
  /** Rate in percent units (4 = 4%) unless `rateIsFraction` is set. */
  rate: number;
  numerator?: number;
  denominator?: number;
};

/** Horizontal reference line in {@link RateTrendChart}. */
export type RateThreshold = {
  value: number;
  label: string;
  color: string;
  strokeDasharray?: string;
};

/** Props for {@link RateTrendChart}. */
export type RateTrendChartProps = {
  data: RateTrendPoint[];
  height?: number;
  color?: string;
  seriesName?: string;
  thresholds?: RateThreshold[];
  /** When true, `rate` is treated as a 0–1 fraction and multiplied by 100. */
  rateIsFraction?: boolean;
  yDigits?: number;
  label?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatRate?: PercentFormatter;
  formatTick?: DateFormatter;
  formatLabel?: DateFormatter;
  className?: string;
};

/**
 * Generic rate trend with optional limit / warning reference lines.
 * `BounceRateChart` and `ComplaintRateChart` are GTM-coloured wrappers.
 */
export function RateTrendChart({
  data,
  height = 160,
  color = chartColors.bounce,
  seriesName = "Rate",
  thresholds = [],
  rateIsFraction = false,
  yDigits = 1,
  label,
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatRate = defaultPercentFormat,
  formatTick = defaultDateTick,
  formatLabel = defaultDateLabel,
  className,
}: RateTrendChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    rate: rateIsFraction ? point.rate * 100 : point.rate,
  }));
  const accessibleLabel = label ?? seriesName;
  const rows = chartData.map((point) => [
    formatLabel(point.date),
    formatRate(point.rate, yDigits),
    point.numerator != null ? formatValue(point.numerator) : "—",
    point.denominator != null ? formatValue(point.denominator) : "—",
  ]);

  return (
    <ChartA11y
      label={accessibleLabel}
      columns={["Date", seriesName, "Count", "Sent"]}
      rows={rows}
      hideVisual
      className={className}
      style={{ height }}
    >
      {chartData.length === 0 ? (
        <ChartEmpty>{emptyLabel}</ChartEmpty>
      ) : (
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <LineChart data={chartData} margin={{ top: 8, right: 48, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(value: string) => formatTick(value)}
                tick={{ fontSize: 9, fill: chartColors.tick }}
                axisLine={{ stroke: chartColors.grid }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 9, fill: chartColors.tick }}
                axisLine={false}
                tickLine={false}
                domain={[0, "auto"]}
                tickFormatter={(value: number) => formatRate(value, yDigits)}
              />
              {thresholds.map((threshold) => (
                <ReferenceLine
                  key={threshold.label}
                  y={threshold.value}
                  stroke={threshold.color}
                  strokeDasharray={threshold.strokeDasharray ?? "4 4"}
                  strokeWidth={1}
                  label={{
                    value: threshold.label,
                    position: "right",
                    fontSize: 9,
                    fill: threshold.color,
                  }}
                />
              ))}
              <Tooltip
                content={({ active, payload, label: tickLabel }) => {
                  const point = payload?.[0]?.payload as RateTrendPoint | undefined;
                  if (!point) return null;
                  const detail =
                    point.numerator != null && point.denominator != null
                      ? `(${formatValue(point.numerator)}/${formatValue(point.denominator)})`
                      : undefined;
                  return (
                    <ChartTooltip
                      active={active}
                      label={formatLabel(String(tickLabel ?? ""))}
                      items={[
                        {
                          name: seriesName,
                          value: point.rate,
                          color,
                          detail,
                        },
                      ]}
                      formatValue={(value) => formatRate(value, yDigits + 1)}
                    />
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke={color}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: color }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartA11y>
  );
}

/** Default bounce-rate warning / limit lines (percent units). */
export const defaultBounceThresholds: RateThreshold[] = [
  { value: 4, label: "Limit 4%", color: chartColors.bounce, strokeDasharray: "4 4" },
  { value: 2, label: "Warn 2%", color: chartColors.warning, strokeDasharray: "2 2" },
];

/** Default complaint-rate warning / limit lines (percent units). */
export const defaultComplaintThresholds: RateThreshold[] = [
  { value: 0.08, label: "0.08%", color: chartColors.bounce, strokeDasharray: "4 4" },
  { value: 0.04, label: "0.04%", color: chartColors.warning, strokeDasharray: "2 2" },
];

/** GTM bounce-rate trend. Thresholds default to Resend-shaped 2% / 4% but are props. */
export function BounceRateChart(props: RateTrendChartProps) {
  return (
    <RateTrendChart
      color={chartColors.bounce}
      seriesName="Bounce Rate"
      thresholds={defaultBounceThresholds}
      yDigits={1}
      label="Bounce rate trend"
      {...props}
    />
  );
}

/** GTM complaint-rate trend. Thresholds default to 0.04% / 0.08%. */
export function ComplaintRateChart(props: RateTrendChartProps) {
  return (
    <RateTrendChart
      color={chartColors.complaint}
      seriesName="Complaint Rate"
      thresholds={defaultComplaintThresholds}
      yDigits={2}
      label="Complaint rate trend"
      {...props}
    />
  );
}
