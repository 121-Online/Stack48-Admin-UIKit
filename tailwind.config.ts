import type { Config } from "tailwindcss";
import preset from "./src/preset";

/**
 * Local Tailwind config for Storybook and tests.
 * Apps consuming the kit should add `preset` from `@stack48/admin-ui/preset`.
 */
const config = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}", "./stories/**/*.{ts,tsx,mdx}"],
} satisfies Config;

export default config;
