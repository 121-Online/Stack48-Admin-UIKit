import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "./error-state";

describe("ErrorState", () => {
  it("calls onRetry from the page frame", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ErrorState title="Error loading campaigns" message="Network error" onRetry={onRetry} />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Error loading campaigns");
    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables retry while retrying", () => {
    render(<ErrorState compact title="Failed" retrying onRetry={() => undefined} />);
    expect(screen.getByRole("button", { name: "Retrying…" })).toBeDisabled();
  });
});
