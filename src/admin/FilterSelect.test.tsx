import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { FilterCheckbox, FilterSelect } from "./FilterSelect";

describe("FilterSelect", () => {
  it("emits the selected value", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [value, setValue] = useState("agency");
      return (
        <FilterSelect
          label="Audience"
          value={value}
          onValueChange={setValue}
          options={[
            { value: "agency", label: "Agency" },
            { value: "all", label: "All" },
          ]}
        />
      );
    }
    render(<Harness />);
    await user.selectOptions(screen.getByLabelText("Audience"), "all");
    expect(screen.getByLabelText("Audience")).toHaveValue("all");
  });
});

describe("FilterCheckbox", () => {
  it("toggles", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [checked, setChecked] = useState(false);
      return (
        <FilterCheckbox
          label="Sendable Queue Only"
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    }
    render(<Harness />);
    const checkbox = screen.getByRole("checkbox", { name: "Sendable Queue Only" });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
