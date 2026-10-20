import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InboxLayout } from "./InboxLayout";

describe("InboxLayout", () => {
  it("renders the folder rail, list, and reading pane", () => {
    render(
      <InboxLayout
        readingPaneOpen
        folderRail={<div>Folders</div>}
        list={<div>List body</div>}
        readingPane={<div>Thread body</div>}
      />,
    );

    expect(screen.getByText("Folders")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Message list" })).toHaveTextContent("List body");
    expect(screen.getByRole("region", { name: "Reading pane" })).toHaveTextContent("Thread body");
  });

  it("hides the reading pane until it is opened", () => {
    render(
      <InboxLayout
        readingPaneOpen={false}
        list={<div>List body</div>}
        readingPane={<div>Thread body</div>}
      />,
    );
    expect(screen.queryByRole("region", { name: "Reading pane" })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Message list" })).toBeInTheDocument();
  });
});
