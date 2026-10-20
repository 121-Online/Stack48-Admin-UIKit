import { useMemo, useState } from "react";
import { cn } from "../lib/cn";
import { ChartA11y, ChartEmpty } from "./a11y";
import { chartColors } from "./colors";
import {
  defaultNumberFormat,
  defaultPercentFormat,
  type NumberFormatter,
  type PercentFormatter,
} from "./format";
import { lonLatToViewBox, WORLD_VIEWBOX, WorldLandmass } from "./world-land";

export type WorldMapCoordinates = {
  lon: number;
  lat: number;
};

export type WorldMapRegion = {
  id: string;
  label: string;
  /** Current value when the parent already selected a view. */
  value?: number;
  /** Values keyed by `viewMode` id (`7d`, `today`, …). */
  values?: Record<string, number>;
  coordinates?: WorldMapCoordinates;
};

export type WorldMapViewMode = {
  id: string;
  label: string;
};

/**
 * Optional lon/lat lookup for common ISO3 codes used by GTM (GB/IE/US/CA).
 * Pass `coordinates` on a region to override or to plot anywhere else.
 */
export const defaultRegionCoordinates: Record<string, WorldMapCoordinates> = {
  GBR: { lon: -2, lat: 54 },
  IRL: { lon: -8, lat: 53 },
  USA: { lon: -98, lat: 39 },
  CAN: { lon: -106, lat: 56 },
  FRA: { lon: 2, lat: 47 },
  DEU: { lon: 10, lat: 51 },
  AUS: { lon: 134, lat: -25 },
  IND: { lon: 79, lat: 22 },
};

export type WorldMapProps = {
  regions: WorldMapRegion[];
  viewModes?: WorldMapViewMode[];
  viewMode?: string;
  defaultViewMode?: string;
  onViewModeChange?: (id: string) => void;
  totalLabel?: string;
  label?: string;
  emptyLabel?: string;
  formatValue?: NumberFormatter;
  formatPercent?: PercentFormatter;
  className?: string;
};

function regionValue(region: WorldMapRegion, viewMode: string | undefined): number {
  if (viewMode && region.values && region.values[viewMode] != null) {
    return region.values[viewMode];
  }
  return region.value ?? 0;
}

function regionCoordinates(region: WorldMapRegion): WorldMapCoordinates | undefined {
  return region.coordinates ?? defaultRegionCoordinates[region.id];
}

function markerFill(count: number, maxCount: number): string {
  if (count <= 0) return "transparent";
  const intensity = Math.min(0.9, Math.max(0.25, count / Math.max(maxCount, 1)));
  return `rgba(59, 130, 246, ${intensity})`;
}

/**
 * Lightweight geographic distribution map.
 *
 * GTM uses `react-simple-maps` + a TopoJSON fetch. That pair is a heavy
 * optional dep and a runtime asset, so this kit keeps the same layout
 * (view-mode toggle, proportional markers, country list) on a schematic SVG
 * landmass. Pass `coordinates` (or ISO3 ids from `defaultRegionCoordinates`).
 */
export function WorldMap({
  regions,
  viewModes,
  viewMode: viewModeProp,
  defaultViewMode,
  onViewModeChange,
  totalLabel = "sends",
  label = "Sends by region",
  emptyLabel = "No data",
  formatValue = defaultNumberFormat,
  formatPercent = defaultPercentFormat,
  className,
}: WorldMapProps) {
  const initialMode = viewModeProp ?? defaultViewMode ?? viewModes?.[0]?.id;
  const [uncontrolled, setUncontrolled] = useState(initialMode);
  const viewMode = viewModeProp ?? uncontrolled;

  const counts = useMemo(
    () => regions.map((region) => ({ region, value: regionValue(region, viewMode) })),
    [regions, viewMode],
  );
  const maxCount = Math.max(...counts.map((row) => row.value), 1);
  const total = counts.reduce((sum, row) => sum + row.value, 0);
  const [hovered, setHovered] = useState<string | null>(null);

  const rows = counts.map((row) => [
    row.region.label,
    formatValue(row.value),
    total > 0 ? formatPercent((row.value / total) * 100, 0) : "—",
  ]);

  function selectMode(id: string) {
    onViewModeChange?.(id);
    if (viewModeProp === undefined) setUncontrolled(id);
  }

  return (
    <div className={cn("space-y-3", className)}>
      {viewModes && viewModes.length > 0 ? (
        <div className="flex items-center justify-between">
          <div
            className="flex gap-1 rounded-sm bg-muted p-0.5"
            role="tablist"
            aria-label="Map window"
          >
            {viewModes.map((mode) => {
              const selected = mode.id === viewMode;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectMode(mode.id)}
                  className={cn(
                    "rounded-sm px-2 py-0.5 text-caption font-medium transition-colors",
                    selected
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
          <span className="text-micro tabular-nums text-muted-foreground">
            {formatValue(total)} {totalLabel}
          </span>
        </div>
      ) : null}

      <ChartA11y label={label} columns={["Region", "Value", "Share"]} rows={rows}>
        {regions.length === 0 ? (
          <ChartEmpty>{emptyLabel}</ChartEmpty>
        ) : (
          <div className="flex gap-4">
            <div className="min-w-0 flex-1 overflow-hidden rounded-sm border border-border bg-muted">
              <svg
                viewBox={WORLD_VIEWBOX}
                className="h-[200px] w-full"
                role="presentation"
                focusable="false"
              >
                <rect width="360" height="180" fill="hsl(var(--muted))" />
                <WorldLandmass />
                {counts.map(({ region, value }) => {
                  const coords = regionCoordinates(region);
                  if (!coords || value <= 0) return null;
                  const { x, y } = lonLatToViewBox(coords.lon, coords.lat);
                  const radius = Math.max(3, Math.min(12, Math.sqrt(value / maxCount) * 12));
                  const isHovered = hovered === region.id;
                  return (
                    <g
                      key={region.id}
                      onMouseEnter={() => setHovered(region.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill={markerFill(value, isHovered ? maxCount * 0.8 : maxCount)}
                        stroke={chartColors.marker}
                        strokeWidth={0.8}
                      />
                      <text
                        x={x}
                        y={y + radius + 8}
                        textAnchor="middle"
                        style={{ fontSize: 7, fill: chartColors.tick, fontWeight: 500 }}
                      >
                        {formatValue(value)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="w-32 flex-shrink-0">
              <ul className="space-y-1.5">
                {counts.map(({ region, value }) => {
                  const pct = total > 0 ? (value / total) * 100 : 0;
                  return (
                    <li
                      key={region.id}
                      className={cn(
                        "flex items-center justify-between rounded-sm px-1.5 py-1 text-caption",
                        hovered === region.id ? "bg-muted" : "",
                      )}
                      onMouseEnter={() => setHovered(region.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-sm"
                          style={{
                            backgroundColor: markerFill(value, maxCount) || chartColors.land,
                          }}
                        />
                        <span className="text-foreground">{region.label}</span>
                      </span>
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <span className="font-medium">{formatValue(value)}</span>
                        <span className="w-8 text-right text-micro text-muted-foreground">
                          {formatPercent(pct, 0)}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </ChartA11y>
    </div>
  );
}
