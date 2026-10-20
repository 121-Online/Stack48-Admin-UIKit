import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type ColumnDef } from "./DataTable";
import { FilterSelect } from "./FilterSelect";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { pageWindow } from "./DataTablePagination";

type Lead = { id: string; name: string; geo: string; score: number };

const rows: Lead[] = [
  { id: "1", name: "Acme", geo: "UK", score: 90 },
  { id: "2", name: "Beta", geo: "US", score: 40 },
  { id: "3", name: "Cedar", geo: "IE", score: 70 },
];

const columns: ColumnDef<Lead>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "geo", header: "Geo", accessor: "geo", sortable: true },
  { id: "score", header: "Score", accessor: "score", sortable: true, mono: true, align: "right" },
];

describe("pageWindow", () => {
  it("slides a 5-page window", () => {
    expect(pageWindow(1, 3)).toEqual([1, 2, 3]);
    expect(pageWindow(1, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(pageWindow(5, 10)).toEqual([3, 4, 5, 6, 7]);
    expect(pageWindow(10, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});

describe("DataTable", () => {
  it("renders rows and sortable headers", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={rows} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Name/ }));
    const bodyRows = screen.getAllByRole("row").slice(1);
    expect(within(bodyRows[0]!).getByText("Acme")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Name/ }));
    const descRows = screen.getAllByRole("row").slice(1);
    expect(within(descRows[0]!).getByText("Cedar")).toBeInTheDocument();
  });

  it("pages client-side", async () => {
    const user = userEvent.setup();
    const many = Array.from({ length: 12 }, (_, index) => ({
      id: String(index + 1),
      name: `Lead ${index + 1}`,
      geo: "UK",
      score: index,
    }));
    render(
      <DataTable columns={columns} data={many} defaultPagination={{ page: 1, pageSize: 5 }} />,
    );
    expect(screen.getByText("Lead 1")).toBeInTheDocument();
    expect(screen.queryByText("Lead 6")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next →" }));
    expect(screen.getByText("Lead 6")).toBeInTheDocument();
    expect(screen.queryByText("Lead 1")).not.toBeInTheDocument();
  });

  it("emits page changes in server mode without slicing", async () => {
    const user = userEvent.setup();
    const onPaginationChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={rows}
        mode="server"
        pagination={{ page: 1, pageSize: 50, total: 120 }}
        onPaginationChange={onPaginationChange}
      />,
    );
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next →" }));
    expect(onPaginationChange).toHaveBeenCalledWith({ page: 2, pageSize: 50, total: 120 });
  });

  it("selects rows and shows the bulk bar", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={rows}
        selectable
        bulkActions={<button type="button">Archive</button>}
      />,
    );
    await user.click(screen.getByLabelText("Select row 1"));
    expect(screen.getByText("1 selected")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.queryByText("1 selected")).not.toBeInTheDocument();
  });

  it("fires onRowClick on a non-interactive cell", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(<DataTable columns={columns} data={rows} onRowClick={onRowClick} />);
    await user.click(screen.getByText("UK"));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick.mock.calls[0]?.[0]).toEqual(rows[0]);
  });

  it("does not fire onRowClick when the target is a link", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={[
          {
            id: "name",
            header: "Name",
            accessor: "name",
            cell: ({ row }) => (
              <a
                href={`#lead-${row.id}`}
                className="text-brand"
                onClick={(event) => event.preventDefault()}
              >
                {row.name}
              </a>
            ),
          },
          { id: "geo", header: "Geo", accessor: "geo" },
        ]}
        data={rows}
        onRowClick={onRowClick}
      />,
    );
    await user.click(screen.getByRole("link", { name: "Acme" }));
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it("renders empty and loading states", () => {
    const { rerender } = render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No results")).toBeInTheDocument();
    rerender(<DataTable columns={columns} data={[]} loading />);
    expect(document.querySelector("[aria-busy='true']")).not.toBeNull();
  });

  it("wires getRowHref through renderLink on the first column", () => {
    const renderLink = vi.fn(
      ({
        href,
        children,
        className,
      }: {
        href: string;
        children: ReactNode;
        className?: string;
      }) => (
        <a
          href={href}
          className={className}
          data-router="1"
          onClick={(event) => event.preventDefault()}
        >
          {children}
        </a>
      ),
    );
    render(
      <DataTable
        columns={columns}
        data={rows}
        getRowHref={(row) => `/leads/${row.id}`}
        renderLink={renderLink}
      />,
    );
    expect(screen.getByRole("link", { name: "Acme" })).toHaveAttribute("href", "/leads/1");
    expect(screen.getByRole("link", { name: "Acme" })).toHaveAttribute("data-router", "1");
  });

  it("renders a toolbar with search and filter slots", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [search, setSearch] = useState("");
      const [status, setStatus] = useState("all");
      const [industries, setIndustries] = useState<string[]>([]);
      return (
        <DataTable
          columns={columns}
          data={rows}
          toolbar={{
            search,
            onSearchChange: setSearch,
            searchPlaceholder: "Name, email, or website...",
            filters: (
              <FilterSelect
                label="Status"
                value={status}
                onValueChange={setStatus}
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "new", label: "New" },
                ]}
              />
            ),
            secondaryFilters: (
              <MultiSelectFilter
                label="Industry"
                value={industries}
                onValueChange={setIndustries}
                options={[
                  { value: "agencies", label: "Agencies" },
                  { value: "saas", label: "SaaS" },
                ]}
                placeholder="Filter by industry..."
              />
            ),
            meta: "3 of 3 leads",
          }}
        />
      );
    }
    render(<Harness />);
    await user.type(screen.getByPlaceholderText("Name, email, or website..."), "Ac");
    expect(screen.getByPlaceholderText("Name, email, or website...")).toHaveValue("Ac");
    await user.selectOptions(screen.getByLabelText("Status"), "new");
    expect(screen.getByLabelText("Status")).toHaveValue("new");
    await user.click(screen.getByPlaceholderText("Filter by industry..."));
    await user.click(screen.getByRole("button", { name: "Agencies" }));
    expect(screen.getByLabelText("Remove Agencies")).toBeInTheDocument();
  });
});
