import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState, type ReactNode } from "react";
import { ChipList } from "./MultiSelectFilter";
import { DataTable, type ColumnDef, type PaginationState, type SortState } from "./DataTable";
import { FilterCheckbox, FilterSelect } from "./FilterSelect";
import { MultiSelectFilter } from "./MultiSelectFilter";

type Lead = {
  id: string;
  name: string;
  email: string;
  status: string;
  geo: string;
  score: number;
  industry: string;
  platforms: string[];
};

const ALL_LEADS: Lead[] = [
  {
    id: "1",
    name: "Northwind Agency",
    email: "hello@northwind.test",
    status: "new",
    geo: "UK",
    score: 92,
    industry: "agencies",
    platforms: ["webflow", "hubspot"],
  },
  {
    id: "2",
    name: "Brightline SaaS",
    email: "ops@brightline.test",
    status: "engaged",
    geo: "US",
    score: 81,
    industry: "saas",
    platforms: ["webflow"],
  },
  {
    id: "3",
    name: "Cedar Media",
    email: "team@cedar.test",
    status: "email1_sent",
    geo: "IE",
    score: 64,
    industry: "media",
    platforms: ["wordpress"],
  },
  {
    id: "4",
    name: "Harbor Labs",
    email: "a@harbor.test",
    status: "signed_up",
    geo: "UK",
    score: 99,
    industry: "saas",
    platforms: ["webflow", "segment"],
  },
  {
    id: "5",
    name: "Pike Studio",
    email: "hi@pike.test",
    status: "opted_out",
    geo: "CA",
    score: 22,
    industry: "agencies",
    platforms: ["shopify"],
  },
  {
    id: "6",
    name: "Willow & Co",
    email: "c@willow.test",
    status: "new",
    geo: "UK",
    score: 70,
    industry: "agencies",
    platforms: ["webflow"],
  },
];

const moreLeads: Lead[] = Array.from({ length: 40 }, (_, index) => ({
  id: String(index + 10),
  name: `Lead ${index + 10}`,
  email: `lead${index + 10}@example.test`,
  status: index % 3 === 0 ? "new" : "engaged",
  geo: index % 2 === 0 ? "UK" : "US",
  score: 40 + (index % 60),
  industry: index % 2 === 0 ? "saas" : "agencies",
  platforms: ["webflow"],
}));

const columns: ColumnDef<Lead>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  {
    id: "email",
    header: "Email",
    accessor: "email",
    sortable: true,
    mono: true,
    cell: ({ value }) => <span className="font-mono text-xs text-zinc-600">{String(value)}</span>,
  },
  {
    id: "score",
    header: "Score",
    accessor: "score",
    sortable: true,
    align: "right",
    width: 72,
    cell: ({ value }) => <span className="tabular-nums">{String(value)}</span>,
  },
  { id: "status", header: "Status", accessor: "status", sortable: true },
  { id: "geo", header: "Geo", accessor: "geo", width: 64 },
  {
    id: "platforms",
    header: "Platforms",
    accessor: "platforms",
    cell: ({ row }) => <ChipList values={row.platforms} maxVisible={2} />,
  },
];

