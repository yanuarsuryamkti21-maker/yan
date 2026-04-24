import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic API check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Catch-all for development to ensure SPA routing works
    app.get("*", async (req, res, next) => {
      // Skip for static files and standard Vite paths
      if (req.path.includes(".") || req.path.startsWith("/@") || req.path.startsWith("/node_modules")) {
        return next();
      }

      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production: serve static files from dist
    const distPath = path.resolve(process.cwd(), "dist");
    
    // Ensure dist exists before serving
    if (!fs.existsSync(distPath)) {
      console.error(`Production dist folder not found at ${distPath}. Running build might be necessary.`);
    }

    app.use(express.static(distPath, { index: false })); // index: false to let catch-all handle it

    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not built. Please run build first.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
