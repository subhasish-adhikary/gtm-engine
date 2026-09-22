import { defineConfig, loadEnv } from "vite";
import { createJiti } from "jiti";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Dev-only bridge that mounts the real `api/subscribe.ts` serverless handler on
 * the Vite dev server, so newsletter signup works end to end with `npm run dev`
 * exactly as it does on Vercel. Production builds are unaffected ("serve" only).
 */
function apiSubscribeDevPlugin() {
  return {
    name: "api-subscribe-dev",
    apply: "serve",
    configResolved(config) {
      // Vite exposes env vars to client code via import.meta.env only; the
      // serverless handler reads process.env, so mirror the local .env* files
      // into the dev process. This never reaches the client bundle.
      const env = loadEnv(config.mode, process.cwd(), "");
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }
    },
    configureServer(server) {
      server.middlewares.use("/api/subscribe", async (req, res, next) => {
        if (req.method !== "POST") return next();
        const jiti = createJiti(import.meta.url);
        const mod = await jiti.import("./api/subscribe.ts");
        const handler = mod.default ?? mod;
        let raw = "";
        req.setEncoding("utf8");
        req.on("data", (chunk) => {
          raw += chunk;
        });
        req.on("end", async () => {
          try {
            await handler({ method: req.method, body: raw, headers: req.headers }, res);
          } catch {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: false, error: "dev_middleware_error" }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiSubscribeDevPlugin()],
  build: {
    rollupOptions: {
      output: {
        // Split the heaviest vendors out of the app chunk so entry JS
        // parse cost drops for content pages that never mount charts.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-charts": ["recharts"],
          "vendor-motion": ["framer-motion"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
