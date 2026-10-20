import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Button } from "./button";
import { StoryFrame } from "./story-frame";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <TooltipProvider delayDuration={200}>
          <Story />
        </TooltipProvider>
      </StoryFrame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="warning" className="cursor-help">
          Soft cap
        </Badge>
      </TooltipTrigger>
      <TooltipContent>Soft cap reached</TooltipContent>
    </Tooltip>
  ),
};

export const OnButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button disabled title={undefined}>
          Send mailing
        </Button>
      </TooltipTrigger>
      <TooltipContent>Preflight has 12 blocked rows</TooltipContent>
    </Tooltip>
  ),
};

export const Open: Story = {
  render: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <span className="text-xs text-muted-foreground">Hover target</span>
      </TooltipTrigger>
      <TooltipContent>Last sent 2 hours ago</TooltipContent>
    </Tooltip>
  ),
};
