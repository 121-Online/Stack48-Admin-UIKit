import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThreadView } from "./ThreadView";
import { demoLongThread, demoThread } from "./_internal/demo";

describe("ThreadView", () => {
  it("renders headers, attachments, and a reply slot", () => {
    render(
      <ThreadView
        title="Jane Cooper"
        subtitle="jane@northwind.test"
        recipientsSummary="To hello@stack48.com"
        messages={demoThread}
        replySlot={<textarea aria-label="Reply" />}
      />,
    );

    expect(screen.getByRole("heading", { name: "Jane Cooper" })).toBeInTheDocument();
    expect(screen.getByText("jane@northwind.test")).toBeInTheDocument();
    expect(screen.getByText("To hello@stack48.com")).toBeInTheDocument();
    expect(screen.getByLabelText("Attachments")).toBeInTheDocument();
    expect(screen.getByText("stack48-overview.pdf")).toBeInTheDocument();
    expect(screen.getByLabelText("Reply")).toBeInTheDocument();
    expect(screen.getByTitle("Re: Intro to Stack48")).toBeInTheDocument();
  });

  it("collapses earlier messages until expanded", async () => {
    const user = userEvent.setup();
    render(<ThreadView messages={demoLongThread} keepLatest={3} />);

    expect(screen.getByRole("button", { name: /Show 2 older messages/ })).toBeInTheDocument();
    expect(screen.queryByText("First touch")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Show 2 older messages/ }));
    expect(screen.getByText("First touch")).toBeInTheDocument();
  });

  it("renders empty, loading, error, and truncated states", () => {
    const { rerender } = render(
      <ThreadView messages={[]} emptyTitle="No messages in this thread" />,
    );
    expect(screen.getByText("No messages in this thread")).toBeInTheDocument();

    rerender(<ThreadView messages={[]} loading />);
    expect(screen.getByText("Loading conversation…")).toBeInTheDocument();

    rerender(<ThreadView messages={demoThread} error="thread missing" truncated />);
    expect(screen.getByRole("alert")).toHaveTextContent("thread missing");
    expect(screen.getByText(/truncated/)).toBeInTheDocument();
  });

  it("toggles HTML / text without using dangerouslySetInnerHTML", async () => {
    const user = userEvent.setup();
    render(<ThreadView messages={demoThread} />);
    await user.click(screen.getAllByRole("button", { name: "Show text" })[0]!);
    expect(screen.getByText(/Quick intro to how we run outbound/)).toBeInTheDocument();
    expect(document.querySelector("[dangerouslysetinnerhtml]")).toBeNull();
  });
});
