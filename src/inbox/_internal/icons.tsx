import type { SVGProps } from "react";
import type { InboxFolderIconName } from "../types";

type IconProps = SVGProps<SVGSVGElement>;

function iconProps(props: IconProps): IconProps {
  return {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

/** Paperclip used for attachment affordances. */
export function PaperclipIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

/** Refresh control in the list toolbar. */
export function RefreshIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}

function InboxTrayIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}

function AllMailIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function HandledIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function UnmatchedIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function AutoReplyIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/** Built-in folder glyph by GTM folder id. */
export function FolderIcon({ name, ...props }: IconProps & { name?: InboxFolderIconName }) {
  switch (name) {
    case "inbox":
      return <InboxTrayIcon {...props} />;
    case "all":
      return <AllMailIcon {...props} />;
    case "handled":
      return <HandledIcon {...props} />;
    case "unmatched":
      return <UnmatchedIcon {...props} />;
    case "auto":
      return <AutoReplyIcon {...props} />;
    default:
      return <InboxTrayIcon {...props} />;
  }
}
