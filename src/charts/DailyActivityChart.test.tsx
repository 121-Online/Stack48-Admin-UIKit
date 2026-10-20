import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DailyActivityChart } from "./DailyActivityChart";
import { dailyActivity } from "./fixtures";

describe("DailyActivityChart", () => {
  it("exposes series values through a hidden table", () => {
    render(<DailyActivityChart data={dailyActivity} label="30-day activity" />);
    const table = screen.getByRole("table", { name: "30-day activity" });
    expect(table).toHaveTextContent("Sent");
    expect(table).toHaveTextContent("07/10/2026");
  });

  it("renders an empty state", () => {
    render(<DailyActivityChart data={[]} emptyLabel="No activity" />);
    expect(screen.getByText("No activity")).toBeInTheDocument();
  });

  it("applies custom formatters to table cells", () => {
    render(
      <DailyActivityChart
        data={dailyActivity.slice(0, 2)}
        label="Fmt activity"
        formatValue={(value) => `n${value}`}
        formatLabel={(iso) => `d:${iso}`}
      />,
    );
    expect(screen.getByRole("table", { name: "Fmt activity" })).toHaveTextContent("d:2026-10-07");
  });
});
