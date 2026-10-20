import { cn } from "../lib/cn";
import { ChartA11y } from "./a11y";
import { defaultNumberFormat, type NumberFormatter } from "./format";

export type SparklineProps = {
  /** Series values in plot order (left → right). */
  data: number[];
  width?: number;
  height?: number;
  /** Stroke / fill colour. Defaults to currentColor so chrome can tint it. */
  color?: string;
  /** Draw a translucent area under the line (GTM KPI tile sparkline). */
  fill?: boolean;
  fillOpacity?: number;
  strokeWidth?: number;
  className?: string;
  /** Accessible name. Required for a meaningful `aria` description. */
  label?: string;
  formatValue?: NumberFormatter;
};

/**
 * Tiny SVG trend line. Used inline next to KPI values and in the dense metrics header.
 *
 * Empty / single-point data renders a blank frame (no fake line).
 */
export function Sparkline({
  data,
  width = 80,
  height = 24,
  color = "currentColor",
  fill = false,
  fillOpacity = 0.3,
  strokeWidth = 1.5,
  className,
  label = "Sparkline",
  formatValue = defaultNumberFormat,
}: SparklineProps) {
  const rows = data.map((value, index) => [String(index + 1), formatValue(value)]);
  const empty = data.length < 2;

  let polyline = "";
  let area = "";

  if (!empty) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = 2;
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - pad * 2) - pad;
      return { x, y };
    });
    polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
    const first = points[0];
    const last = points[points.length - 1];
    if (fill && first && last) {
      area = `${polyline} ${last.x},${height} ${first.x},${height}`;
    }
  }

  return (
    <ChartA11y
      label={label}
      description={empty ? "No data" : `${data.length} points`}
      columns={["Point", "Value"]}
      rows={rows}
      hideVisual
      className={cn("inline-block align-middle", className)}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        focusable="false"
      >
        {area ? (
          <polygon points={area} fill={color} fillOpacity={fillOpacity} stroke="none" />
        ) : null}
        {polyline ? (
          <polyline
            points={polyline}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </svg>
    </ChartA11y>
  );
}
