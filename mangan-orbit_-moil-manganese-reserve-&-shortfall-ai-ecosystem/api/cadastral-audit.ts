import type { Request, Response } from "express";
import { runGeoAIAudit, type GeoAIAuditRequest } from "./_gemini.ts";

export default async function handler(req: Request | any, res: Response | any) {
  // Handle CORS
  if (res.setHeader) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
  }

  if (req.method === "OPTIONS") {
    if (res.status) return res.status(200).end();
    return res.end();
  }

  try {
    const body: GeoAIAuditRequest = req.body || {};
    const result = await runGeoAIAudit(body);
    if (res.status && typeof res.status === "function") {
      return res.status(200).json(result);
    }
    return res.json(result);
  } catch (error: any) {
    console.error("Error in /api/cadastral-audit:", error);
    const errorResponse = {
      success: false,
      error: error?.message || "Internal GeoAI processing error",
      timestamp: new Date().toISOString(),
    };
    if (res.status && typeof res.status === "function") {
      return res.status(500).json(errorResponse);
    }
    return res.json(errorResponse);
  }
}
