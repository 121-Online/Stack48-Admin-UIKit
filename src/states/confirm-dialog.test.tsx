import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "./confirm-dialog";

describe("ConfirmDialog", () => {
  it("enables confirm after typing SEND or the count", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        title="Confirm send"
        confirmMode="type"
        confirmCount={12}
        confirmLabel="Send mailing"
        onConfirm={onConfirm}
      />,
    );

    const confirm = screen.getByRole("button", { name: "Send mailing" });
    const input = screen.getByLabelText(/Type 12 or SEND to confirm/i);
    expect(confirm).toBeDisabled();
    expect(input).toHaveFocus();

    await user.type(input, "12");
    expect(confirm).toBeEnabled();
    await user.clear(input);
    expect(confirm).toBeDisabled();
    await user.type(input, "send");
    expect(confirm).toBeEnabled();
    await user.click(confirm);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("confirms immediately in click mode", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        title="Pause this campaign?"
        confirmLabel="Pause"
        onConfirm={onConfirm}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Pause" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
