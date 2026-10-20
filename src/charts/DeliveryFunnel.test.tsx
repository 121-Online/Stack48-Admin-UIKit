import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DeliveryFunnel, DeliveryFunnelHorizontal } from "./DeliveryFunnel";
import { funnelStages } from "./fixtures";

describe("DeliveryFunnel", () => {
  it("renders stage names, counts, and conversion vs the first stage", () => {
    render(<DeliveryFunnel stages={funnelStages} />);
    const table = screen.getByRole("table", { name: "Delivery funnel" });
    expect(table).toHaveTextContent("Sent");
    expect(table).toHaveTextContent("1,240");
    expect(table).toHaveTextContent("Opened");
  });

  it("renders an empty state", () => {
    render(<DeliveryFunnel stages={[]} emptyLabel="No funnel" />);
    expect(screen.getByText("No funnel")).toBeInTheDocument();
  });

  it("renders the horizontal Recharts variant with a data table", () => {
    render(<DeliveryFunnelHorizontal stages={funnelStages} label="Horizontal funnel" />);
    expect(screen.getByRole("table", { name: "Horizontal funnel" })).toHaveTextContent("Clicked");
  });
});
