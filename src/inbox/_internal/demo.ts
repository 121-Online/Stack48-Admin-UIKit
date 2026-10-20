import type { InboxFolder, InboxListItem, InboxMailbox, InboxThreadMessage } from "../types";

export const demoFolders: InboxFolder[] = [
  { id: "inbox", label: "Inbox", iconName: "inbox", count: 12 },
  { id: "all", label: "All mail", iconName: "all" },
  { id: "handled", label: "Handled", iconName: "handled" },
  { id: "unmatched", label: "Unmatched", iconName: "unmatched" },
  { id: "auto", label: "Auto-replies", iconName: "auto" },
];

export const demoMailboxes: InboxMailbox[] = [
  { id: "stack48.com", label: "@stack48.com", count: 8 },
  { id: "hello@stack48.com", label: "hello@stack48.com", count: 3 },
  { id: "jobs@stack48.com", label: "jobs@stack48.com", hint: "receiving off" },
];

export const demoListItems: InboxListItem[] = [
  {
    id: "m1",
    fromName: "Jane Cooper",
    fromEmail: "jane@northwind.test",
    subject: "Re: Intro to Stack48",
    snippet: "Thanks — Thursday still works on our side.",
    receivedAt: "2026-10-20T13:02:00.000Z",
    timeLabel: "14:02",
    timeTitle: "20 Oct 2026, 14:02",
    unread: true,
    hasAttachments: true,
    attachmentCount: 2,
    chips: [
      { id: "lead", label: "Jane Cooper", variant: "info" },
      { id: "campaign", label: "q4-intro", variant: "default" },
    ],
  },
  {
    id: "m2",
    fromName: "Acme billing",
    fromEmail: "billing@acme.test",
    subject: "Out of office",
    snippet: "I am out of the office until 28 Oct.",
    receivedAt: "2026-10-20T09:11:00.000Z",
    timeLabel: "10:11",
    timeTitle: "20 Oct 2026, 10:11",
    unread: true,
    chips: [
      { id: "unmatched", label: "Unmatched", variant: "muted" },
      { id: "auto", label: "Auto-reply", variant: "muted" },
    ],
  },
  {
    id: "m3",
    fromEmail: "omar@contoso.test",
    subject: "Pricing question",
    snippet: "Can you send the 50-seat quote again?",
    receivedAt: "2026-10-19T16:40:00.000Z",
    timeLabel: "Mon",
    timeTitle: "19 Oct 2026, 17:40",
    unread: false,
    handled: true,
    chips: [{ id: "lead", label: "Omar Farouk", variant: "info" }],
  },
  {
    id: "m4",
    fromName: "Priya Shah",
    fromEmail: "priya@globex.test",
    subject: "(no subject)",
    snippet: "Following up on last week’s demo.",
    receivedAt: "2026-10-12T08:00:00.000Z",
    timeLabel: "12 Oct",
    timeTitle: "12 Oct 2026, 09:00",
    unread: false,
    handled: true,
    chips: [{ id: "lead", label: "Priya Shah", variant: "info" }],
  },
];

export const demoThread: InboxThreadMessage[] = [
  {
    id: "t1",
    direction: "outbound_campaign",
    directionLabel: "Campaign email · step 1 · q4-intro",
    subject: "Intro to Stack48",
    to: ["jane@northwind.test"],
    at: "2026-10-18T09:00:00.000Z",
    atLabel: "18 Oct 2026, 10:00",
    text: "Hi Jane,\n\nQuick intro to how we run outbound for ops teams.\n",
    html: "<p>Hi Jane,</p><p>Quick intro to how we run outbound for ops teams.</p>",
  },
  {
    id: "t2",
    direction: "inbound",
    directionLabel: "Inbound from Jane Cooper",
    from: "Jane Cooper <jane@northwind.test>",
    subject: "Re: Intro to Stack48",
    to: ["hello@stack48.com"],
    cc: ["ops@northwind.test"],
    at: "2026-10-20T13:02:00.000Z",
    atLabel: "20 Oct 2026, 14:02",
    html: "<p>Thanks — <strong>Thursday</strong> still works on our side.</p><p>Deck attached.</p>",
    text: "Thanks — Thursday still works on our side.\n\nDeck attached.",
    attachments: [
      { id: "a1", name: "stack48-overview.pdf", sizeLabel: "240 KB" },
      { id: "a2", name: "agenda.txt", sizeLabel: "1 KB" },
    ],
    chips: [{ id: "unhandled", label: "Unhandled", variant: "warning" }],
  },
  {
    id: "t3",
    direction: "outbound_reply",
    directionLabel: "Reply sent by alex@stack48.com",
    subject: "Re: Intro to Stack48",
    to: ["jane@northwind.test"],
    at: "2026-10-20T13:40:00.000Z",
    atLabel: "20 Oct 2026, 14:40",
    status: "sent",
    text: "Perfect — I’ll send a calendar hold for Thursday 10:00.",
  },
];

export const demoLongThread: InboxThreadMessage[] = [
  {
    id: "old-1",
    direction: "outbound_campaign",
    directionLabel: "Campaign email · step 1",
    subject: "First touch",
    atLabel: "1 Oct 2026, 09:00",
    text: "Earlier campaign step.",
  },
  {
    id: "old-2",
    direction: "inbound",
    directionLabel: "Inbound from Jane Cooper",
    subject: "Re: First touch",
    atLabel: "2 Oct 2026, 11:00",
    text: "Got it.",
  },
  ...demoThread,
];
