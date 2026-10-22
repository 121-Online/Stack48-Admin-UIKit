"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

/** Props for {@link Panel}. */
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Bordered surface. Section titles stay outside; this holds the body.
 *
 * @example
 * ```tsx
 * <Panel>
 *   <KpiTileRow>{tiles}</KpiTileRow>
 * </Panel>
 * ```
 */
export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <div
      {...props}
      className={cn(
        "min-w-0 overflow-hidden rounded-sm border border-border bg-card p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Props for {@link SettingsGroup}. */
export interface SettingsGroupProps extends HTMLAttributes<HTMLElement> {
  /** Sentence-case group title. */
  title: string;
  /** One-line muted description under the title. */
  description?: string;
  children: ReactNode;
}

/**
 * Title for one group of settings. Sits above the sections inside the group.
 *
 * @example
 * ```tsx
 * <SettingsGroup title="Preview runtime" description="The software that runs each live preview.">
 *   <Panel>{children}</Panel>
 * </SettingsGroup>
 * ```
 */
export function SettingsGroup({
  title,
  description,
  children,
  className,
  ...props
}: SettingsGroupProps) {
  return (
    <section {...props} className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** Props for {@link ChartSlot}. */
export interface ChartSlotProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Fixed-height slot so area charts cannot grow out of a {@link Panel}.
 *
 * @example
 * ```tsx
 * <Panel>
 *   <ChartSlot>
 *     <DailyActivityChart data={points} />
 *   </ChartSlot>
 * </Panel>
 * ```
 */
export function ChartSlot({ children, className, style, ...props }: ChartSlotProps) {
  const capped: CSSProperties = { ...style, height: 240, maxHeight: 240 };
  return (
    <div {...props} className={cn("min-w-0 overflow-hidden", className)} style={capped}>
      {children}
    </div>
  );
}
