import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useInboxKeyboard, type InboxKeyboardCallbacks } from "./useInboxKeyboard";

function Harness({ enabled = true, ...callbacks }: InboxKeyboardCallbacks & { enabled?: boolean }) {
  useInboxKeyboard(callbacks, { enabled });
  return <div>hook</div>;
}

describe("useInboxKeyboard", () => {
  it("forwards GTM keys to the callbacks API", () => {
    const onMove = vi.fn();
    const onOpen = vi.fn();
    const onSelect = vi.fn();
    const onMarkHandled = vi.fn();
    const onDelete = vi.fn();
    const onBack = vi.fn();
    const onSearch = vi.fn();
    const onHelp = vi.fn();

    render(
      <Harness
        onMove={onMove}
        onOpen={onOpen}
        onSelect={onSelect}
        onMarkHandled={onMarkHandled}
        onDelete={onDelete}
        onBack={onBack}
        onSearch={onSearch}
        onHelp={onHelp}
      />,
    );

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "j" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "x" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "#" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "u" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }));

    expect(onMove).toHaveBeenCalledWith(1);
    expect(onMove).toHaveBeenCalledWith(-1);
    expect(onOpen).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onMarkHandled).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledOnce();
    expect(onBack).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledOnce();
    expect(onHelp).toHaveBeenCalledOnce();
  });

  it("does not listen when disabled", () => {
    const onMove = vi.fn();
    render(<Harness enabled={false} onMove={onMove} />);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "j" }));
    expect(onMove).not.toHaveBeenCalled();
  });
});
