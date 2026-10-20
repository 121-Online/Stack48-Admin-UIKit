import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { worldRegions } from "./fixtures";
import { WorldMap } from "./WorldMap";

describe("WorldMap", () => {
  it("renders region labels, totals, and a data table", () => {
    render(
      <WorldMap
        regions={worldRegions}
        viewModes={[
          { id: "7d", label: "7 Days" },
          { id: "today", label: "Today" },
        ]}
        defaultViewMode="7d"
      />,
    );
    expect(screen.getByText(/770 sends/)).toBeInTheDocument();
    const table = screen.getByRole("table", { name: "Sends by region" });
    expect(table).toHaveTextContent("UK");
    expect(table).toHaveTextContent("420");
    expect(table).toHaveTextContent("Canada");
  });

  it("notifies when the view mode changes", async () => {
    const user = userEvent.setup();
    const onViewModeChange = vi.fn();
    render(
      <WorldMap
        regions={worldRegions}
        viewModes={[
          { id: "7d", label: "7 Days" },
          { id: "today", label: "Today" },
        ]}
        viewMode="7d"
        onViewModeChange={onViewModeChange}
      />,
    );
    await user.click(screen.getByRole("tab", { name: "Today" }));
    expect(onViewModeChange).toHaveBeenCalledWith("today");
  });

  it("renders empty data", () => {
    render(<WorldMap regions={[]} emptyLabel="No regions" />);
    expect(screen.getByText("No regions")).toBeInTheDocument();
  });
});
