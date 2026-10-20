import { describe, expect, it } from "vitest";
import * as charts from "./index";

describe("charts barrel", () => {
  it("exports the PR4 surface", () => {
    for (const name of [
      "Sparkline",
      "KpiStrip",
      "KpiItem",
      "KpiDivider",
      "KpiTile",
      "KpiTileRow",
      "MetricsHeader",
      "DailyActivityChart",
      "StackedBars",
      "DeliveryFunnel",
      "DeliveryFunnelHorizontal",
      "TaperedFunnel",
      "RateTrendChart",
      "BounceRateChart",
      "ComplaintRateChart",
      "WorldMap",
      "chartColors",
      "defaultDailyActivitySeries",
    ]) {
      expect(charts).toHaveProperty(name);
    }
  });
});
