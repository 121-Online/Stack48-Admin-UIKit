import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

const items = [
  { href: "/", label: "Overview" },
  { href: "/leads", label: "Leads", badge: 4 },
  { href: "/inbox", label: "Inbox" },
];

describe("Sidebar", () => {
  it("marks the active item with aria-current", () => {
    render(<Sidebar items={items} pathname="/leads/abc" />);
    expect(screen.getByRole("link", { name: /Leads/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Overview/ })).not.toHaveAttribute("aria-current");
  });

  it("collapses to hide labels", async () => {
    const user = userEvent.setup();
    render(<Sidebar items={items} pathname="/" />);
    expect(screen.getByText("Leads")).toBeInTheDocument();
    await user.click(screen.getByTitle("Collapse sidebar"));
    expect(screen.queryByText("Leads")).not.toBeInTheDocument();
    expect(screen.getByTitle("Expand sidebar")).toBeInTheDocument();
  });

  it("toggles collapsible groups", async () => {
    const user = userEvent.setup();
    render(
      <Sidebar
        pathname="/leads"
        groups={[
          {
            id: "ops",
            label: "Ops",
            items: [{ href: "/leads", label: "Leads" }],
          },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Leads" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ops" }));
    expect(screen.queryByRole("link", { name: "Leads" })).not.toBeInTheDocument();
  });

  it("uses renderLink instead of a raw anchor", () => {
    const renderLink = vi.fn(({ href, children, className, ...rest }) => (
      <a
        href={href}
        className={className}
        data-router="1"
        {...rest}
        onClick={(event) => {
          event.preventDefault();
          rest.onClick?.(event);
        }}
      >
        {children}
      </a>
    ));
    render(<Sidebar items={items} pathname="/leads" renderLink={renderLink} />);
    expect(renderLink).toHaveBeenCalled();
    expect(screen.getByRole("link", { name: /Leads/ })).toHaveAttribute("data-router", "1");
  });

  it("renders the footer slot", () => {
    render(<Sidebar items={items} pathname="/" footer={<span>ops@stack48.com</span>} />);
    expect(screen.getByText("ops@stack48.com")).toBeInTheDocument();
  });
});
