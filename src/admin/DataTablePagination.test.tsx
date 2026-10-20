import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTablePagination } from "./DataTablePagination";

describe("DataTablePagination", () => {
  it("hides when there is a single page", () => {
    const { container } = render(<DataTablePagination page={1} pageSize={50} total={12} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("calls onPageChange", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<DataTablePagination page={2} pageSize={50} total={200} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "← Previous" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    await user.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
