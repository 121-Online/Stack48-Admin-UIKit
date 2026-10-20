/**
 * Stack48 Admin UI design tokens.
 *
 * Extracted from the GTM ops dashboard at gtm.stack48.com (Inter 13px, zinc
 * canvas, blue-500 accent, 2px radii, almost no card shadow). Hex values match
 * Tailwind zinc / blue / emerald / amber / red scales used in that CSS.
 *
 * CSS variables live in `styles/theme.css`. Keep this file and the CSS in sync —
 * `src/tokens.test.ts` asserts the names.
 */

/** Tailwind zinc scale used as the GTM chrome. */
export const zinc = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
} as const;

/** Brand / focus blue — GTM `--accent` is blue-500. */
export const blue = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
} as const;

export const red = {
  50: "#fef2f2",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
} as const;

export const emerald = {
  50: "#ecfdf5",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
} as const;

export const amber = {
  50: "#fffbeb",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f",
} as const;

/**
 * Space-separated HSL channels for shadcn-style `hsl(var(--token) / <alpha>)`.
 * Do not wrap these in `hsl()` inside the CSS file.
 */
export const hsl = {
  zinc: {
    50: "0 0% 98%",
    100: "240 5% 96%",
    200: "240 6% 90%",
    300: "240 5% 84%",
    400: "240 5% 65%",
    500: "240 4% 46%",
    600: "240 5% 34%",
    700: "240 5% 26%",
    800: "240 4% 16%",
    900: "240 6% 10%",
    950: "240 10% 4%",
  },
  white: "0 0% 100%",
  brand: "217 91% 60%",
  brandHover: "221 83% 53%",
  destructive: "0 72% 51%",
  success: "161 94% 30%",
  warning: "32 95% 44%",
} as const;

/**
 * shadcn semantic CSS variable names (without `--`).
 *
 * Mapping from GTM:
 * - canvas `--background` #fafafa, `--foreground` #18181b
 * - `--primary` is zinc-900 (GTM `.btn-primary`), not brand blue
 * - `--brand` is GTM `--accent` (#3b82f6); shadcn `--accent` is the hover wash
 * - `--ring` is blue-500 (GTM `.input-field:focus`)
 * - `--radius` is 0.125rem (GTM buttons, inputs, `.stat-card`)
 */
export const semanticCssVarNames = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "radius",
  "brand",
  "brand-foreground",
  "brand-hover",
  "success",
  "success-foreground",
  "success-muted",
  "warning",
  "warning-foreground",
  "warning-muted",
  "sidebar",
  "sidebar-foreground",
  "sidebar-border",
  "sidebar-accent",
  "sidebar-width",
  "header-height",
  "font-sans",
  "font-mono",
  "font-size-body",
  "shadow-sm",
  "shadow-lg",
] as const;

export type SemanticCssVarName = (typeof semanticCssVarNames)[number];

export const lightSemantic = {
  background: hsl.zinc[50],
  foreground: hsl.zinc[900],
  card: hsl.white,
  "card-foreground": hsl.zinc[900],
  popover: hsl.white,
  "popover-foreground": hsl.zinc[900],
  primary: hsl.zinc[900],
  "primary-foreground": hsl.white,
  secondary: hsl.white,
  "secondary-foreground": hsl.zinc[700],
  muted: hsl.zinc[100],
  "muted-foreground": hsl.zinc[500],
  accent: hsl.zinc[100],
  "accent-foreground": hsl.zinc[900],
  destructive: hsl.destructive,
  "destructive-foreground": hsl.white,
  border: hsl.zinc[200],
  input: hsl.zinc[300],
  ring: hsl.brand,
  brand: hsl.brand,
  "brand-foreground": hsl.white,
  "brand-hover": hsl.brandHover,
  success: hsl.success,
  "success-foreground": hsl.white,
  "success-muted": "152 81% 96%",
  warning: hsl.warning,
  "warning-foreground": hsl.zinc[900],
  "warning-muted": "48 100% 96%",
  sidebar: hsl.white,
  "sidebar-foreground": hsl.zinc[900],
  "sidebar-border": hsl.zinc[200],
  "sidebar-accent": hsl.zinc[100],
} as const;

