import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb, Breadcrumbs, PageHeader, Topbar } from "./PageHeader";

describe("PageHeader", () => {
  it("renders title, description, actions, and breadcrumbs", () => {
    render(
      <PageHeader
        title="Leads"
        description="Browse and filter agency leads"
        breadcrumbs={[{ label: "Ops", href: "/" }, { label: "Leads" }]}
        actions={<button type="button">Export</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Leads" })).toBeInTheDocument();
    expect(screen.getByText("Browse and filter agency leads")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ops" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Leads", { selector: "span" })).toBeInTheDocument();
  });
});

describe("Breadcrumbs", () => {
  it("supports asChild composition", () => {
    render(
      <Breadcrumbs>
        <Breadcrumb asChild>
          <a href="/campaigns" data-router="1">
            Campaigns
          </a>
        </Breadcrumb>
        <Breadcrumb current>launch-uk</Breadcrumb>
      </Breadcrumbs>,
    );
    expect(screen.getByRole("link", { name: "Campaigns" })).toHaveAttribute("data-router", "1");
    expect(screen.getByText("launch-uk")).toBeInTheDocument();
  });

  it("uses renderLink for data-driven crumbs", () => {
    const renderLink = vi.fn(({ href, children, className }) => (
      <a
        href={href}
        className={className}
        data-router="1"
        onClick={(event) => event.preventDefault()}
      >
        {children}
      </a>
    ));
    render(
      <Breadcrumbs
        renderLink={renderLink}
        items={[{ label: "Campaigns", href: "/campaigns" }, { label: "launch-uk" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "Campaigns" })).toHaveAttribute("data-router", "1");
  });
});

describe("Topbar", () => {
  it("renders left content and actions in a header-height bar", () => {
    const { container } = render(
      <Topbar actions={<button type="button">Save</button>}>Daily Snapshot</Topbar>,
    );
    expect(container.firstChild).toHaveClass("h-header");
    expect(screen.getByText("Daily Snapshot")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
});
