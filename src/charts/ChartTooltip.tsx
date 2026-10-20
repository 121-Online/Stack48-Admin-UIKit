import type { ReactNode } from "react";
import { defaultNumberFormat, type NumberFormatter } from "./format";

export type ChartTooltipItem = {
  name: string;
  value: number;
  color?: string;
  detail?: string;
};

/**
 * Dense GTM-style chart tooltip (1px zinc border, 12px type, no large radius).
 */
export function ChartTooltip({
  active,
  label,
  items,
  formatValue = defaultNumberFormat,
  children,
}: {
  active?: boolean;
  label?: ReactNode;
  items?: ChartTooltipItem[];
  formatValue?: NumberFormatter;
  children?: ReactNode;
}) {
  if (!active) return null;
  const rows = items ?? [];
  if (rows.length === 0 && !children && !label) return null;

  return (
    <div className="rounded-sm border border-border bg-card px-2 py-1.5 text-caption shadow-sm">
      {label ? <div className="mb-1 font-medium text-foreground">{label}</div> : null}
      {rows.map((item) => (
        <div key={item.name} className="flex items-baseline justify-between gap-4 tabular-nums">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            {item.color ? (
              <span
                className="inline-block h-1.5 w-1.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            ) : null}
            {item.name}
          </span>
          <span className="font-medium text-foreground">
            {formatValue(item.value)}
            {item.detail ? (
              <span className="ml-1 font-normal text-muted-foreground">{item.detail}</span>
            ) : null}
          </span>
        </div>
      ))}
      {children}
    </div>
  );
}
