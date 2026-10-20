import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { ChipList, MultiSelectFilter } from "./MultiSelectFilter";

function Harness() {
  const [value, setValue] = useState<string[]>(["saas"]);
  return (
    <MultiSelectFilter
      label="Industry"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "saas", label: "SaaS" },
        { value: "agencies", label: "Agencies" },
        { value: "media", label: "Media" },
      ]}
    />
  );
}

describe("MultiSelectFilter", () => {
  it("adds and removes options", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.getByLabelText("Remove SaaS")).toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("button", { name: "Agencies" }));
    expect(screen.getByLabelText("Remove Agencies")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Remove SaaS"));
    expect(screen.queryByLabelText("Remove SaaS")).not.toBeInTheDocument();
  });
});

describe("ChipList", () => {
  it("caps visible chips and shows a remainder", () => {
    render(
      <ChipList
        values={["a", "b", "c", "d"]}
        labels={{ a: "A", b: "B", c: "C", d: "D" }}
        maxVisible={3}
      />,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(screen.queryByText("D")).not.toBeInTheDocument();
  });

  it("renders an em dash when empty", () => {
    render(<ChipList values={[]} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
