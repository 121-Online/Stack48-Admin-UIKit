import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { amber, blue, emerald, layout, radii, red, spacing, typography, zinc } from "../tokens";

const meta = {
  title: "Foundations",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Stack48 Admin UI tokens extracted from the GTM ops dashboard (gtm.stack48.com): Inter 13px, zinc canvas, blue-500 brand, 2px radii, no cartoon cards.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ name, hex, className }: { name: string; hex: string; className?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border py-2 last:border-b-0">
      <div
        className={cn("h-8 w-12 shrink-0 rounded-sm border border-border", className)}
        style={className ? undefined : { backgroundColor: hex }}
        title={hex}
      />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-caption font-medium text-foreground">{name}</div>
        <div className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
          {hex}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0">
      <h2 className="mb-3 text-caption font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="border border-border bg-card p-4">{children}</div>
    </section>
  );
}

function FoundationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-header border-b border-border bg-card px-6">
        <div className="flex h-full items-center justify-between">
          <div>
            <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
              Stack48 Admin UI
            </p>
            <h1 className="text-sm font-semibold text-foreground">Foundations</h1>
          </div>
          <p className="text-caption text-muted-foreground">
            Source: gtm.stack48.com · {typography.bodySize} Inter · radius {radii.sm}
          </p>
        </div>
      </header>

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-3">
        <Section title="Zinc (chrome)">
          {Object.entries(zinc).map(([step, hex]) => (
            <Swatch key={step} name={`zinc-${step}`} hex={hex} />
          ))}
        </Section>

        <Section title="Brand + status">
          <Swatch name="brand / ring (blue-500)" hex={blue[500]} />
          <Swatch name="brand-hover (blue-600)" hex={blue[600]} />
          <Swatch name="primary (zinc-900)" hex={zinc[900]} />
          <Swatch name="destructive (red-600)" hex={red[600]} />
          <Swatch name="success (emerald-600)" hex={emerald[600]} />
          <Swatch name="warning (amber-600)" hex={amber[600]} />
          <Swatch name="success-muted" hex={emerald[50]} />
          <Swatch name="warning-muted" hex={amber[50]} />
          <Swatch name="destructive-muted" hex={red[50]} />
        </Section>

        <Section title="Semantic (light)">
          <Swatch name="background" hex={zinc[50]} className="bg-background" />
          <Swatch name="foreground" hex={zinc[900]} className="bg-foreground" />
          <Swatch name="card" hex="#ffffff" className="bg-card" />
          <Swatch name="muted" hex={zinc[100]} className="bg-muted" />
          <Swatch name="border" hex={zinc[200]} className="bg-border" />
          <Swatch name="input" hex={zinc[300]} className="bg-input" />
          <Swatch name="sidebar" hex="#ffffff" className="bg-sidebar" />
        </Section>
      </div>

      <div className="grid gap-6 px-6 pb-6 lg:grid-cols-2">
        <Section title="Typography">
          <p className="mb-4 text-caption text-muted-foreground">
            {typography.fontSans} · body {typography.bodySize}/{typography.bodyLineHeight} · mono{" "}
            {typography.fontMono}
          </p>
          <div className="space-y-3">
            {(
              [
                ["2xs", "text-2xs", "9px · labels in dense tables"],
                ["micro", "text-micro", "10px · chart axes"],
                ["caption", "text-caption", "11px · badges, uppercase section labels"],
                ["xs", "text-xs", "12px · GTM .btn-primary"],
                ["body", "text-body", "13px · default UI copy"],
                ["sm", "text-sm", "14px · page titles, inputs"],
              ] as const
            ).map(([key, className, note]) => (
              <div key={key} className="flex items-baseline justify-between gap-4">
                <span className={cn(className, "font-medium text-foreground")}>
                  The quick brown fox {key}
                </span>
                <span className="shrink-0 font-mono text-micro text-muted-foreground">{note}</span>
              </div>
            ))}
            <p className="font-mono text-caption text-muted-foreground">
              SELECT id FROM leads LIMIT 20;
            </p>
            <div className="flex gap-4 text-sm">
              <span className="font-normal">Regular 400</span>
              <span className="font-medium">Medium 500</span>
              <span className="font-semibold">Semibold 600</span>
              <span className="font-bold">Bold 700</span>
            </div>
          </div>
        </Section>

        <Section title="Spacing, radii, shell">
          <p className="mb-3 text-caption text-muted-foreground">
            Prefer the default Tailwind scale. GTM density clusters on 1–4 and 6.
          </p>
          <div className="space-y-1.5">
            {(["0.5", "1", "1.5", "2", "3", "4", "6", "8"] as const).map((key) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-8 font-mono text-micro text-muted-foreground">{key}</span>
                <div className="h-3 bg-zinc-900" style={{ width: spacing[key] }} />
                <span className="font-mono text-micro text-muted-foreground">{spacing[key]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-end gap-4">
            {(
              [
                ["sm / DEFAULT", radii.sm],
                ["md", radii.md],
                ["lg", radii.lg],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="text-center">
                <div
                  className="h-10 w-16 border border-border bg-muted"
                  style={{ borderRadius: value }}
                />
                <p className="mt-1 font-mono text-micro text-muted-foreground">
                  {label} {value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-caption text-muted-foreground">
            sidebar {layout.sidebarWidth} · header {layout.headerHeight}
          </p>
          <p className="mt-2 text-caption text-muted-foreground">
            Surfaces are 1px `border-border` on `bg-card`. Do not add large radius or drop shadows
            to metric tiles.
          </p>
        </Section>
      </div>
    </div>
  );
}

export const Page: Story = {
  name: "Colour, type, spacing",
  render: () => <FoundationsPage />,
};
