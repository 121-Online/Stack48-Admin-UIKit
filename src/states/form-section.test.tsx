import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormSection } from "./form-section";

describe("FormSection", () => {
  it("renders title, description, action, and children", () => {
    render(
      <FormSection
        title="Sending hours"
        description="Queue outside this window"
        action={<button type="button">Reset</button>}
      >
        <p>Monday 09:00</p>
      </FormSection>,
    );
    expect(screen.getByRole("heading", { name: "Sending hours" })).toBeInTheDocument();
    expect(screen.getByText("Queue outside this window")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    expect(screen.getByText("Monday 09:00")).toBeInTheDocument();
  });
});
