import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Section, SectionDivider } from "./section";
import { StoryFrame } from "./story-frame";

const meta: Meta<typeof Section> = {
  title: "Primitives/Section",
  component: Section,
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
  args: {
    title: "Send configuration",
    description: "Caps and breaker",
    children: (
      <div className="rounded-sm border border-border bg-card p-4 text-sm text-muted-foreground">
        Children sit full-width. No cartoon card wrapper on the section itself.
      </div>
    ),
  },
};

export const WithAction: Story = {
  args: {
    title: "Send configuration",
    description: "Caps and breaker",
    action: <Badge variant="danger">Breaker active</Badge>,
    children: (
      <div className="rounded-sm border border-border bg-card p-4 text-sm">Hourly cap 40</div>
    ),
  },
};

export const EmptyDescription: Story = {
  args: {
    title: "Notes",
    children: <p className="text-sm text-muted-foreground">No notes yet.</p>,
  },
};

export const WithDivider: Story = {
  args: { children: null },
  render: () => (
    <>
      <Section title="7-day funnel" description="Email delivery pipeline">
        <div className="rounded-sm border border-border bg-card p-4 text-sm">Funnel</div>
      </Section>
      <SectionDivider />
      <Section
        title="Reputation"
        description="Bounces and complaints"
        action={
          <Button variant="link" size="sm">
            Open settings
          </Button>
        }
      >
        <div className="rounded-sm border border-border bg-card p-4 text-sm">Charts</div>
      </Section>
    </>
  ),
};
