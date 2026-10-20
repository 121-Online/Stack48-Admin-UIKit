import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { bufferSegments } from "./fixtures";
import { StackedBars } from "./StackedBars";

describe("StackedBars", () => {
  it("renders legend values and a caption", () => {
    render(
      <StackedBars
        label="Buffer health"
        segments={bufferSegments}
        caption="Total with email: 1,006"
      />,
    );
    expect(screen.getByText("Total with email: 1,006")).toBeInTheDocument();
    const table = screen.getByRole("table", { name: "Buffer health" });
    expect(table).toHaveTextContent("Sendable");
    expect(table).toHaveTextContent("842");
    expect(table).toHaveTextContent("Excluded");
  });

  it("shows the empty label when every segment is zero", () => {
    render(
      <StackedBars
        label="Empty bars"
        segments={[{ key: "a", label: "A", value: 0, color: "#000" }]}
        emptyLabel="No buffer"
      />,
    );
    expect(screen.getByText("No buffer")).toBeInTheDocument();
  });
});
