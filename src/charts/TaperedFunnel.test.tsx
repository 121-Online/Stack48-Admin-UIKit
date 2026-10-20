import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { conversionStages } from "./fixtures";
import { TaperedFunnel } from "./TaperedFunnel";

describe("TaperedFunnel", () => {
  it("renders stage names and conversion against the previous stage", () => {
    render(<TaperedFunnel stages={conversionStages} />);
    expect(screen.getByText(/of Claimed/)).toBeInTheDocument();
    const table = screen.getByRole("table", { name: "Funnel" });
    expect(table).toHaveTextContent("Leads");
    expect(table).toHaveTextContent("Paid");
    expect(table).toHaveTextContent("Signed Up");
  });

  it("renders empty data", () => {
    render(<TaperedFunnel stages={[]} emptyLabel="No conversion" />);
    expect(screen.getByText("No conversion")).toBeInTheDocument();
  });
});
