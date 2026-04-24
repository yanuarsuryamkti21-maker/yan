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

  // Perkuat penanganan 404 dengan rute catch-all yang lebih cerdas
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Middleware logging untuk debugging
    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      next();
    });

    app.use(vite.middlewares);
    
    // Rute SPA untuk Development: Melayani index.html untuk semua navigasi non-API
    app.get("*", async (req, res, next) => {
      // Kecualikan rute API
      if (req.path.startsWith("/api")) {
        return next();
      }

      // Pastikan rute tidak terlihat seperti file statis (ekstensi file)
      const isFile = req.path.split("/").pop()?.includes(".");
      if (isFile) {
        return next();
      }

      try {
        const template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Mode produksi: rute sakti versi statis
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
