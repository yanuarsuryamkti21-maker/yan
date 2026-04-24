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

  // Use JSON body parser
  app.use(express.json());

  // Static files logging in development
  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      if (!req.url.includes("node_modules") && !req.url.includes("@vite")) {
        console.log(`[DEV] ${req.method} ${req.url}`);
      }
      next();
    });
  }

  // API routes go here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || 'development' });
  });

  if (process.env.NODE_ENV !== "production") {
    // Development mode using Vite middleware
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: "spa", // Let Vite handle SPA fallback for us
    });
    
    app.use(vite.middlewares);

    // SPA fallback for development
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      // Skip API and files
      if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
      }

      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production mode
    const distPath = path.resolve(__dirname, "dist");
    
    // Serve static files from dist folder
    app.use(express.static(distPath));

    // Production catch-all: always serve index.html for SPA routes
    app.get("*", (req, res) => {
      // Don't intercept API routes that weren't caught above
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
