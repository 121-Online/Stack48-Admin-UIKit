import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KpiDivider, KpiItem, KpiStrip } from "./KpiStrip";

describe("KpiStrip", () => {
  it("renders item labels, formatted values, and a delta", () => {
    render(
      <KpiStrip>
        <KpiItem label="Sent" value={1240} delta={{ value: 12, label: "vs prior" }} />
        <KpiDivider />
        <KpiItem label="Bounced" value={3} status="warning" hint="0.2%" />
      </KpiStrip>,
    );
    expect(screen.getByText("Sent")).toBeInTheDocument();
    expect(screen.getByText("1,240")).toBeInTheDocument();
    expect(screen.getByText(/\+12% vs prior/)).toBeInTheDocument();
    expect(screen.getByText("0.2%")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders data-driven items and an empty strip", () => {
    const { rerender } = render(<KpiStrip items={[{ label: "Opened", value: 0 }]} />);
    expect(screen.getByText("Opened")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    rerender(<KpiStrip items={[]} />);
    expect(screen.queryByText("Opened")).not.toBeInTheDocument();
  });

  it("formats numeric values through the formatter prop", () => {
    render(<KpiItem label="Sent" value={12} formatValue={(value) => `n=${value}`} />);
    expect(screen.getByText("n=12")).toBeInTheDocument();
  });
});
