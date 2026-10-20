import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KpiTile, KpiTileRow } from "./KpiTile";

describe("KpiTile", () => {
  it("renders an unboxed value, hint, and sparkline table", () => {
    render(
      <KpiTileRow>
        <KpiTile label="Sent Today" value={1240} sparklineData={[10, 12, 9, 14, 18]} hint="—" />
        <KpiTile label="Complaints" value={2} status="danger" hint="0.1%" />
      </KpiTileRow>,
    );
    expect(screen.getByText("Sent Today")).toBeInTheDocument();
    expect(screen.getByText("1,240")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Sent Today trend" })).toBeInTheDocument();
    expect(screen.getByText("0.1%")).toBeInTheDocument();
  });

  it("omits the sparkline when data is empty or too short", () => {
    render(<KpiTile label="Opened" value={0} sparklineData={[1, 2]} />);
    expect(screen.queryByRole("table", { name: "Opened trend" })).not.toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("shows a delta instead of a hint and formats the value", () => {
    render(
      <KpiTile
        label="7d Sent"
        value={900}
        delta={{ value: -4, label: "vs prior 7d" }}
        hint="ignored"
        formatValue={(value) => `#${value}`}
      />,
    );
    expect(screen.getByText("#900")).toBeInTheDocument();
    expect(screen.getByText(/4%/)).toBeInTheDocument();
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });
});
