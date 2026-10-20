import { describe, expect, it } from "vitest";
import {
  INBOX_SHORTCUTS,
  isEditableKeyboardTarget,
  nextFocusedIndex,
  resolveInboxKey,
} from "./keyboard";

function event(
  key: string,
  extras: Partial<{
    shiftKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    editable: boolean;
  }> = {},
) {
  return resolveInboxKey({
    key,
    shiftKey: extras.shiftKey ?? false,
    metaKey: extras.metaKey ?? false,
    ctrlKey: extras.ctrlKey ?? false,
    altKey: extras.altKey ?? false,
    editable: extras.editable ?? false,
  });
}

describe("resolveInboxKey", () => {
  it("maps the GTM / Gmail set including #", () => {
    expect(event("j")).toEqual({ type: "move", delta: 1 });
    expect(event("k")).toEqual({ type: "move", delta: -1 });
    expect(event("Enter")).toEqual({ type: "open" });
    expect(event("o")).toEqual({ type: "open" });
    expect(event("e")).toEqual({ type: "mark-handled" });
    expect(event("#")).toEqual({ type: "delete" });
    expect(event("u")).toEqual({ type: "back" });
    expect(event("Escape")).toEqual({ type: "back" });
    expect(event("/")).toEqual({ type: "search" });
    expect(event("x")).toEqual({ type: "select" });
    expect(event("?")).toEqual({ type: "help" });
  });

  it("ignores modifier chords and unknown keys", () => {
    expect(event("j", { metaKey: true })).toBeNull();
    expect(event("j", { ctrlKey: true })).toBeNull();
    expect(event("j", { altKey: true })).toBeNull();
    expect(event("a")).toBeNull();
  });

  it("only allows Escape while typing", () => {
    expect(event("j", { editable: true })).toBeNull();
    expect(event("e", { editable: true })).toBeNull();
    expect(event("#", { editable: true })).toBeNull();
    expect(event("Escape", { editable: true })).toEqual({ type: "back" });
  });
});

describe("nextFocusedIndex", () => {
  it("clamps at the ends and handles an empty list", () => {
    expect(nextFocusedIndex(-1, 1, 0)).toBe(-1);
    expect(nextFocusedIndex(-1, 1, 4)).toBe(0);
    expect(nextFocusedIndex(-1, -1, 4)).toBe(3);
    expect(nextFocusedIndex(0, -1, 4)).toBe(0);
    expect(nextFocusedIndex(3, 1, 4)).toBe(3);
    expect(nextFocusedIndex(1, 1, 4)).toBe(2);
  });
});

describe("isEditableKeyboardTarget", () => {
  it("treats text inputs and textareas as editable, not checkboxes", () => {
    const text = document.createElement("input");
    text.type = "text";
    expect(isEditableKeyboardTarget(text)).toBe(true);

    const search = document.createElement("input");
    search.type = "search";
    expect(isEditableKeyboardTarget(search)).toBe(true);

    const box = document.createElement("input");
    box.type = "checkbox";
    expect(isEditableKeyboardTarget(box)).toBe(false);

    const area = document.createElement("textarea");
    expect(isEditableKeyboardTarget(area)).toBe(true);

    expect(isEditableKeyboardTarget(null)).toBe(false);
  });
});

describe("INBOX_SHORTCUTS", () => {
  it("documents j/k, e, and #", () => {
    const keys = INBOX_SHORTCUTS.map((row) => row.keys).join(" ");
    expect(keys).toContain("j / k");
    expect(keys).toContain("e");
    expect(keys).toContain("#");
  });
});
