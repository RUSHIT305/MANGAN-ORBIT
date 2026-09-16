import React, { useState } from "react";
import { X, Download, Copy, Check, FileCode, Database, MapPin, Share2 } from "lucide-react";
import { exportToGeoJSON, exportToPostGIS } from "../../utils/index.ts";
import type { MineBlockParcel } from "../../types/index.ts";

interface SpatialExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcels: MineBlockParcel[];
}

export const SpatialExportModal: React.FC<SpatialExportModalProps> = ({
  isOpen,
  onClose,
  parcels
}) => {
  const [activeTab, setActiveTab] = useState<"geojson" | "postgis" | "ror">("geojson");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const geoJsonData = exportToGeoJSON(parcels);
  const postGisData = exportToPostGIS(parcels);

  const rorData = `GOVERNMENT OF MAHARASHTRA & MADHYA PRADESH
DEPARTMENT OF MINES & GEOLOGY
STATUTORY RECORD OF RIGHTS (ROR) & MINING LEASE BOUNDARY CERTIFICATE
================================================================================
Lessee: MOIL Limited (A Government of India Enterprise)
Mining Lease No: ML-MH-BHD-1962-09
Mineral Granted: Manganese Ore (Major Mineral)
Valid Up to: 31-March-2042
Total Lease Area: 142.80 Hectares (Forest: 44.5 Ha, Revenue: 98.3 Ha)
--------------------------------------------------------------------------------
REGISTERED CADASTRE MINE BLOCKS:
${parcels.map((p, idx) => `
[${idx + 1}] Block: ${p.blockCode} (${p.name})
    Sector: ${p.sector}
    UNFC Class: ${p.unfcCategory}
    Surface Area: ${p.areaHectares} Ha
    Bench Reduced Level: +${p.benchRL}m
    Measured Reserves: ${p.measuredReservesMT} Million Tonnes
    Average Mn Grade: ${p.predictedAIGradeMnPct}% Mn | Phosphorus: ${p.phosphorusPct}% P
    Coordinates (Centroid approx): Lat ${p.coordinates[0][1].toFixed(4)}° N, Long ${p.coordinates[0][0].toFixed(4)}° E
`).join("")}
================================================================================
Authenticated under Indian Bureau of Mines (IBM) MCDR 2017 Form G-1.
Generated digitally via MANGAN-ORBIT Geo-Intelligence Ecosystem.`;

  const getContent = () => {
    switch (activeTab) {
      case "geojson":
        return geoJsonData;
      case "postgis":
        return postGisData;
      case "ror":
        return rorData;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeTab === "geojson" ? "geojson" : activeTab === "postgis" ? "sql" : "txt";
    const blob = new Blob([getContent()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MOIL_Spatial_${activeTab.toUpperCase()}_${Date.now()}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Spatial GIS Export & Statutory Records
              </h2>
              <p className="text-xs text-slate-400">
                WGS84 Coordinates • Indian Mining Cadastre Standard • GeoJSON / PostGIS / RoR
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/60 border-b border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("geojson")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === "geojson"
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>GeoJSON (QGIS / ArcGIS)</span>
            </button>
            <button
              onClick={() => setActiveTab("postgis")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === "postgis"
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>PostGIS SQL Script</span>
            </button>
            <button
              onClick={() => setActiveTab("ror")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === "ror"
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Statutory RoR Summary</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed">
            {getContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};
