"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DefaultBrandMark,
  MenuIcon,
} from "./_internal/icons";
import { useControllableState } from "./_internal/use-controllable-state";
import { isActiveRoute } from "./is-active-route";
import { defaultRenderLink, type RenderLink } from "./render-link";

/**
 * One destination in the sidebar.
 */
export interface SidebarNavItem {
  /** Path the item navigates to. */
  href: string;
  /** Visible label (hidden when the rail is collapsed). */
  label: string;
  /** 16px stroke icon. */
  icon?: ReactNode;
  /** Count or custom node (inbox unhandled). Hidden as a pill when collapsed; a dot remains. */
  badge?: ReactNode;
  /** Matching strategy. Default: exact for `/`, prefix otherwise. */
  match?: "exact" | "prefix";
  /** Native `title` / tooltip. */
  title?: string;
}

/**
 * Optional labelled, collapsible cluster of nav items.
 */
export interface SidebarNavGroup {
  id: string;
  /** Section label. Omit for an ungrouped list (GTM default). */
  label?: string;
  items: SidebarNavItem[];
  /** Uncontrolled initial open state. Default `true`. */
  defaultOpen?: boolean;
  /** When false the group cannot be collapsed. Default `true` if `label` is set. */
  collapsible?: boolean;
}

/**
 * Props for {@link Sidebar}.
 */
export interface SidebarProps {
  /** Nav groups. Prefer this when the rail has sections. */
  groups?: SidebarNavGroup[];
  /** Flat list shortcut — wrapped as a single unlabelled group. */
  items?: SidebarNavItem[];
  /** Current path from the app router. Required for active styles. */
  pathname?: string;
  /** Controlled collapsed (icon rail) state. */
  collapsed?: boolean;
  /** Uncontrolled initial collapsed state. */
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Controlled mobile drawer. */
  mobileOpen?: boolean;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /**
   * Brand mark + wordmark. Default is the Stack48 “S” tile from GTM.
   */
  brand?: ReactNode;
  brandHref?: string;
  brandLabel?: string;
  /** User / sign-out / extra chrome above the collapse control. */
  footer?: ReactNode;
  /** Hide the built-in collapse control. */
  hideCollapseButton?: boolean;
  /** Router adapter. Default: `<a>`. */
  renderLink?: RenderLink;
  className?: string;
}

function resolveGroups(groups: SidebarNavGroup[] | undefined, items: SidebarNavItem[] | undefined) {
  if (groups && groups.length > 0) {
    return groups;
  }
  if (items && items.length > 0) {
    return [{ id: "main", items, collapsible: false }] satisfies SidebarNavGroup[];
  }
  return [] as SidebarNavGroup[];
}

/**
 * Sticky left rail extracted from GTM `Sidebar.tsx`.
 *
 * Collapses to a 3.5rem icon rail, supports labelled collapsible groups,
 * `aria-current="page"` active items, a footer slot, and a mobile overlay.
 * No `localStorage`, `fetch`, or router hooks — pass `pathname` and `renderLink`.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   pathname={pathname}
 *   items={[
 *     { href: "/", label: "Overview", icon: <HomeIcon /> },
 *     { href: "/leads", label: "Leads", icon: <LeadsIcon />, badge: 12 },
 *   ]}
 *   footer={<span className="truncate text-caption text-muted-foreground">{email}</span>}
 *   renderLink={({ href, children, className, ...rest }) => (
 *     <Link href={href} className={className} {...rest}>{children}</Link>
 *   )}
 * />
 * ```
 */
