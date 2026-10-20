import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../primitives/input";
import { FormField } from "./form-field";

describe("FormField", () => {
  it("wires label, hint, and error onto the control", () => {
    render(
      <FormField label="Hourly cap" hint="Max sends per hour" error="Must be at least 1">
        <Input type="number" />
      </FormField>,
    );
    const input = screen.getByLabelText("Hourly cap");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/Max sends per hour/);
    expect(screen.getByRole("alert")).toHaveTextContent("Must be at least 1");
  });
});
