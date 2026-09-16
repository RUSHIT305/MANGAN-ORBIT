import type { Request, Response } from "express";
import { runGeoAIAudit, type GeoAIAuditRequest } from "../_gemini.ts";

export default async function handler(req: Request | any, res: Response | any) {
  // CORS Headers
  if (res.setHeader) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );
  }

  if (req.method === "OPTIONS") {
    if (res.status) return res.status(200).end();
    return res.end();
  }

  try {
    const body: GeoAIAuditRequest = req.body || {};
    const auditResponse = await runGeoAIAudit(body);
    if (res.status && typeof res.status === "function") {
      return res.status(200).json(auditResponse);
    }
    return res.json(auditResponse);
  } catch (err: any) {
    console.error("Error in /api/ai/cadastral-audit:", err);
    const errPayload = {
      success: false,
      error: err?.message || "Failed to execute streaming cadastral/geoAI audit",
      timestamp: new Date().toISOString()
    };
    if (res.status && typeof res.status === "function") {
      return res.status(500).json(errPayload);
    }
    return res.json(errPayload);
  }
}
