import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "./button";
import { StoryFrame } from "./story-frame";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const meta: Meta<typeof Toast> = {
  title: "Primitives/Toast",
  component: Toast,
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
  render: function ToastDemo() {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Reply</Button>
        <Toast open={open} onOpenChange={setOpen} duration={4000}>
          <ToastTitle>Reply sent</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const Open: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <ToastTitle>Reply sent</ToastTitle>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithDescriptionAndClose: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div className="grid gap-0.5">
          <ToastTitle>Test queued</ToastTitle>
          <ToastDescription>Arrives within ~1 min</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
