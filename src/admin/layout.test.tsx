import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChartSlot, Panel, SettingsGroup } from "./layout";

describe("SettingsGroup", () => {
  it("renders a title, description, and body", () => {
    render(
      <SettingsGroup
        title="Preview runtime"
        description="The software that runs each live preview."
      >
        <p>Saved version</p>
      </SettingsGroup>,
    );
    expect(screen.getByRole("heading", { name: "Preview runtime" })).toBeInTheDocument();
    expect(screen.getByText("The software that runs each live preview.")).toBeInTheDocument();
    expect(screen.getByText("Saved version")).toBeInTheDocument();
  });
});

describe("Panel", () => {
  it("renders its children", () => {
    render(
      <Panel>
        <p>Queue depth</p>
      </Panel>,
    );
    expect(screen.getByText("Queue depth")).toBeInTheDocument();
  });
});

describe("ChartSlot", () => {
  it("caps the chart area", () => {
    render(
      <ChartSlot>
        <p>Activity</p>
      </ChartSlot>,
    );
    expect(screen.getByText("Activity").parentElement).toHaveStyle({
      height: "240px",
      maxHeight: "240px",
    });
  });
});
