import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingState } from "./loading-state";

describe("LoadingState", () => {
  it("exposes a busy status for skeleton rows", () => {
    render(<LoadingState variant="rows" rows={4} label="Loading leads" />);
    const status = screen.getByRole("status", { name: "Loading leads" });
    expect(status).toHaveAttribute("aria-busy", "true");
  });

  it("renders an inline spinner with the label", () => {
    render(<LoadingState variant="spinner" label="Sending" />);
    expect(screen.getByRole("status", { name: "Sending" })).toHaveTextContent("Sending");
  });
});
