import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricsHeader } from "./MetricsHeader";

describe("MetricsHeader", () => {
  it("renders inline stats, breakdowns, sparkline, and a stale warning", () => {
    render(
      <MetricsHeader
        stats={[
          { label: "accounts", value: 1280, emphasize: true },
          { label: "new 24h", value: 14 },
        ]}
        breakdowns={[{ label: "Plan", items: [{ key: "Pro", count: 40 }] }]}
        facts={[{ label: "Claimed", value: 30 }]}
        syncLabel="Last sync"
        syncValue="20 Oct 14:02"
        sparklineData={[4, 8, 6, 10]}
        sparklineLabel="Synced per day"
        warning="Last sync older than 24h"
        footnote="Sparkline is last synced_at per account."
      />,
    );
    expect(screen.getByText("1,280")).toBeInTheDocument();
    expect(screen.getByText(/Plan Pro 40/)).toBeInTheDocument();
    expect(screen.getByText(/Claimed 30/)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Last sync older than 24h");
    expect(screen.getByRole("table", { name: "Synced per day" })).toBeInTheDocument();
    expect(screen.getByText(/Sparkline is last synced_at/)).toBeInTheDocument();
  });

  it("renders the empty label when nothing is passed", () => {
    render(<MetricsHeader emptyLabel="No metrics" />);
    expect(screen.getByText("No metrics")).toBeInTheDocument();
  });

  it("formats breakdown counts through the formatter", () => {
    render(
      <MetricsHeader
        breakdowns={[{ label: "Sub", items: [{ key: "active", count: 9 }] }]}
        formatValue={(value) => `x${value}`}
      />,
    );
    expect(screen.getByText(/Sub active x9/)).toBeInTheDocument();
  });
});
