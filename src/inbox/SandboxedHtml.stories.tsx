import type { Meta, StoryObj } from "@storybook/react";
import { SandboxedHtml } from "./SandboxedHtml";

const meta = {
  title: "Inbox/SandboxedHtml",
  component: SandboxedHtml,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'The only supported way to render untrusted email HTML: `sandbox=""` iframe plus a CSP `srcdoc`. Never `dangerouslySetInnerHTML`.',
      },
    },
  },
  args: {
    html: "<p>Hello from <strong>Jane</strong>.</p><p>Thursday still works.</p>",
    title: "Email HTML",
  },
} satisfies Meta<typeof SandboxedHtml>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ScriptIsInert: Story = {
  args: {
    html: "<p>This script must not run:</p><script>document.body.innerHTML='pwned'</script><img src=x onerror=\"document.body.innerHTML='pwned'\">",
    title: "Untrusted HTML",
  },
};

export const Empty: Story = {
  args: { html: "" },
};

export const Dark: Story = {
  globals: { theme: "dark" },
};
