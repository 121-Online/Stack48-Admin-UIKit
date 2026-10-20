/**
 * Presentational chart wrappers themed with kit tokens.
 *
 * KPI / metrics chrome is unboxed (no drop shadow, 2px radius). Trend charts
 * that GTM drew with Recharts stay on Recharts (`peerDependencies.recharts`,
 * optional). WorldMap is a schematic SVG — no TopoJSON, no react-simple-maps.
 *
 * Pass series, labels, and formatters via props. No fetching.
 *
 * @packageDocumentation
 */

export { ChartA11y, ChartEmpty, HiddenDataTable } from "./a11y";
export { ChartTooltip } from "./ChartTooltip";
export type { ChartTooltipItem } from "./ChartTooltip";
export { chartColors } from "./colors";
export type { ChartColorName } from "./colors";
export { DailyActivityChart, defaultDailyActivitySeries } from "./DailyActivityChart";
export type {
  ChartSeries,
  DailyActivityChartProps,
  DailyActivityPoint,
} from "./DailyActivityChart";
export { defaultFunnelColors, DeliveryFunnel, DeliveryFunnelHorizontal } from "./DeliveryFunnel";
export type {
  DeliveryFunnelHorizontalProps,
  DeliveryFunnelProps,
  FunnelStage,
} from "./DeliveryFunnel";
export {
  defaultDateLabel,
  defaultDateTick,
  defaultNumberFormat,
  defaultPercentFormat,
} from "./format";
export type { DateFormatter, NumberFormatter, PercentFormatter } from "./format";
export { KpiDivider, KpiItem, KpiStrip } from "./KpiStrip";
export type {
  KpiDelta,
  KpiDividerProps,
  KpiItemProps,
  KpiStripProps,
  MetricStatus,
} from "./KpiStrip";
export { KpiTile, KpiTileRow } from "./KpiTile";
export type { KpiTileProps, KpiTileRowProps } from "./KpiTile";
export { MetricsHeader } from "./MetricsHeader";
export type {
  MetricsHeaderBreakdown,
  MetricsHeaderBreakdownItem,
  MetricsHeaderFact,
  MetricsHeaderProps,
  MetricsHeaderStat,
} from "./MetricsHeader";
export {
  BounceRateChart,
  ComplaintRateChart,
  defaultBounceThresholds,
  defaultComplaintThresholds,
  RateTrendChart,
} from "./ReputationCharts";
export type { RateThreshold, RateTrendChartProps, RateTrendPoint } from "./ReputationCharts";
export { Sparkline } from "./Sparkline";
export type { SparklineProps } from "./Sparkline";
export { StackedBars } from "./StackedBars";
export type { StackedBarSegment, StackedBarsProps } from "./StackedBars";
export { TaperedFunnel } from "./TaperedFunnel";
export type { TaperedFunnelProps, TaperedFunnelStage } from "./TaperedFunnel";
export { defaultRegionCoordinates, WorldMap } from "./WorldMap";
export type {
  WorldMapCoordinates,
  WorldMapProps,
  WorldMapRegion,
  WorldMapViewMode,
} from "./WorldMap";
