import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Screen-reader data table used as the accessible alternative to a visual chart.
 */
export function HiddenDataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: Array<Array<string | number>>;
}) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Figure wrapper: visual plot is decorative; the hidden table carries the values.
 */
export function ChartA11y({
  label,
  description,
  columns,
  rows,
  children,
  className,
  style,
  hideVisual = false,
}: {
  label: string;
  description?: string;
  columns: string[];
  rows: Array<Array<string | number>>;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Hide the visual plot from AT when a sibling data table carries the values. */
  hideVisual?: boolean;
}) {
  return (
    <figure className={cn("m-0 w-full", className)} style={style}>
      <figcaption className="sr-only">
        {label}
        {description ? `. ${description}` : ""}
      </figcaption>
      <div aria-hidden={hideVisual ? true : undefined}>{children}</div>
      <HiddenDataTable caption={label} columns={columns} rows={rows} />
    </figure>
  );
}

/** Compact empty placeholder used by every chart when series data is missing. */
export function ChartEmpty({ children = "No data" }: { children?: ReactNode }) {
  return <p className="py-6 text-center text-caption text-muted-foreground">{children}</p>;
}
