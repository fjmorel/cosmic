import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/cosmic/",
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: false }),
    viteReact(),
    tsConfigPaths(),
  ],
  build: {
    outDir: "docs",
    // https://rollupjs.org/configuration-options/
    rollupOptions: {
      input: {
        main: "index.html",
        generator: "generator/index.html",
        reference: "reference/index.html",
        privacy: "privacy/index.html",
      },
      output: {
        // todo: revisit once stuff is actually built out
        manualChunks: function manualChunks(id) {
          if (id.includes("@mui")) {
            return "mui";
          }
          if (id.includes("@tanstack")) {
            return "tanstack";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
