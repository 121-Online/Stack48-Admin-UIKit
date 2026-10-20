import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sparkline } from "./Sparkline";

describe("Sparkline", () => {
  it("renders an accessible table of values", () => {
    render(<Sparkline data={[1, 3, 2]} label="Sends" />);
    const table = screen.getByRole("table", { name: "Sends" });
    expect(table).toHaveTextContent("3");
    expect(document.querySelector("polyline")).not.toBeNull();
  });

  it("renders an empty frame when there are fewer than two points", () => {
    render(<Sparkline data={[4]} label="Empty spark" />);
    expect(screen.getByRole("table", { name: "Empty spark" })).toBeInTheDocument();
    expect(document.querySelector("polyline")).toBeNull();
  });

  it("uses the provided formatter in the hidden table", () => {
    render(<Sparkline data={[10, 20]} label="Fmt" formatValue={(value) => `${value}k`} />);
    expect(screen.getByRole("table", { name: "Fmt" })).toHaveTextContent("10k");
  });
});
