import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const rawPort = process.env.PORT ?? env.PORT ?? "5173";

  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  const basePath = process.env.BASE_PATH ?? env.BASE_PATH ?? "/";
  const apiProxyTarget =
    process.env.VITE_API_PROXY_TARGET ??
    env.VITE_API_PROXY_TARGET ??
    "http://localhost:5000";

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(
          import.meta.dirname,
          "..",
          "..",
          "attached_assets",
        ),
        "@sanity/client": path.resolve(
          import.meta.dirname,
          "src/shims/sanity-client.ts",
        ),
        "@sanity/image-url": path.resolve(
          import.meta.dirname,
          "src/shims/sanity-image-url.ts",
        ),
        "@portabletext/react": path.resolve(
          import.meta.dirname,
          "src/shims/portabletext-react.ts",
        ),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      proxy: {
        "/api": {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
      },
      fs: {
        strict: false,
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
      proxy: {
        "/api": {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
