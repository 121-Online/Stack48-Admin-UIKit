import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { SendingIdentityEditor } from "./sending-identity-editor";
import { EMPTY_SENDING_IDENTITY, type SendingIdentityValue } from "./validation";

const domains = [
  { value: "mail.agency.com", label: "mail.agency.com · receiving on" },
  { value: "hello.agency.com", label: "hello.agency.com · receiving off" },
];

function Harness({ initial }: { initial: SendingIdentityValue }) {
  const [value, setValue] = useState(initial);
  return (
    <SendingIdentityEditor value={value} domains={domains} onChange={(next) => setValue(next)} />
  );
}

describe("SendingIdentityEditor", () => {
  it("updates fields, previews addresses, and surfaces format errors", async () => {
    const user = userEvent.setup();
    render(
      <Harness
        initial={{
          ...EMPTY_SENDING_IDENTITY,
          sendingDomain: "mail.agency.com",
          fromLocalPart: "jgibbons",
        }}
      />,
    );

    expect(screen.getAllByText(/jgibbons@mail.agency.com/).length).toBeGreaterThan(0);

    await user.type(screen.getByLabelText(/From name/), "James Gibbons");
    expect(screen.getByText(/James Gibbons <jgibbons@mail.agency.com>/)).toBeInTheDocument();

    const local = screen.getByLabelText("From local part");
    await user.clear(local);
    await user.type(local, "Not Valid");
    expect(screen.getByText(/lowercase letters/)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Sending domain"), "hello.agency.com");
    expect(screen.getByLabelText("Sending domain")).toHaveValue("hello.agency.com");
  });

  it("shows a domains-load error instead of the select", () => {
    render(
      <SendingIdentityEditor
        value={{
          ...EMPTY_SENDING_IDENTITY,
          sendingDomain: "mail.agency.com",
          fromLocalPart: "jgibbons",
        }}
        domains={domains}
        domainsError="Could not load domains from Resend"
      />,
    );
    expect(screen.getByText("Could not load domains from Resend")).toBeInTheDocument();
    expect(screen.getByLabelText("Sending domain")).toBeDisabled();
  });
});
