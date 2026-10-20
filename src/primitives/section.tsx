import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Separator } from "./separator";

/** Props for {@link Section}. */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Sentence-case title (`text-sm font-semibold`). */
  title?: string;
  /** One-line muted description under the title. */
  description?: string;
  children: ReactNode;
  /** Right-aligned header action (buttons, badges). */
  action?: ReactNode;
}

/**
 * GTM page section (`src/components/ui/Section`).
 * Full-width, no card chrome — children provide their own surfaces.
 *
 * @example
 * ```tsx
 * <Section title="Send configuration" description="Caps and breaker" action={<Button size="sm">Edit</Button>}>
 *   {children}
 * </Section>
 * ```
 */
export function Section({
  title,
  description,
  children,
  className,
  action,
  ...props
}: SectionProps) {
  return (
    <section className={cn(className)} {...props}>
      {title || action ? (
        <div className="mb-3 flex items-start justify-between">
          <div className="min-h-[2.25rem]">
            {title ? <h2 className="text-sm font-semibold text-foreground">{title}</h2> : null}
            <p className="mt-0.5 min-h-4 text-xs text-muted-foreground">
              {description || "\u00A0"}
            </p>
          </div>
          {action ? <div className="flex-shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/** Props for {@link SectionDivider}. */
export type SectionDividerProps = HTMLAttributes<HTMLDivElement>;

/**
 * Hairline between GTM sections (`border-zinc-100`, `my-6`).
 *
 * @example
 * ```tsx
 * <Section title="Funnel">…</Section>
 * <SectionDivider />
 * <Section title="Reputation">…</Section>
 * ```
 */
export function SectionDivider({ className, ...props }: SectionDividerProps) {
  return <Separator className={cn("my-6 bg-zinc-100", className)} {...props} />;
}
