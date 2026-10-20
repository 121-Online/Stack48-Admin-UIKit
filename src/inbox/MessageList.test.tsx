import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MessageList } from "./MessageList";
import { demoListItems } from "./_internal/demo";

describe("MessageList", () => {
  it("shows unread weight, chips, and opens a row", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <MessageList items={demoListItems} onOpen={onOpen} focusedId="m1" unhandledCount={12} />,
    );

    const unreadRow = document.querySelector("[data-inbox-row='m1']");
    expect(unreadRow).toHaveTextContent("Jane Cooper");
    expect(unreadRow?.querySelector(".font-semibold")).not.toBeNull();
    expect(screen.getByText("Omar Farouk")).toBeInTheDocument();
    expect(screen.getByText("Auto-reply")).toBeInTheDocument();
    expect(screen.getByText("12 unhandled")).toBeInTheDocument();

    await user.click(screen.getByText("Pricing question"));
    expect(onOpen).toHaveBeenCalledWith("m3");
  });

  it("selects rows and fires bulk callbacks", async () => {
    const user = userEvent.setup();
    const onToggleSelect = vi.fn();
    const onToggleSelectAll = vi.fn();
    const onBulkMarkHandled = vi.fn();

    render(
      <MessageList
        items={demoListItems}
        selectedIds={["m1", "m2"]}
        onToggleSelect={onToggleSelect}
        onToggleSelectAll={onToggleSelectAll}
        onBulkMarkHandled={onBulkMarkHandled}
      />,
    );

    expect(screen.getByText("2 selected")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mark handled" }));
    expect(onBulkMarkHandled).toHaveBeenCalledWith(["m1", "m2"]);

    await user.click(screen.getByLabelText("Select all on page"));
    expect(onToggleSelectAll).toHaveBeenCalled();
  });

  it("pages via a cursor callback", async () => {
    const user = userEvent.setup();
    const onPage = vi.fn();
    render(<MessageList items={demoListItems} nextCursor="abc" hasNewer onPage={onPage} />);

    await user.click(screen.getByRole("button", { name: "Older" }));
    expect(onPage).toHaveBeenCalledWith({ direction: "older", cursor: "abc" });

    await user.click(screen.getByRole("button", { name: "Newer" }));
    expect(onPage).toHaveBeenCalledWith({ direction: "newer", cursor: null });
  });

  it("renders empty, loading, error, disabled, and load-more states", async () => {
    const user = userEvent.setup();
    const onPage = vi.fn();
    const onSearchChange = vi.fn();

    const { rerender } = render(
      <MessageList items={[]} emptyTitle="Inbox is empty" emptyBody="No unhandled mail." loading />,
    );
    expect(screen.getByText("Loading…")).toBeInTheDocument();
    expect(screen.getByText("Inbox is empty")).toBeInTheDocument();

    rerender(
      <MessageList
        items={[]}
        error="upstream timeout"
        nextCursor="more"
        onPage={onPage}
        emptyTitle="No messages on this page"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("upstream timeout");
    await user.click(screen.getByRole("button", { name: "Load more" }));
    expect(onPage).toHaveBeenCalledWith({ direction: "older", cursor: "more" });

    rerender(
      <MessageList items={demoListItems} disabled onSearchChange={onSearchChange} searchValue="" />,
    );
    expect(screen.getByLabelText("Search mail")).toBeDisabled();
  });
});
