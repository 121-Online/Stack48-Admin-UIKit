import { amber, blue, red, zinc } from "../tokens";

/**
 * GTM chart series colours. Kept here (not in `tokens.ts`) so the public token
 * set stays chrome-only; these match the dashboard plots 1:1.
 *
 * - sent / ink: zinc-900
 * - delivered / brand: blue-500
 * - opened: Tailwind green-500 (GTM funnel / activity)
 * - clicked: Tailwind purple-500
 */
export const chartColors = {
  sent: zinc[900],
  delivered: blue[500],
  opened: "#22c55e",
  clicked: "#a855f7",
  bounce: red[600],
  complaint: amber[500],
  warning: amber[600],
  sendable: "#22c55e",
  excluded: red[500],
  bounced: amber[500],
  bandA: "#22c55e",
  bandB: blue[500],
  bandC: amber[500],
  bandF: red[500],
  unscored: zinc[400],
  grid: zinc[200],
  tick: zinc[500],
  land: zinc[200],
  ocean: zinc[50],
  marker: blue[500],
} as const;

export type ChartColorName = keyof typeof chartColors;
