import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Popover> = {
  title: "Primitives/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Keyboard shortcuts</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="mb-2 text-xs font-semibold text-foreground">Keyboard shortcuts</p>
        <ul className="space-y-1 text-xs">
          <li className="flex justify-between gap-2">
            <span className="font-mono text-zinc-700">j / k</span>
            <span className="text-muted-foreground">Move</span>
          </li>
          <li className="flex justify-between gap-2">
            <span className="font-mono text-zinc-700">Enter</span>
            <span className="text-muted-foreground">Open</span>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  ),
};

export const Open: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="secondary">Filters</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-muted-foreground">No matching values</p>
      </PopoverContent>
    </Popover>
  ),
};
