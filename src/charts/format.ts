/**
 * Default formatters for chart labels. Callers should pass their own when the
 * app has a locale or unit convention.
 */

/** Format a count with the runtime locale (GTM uses `toLocaleString()`). */
export function defaultNumberFormat(value: number): string {
  return value.toLocaleString();
}

/**
 * Format a percentage number that is already in percent units (e.g. `12.5` → `12.5%`).
 */
export function defaultPercentFormat(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(digits)}%`;
}

/**
 * Compact GTM axis tick: `2026-10-20` → `20/10`.
 */
export function defaultDateTick(isoDate: string): string {
  const parts = isoDate.split("-");
  const month = parts[1];
  const day = parts[2];
  if (!month || !day) return isoDate;
  return `${Number.parseInt(day, 10)}/${Number.parseInt(month, 10)}`;
}

/**
 * Tooltip / table date: `2026-10-20` → `20/10/2026`.
 */
export function defaultDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export type NumberFormatter = (value: number) => string;
export type PercentFormatter = (value: number, digits?: number) => string;
export type DateFormatter = (isoDate: string) => string;
