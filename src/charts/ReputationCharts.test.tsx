import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { bounceTrend, complaintTrend } from "./fixtures";
import { BounceRateChart, ComplaintRateChart, RateTrendChart } from "./ReputationCharts";

describe("ReputationCharts", () => {
  it("renders bounce and complaint tables", () => {
    render(
      <>
        <BounceRateChart data={bounceTrend} />
        <ComplaintRateChart data={complaintTrend} />
      </>,
    );
    expect(screen.getByRole("table", { name: "Bounce rate trend" })).toHaveTextContent(
      "Bounce Rate",
    );
    expect(screen.getByRole("table", { name: "Complaint rate trend" })).toHaveTextContent(
      "Complaint Rate",
    );
  });

  it("renders empty data", () => {
    render(<RateTrendChart data={[]} emptyLabel="No reputation" />);
    expect(screen.getByText("No reputation")).toBeInTheDocument();
  });

  it("multiplies fractional rates when asked", () => {
    render(
      <RateTrendChart
        data={[{ date: "2026-10-20", rate: 0.04, numerator: 4, denominator: 100 }]}
        rateIsFraction
        seriesName="Bounce Rate"
        label="Fraction bounce"
        yDigits={1}
      />,
    );
    expect(screen.getByRole("table", { name: "Fraction bounce" })).toHaveTextContent("4.0%");
  });
});
