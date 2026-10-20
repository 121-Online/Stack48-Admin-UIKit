import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MessageMeta } from "./MessageMeta";

describe("MessageMeta", () => {
  it("renders direction, subject, recipients, time, and chips", () => {
    render(
      <MessageMeta
        direction="inbound"
        directionLabel="Inbound from Jane Cooper"
        subject="Re: Intro"
        to={["hello@stack48.com"]}
        cc={["ops@northwind.test"]}
        timestamp="20 Oct 2026, 14:02"
        timestampDateTime="2026-10-20T13:02:00.000Z"
        chips={[{ id: "unhandled", label: "Unhandled", variant: "warning" }]}
      />,
    );

    expect(screen.getByText("Inbound from Jane Cooper")).toBeInTheDocument();
    expect(screen.getByText("Re: Intro")).toBeInTheDocument();
    expect(screen.getByText("To hello@stack48.com · Cc ops@northwind.test")).toBeInTheDocument();
    const time = screen.getByText("20 Oct 2026, 14:02");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("datetime", "2026-10-20T13:02:00.000Z");
    expect(screen.getByText("Unhandled")).toBeInTheDocument();
  });

  it("hides the received status and accepts a preformatted recipients line", () => {
    render(
      <MessageMeta
        direction="outbound_reply"
        directionLabel="Reply sent"
        recipientsLabel="To jane@northwind.test"
        status="received"
        timestamp="—"
      />,
    );
    expect(screen.getByText("To jane@northwind.test")).toBeInTheDocument();
    expect(screen.queryByText("received")).not.toBeInTheDocument();
  });
});