export function Sidebar({
  groups,
  items,
  pathname,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileOpen: mobileOpenProp,
  defaultMobileOpen = false,
  onMobileOpenChange,
  brand,
  brandHref = "/",
  brandLabel = "Stack48",
  footer,
  hideCollapseButton = false,
  renderLink = defaultRenderLink,
  className,
}: SidebarProps) {
  const resolvedGroups = resolveGroups(groups, items);
  const [collapsed, setCollapsed] = useControllableState({
    value: collapsedProp,
    defaultValue: defaultCollapsed,
    onChange: onCollapsedChange,
  });
  const [mobileOpen, setMobileOpen] = useControllableState({
    value: mobileOpenProp,
    defaultValue: defaultMobileOpen,
    onChange: onMobileOpenChange,
  });
  const [openGroups, setOpenGroups] = useControllableState<Record<string, boolean>>({
    defaultValue: Object.fromEntries(
      resolvedGroups.map((group) => [group.id, group.defaultOpen !== false]),
    ),
  });

  const brandNode = brand ?? (
    <>
      <DefaultBrandMark />
      {!collapsed && <span className="text-sm font-semibold text-foreground">{brandLabel}</span>}
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-3 top-3 z-50 rounded-sm border border-border bg-card p-2 hover:bg-muted lg:hidden"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="admin-sidebar"
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        id="admin-sidebar"
        className={cn(
          "fixed top-0 left-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 lg:sticky",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-14" : "w-sidebar",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-12 items-center border-b border-zinc-100 px-3",
            collapsed ? "justify-center" : "gap-2",
          )}
        >
          {renderLink({
            href: brandHref,
            className: "flex items-center gap-2 transition-opacity hover:opacity-80",
            children: brandNode,
            "aria-label": brandLabel,
          })}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2" aria-label="Admin">
          <div className="space-y-2">
            {resolvedGroups.map((group) => {
              const collapsible = group.collapsible ?? Boolean(group.label);
              const isOpen = collapsed ? true : (openGroups[group.id] ?? true);
              return (
                <div key={group.id}>
                  {group.label && !collapsed ? (
                    <button
                      type="button"
                      className={cn(
                        "mb-0.5 flex w-full items-center justify-between px-2 py-1 text-micro font-medium uppercase tracking-wider text-muted-foreground",
                        collapsible && "rounded-sm hover:bg-sidebar-accent hover:text-foreground",
                      )}
                      onClick={() => {
                        if (!collapsible) return;
                        setOpenGroups((prev) => ({ ...prev, [group.id]: !isOpen }));
                      }}
                      aria-expanded={collapsible ? isOpen : undefined}
                      disabled={!collapsible}
                    >
                      <span>{group.label}</span>
                      {collapsible ? (
                        <ChevronDownIcon
                          className={cn("transition-transform", isOpen ? "rotate-0" : "-rotate-90")}
                        />
                      ) : null}
                    </button>
                  ) : null}
                  {isOpen ? (
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const active = isActiveRoute(pathname, item.href, item.match);
                        const title = collapsed ? (item.title ?? item.label) : item.title;
                        return (
                          <div key={item.href}>
                            {renderLink({
                              href: item.href,
                              title,
                              "aria-current": active ? "page" : undefined,
                              className: cn(
                                "flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-body font-medium transition-colors",
                                collapsed && "justify-center",
                                active
                                  ? "bg-zinc-100 text-zinc-900"
                                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                              ),
                              onClick: () => setMobileOpen(false),
                              children: (
                                <>
                                  {item.icon ? (
                                    <span
                                      className={cn(
                                        "relative flex shrink-0",
                                        active && "text-brand",
                                      )}
                                    >
                                      {item.icon}
                                      {collapsed && item.badge != null && item.badge !== false ? (
                                        <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-brand" />
                                      ) : null}
                                    </span>
                                  ) : null}
                                  {!collapsed ? (
                                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                                  ) : null}
                                  {!collapsed && item.badge != null && item.badge !== false ? (
                                    <span className="ml-auto inline-flex min-w-[1.25rem] shrink-0 items-center justify-center rounded-full bg-brand px-1 py-0.5 text-center text-[10px] leading-none font-semibold text-brand-foreground">
                                      {item.badge}
                                    </span>
                                  ) : null}
                                </>
                              ),
                            })}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="space-y-1 border-t border-zinc-100 p-2">
          {footer ? (
            <div className={cn("flex items-center gap-2 px-2 py-1", collapsed && "justify-center")}>
              {footer}
            </div>
          ) : null}
          {!hideCollapseButton ? (
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "flex w-full items-center gap-2 rounded-sm px-2 py-1 text-caption text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700",
                collapsed && "justify-center",
              )}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              {!collapsed ? <span>Collapse</span> : null}
            </button>
          ) : null}
        </div>
      </aside>
    </>
  );
}
