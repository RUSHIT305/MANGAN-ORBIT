import type { Request, Response } from "express";

export default async function handler(req: Request | any, res: Response | any) {
  const timestamp = new Date().toISOString();
  const uptime = process.uptime();

  const responsePayload = {
    status: "healthy",
    service: "MANGAN-ORBIT GeoAI & Production Continuity Engine",
    problemStatement: "SIH26009 - Manganese Reserves & Production Shortfall Sentinel",
    client: "MOIL Limited (Manganese Ore India Limited)",
    team: "Team NeuroSpark Astra (CSPIT-SIH-951352)",
    timestamp,
    uptimeSeconds: Math.floor(uptime),
    modules: {
      reserveLens: { status: "ONLINE", version: "v2.6.1-geoai", dataSources: ["Boreholes", "Assays", "Sentinel-2 MSI", "ISRO Bhuvan"] },
      shortfallSentinel: { status: "ACTIVE", horizons: ["7-Day", "30-Day", "90-Day"], weatherFeed: "IMD 0.25° Gridded & NASA SMAP" },
      actionPilot: { status: "READY", engine: "Prescriptive Mine Continuity Solver", humanApprovalRequired: true },
      closedLoop: { state: "MAP EVIDENCE -> FORECAST -> SIMULATE -> CAPTURE -> UPDATE" }
    },
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  };

  if (res.status && typeof res.status === "function") {
    return res.status(200).json(responsePayload);
  } else if (res.json && typeof res.json === "function") {
    return res.json(responsePayload);
  }
}
