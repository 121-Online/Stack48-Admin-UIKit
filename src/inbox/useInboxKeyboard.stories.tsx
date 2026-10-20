import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useInboxKeyboard } from "./useInboxKeyboard";
import { INBOX_SHORTCUTS, nextFocusedIndex } from "./keyboard";
import { demoListItems } from "./_internal/demo";

function KeyboardDemo({ enabled = true }: { enabled?: boolean }) {
  const [log, setLog] = useState<string[]>([]);
  const [focused, setFocused] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  useInboxKeyboard(
    {
      onMove: (delta) => {
        setFocused((current) => nextFocusedIndex(current, delta, demoListItems.length));
        setLog((rows) => [`move ${delta}`, ...rows].slice(0, 8));
      },
      onOpen: () => setLog((rows) => [`open ${demoListItems[focused]?.id}`, ...rows].slice(0, 8)),
      onSelect: () =>
        setLog((rows) => [`select ${demoListItems[focused]?.id}`, ...rows].slice(0, 8)),
      onMarkHandled: () => setLog((rows) => ["mark-handled", ...rows].slice(0, 8)),
      onDelete: () => setLog((rows) => ["delete", ...rows].slice(0, 8)),
      onBack: () => setLog((rows) => ["back", ...rows].slice(0, 8)),
      onSearch: () => setLog((rows) => ["search", ...rows].slice(0, 8)),
      onHelp: () => setHelpOpen((open) => !open),
    },
    { enabled },
  );

  return (
    <div className="p-4 max-w-lg">
      <p className="text-sm text-foreground mb-2">
        Focus this preview, then use <span className="font-mono">j/k e # x / u ?</span>
      </p>
      <ul className="border border-border rounded-sm divide-y divide-border mb-3">
        {demoListItems.map((item, index) => (
          <li
            key={item.id}
            className={`px-3 py-1.5 text-body ${index === focused ? "bg-blue-50 font-medium" : ""}`}
          >
            {item.fromName || item.fromEmail} — {item.subject}
          </li>
        ))}
      </ul>
      <p className="text-caption text-muted-foreground mb-2">
        Hook {enabled ? "enabled" : "disabled"}
      </p>
      <ol className="font-mono text-caption text-zinc-600 space-y-0.5">
        {log.map((row, index) => (
          <li key={`${row}-${index}`}>{row}</li>
        ))}
      </ol>
      {helpOpen ? (
        <div
          className="mt-3 w-64 bg-card border border-border rounded-sm shadow-lg p-3"
          role="dialog"
          aria-label="Keyboard shortcuts"
        >
          <p className="text-xs font-semibold text-foreground mb-2">Keyboard shortcuts</p>
          <ul className="space-y-1">
            {INBOX_SHORTCUTS.map((row) => (
              <li key={row.keys} className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-zinc-700">{row.keys}</span>
                <span className="text-muted-foreground">{row.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

const meta = {
  title: "Inbox/useInboxKeyboard",
  component: KeyboardDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Optional window-level hook. Callbacks only — the kit never marks, deletes, or navigates on its own.",
      },
    },
  },
} satisfies Meta<typeof KeyboardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { enabled: false },
};

export const Dark: Story = {
  globals: { theme: "dark" },
};
