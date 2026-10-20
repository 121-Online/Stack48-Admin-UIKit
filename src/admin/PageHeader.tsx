"use client";

import { isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Slot } from "../primitives/slot";
import { defaultRenderLink, type RenderLink } from "./render-link";

/**
 * One crumb in {@link Breadcrumbs}.
 */
export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** When true, `children` of a composed crumb replace the default `<a>`. */
  asChild?: boolean;
}

/**
 * Props for {@link Breadcrumbs}.
 */
export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  children?: ReactNode;
  renderLink?: RenderLink;
  className?: string;
}

/**
 * GTM campaign-detail trail: `Campaigns / slug` with zinc separators.
 *
 * Pass `items` (data) or compose {@link Breadcrumb} children. Links go through
 * `renderLink` / `asChild` so any router works.
 */
export function Breadcrumbs({
  items,
  children,
  renderLink = defaultRenderLink,
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4 text-sm", className)}>
      <ol className="flex flex-wrap items-center">
        {items?.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.href ?? ""}-${index}`} className="flex items-center">
              {item.href && !last ? (
                renderLink({
                  href: item.href,
                  className: "text-zinc-500 hover:text-zinc-900",
                  children: item.label,
                })
              ) : (
                <span className={last ? "font-medium text-zinc-900" : "text-zinc-500"}>
                  {item.label}
                </span>
              )}
              {!last ? <span className="mx-2 text-zinc-300">/</span> : null}
            </li>
          );
        })}
        {children}
      </ol>
    </nav>
  );
}

/**
 * Props for a single composed {@link Breadcrumb}.
 */
export interface BreadcrumbProps extends HTMLAttributes<HTMLLIElement> {
  href?: string;
  asChild?: boolean;
  current?: boolean;
  renderLink?: RenderLink;
}

/**
 * Composable crumb. Use `asChild` to pass a router `Link` as the child.
 *
 * @example
 * ```tsx
 * <Breadcrumbs>
 *   <Breadcrumb asChild>
 *     <Link href="/campaigns">Campaigns</Link>
 *   </Breadcrumb>
 *   <Breadcrumb current>launch-uk</Breadcrumb>
 * </Breadcrumbs>
 * ```
 */
export function Breadcrumb({
  href,
  asChild = false,
  current = false,
  renderLink = defaultRenderLink,
  className,
  children,
  ...props
}: BreadcrumbProps) {
  const body = asChild ? (
    <Slot className={cn("text-zinc-500 hover:text-zinc-900", className)}>{children}</Slot>
  ) : href && !current ? (
    renderLink({
      href,
      className: cn("text-zinc-500 hover:text-zinc-900", className),
      children,
    })
  ) : (
    <span className={cn(current ? "font-medium text-zinc-900" : "text-zinc-500", className)}>
      {children}
    </span>
  );

  return (
    <li className="flex items-center" {...props}>
      {body}
      {!current ? <span className="mx-2 text-zinc-300">/</span> : null}
    </li>
  );
}

/**
 * Props for {@link PageHeader}.
 */
export interface PageHeaderProps {
  /** Page title (`text-lg font-semibold`, GTM list pages). */
  title: ReactNode;
  /** One-line subtitle under the title (`text-xs text-zinc-500`). */
  description?: ReactNode;
  /** Trail above the title. */
  breadcrumbs?: BreadcrumbItem[];
  /** Right-aligned actions (primary button, filters). */
  actions?: ReactNode;
  renderLink?: RenderLink;
  className?: string;
  children?: ReactNode;
}

/**
 * Page title block from GTM list pages (`Leads`, `Campaigns`, `Platform Users`).
 *
 * Full-width, no card. Title + optional description on the left, actions on
 * the right, optional breadcrumbs above.
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  renderLink,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-6", className)}>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumbs items={breadcrumbs} renderLink={renderLink} className="mb-3" />
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {isValidElement(title) ? (
            title
          ) : (
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          )}
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
          {children}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}

/**
 * Props for {@link Topbar}.
 */
export interface TopbarProps {
  /** Left cluster (breadcrumbs, page name). */
  children?: ReactNode;
  /** Right cluster (search, user, actions). */
  actions?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  renderLink?: RenderLink;
  className?: string;
  sticky?: boolean;
}

/**
 * Optional `h-header` content bar. GTM pages usually put the title in the
 * main column; use this when the app wants a sticky chrome strip above it.
 */
export function Topbar({
  children,
  actions,
  breadcrumbs,
  renderLink,
  className,
  sticky = true,
}: TopbarProps) {
  return (
    <div
      className={cn(
        "flex h-header items-center justify-between gap-4 border-b border-border bg-card px-6",
        sticky && "sticky top-0 z-20",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} renderLink={renderLink} className="mb-0" />
        ) : null}
        {children}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
