import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterCheckbox, FilterSelect } from "./FilterSelect";

const meta = {
  title: "Admin/FilterSelect",
  component: FilterSelect,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "GTM `AudienceFilter` labelled select used in table toolbars.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FilterSelect>;

export default meta;
type Story = StoryObj;

const audienceOptions = [
  { value: "agency", label: "Agency" },
  { value: "end_user", label: "End-user" },
  { value: "all", label: "All" },
];

export const Default: Story = {
  args: { label: "Audience", options: audienceOptions, value: "agency" },
  render: function DefaultStory() {
    const [value, setValue] = useState("agency");
    return (
      <FilterSelect
        label="Audience"
        value={value}
        onValueChange={setValue}
        options={audienceOptions}
        widthClassName="w-40"
      />
    );
  },
};

export const Disabled: Story = {
  args: { label: "Status", options: audienceOptions, value: "agency", disabled: true },
  render: () => <FilterSelect label="Status" value="agency" options={audienceOptions} disabled />,
};

export const Checkbox: Story = {
  args: { label: "Sendable", options: audienceOptions, value: "agency" },
  render: function CheckboxStory() {
    const [checked, setChecked] = useState(false);
    return (
      <FilterCheckbox label="Sendable Queue Only" checked={checked} onCheckedChange={setChecked} />
    );
  },
};
