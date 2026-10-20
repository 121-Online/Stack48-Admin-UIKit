import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "./label";
import { StoryFrame } from "./story-frame";
import { Textarea } from "./textarea";

const meta: Meta<typeof Dialog> = {
  title: "Primitives/Dialog",
  component: Dialog,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send test</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send test</DialogTitle>
          <DialogDescription>
            Any address is allowed. Separate with commas or new lines. Max 5 per send.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="mailing-test-emails" className="mb-1">
            Recipient emails
          </Label>
          <Textarea
            id="mailing-test-emails"
            className="font-mono min-h-24"
            placeholder="you@agency.com"
          />
        </div>
        <DialogFooter>
          <Button variant="secondary">Close</Button>
          <Button>Send test</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Open: Story = {
  render: function OpenDialog() {
    const [open, setOpen] = useState(true);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm send</DialogTitle>
            <DialogDescription>
              This will send to <strong className="tabular-nums">1,240</strong> pre-flight OK
              recipients.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Send mailing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const Large: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle className="text-lg">Campaign configuration</DialogTitle>
          <DialogDescription>Targeting, volume, caps, schedule.</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Wide panel (`max-w-2xl`) matching GTM campaign settings.
        </p>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
