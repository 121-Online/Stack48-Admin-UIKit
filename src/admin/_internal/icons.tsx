import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon width="14" height="14" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon width="14" height="14" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon width="12" height="12" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon width="18" height="18" {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon width="18" height="18" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

export function SortIcon({ direction }: { direction?: "asc" | "desc" | null }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M5 1.25 L8 4.25 H2 Z"
        fill="currentColor"
        className={direction === "asc" ? "text-foreground" : "text-zinc-300"}
      />
      <path
        d="M5 8.75 L2 5.75 H8 Z"
        fill="currentColor"
        className={direction === "desc" ? "text-foreground" : "text-zinc-300"}
      />
    </svg>
  );
}

export function DefaultBrandMark() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-brand">
      <span className="text-[10px] font-bold text-brand-foreground">S</span>
    </div>
  );
}
