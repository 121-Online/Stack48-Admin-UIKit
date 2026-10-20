"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Props for {@link AppShell}.
 */
export interface AppShellProps {
  /**
   * Main column. Typically a `<main>` with `p-6` containing {@link PageHeader}
   * and page body.
   */
  children: ReactNode;
  /**
   * Left chrome. Pass a {@link Sidebar} — the shell does not fetch user or
   * nav data.
   */
  sidebar?: ReactNode;
  /**
   * Optional sticky header above the main column ({@link Topbar}).
   */
  topbar?: ReactNode;
  className?: string;
}

/**
 * Full-viewport admin frame: sidebar + optional topbar + content.
 *
 * Extracted from GTM `AppShell` in `Sidebar.tsx` (`flex min-h-screen bg-zinc-50`).
 * Presentational — nav items, user, and routing are caller-owned.
 *
 * @example
 * ```tsx
 * <AppShell
 *   sidebar={<Sidebar items={nav} pathname={pathname} renderLink={renderLink} />}
 * >
 *   <main className="p-6">
 *     <PageHeader title="Leads" />
 *   </main>
 * </AppShell>
 * ```
 */
export function AppShell({ children, sidebar, topbar, className }: AppShellProps) {
  return (
    <div className={cn("flex min-h-screen bg-background text-foreground", className)}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        {children}
      </div>
    </div>
  );
}
