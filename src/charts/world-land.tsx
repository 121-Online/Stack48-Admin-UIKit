/**
 * Schematic landmass for the lightweight WorldMap. Equirectangular viewBox
 * `0 0 360 180` (lon -180..180, lat 90..-90). Not GIS-accurate — just enough
 * chrome to host proportional markers without TopoJSON or react-simple-maps.
 */
export const WORLD_VIEWBOX = "0 0 360 180";

export function lonLatToViewBox(lon: number, lat: number): { x: number; y: number } {
  return { x: lon + 180, y: 90 - lat };
}

const LAND = "hsl(var(--border))";

export function WorldLandmass() {
  return (
    <g fill={LAND} stroke="hsl(var(--background))" strokeWidth={0.6}>
      {/* North America */}
      <path d="M32 38 L48 28 L72 30 L95 38 L108 48 L118 62 L110 72 L96 70 L84 78 L70 74 L52 80 L38 68 L28 52 Z" />
      {/* Greenland */}
      <path d="M128 22 L142 18 L148 30 L136 36 L128 30 Z" />
      {/* South America */}
      <path d="M104 88 L118 84 L128 102 L124 138 L114 150 L104 132 L100 108 Z" />
      {/* Europe */}
      <path d="M168 40 L186 34 L198 40 L196 52 L184 56 L170 52 Z" />
      {/* UK / Ireland */}
      <path d="M168 40 L174 38 L176 44 L170 46 Z" />
      {/* Africa */}
      <path d="M176 58 L202 56 L214 74 L210 112 L192 128 L176 116 L170 86 Z" />
      {/* Asia */}
      <path d="M200 36 L230 28 L270 30 L310 40 L322 58 L300 72 L268 68 L238 74 L214 64 L200 50 Z" />
      {/* SE Asia / islands */}
      <path d="M280 78 L300 80 L306 92 L292 94 Z" />
      {/* Australia */}
      <path d="M292 118 L326 116 L332 134 L308 140 L292 130 Z" />
      {/* New Zealand */}
      <path d="M336 138 L340 136 L342 148 L338 150 Z" />
    </g>
  );
}
