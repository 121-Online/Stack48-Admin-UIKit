import { copyFileSync, mkdirSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/tokens.ts",
    "src/preset.ts",
    "src/lib/cn.ts",
    "src/primitives/index.ts",
    "src/admin/index.ts",
    "src/charts/index.ts",
    "src/inbox/index.ts",
    "src/states/index.ts",
    "src/components/primitives.ts",
    "src/components/admin.ts",
    "src/components/charts.ts",
    "src/components/inbox.ts",
    "src/components/states.ts",
  ],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  target: "es2022",
  outDir: "dist",
  external: ["react", "react-dom", "react/jsx-runtime", "recharts", "tailwindcss"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  async onSuccess() {
    mkdirSync("dist", { recursive: true });
    copyFileSync("src/styles/theme.css", "dist/theme.css");
    copyFileSync("src/styles/styles.css", "dist/styles.css");
  },
});