/**
 * Dark palette is not shipped by GTM today (no `.dark` in production CSS).
 * These are the zinc-inverted counterparts so `.dark` works when an app opts in.
 */
export const darkSemantic = {
  background: hsl.zinc[950],
  foreground: hsl.zinc[50],
  card: hsl.zinc[900],
  "card-foreground": hsl.zinc[50],
  popover: hsl.zinc[900],
  "popover-foreground": hsl.zinc[50],
  primary: hsl.zinc[50],
  "primary-foreground": hsl.zinc[900],
  secondary: hsl.zinc[900],
  "secondary-foreground": hsl.zinc[300],
  muted: hsl.zinc[800],
  "muted-foreground": hsl.zinc[400],
  accent: hsl.zinc[800],
  "accent-foreground": hsl.zinc[50],
  destructive: "0 74% 42%",
  "destructive-foreground": hsl.white,
  border: hsl.zinc[800],
  input: hsl.zinc[700],
  ring: hsl.brand,
  brand: hsl.brand,
  "brand-foreground": hsl.white,
  "brand-hover": hsl.brandHover,
  success: "160 84% 39%",
  "success-foreground": hsl.zinc[950],
  "success-muted": "163 88% 20%",
  warning: "38 92% 50%",
  "warning-foreground": hsl.zinc[950],
  "warning-muted": "23 82% 31%",
  sidebar: hsl.zinc[900],
  "sidebar-foreground": hsl.zinc[50],
  "sidebar-border": hsl.zinc[800],
  "sidebar-accent": hsl.zinc[800],
} as const;

export const radii = {
  none: "0px",
  /** GTM buttons, inputs, `.stat-card` — `--radius`. */
  sm: "0.125rem",
  /** GTM `.badge`. */
  md: "0.25rem",
  /** GTM login panel (`rounded-lg`). */
  lg: "0.5rem",
  full: "9999px",
} as const;

export const shadows = {
  none: "none",
  /** Tailwind `shadow-sm` — used sparingly; GTM stat cards have no shadow. */
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  /** Tailwind `shadow-lg` — overlays / popovers. */
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
} as const;

export const typography = {
  fontSans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontMono: '"JetBrains Mono", Menlo, ui-monospace, SFMono-Regular, monospace',
  /** GTM `body { font-size: 13px; line-height: 1.5 }`. */
  bodySize: "13px",
  bodyLineHeight: "1.5",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    "2xs": { fontSize: "9px", lineHeight: "12px" },
    micro: { fontSize: "10px", lineHeight: "14px" },
    caption: { fontSize: "11px", lineHeight: "16px" },
    xs: { fontSize: "12px", lineHeight: "16px" },
    body: { fontSize: "13px", lineHeight: "20px" },
    sm: { fontSize: "14px", lineHeight: "20px" },
    lg: { fontSize: "18px", lineHeight: "28px" },
    xl: { fontSize: "20px", lineHeight: "28px" },
    "2xl": { fontSize: "24px", lineHeight: "32px" },
    "4xl": { fontSize: "36px", lineHeight: "40px" },
  },
} as const;

/**
 * Named spacing steps GTM uses most (Tailwind defaults). Prefer these over
 * one-off arbitrary values.
 */
export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  12: "3rem",
  14: "3.5rem",
} as const;

/** Shell metrics taken from GTM (`w-64` drawer, `h-14` / `pt-14` header offset). */
export const layout = {
  sidebarWidth: "16rem",
  headerHeight: "3.5rem",
} as const;

export const tokens = {
  zinc,
  blue,
  red,
  emerald,
  amber,
  hsl,
  lightSemantic,
  darkSemantic,
  radii,
  shadows,
  typography,
  spacing,
  layout,
  semanticCssVarNames,
} as const;

export type Tokens = typeof tokens;
