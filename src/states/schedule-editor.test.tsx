import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { ScheduleEditor } from "./schedule-editor";
import { DEFAULT_SCHEDULE, type ScheduleValue } from "./validation";

function Harness({ initial = DEFAULT_SCHEDULE }: { initial?: ScheduleValue }) {
  const [value, setValue] = useState(initial);
  const [valid, setValid] = useState(true);
  return (
    <>
      <ScheduleEditor
        value={value}
        onChange={(next, nextValid) => {
          setValue(next);
          setValid(nextValid);
        }}
      />
      <output>{valid ? "valid" : "invalid"}</output>
    </>
  );
}

describe("ScheduleEditor", () => {
  it("toggles a day and reports invalid windows", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const saturday = screen.getByRole("checkbox", { name: "Saturday" });
    expect(saturday).not.toBeChecked();
    await user.click(saturday);
    expect(saturday).toBeChecked();

    const mondayStart = screen.getByLabelText("Monday start");
    await user.clear(mondayStart);
    await user.type(mondayStart, "18:00");
    expect(screen.getByText("Start must be before end")).toBeInTheDocument();
    expect(screen.getByText("invalid")).toBeInTheDocument();
  });

  it("resets to the default Mon–Fri window", async () => {
    const user = userEvent.setup();
    render(
      <Harness
        initial={{
          ...DEFAULT_SCHEDULE,
          timezone: "UTC",
          windows: {
            ...DEFAULT_SCHEDULE.windows,
            sat: { enabled: true, start: "10:00", end: "12:00" },
          },
        }}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Reset/ }));
    expect(screen.getByRole("checkbox", { name: "Saturday" })).not.toBeChecked();
    expect(screen.getByLabelText("Time zone")).toHaveValue("Europe/London");
  });
});
