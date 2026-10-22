import type { Meta, StoryObj } from "@storybook/react";
import { ChartSlot, Panel, SettingsGroup } from "./layout";

const meta = {
  title: "Admin/Layout",
  component: SettingsGroup,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Settings group title, bordered panel, and a fixed-height chart slot. Titles stay outside the panel.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsGroup>;

export default meta;
type Story = StoryObj;

export const Group: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6">
      <SettingsGroup
        title="Preview runtime"
        description="The software that runs each live preview."
      >
        <Panel>
          <p className="text-sm text-foreground">Saved version 1.1.0</p>
        </Panel>
        <Panel>
          <ChartSlot>
            <div className="flex h-full items-center text-sm text-muted-foreground">Chart</div>
          </ChartSlot>
        </Panel>
      </SettingsGroup>
    </div>
  ),
};
