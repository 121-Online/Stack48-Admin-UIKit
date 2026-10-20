import type { Meta, StoryObj } from "@storybook/react";
import { StoryFrame } from "./story-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
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
    <Tabs defaultValue="targeting">
      <TabsList>
        <TabsTrigger value="targeting">Targeting / ICP</TabsTrigger>
        <TabsTrigger value="volume">Volume</TabsTrigger>
        <TabsTrigger value="caps">Caps</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="sending">Sending</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
      </TabsList>
      <TabsContent value="targeting">
        <p className="text-sm text-muted-foreground">Audience and ICP filters.</p>
      </TabsContent>
      <TabsContent value="volume">
        <p className="text-sm text-muted-foreground">Daily volume.</p>
      </TabsContent>
      <TabsContent value="caps">
        <p className="text-sm text-muted-foreground">Soft and hard caps.</p>
      </TabsContent>
      <TabsContent value="schedule">
        <p className="text-sm text-muted-foreground">Send windows.</p>
      </TabsContent>
      <TabsContent value="sending">
        <p className="text-sm text-muted-foreground">Identity.</p>
      </TabsContent>
      <TabsContent value="status">
        <p className="text-sm text-muted-foreground">Active / paused.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="open">
      <TabsList>
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
        <TabsTrigger value="locked" disabled>
          Locked
        </TabsTrigger>
      </TabsList>
      <TabsContent value="open">Open items</TabsContent>
      <TabsContent value="done">Done items</TabsContent>
    </Tabs>
  ),
};