const meta = {
  title: "Admin/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dense full-width ops table from GTM leads / campaigns / platform-users: sortable headers, toolbar filters, selection, client or server paging.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable<Lead>>;

export default meta;
type Story = StoryObj;

function Pad({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background p-6">{children}</div>;
}

export const Default: Story = {
  render: () => (
    <Pad>
      <DataTable
        columns={columns}
        data={ALL_LEADS}
        getRowHref={(row) => `/leads/${row.id}`}
        caption="Leads"
      />
    </Pad>
  ),
};

export const Loading: Story = {
  render: () => (
    <Pad>
      <DataTable columns={columns} data={[]} loading />
    </Pad>
  ),
};

export const Empty: Story = {
  render: () => (
    <Pad>
      <DataTable columns={columns} data={[]} emptyMessage="No leads found" />
    </Pad>
  ),
};

export const Compact: Story = {
  render: () => (
    <Pad>
      <DataTable columns={columns} data={ALL_LEADS} compact />
    </Pad>
  ),
};

export const RowClick: Story = {
  render: function RowClickStory() {
    const [last, setLast] = useState("—");
    return (
      <Pad>
        <p className="mb-2 text-caption text-muted-foreground">Last click: {last}</p>
        <DataTable columns={columns} data={ALL_LEADS} onRowClick={(row) => setLast(row.name)} />
      </Pad>
    );
  },
};

export const SelectableBulkActions: Story = {
  render: function SelectableStory() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    return (
      <Pad>
        <DataTable
          columns={columns}
          data={ALL_LEADS}
          selectable
          selectedIds={selectedIds}
          onSelectedIdsChange={setSelectedIds}
          bulkActions={
            <button
              type="button"
              className="rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              Add to campaign
            </button>
          }
        />
      </Pad>
    );
  },
};

export const ClientPaging: Story = {
  render: () => (
    <Pad>
      <DataTable
        columns={columns}
        data={[...ALL_LEADS, ...moreLeads]}
        defaultPagination={{ page: 1, pageSize: 8 }}
        defaultSort={{ id: "name", direction: "asc" }}
      />
    </Pad>
  ),
};

export const ServerPaging: Story = {
  render: function ServerStory() {
    const [pagination, setPagination] = useState<PaginationState>({
      page: 1,
      pageSize: 5,
      total: ALL_LEADS.length + moreLeads.length,
    });
    const [sort, setSort] = useState<SortState | null>(null);
    const [search, setSearch] = useState("");
    const all = useMemo(() => [...ALL_LEADS, ...moreLeads], []);
    const filtered = useMemo(() => {
      const query = search.toLowerCase();
      let next = query
        ? all.filter(
            (row) =>
              row.name.toLowerCase().includes(query) || row.email.toLowerCase().includes(query),
          )
        : all;
      if (sort) {
        next = [...next].sort((left, right) => {
          const a = left[sort.id as keyof Lead];
          const b = right[sort.id as keyof Lead];
          const result = String(a).localeCompare(String(b), undefined, { numeric: true });
          return sort.direction === "asc" ? result : -result;
        });
      }
      return next;
    }, [all, search, sort]);
    const start = (pagination.page - 1) * pagination.pageSize;
    const pageRows = filtered.slice(start, start + pagination.pageSize);
    return (
      <Pad>
        <DataTable
          columns={columns}
          data={pageRows}
          mode="server"
          sort={sort}
          onSortChange={(next) => {
            setSort(next);
            setPagination((prev) => ({ ...prev, page: 1, total: filtered.length }));
          }}
          pagination={{ ...pagination, total: filtered.length }}
          onPaginationChange={setPagination}
          toolbar={{
            search,
            onSearchChange: (value) => {
              setSearch(value);
              setPagination((prev) => ({ ...prev, page: 1, total: filtered.length }));
            },
            searchPlaceholder: "Name, email, or website...",
            meta: `${pageRows.length} of ${filtered.length.toLocaleString()} leads`,
          }}
        />
      </Pad>
    );
  },
};

export const ToolbarFilters: Story = {
  render: function ToolbarStory() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [industries, setIndustries] = useState<string[]>([]);
    const [sendable, setSendable] = useState(false);
    const filtered = ALL_LEADS.filter((row) => {
      if (search && !`${row.name} ${row.email}`.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (status !== "all" && row.status !== status) return false;
      if (industries.length > 0 && !industries.includes(row.industry)) return false;
      if (sendable && row.status === "opted_out") return false;
      return true;
    });
    return (
      <Pad>
        <DataTable
          columns={columns}
          data={filtered}
          selectable
          bulkActions={
            <button
              type="button"
              className="rounded-sm border border-zinc-300 bg-card px-3 py-1.5 text-xs font-medium"
            >
              Enroll
            </button>
          }
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
                  { value: "email1_sent", label: "Email 1 Sent" },
                  { value: "engaged", label: "Engaged" },
                  { value: "opted_out", label: "Opted Out" },
                  { value: "signed_up", label: "Signed Up" },
                ]}
              />
            ),
            secondaryFilters: (
              <MultiSelectFilter
                label="Industry"
                value={industries}
                onValueChange={setIndustries}
                placeholder="Filter by industry..."
                options={[
                  { value: "agencies", label: "Agencies" },
                  { value: "saas", label: "SaaS" },
                  { value: "media", label: "Media" },
                ]}
              />
            ),
            extras: (
              <FilterCheckbox
                label="Sendable Queue Only"
                checked={sendable}
                onCheckedChange={setSendable}
              />
            ),
            meta: `${filtered.length} of ${ALL_LEADS.length} leads`,
          }}
        />
      </Pad>
    );
  },
};

export const StickyHeader: Story = {
  render: () => (
    <Pad>
      <DataTable
        columns={columns}
        data={[...ALL_LEADS, ...moreLeads]}
        stickyHeader
        maxHeight="16rem"
        defaultPagination={{ page: 1, pageSize: 40 }}
        showPagination={false}
      />
    </Pad>
  ),
};

export const Dark: Story = {
  render: () => (
    <div className="dark min-h-screen bg-background p-6">
      <DataTable columns={columns} data={ALL_LEADS} selectable />
    </div>
  ),
};
