import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { InboxChipVariant } from "../types";

const variantClass: Record<InboxChipVariant, string> = {
  default: "bg-zinc-100 text-zinc-700",
  info: "bg-blue-50 text-blue-700",
  muted: "bg-zinc-50 text-zinc-500",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  success: "bg-emerald-50 text-emerald-700",
};

export function Chip({
  children,
  variant = "default",
  className,
  href,
  onClick,
  title,
}: {
  children: ReactNode;
  variant?: InboxChipVariant;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  title?: string;
}) {
  const cls = cn(
    "inline-flex items-center px-1.5 py-0 text-micro font-medium rounded",
    variantClass[variant],
    href || onClick ? "hover:underline" : null,
    className,
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} title={title}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} title={title}>
        {children}
      </button>
    );
  }

  return (
    <span className={cls} title={title}>
      {children}
    </span>
  );
}
