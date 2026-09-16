import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import healthHandler from "./api/health.ts";
import cadastralAuditHandler from "./api/cadastral-audit.ts";
import aiCadastralAuditHandler from "./api/ai/cadastral-audit.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // API Routes
  app.all("/api/health", (req, res) => {
    return healthHandler(req, res);
  });

  app.all("/api/cadastral-audit", (req, res) => {
    return cadastralAuditHandler(req, res);
  });

  app.all("/api/ai/cadastral-audit", (req, res) => {
    return aiCadastralAuditHandler(req, res);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MANGAN-ORBIT] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
