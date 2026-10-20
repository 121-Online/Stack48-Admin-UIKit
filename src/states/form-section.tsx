import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Props for {@link FormSection}.
 */
export interface FormSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  /** Right-aligned header action (reset, edit). */
  action?: ReactNode;
  /** Wrap children in a 1px zinc surface. */
  bordered?: boolean;
  children: ReactNode;
}

/**
 * Titled form group from GTM campaign config (`Sending hours`, `From`).
 * Full width, no cartoon card. Use {@link FormField} inside.
 *
 * @example
 * ```tsx
 * <FormSection title="Sending hours" action={<button type="button">Reset</button>}>
 *   <ScheduleEditor value={schedule} onChange={setSchedule} />
 * </FormSection>
 * ```
 */
export function FormSection({
  title,
  description,
  action,
  bordered = false,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <section className={cn("space-y-3", className)} {...props}>
      {title || action || description ? (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? <h3 className="text-xs font-medium text-zinc-700">{title}</h3> : null}
            {description ? <p className="mt-0.5 text-[11px] text-zinc-500">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {bordered ? (
        <div className="rounded-sm border border-border bg-card">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
