import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ScheduleEditor } from "./schedule-editor";
import { StoryFrame } from "./story-frame";
import { DEFAULT_SCHEDULE, type ScheduleValue } from "./validation";

const meta = {
  title: "States/ScheduleEditor",
  component: ScheduleEditor,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-xl">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof ScheduleEditor>;

export default meta;
type Story = StoryObj;

function Harness({
  initial = DEFAULT_SCHEDULE,
  disabled,
}: {
  initial?: ScheduleValue;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initial);
  return <ScheduleEditor value={value} disabled={disabled} onChange={(next) => setValue(next)} />;
}

export const Default: Story = {
  render: () => <Harness />,
};

export const InvalidWindow: Story = {
  render: () => (
    <Harness
      initial={{
        ...DEFAULT_SCHEDULE,
        windows: {
          ...DEFAULT_SCHEDULE.windows,
          mon: { enabled: true, start: "17:00", end: "09:00" },
        },
      }}
    />
  ),
};

export const UnknownTimezone: Story = {
  render: () => <Harness initial={{ ...DEFAULT_SCHEDULE, timezone: "Not/AZone" }} />,
};

export const Disabled: Story = {
  render: () => <Harness disabled />,
};

export const WeekendOnly: Story = {
  render: () => (
    <Harness
      initial={{
        timezone: "America/New_York",
        windows: {
          mon: { enabled: false, start: "09:00", end: "17:00" },
          tue: { enabled: false, start: "09:00", end: "17:00" },
          wed: { enabled: false, start: "09:00", end: "17:00" },
          thu: { enabled: false, start: "09:00", end: "17:00" },
          fri: { enabled: false, start: "09:00", end: "17:00" },
          sat: { enabled: true, start: "10:00", end: "14:00" },
          sun: { enabled: true, start: "10:00", end: "14:00" },
        },
      }}
    />
  ),
};
