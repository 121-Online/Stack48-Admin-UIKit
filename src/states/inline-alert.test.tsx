import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Banner, InlineAlert } from "./inline-alert";

describe("InlineAlert", () => {
  it("uses alert for danger and status for info", () => {
    const { unmount } = render(<InlineAlert tone="danger">Failed to send test</InlineAlert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to send test");
    unmount();
    render(
      <Banner tone="info" title="Saved">
        Draft stored
      </Banner>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Draft stored");
  });
});
