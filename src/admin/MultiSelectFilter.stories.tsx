import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChipList, MultiSelectFilter } from "./MultiSelectFilter";
import { FilterSelect } from "./FilterSelect";

const options = [
  { value: "agencies", label: "Agencies" },
  { value: "saas", label: "SaaS" },
  { value: "media", label: "Media" },
  { value: "ecommerce", label: "Ecommerce" },
];

const meta = {
  title: "Admin/MultiSelectFilter",
  component: MultiSelectFilter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "GTM `VocabMultiSelect` pattern: chips + typeahead. Used in table toolbars.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelectFilter>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { options, value: [], placeholder: "Filter by industry..." },
  render: function DefaultStory() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="max-w-md">
        <MultiSelectFilter
          label="Industry"
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Filter by industry..."
        />
      </div>
    );
  },
};

export const Selected: Story = {
  args: { options, value: ["saas"] },
  render: function SelectedStory() {
    const [value, setValue] = useState<string[]>(["saas", "agencies"]);
    return (
      <div className="max-w-md">
        <MultiSelectFilter
          label="Industry"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { options, value: ["saas"], disabled: true },
  render: () => (
    <div className="max-w-md">
      <MultiSelectFilter label="Industry" options={options} value={["saas"]} disabled />
    </div>
  ),
};

export const EmptyOptions: Story = {
  args: { options: [], value: [] },
  render: () => (
    <div className="max-w-md">
      <MultiSelectFilter label="Industry" options={[]} value={[]} />
    </div>
  ),
};

export const WithAudienceSelect: Story = {
  args: { options, value: [] },
  render: function Combined() {
    const [audience, setAudience] = useState("agency");
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="flex max-w-xl flex-wrap items-end gap-3">
        <FilterSelect
          label="Audience"
          value={audience}
          onValueChange={setAudience}
          widthClassName="w-40"
          options={[
            { value: "agency", label: "Agency" },
            { value: "end_user", label: "End-user" },
            { value: "all", label: "All" },
          ]}
        />
        <MultiSelectFilter
          label="Industry"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const ChipListOverflow: Story = {
  args: { options, value: [] },
  render: () => (
    <ChipList
      values={["webflow", "hubspot", "segment", "shopify"]}
      labels={{ webflow: "Webflow", hubspot: "HubSpot", segment: "Segment", shopify: "Shopify" }}
      maxVisible={3}
    />
  ),
};
