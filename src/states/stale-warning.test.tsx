import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StaleWarning } from "./stale-warning";

describe("StaleWarning", () => {
  it("renders the stale chip with a tooltip", () => {
    render(<StaleWarning title="Audience changed" />);
    expect(screen.getByText("Stale")).toHaveAttribute("title", "Audience changed");
  });
});
