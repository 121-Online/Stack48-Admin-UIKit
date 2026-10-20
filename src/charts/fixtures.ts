import { chartColors } from "./colors";
import type { DailyActivityPoint } from "./DailyActivityChart";
import type { FunnelStage } from "./DeliveryFunnel";
import type { RateTrendPoint } from "./ReputationCharts";
import type { StackedBarSegment } from "./StackedBars";
import type { TaperedFunnelStage } from "./TaperedFunnel";
import type { WorldMapRegion } from "./WorldMap";

/** Story / test sample data. Not a public export. */

export const dailyActivity: DailyActivityPoint[] = Array.from({ length: 14 }, (_, index) => {
  const day = 7 + index;
  const sent = 80 + index * 5 + (index % 3) * 8;
  return {
    date: `2026-10-${String(day).padStart(2, "0")}`,
    sent,
    delivered: Math.round(sent * 0.97),
    opened: Math.round(sent * 0.42),
    clicked: Math.round(sent * 0.09),
  };
});

export const funnelStages: FunnelStage[] = [
  { name: "Sent", value: 1240, color: chartColors.sent },
  { name: "Delivered", value: 1198, color: chartColors.delivered },
  { name: "Opened", value: 486, color: chartColors.opened },
  { name: "Clicked", value: 92, color: chartColors.clicked },
];

export const conversionStages: TaperedFunnelStage[] = [
  { name: "Leads", value: 2400, color: "#71717a" },
  { name: "Emailed", value: 1800, color: "#52525b" },
  { name: "Signed Up", value: 420, color: chartColors.delivered },
  { name: "Claimed", value: 210, color: chartColors.opened },
  { name: "Paid", value: 64, color: chartColors.complaint },
];

export const bufferSegments: StackedBarSegment[] = [
  { key: "sendable", label: "Sendable", value: 842, color: chartColors.sendable },
  { key: "excluded", label: "Excluded", value: 126, color: chartColors.excluded },
  { key: "bounced", label: "Bounced", value: 38, color: chartColors.bounced },
];

export const scoreSegments: StackedBarSegment[] = [
  { key: "A", label: "A-Band", value: 410, color: chartColors.bandA, share: 41 },
  { key: "B", label: "B-Band", value: 280, color: chartColors.bandB, share: 28 },
  { key: "C", label: "C-Band", value: 190, color: chartColors.bandC, share: 19 },
  { key: "F", label: "F-Band", value: 70, color: chartColors.bandF, share: 7 },
  { key: "unscored", label: "Unscored", value: 50, color: chartColors.unscored, share: 5 },
];

export const bounceTrend: RateTrendPoint[] = dailyActivity.map((point, index) => ({
  date: point.date,
  rate: 0.8 + (index % 5) * 0.4,
  numerator: 2 + (index % 3),
  denominator: Number(point.sent),
}));

export const complaintTrend: RateTrendPoint[] = dailyActivity.map((point, index) => ({
  date: point.date,
  rate: 0.02 + (index % 4) * 0.01,
  numerator: index % 3 === 0 ? 1 : 0,
  denominator: Number(point.sent),
}));

export const worldRegions: WorldMapRegion[] = [
  { id: "GBR", label: "UK", values: { "7d": 420, today: 38 } },
  { id: "IRL", label: "Ireland", values: { "7d": 86, today: 9 } },
  { id: "USA", label: "USA", values: { "7d": 210, today: 22 } },
  { id: "CAN", label: "Canada", values: { "7d": 54, today: 4 } },
];

export const sparklineSeries = [12, 18, 15, 22, 19, 28, 24];
