import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-xs">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

function StatusSelect(props: { disabled?: boolean; defaultValue?: string }) {
  return (
    <Select defaultValue={props.defaultValue} disabled={props.disabled}>
      <SelectTrigger aria-label="Status">
        <SelectValue placeholder="All statuses" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="engaged">Engaged</SelectItem>
        <SelectItem value="bounced">Bounced</SelectItem>
        <SelectItem value="disabled" disabled>
          Disabled option
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export const Default: Story = {
  render: () => <StatusSelect />,
};

export const WithValue: Story = {
  render: () => <StatusSelect defaultValue="engaged" />,
};

export const Disabled: Story = {
  render: () => <StatusSelect defaultValue="new" disabled />,
};

export const WithLabel: Story = {
  render: () => (
    <div>
      <Label className="mb-1">Audience</Label>
      <Select defaultValue="agency">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="agency">Agency</SelectItem>
          <SelectItem value="end_user">End user</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
