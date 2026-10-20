import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders sidebar, topbar, and children", () => {
    render(
      <AppShell sidebar={<aside>Nav</aside>} topbar={<div>Top</div>}>
        <main>Body</main>
      </AppShell>,
    );
    expect(screen.getByText("Nav")).toBeInTheDocument();
    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
