import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SendingIdentityEditor } from "./sending-identity-editor";
import { StoryFrame } from "./story-frame";
import { EMPTY_SENDING_IDENTITY, type SendingIdentityValue } from "./validation";

const domains = [
  { value: "mail.agency.com", label: "mail.agency.com · receiving on" },
  { value: "hello.agency.com", label: "hello.agency.com · receiving off" },
  { value: "blocked.example", label: "blocked.example · Not allowed", disabled: true },
];

const filled: SendingIdentityValue = {
  sendingDomain: "mail.agency.com",
  fromLocalPart: "jgibbons",
  fromName: "James Gibbons",
  replyToLocalPart: "",
};

const meta = {
  title: "States/SendingIdentityEditor",
  component: SendingIdentityEditor,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <StoryFrame>
        <div className="max-w-lg">
          <Story />
        </div>
      </StoryFrame>
    ),
  ],
} satisfies Meta<typeof SendingIdentityEditor>;

export default meta;
type Story = StoryObj;

function Harness(props: {
  initial?: SendingIdentityValue;
  domainsError?: string;
  warning?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(
    props.initial ?? { ...EMPTY_SENDING_IDENTITY, sendingDomain: "mail.agency.com" },
  );
  return (
    <SendingIdentityEditor
      value={value}
      domains={domains}
      domainsError={props.domainsError}
      warning={props.warning}
      disabled={props.disabled}
      onChange={(next) => setValue(next)}
    />
  );
}

export const Default: Story = {
  render: () => <Harness initial={filled} />,
};

export const Empty: Story = {
  render: () => <Harness initial={EMPTY_SENDING_IDENTITY} />,
};

export const InvalidLocalPart: Story = {
  render: () => <Harness initial={{ ...filled, fromLocalPart: "James Gibbons" }} />,
};

export const ReceivingWarning: Story = {
  render: () => (
    <Harness
      initial={{ ...filled, sendingDomain: "hello.agency.com" }}
      warning="Receiving is off. Replies will not land in inbox."
    />
  ),
};

export const DomainsError: Story = {
  render: () => <Harness initial={filled} domainsError="Could not load domains from Resend" />,
};

export const Disabled: Story = {
  render: () => <Harness initial={filled} disabled />,
};
