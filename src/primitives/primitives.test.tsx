import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Section, SectionDivider } from "./section";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { StatusIndicator } from "./status-indicator";
import { Switch } from "./switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Textarea } from "./textarea";
import { Toast, ToastProvider, ToastTitle, ToastViewport } from "./toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

describe("Button", () => {
  it("renders the primary GTM action", () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeEnabled();
  });

  it("honours disabled and secondary", () => {
    render(
      <Button variant="secondary" disabled>
        Cancel
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });
});

describe("Input", () => {
  it("renders an editable text field", () => {
    render(<Input placeholder="Search mail" aria-label="Search mail" />);
    expect(screen.getByLabelText("Search mail")).toHaveAttribute("placeholder", "Search mail");
  });
});

describe("Textarea", () => {
  it("renders a multiline field", () => {
    render(<Textarea aria-label="Talking points" defaultValue="Hello" />);
    expect(screen.getByLabelText("Talking points")).toHaveValue("Hello");
  });
});

describe("Label", () => {
  it("associates with a control", () => {
    render(
      <>
        <Label htmlFor="cap">Hourly cap</Label>
        <Input id="cap" />
      </>,
    );
    expect(screen.getByLabelText("Hourly cap")).toBeInTheDocument();
  });
});

describe("Checkbox", () => {
  it("renders unchecked and checked", () => {
    const { unmount } = render(<Checkbox aria-label="Sendable" />);
    expect(screen.getByRole("checkbox", { name: "Sendable" })).not.toBeChecked();
    unmount();
    render(<Checkbox aria-label="Sendable" checked />);
    expect(screen.getByRole("checkbox", { name: "Sendable" })).toBeChecked();
  });
});

describe("Switch", () => {
  it("renders a switch", () => {
    render(<Switch aria-label="Sending enabled" />);
    expect(screen.getByRole("switch", { name: "Sending enabled" })).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders variants and optional dot", () => {
    render(
      <Badge variant="success" dot>
        Healthy
      </Badge>,
    );
    expect(screen.getByText("Healthy")).toBeInTheDocument();
  });
});

describe("StatusIndicator", () => {
  it("renders a labelled status", () => {
    render(<StatusIndicator status="ok" label="Sending" />);
    expect(screen.getByText("Sending")).toBeInTheDocument();
  });
});

describe("Section", () => {
  it("renders title, description, and children", () => {
    render(
      <Section title="Funnel" description="Last 7 days" action={<span>12 sends</span>}>
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole("heading", { name: "Funnel" })).toBeInTheDocument();
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders a divider", () => {
    const { container } = render(<SectionDivider />);
    expect(container.querySelector('[data-orientation="horizontal"]')).toBeTruthy();
  });
});

describe("Separator", () => {
  it("renders a horizontal rule", () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('[role="none"], [data-orientation="horizontal"]')).toBeTruthy();
  });
});

describe("Skeleton", () => {
  it("renders a pulsing placeholder", () => {
    const { container } = render(<Skeleton className="h-4 w-20" />);
    expect(container.firstElementChild).toHaveClass("animate-pulse");
  });
});

describe("Select", () => {
  it("renders a trigger", () => {
    render(
      <Select defaultValue="all">
        <SelectTrigger aria-label="Status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("renders the active panel", () => {
    render(
      <Tabs defaultValue="targeting">
        <TabsList>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
        </TabsList>
        <TabsContent value="targeting">ICP</TabsContent>
        <TabsContent value="volume">Caps</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Targeting" })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("ICP")).toBeInTheDocument();
  });
});

describe("Dialog", () => {
  it("renders an open dialog", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Send test</DialogTitle>
          <DialogDescription>Max 5 per send.</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("dialog", { name: "Send test" })).toBeInTheDocument();
    expect(screen.getByText("Max 5 per send.")).toBeInTheDocument();
  });
});

describe("DropdownMenu", () => {
  it("renders a trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("button", { name: "Actions" })).toBeInTheDocument();
  });
});

describe("Popover", () => {
  it("renders a trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Shortcuts</PopoverTrigger>
        <PopoverContent>j / k</PopoverContent>
      </Popover>,
    );
    expect(screen.getByRole("button", { name: "Shortcuts" })).toBeInTheDocument();
  });
});

describe("Tooltip", () => {
  it("renders the trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Soft cap</TooltipTrigger>
          <TooltipContent>Soft cap reached</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Soft cap")).toBeInTheDocument();
  });
});

describe("Toast", () => {
  it("renders an open toast", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Reply sent</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("Reply sent")).toBeInTheDocument();
  });
});
