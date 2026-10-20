import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { MultiEmailModal } from "./multi-email-modal";

function Harness({
  initial = [] as string[],
  maxCount = 3,
  onSubmit = vi.fn(),
}: {
  initial?: string[];
  maxCount?: number;
  onSubmit?: (emails: string[]) => void;
}) {
  const [emails, setEmails] = useState(initial);
  return (
    <MultiEmailModal
      open
      emails={emails}
      onEmailsChange={setEmails}
      maxCount={maxCount}
      onSubmit={onSubmit}
    />
  );
}

describe("MultiEmailModal", () => {
  it("adds chips, rejects invalid and over-max, and submits the list", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Harness maxCount={2} onSubmit={onSubmit} />);

    const input = screen.getByLabelText("Recipient emails");
    expect(input).toHaveFocus();

    await user.type(input, "ops@agency.com{Enter}");
    expect(screen.getByText("ops@agency.com")).toBeInTheDocument();

    await user.type(input, "not-an-email{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent("Not a valid email");

    await user.type(input, "you@agency.com{Enter}");
    expect(screen.getByText("you@agency.com")).toBeInTheDocument();

    await user.type(input, "third@agency.com{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent("Max 2 addresses");

    await user.click(screen.getByRole("button", { name: "Send test" }));
    expect(onSubmit).toHaveBeenCalledWith(["ops@agency.com", "you@agency.com"]);
  });
});
