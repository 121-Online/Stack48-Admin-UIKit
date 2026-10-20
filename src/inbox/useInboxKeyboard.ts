import { useEffect, useRef } from "react";
import { isEditableKeyboardTarget, resolveInboxKey } from "./keyboard";

/**
 * Callbacks for {@link useInboxKeyboard}. Every handler is optional — bind
 * only the actions the host implements.
 */
export interface InboxKeyboardCallbacks {
  /** `j` (delta `1`) / `k` (delta `-1`). */
  onMove?: (delta: 1 | -1) => void;
  /** `Enter` / `o`. */
  onOpen?: () => void;
  /** `x` — toggle selection on the focused row. */
  onSelect?: () => void;
  /** `e` — mark handled (selection, or the focused row). */
  onMarkHandled?: () => void;
  /** `#` — delete / destructive archive. */
  onDelete?: () => void;
  /** `u` / `Escape` — close the reading pane, or blur an editable field. */
  onBack?: () => void;
  /** `/` — focus the search field. */
  onSearch?: () => void;
  /** `?` — toggle the shortcuts overlay. */
  onHelp?: () => void;
}

/**
 * Options for {@link useInboxKeyboard}.
 */
export interface InboxKeyboardOptions {
  /** When `false`, the listener is not attached. Default `true`. */
  enabled?: boolean;
}

/**
 * Optional window-level inbox shortcuts. Presentational: the hook never
 * mutates mail, it only forwards to the callbacks you pass.
 *
 * Matches GTM `InboxContent` (`j`/`k`, `e`, `#`, `/`, `x`, `Enter`/`o`, `u`, `?`).
 * Callers own focus index, selection, and side effects.
 *
 * @example
 * useInboxKeyboard({
 *   onMove: (delta) => setFocused((i) => nextFocusedIndex(i, delta, items.length)),
 *   onOpen: () => onOpenMessage(items[focused]?.id),
 *   onSearch: () => searchRef.current?.focus(),
 * });
 */
export function useInboxKeyboard(
  callbacks: InboxKeyboardCallbacks,
  options: InboxKeyboardOptions = {},
): void {
  const { enabled = true } = options;
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(event: KeyboardEvent) {
      const action = resolveInboxKey({
        key: event.key,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        editable: isEditableKeyboardTarget(event.target),
      });
      if (!action) return;

      const cb = callbacksRef.current;

      if (action.type === "back" && isEditableKeyboardTarget(event.target)) {
        event.preventDefault();
        if (event.target instanceof HTMLElement) event.target.blur();
        cb.onBack?.();
        return;
      }

      switch (action.type) {
        case "move":
          event.preventDefault();
          cb.onMove?.(action.delta);
          break;
        case "open":
          event.preventDefault();
          cb.onOpen?.();
          break;
        case "select":
          event.preventDefault();
          cb.onSelect?.();
          break;
        case "mark-handled":
          event.preventDefault();
          cb.onMarkHandled?.();
          break;
        case "delete":
          event.preventDefault();
          cb.onDelete?.();
          break;
        case "back":
          event.preventDefault();
          cb.onBack?.();
          break;
        case "search":
          event.preventDefault();
          cb.onSearch?.();
          break;
        case "help":
          event.preventDefault();
          cb.onHelp?.();
          break;
        default: {
          const _exhaustive: never = action;
          return _exhaustive;
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}
