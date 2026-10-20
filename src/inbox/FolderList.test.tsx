import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FolderList } from "./FolderList";
import { demoFolders, demoMailboxes } from "./_internal/demo";

describe("FolderList", () => {
  it("renders folders with counts and a mailboxes section", async () => {
    const user = userEvent.setup();
    const onSelectFolder = vi.fn();
    const onSelectMailbox = vi.fn();

    render(
      <FolderList
        folders={demoFolders}
        selectedFolderId="inbox"
        onSelectFolder={onSelectFolder}
        mailboxes={demoMailboxes}
        onSelectMailbox={onSelectMailbox}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Inbox folders" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Inbox/ })).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Mailboxes")).toBeInTheDocument();
    expect(screen.getByText("receiving off")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Handled/ }));
    expect(onSelectFolder).toHaveBeenCalledWith("handled");

    await user.click(screen.getByRole("button", { name: /hello@stack48.com/ }));
    expect(onSelectMailbox).toHaveBeenCalledWith("hello@stack48.com");
  });

  it("caps folder counts and shows an empty mailboxes state", () => {
    render(
      <FolderList
        folders={[{ id: "inbox", label: "Inbox", iconName: "inbox", count: 128 }]}
        mailboxes={[]}
      />,
    );
    expect(screen.getByText("99+")).toBeInTheDocument();
    expect(screen.getByText("No mailboxes yet")).toBeInTheDocument();
  });

  it("notes when the mailbox list is truncated", () => {
    render(<FolderList folders={demoFolders} mailboxes={demoMailboxes} mailboxesTruncated />);
    expect(screen.getByText("Mailbox list is truncated")).toBeInTheDocument();
  });
});
