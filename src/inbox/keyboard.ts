/**
 * Gmail-style inbox shortcuts, matching the GTM dashboard
 * (`j` / `k`, `Enter` / `o`, `e`, `#`, `u`, `/`, `x`, `?`).
 *
 * Pure helpers so hosts can unit-test key maps without rendering, and so
 * {@link useInboxKeyboard} stays a thin event-binding wrapper.
 */

/** Discriminated action returned by {@link resolveInboxKey}. */
export type InboxKeyAction =
  | { type: "move"; delta: 1 | -1 }
  | { type: "open" }
  | { type: "select" }
  | { type: "mark-handled" }
  | { type: "delete" }
  | { type: "back" }
  | { type: "search" }
  | { type: "help" };

/** Fields {@link resolveInboxKey} reads from a `KeyboardEvent`. */
export interface InboxKeyEvent {
  key: string;
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  /** True when the event target is an editable field (see {@link isEditableKeyboardTarget}). */
  editable: boolean;
}

/**
 * One row in the optional shortcuts cheat-sheet. Keys match the GTM overlay.
 */
export interface InboxShortcut {
  keys: string;
  label: string;
}

/**
 * Shortcuts shown in the GTM “?” overlay, plus `#` (delete) which the
 * dashboard key map handles alongside `e` (mark handled).
 */
export const INBOX_SHORTCUTS: readonly InboxShortcut[] = [
  { keys: "j / k", label: "Move down / up" },
  { keys: "Enter / o", label: "Open" },
  { keys: "e", label: "Mark handled" },
  { keys: "#", label: "Delete" },
  { keys: "u", label: "Back to list" },
  { keys: "/", label: "Search" },
  { keys: "x", label: "Select" },
  { keys: "?", label: "Shortcuts" },
];

const TEXT_INPUT_TYPES = new Set([
  "text",
  "search",
  "email",
  "url",
  "tel",
  "password",
  "number",
  "date",
  "datetime-local",
  "month",
  "week",
  "time",
  "color",
]);

/**
 * True when keyboard shortcuts should yield to typing: text inputs, textareas,
 * selects, and `contenteditable`. Checkboxes / radios stay shortcut-friendly
 * so `j` / `k` still move after a row is ticked.
 */
export function isEditableKeyboardTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLSelectElement) return true;
  if (target instanceof HTMLInputElement) {
    const type = (target.type || "text").toLowerCase();
    return TEXT_INPUT_TYPES.has(type) || type === "";
  }
  return target.closest('[contenteditable=""], [contenteditable="true"]') != null;
}

/**
 * Map a keydown to an inbox action, or `null` if the kit should ignore it.
 *
 * Ignored when a modifier other than Shift is held (so browser shortcuts
 * keep working), and when the target is editable except for `Escape`
 * (blur / back), matching GTM `resolveInboxKey`.
 */
export function resolveInboxKey(event: InboxKeyEvent): InboxKeyAction | null {
  if (event.metaKey || event.ctrlKey || event.altKey) return null;

  if (event.editable) {
    if (event.key === "Escape") return { type: "back" };
    return null;
  }

  switch (event.key) {
    case "j":
    case "J":
      return { type: "move", delta: 1 };
    case "k":
    case "K":
      return { type: "move", delta: -1 };
    case "Enter":
    case "o":
    case "O":
      return { type: "open" };
    case "e":
    case "E":
      return { type: "mark-handled" };
    case "#":
      return { type: "delete" };
    case "u":
    case "U":
    case "Escape":
      return { type: "back" };
    case "/":
      return { type: "search" };
    case "x":
    case "X":
      return { type: "select" };
    case "?":
      return { type: "help" };
    default:
      return null;
  }
}

/**
 * Clamp list focus after `j` / `k`. Returns `-1` when the list is empty.
 */
export function nextFocusedIndex(current: number, delta: number, length: number): number {
  if (length <= 0) return -1;
  if (current < 0) return delta > 0 ? 0 : length - 1;
  const next = current + delta;
  if (next < 0) return 0;
  if (next >= length) return length - 1;
  return next;
}
