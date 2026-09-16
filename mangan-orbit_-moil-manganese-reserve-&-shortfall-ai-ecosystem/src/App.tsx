import React, { useState, useMemo } from "react";
import {
  Layers,
  AlertTriangle,
  ShieldCheck,
  BrainCircuit,
  Presentation,
  Download,
  FileText,
  Mountain,
  Radio,
  Clock,
  Compass,
  MapPin,
  TrendingUp,
  Activity,
  CloudRain,
  Truck,
  CheckCircle2,
  ChevronRight,
  Flame,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";
import {
  MOIL_MINES_LIST,
  INITIAL_MINE_BLOCKS,
  INITIAL_BOREHOLES,
  INITIAL_EQUIPMENT,
  INITIAL_SPACE_WEATHER,
  INITIAL_SHORTFALL_PREDICTIONS,
  INITIAL_ACTION_SCENARIOS,
  INITIAL_TOPO_HAZARDS,
  INITIAL_ROVER_TASKS
} from "./data/mockData.ts";
import type {
  MineBlockParcel,
  BoreholeRecord,
  EquipmentTelemetry,
  SpaceWeatherTelemetry,
  ShortfallPrediction,
  ActionPilotScenario,
  TopoHazardError,
  GroundTruthingRoverTask
} from "./types/index.ts";

import { SIHDeckModal } from "./components/sih/SIHDeckModal.tsx";
import { GeoAIAuditModal } from "./components/ai/GeoAIAuditModal.tsx";
import { SpatialExportModal } from "./components/gis/SpatialExportModal.tsx";
import { StatutoryReportModal } from "./components/reports/StatutoryReportModal.tsx";
import { DSMElevationInspector } from "./components/dsm/DSMElevationInspector.tsx";
import { ParcelPropertyInspector } from "./components/inspector/ParcelPropertyInspector.tsx";
import { FieldLinkRoverQueue } from "./components/gt/FieldLinkRoverQueue.tsx";
import { TopoGuardMatrix } from "./components/topology/TopoGuardMatrix.tsx";

export default function App() {
  // Global State
  const [selectedMineId, setSelectedMineId] = useState("MOIL-DB");
  const [mineBlocks, setMineBlocks] = useState<MineBlockParcel[]>(INITIAL_MINE_BLOCKS);
  const [selectedBlockId, setSelectedBlockId] = useState<string>("BLK-DB-01");
  const [boreholes, setBoreholes] = useState<BoreholeRecord[]>(INITIAL_BOREHOLES);
  const [equipmentList, setEquipmentList] = useState<EquipmentTelemetry[]>(INITIAL_EQUIPMENT);
  const [weather, setWeather] = useState<SpaceWeatherTelemetry>(INITIAL_SPACE_WEATHER);
  const [shortfalls, setShortfalls] = useState<ShortfallPrediction[]>(INITIAL_SHORTFALL_PREDICTIONS);
  const [scenarios, setScenarios] = useState<ActionPilotScenario[]>(INITIAL_ACTION_SCENARIOS);
  const [hazards, setHazards] = useState<TopoHazardError[]>(INITIAL_TOPO_HAZARDS);
  const [roverTasks, setRoverTasks] = useState<GroundTruthingRoverTask[]>(INITIAL_ROVER_TASKS);

  // Active View Tabs
  const [activeTab, setActiveTab] = useState<"reservelens" | "shortfall" | "actionpilot" | "geotech">("reservelens");

  // Modals
  const [showDeckModal, setShowDeckModal] = useState(false);
  const [showGeoAIModal, setShowGeoAIModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Closed loop state
  const [closedLoopStep, setClosedLoopStep] = useState<number>(2); // 0: MAP, 1: FORECAST, 2: SIMULATE, 3: CAPTURE, 4: UPDATE
  const closedLoopStages = ["MAP EVIDENCE", "FORECAST", "SIMULATE", "CAPTURE", "UPDATE"];

  // Map layer controls
  const [mapLayer, setMapLayer] = useState<"standard" | "grade_heatmap" | "smap_moisture" | "hazards">("grade_heatmap");

  const activeBlock = useMemo(() => {
    return mineBlocks.find((b) => b.id === selectedBlockId) || mineBlocks[0];
  }, [mineBlocks, selectedBlockId]);

  // Handler to update block
  const handleUpdateBlock = (updated: MineBlockParcel) => {
    setMineBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  // Handler to approve an ActionPilot scenario
  const handleApproveScenario = (id: string) => {
    setScenarios((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: "Approved by Mine Manager",
            auditableTrail: {
              approvedBy: "Er. Rajesh K. Mishra (Agent / Mine Manager)",
              approvedAt: new Date().toLocaleString("en-IN"),
              notes: "Approved via MANGAN-ORBIT ActionPilot workbench. Priority dispatch authorized."
            }
          };
        }
        return s;
      })
    );
  };

  // Handler to resolve geotech hazard
  const handleResolveHazard = (id: string) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "RESOLVED" } : h))
    );
  };

  // Handler to add rover task
  const handleAddRoverTask = (task: GroundTruthingRoverTask) => {
    setRoverTasks((prev) => [task, ...prev]);
  };

  // Handler to sync all rover tasks
  const handleSyncRoverTasks = () => {
    setRoverTasks((prev) =>
      prev.map((t) => ({
        ...t,
        syncStatus: "SYNCED",
        labVerifiedMnPct: t.fieldMnReadingPct
      }))
    );
  };

  // KPIs
  const totalMeasuredMT = useMemo(() => {
    return mineBlocks.reduce((acc, b) => acc + b.measuredReservesMT, 0).toFixed(2);
  }, [mineBlocks]);

  const totalProtectedTonnes = useMemo(() => {
    return scenarios
      .filter((s) => s.status === "Approved by Mine Manager" || s.status === "Proposed")
      .reduce((acc, s) => acc + s.tonnesProtectedMT, 0);
  }, [scenarios]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner: Smart India Hackathon & Client Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              MO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  MANGAN-ORBIT
                </h1>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  SIH26009
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 font-medium">
                  MOIL Limited
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Space Technology & GeoAI Operational Ecosystem • Team NeuroSpark Astra (CSPIT-SIH-951352)
              </p>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setShowDeckModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg transition-colors"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>SIH PPT Deck</span>
            </button>

            <button
              onClick={() => setShowGeoAIModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-lg transition-all shadow-md shadow-amber-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run GeoAI Audit</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">GIS Export</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">IBM MCDR</span>
            </button>
          </div>
        </div>

        {/* The Novel Closed Loop Interactive Bar (Slide 2: MAP EVIDENCE -> FORECAST -> SIMULATE -> CAPTURE -> UPDATE) */}
        <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 sm:px-6 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[620px] text-xs">
            <div className="flex items-center gap-1 font-mono font-bold text-slate-400 uppercase text-[11px]">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse mr-1" />
              <span>THE NOVEL CLOSED LOOP:</span>
            </div>
            <div className="flex items-center gap-2">
              {closedLoopStages.map((stage, idx) => {
                const isActive = closedLoopStep === idx;
                const isPassed = closedLoopStep > idx;
                return (
                  <React.Fragment key={stage}>
                    <button
                      onClick={() => setClosedLoopStep(idx)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                        isActive
                          ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                          : isPassed
                          ? "bg-slate-800 text-emerald-400 font-bold border border-emerald-500/20"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span>0{idx + 1}.</span>
                      <span>{stage}</span>
                      {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </button>
                    {idx < closedLoopStages.length - 1 && (
                      <span className="text-slate-600 font-bold">➔</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI & Telemetry Top Cards (Aligned with Slide 5: Impact and Benefits) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Card 1: Reserve Intelligence */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Reserve Intelligence</span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {totalMeasuredMT} <span className="text-xs text-slate-400 font-normal">MT Measured</span>
            </div>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">
              ★ UNFC-111 & 121 Validated
            </p>
          </div>

          {/* Card 2: Production Continuity */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Production Continuity</span>
              <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              41,200 <span className="text-xs text-slate-400 font-normal">/ 48k MT</span>
            </div>
            <p className="text-[10px] text-orange-400 mt-1 font-mono">
              ⚠️ 6,800 MT 30-Day Deficit Risk
            </p>
          </div>

          {/* Card 3: Equipment Efficiency */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Equipment Efficiency</span>
              <Truck className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              78.2% <span className="text-xs text-slate-400 font-normal">Fleet Avail</span>
            </div>
            <p className="text-[10px] text-sky-400 mt-1 font-mono">
              4/6 Heavy Fleet Active
            </p>
          </div>

          {/* Card 4: Weather Resilience */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Space & Weather</span>
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {weather.rainfallPast24hMm} <span className="text-xs text-slate-400 font-normal">mm Rain (24h)</span>
            </div>
            <p className="text-[10px] text-amber-400 mt-1 font-mono">
              SMAP Saturation: {weather.soilMoistureSaturationPct}%
            </p>
          </div>

          {/* Card 5: ActionPilot Protected */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-xl col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Tonnes Protected</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              +{totalProtectedTonnes.toLocaleString()} <span className="text-xs text-slate-400 font-normal">MT</span>
            </div>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">
              ActionPilot Interventions
            </p>
          </div>
        </div>

        {/* Spatial Map & Mine Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Center 7 Cols: Interactive 2D SVG Spatial Cadastre */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col">
            {/* Map Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Dongri Buzurg Cadastral Lease Map</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    WGS84 UTM 44N
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any bench or borehole to focus attribute inspector & DSM slice
                </p>
              </div>

              {/* Map Layer Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setMapLayer("grade_heatmap")}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                    mapLayer === "grade_heatmap" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Ore Grade (Mn %)
                </button>
                <button
                  onClick={() => setMapLayer("smap_moisture")}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                    mapLayer === "smap_moisture" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  SMAP Moisture
                </button>
                <button
                  onClick={() => setMapLayer("hazards")}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                    mapLayer === "hazards" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Topo Hazards
                </button>
              </div>
            </div>

            {/* Interactive SVG Spatial Cadastre View */}
            <div className="relative flex-1 min-h-[340px] bg-slate-900/50 rounded-xl my-4 border border-slate-800/80 overflow-hidden flex items-center justify-center p-2">
              <svg viewBox="0 0 600 340" className="w-full h-full select-none">
                <defs>
                  {/* Grid pattern */}
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>

                  {/* Heatmap gradients */}
                  <linearGradient id="gradeHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="gradeMid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="smapMoist" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.65" />
                  </linearGradient>
                </defs>

                {/* Coordinate Grid */}
                <rect width="600" height="340" fill="url(#grid)" />

                {/* Lease Boundary Fence (Statutory Barrier) */}
                <rect
                  x="20"
                  y="20"
                  width="560"
                  height="300"
                  rx="12"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <text x="32" y="38" fill="#64748b" fontSize="9" fontFamily="monospace">
                  MOIL LEASE BOUNDARY: ML-MH-BHD-1962-09 (142.8 Ha)
                </text>

                {/* Draw Mine Blocks / Parcels */}
                {mineBlocks.map((block) => {
                  const isSelected = block.id === selectedBlockId;
                  // Transform local coordinates into SVG space
                  // Block 1: Central Pit Bench 4
                  // Block 2: Western Extension
                  // Block 3: North Syncline Deep
                  // Block 4: Sump S1
                  let polyPoints = "";
                  let textPos = { x: 0, y: 0 };

                  if (block.id === "BLK-DB-01") {
                    polyPoints = "180,90 380,85 390,200 170,185";
                    textPos = { x: 260, y: 140 };
                  } else if (block.id === "BLK-DB-02") {
                    polyPoints = "60,110 160,100 150,230 50,210";
                    textPos = { x: 95, y: 165 };
                  } else if (block.id === "BLK-DB-03") {
                    polyPoints = "395,60 540,75 520,200 405,180";
                    textPos = { x: 450, y: 135 };
                  } else {
                    polyPoints = "190,210 370,215 360,290 180,285";
                    textPos = { x: 260, y: 255 };
                  }

                  let fillColor = "rgba(245, 158, 11, 0.25)";
                  let strokeColor = "#f59e0b";

                  if (mapLayer === "grade_heatmap") {
                    if (block.actualLabMnPct >= 44) {
                      fillColor = "rgba(245, 158, 11, 0.4)";
                      strokeColor = "#fbbf24";
                    } else if (block.actualLabMnPct >= 40) {
                      fillColor = "rgba(59, 130, 246, 0.35)";
                      strokeColor = "#60a5fa";
                    } else {
                      fillColor = "rgba(100, 116, 139, 0.35)";
                      strokeColor = "#94a3b8";
                    }
                  } else if (mapLayer === "smap_moisture") {
                    fillColor = block.id === "BLK-DB-04" || block.id === "BLK-DB-02"
                      ? "rgba(6, 182, 212, 0.5)"
                      : "rgba(14, 116, 144, 0.25)";
                    strokeColor = "#22d3ee";
                  } else if (mapLayer === "hazards") {
                    const hasHazard = hazards.some(h => h.blockId === block.id && h.status === "PENDING");
                    fillColor = hasHazard ? "rgba(239, 68, 68, 0.35)" : "rgba(16, 185, 129, 0.25)";
                    strokeColor = hasHazard ? "#ef4444" : "#10b981";
                  }

                  return (
                    <g
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className="cursor-pointer transition-all hover:opacity-90"
                    >
                      <polygon
                        points={polyPoints}
                        fill={fillColor}
                        stroke={isSelected ? "#ffffff" : strokeColor}
                        strokeWidth={isSelected ? 3 : 1.5}
                        strokeDasharray={isSelected ? "none" : "none"}
                      />
                      <text
                        x={textPos.x}
                        y={textPos.y - 8}
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {block.blockCode}
                      </text>
                      <text
                        x={textPos.x}
                        y={textPos.y + 7}
                        fill="#fde68a"
                        fontSize="9"
                        textAnchor="middle"
                        fontWeight="semibold"
                      >
                        {block.actualLabMnPct}% Mn • {block.measuredReservesMT}MT
                      </text>
                      <text
                        x={textPos.x}
                        y={textPos.y + 20}
                        fill="#94a3b8"
                        fontSize="8"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        RL +{block.benchRL}m
                      </text>
                    </g>
                  );
                })}

                {/* Borehole Collars */}
                {boreholes.map((bh, idx) => {
                  const xPos = 120 + idx * 170;
                  const yPos = 130 + (idx % 2 === 0 ? -35 : 40);
                  return (
                    <g key={bh.id} className="cursor-pointer">
                      <circle cx={xPos} cy={yPos} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx={xPos} cy={yPos} r="10" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.6" />
                      <text x={xPos + 9} y={yPos + 3} fill="#fca5a5" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        {bh.collarId.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Equipment Positions */}
                {equipmentList.slice(0, 3).map((eq, idx) => {
                  const eqX = 240 + idx * 80;
                  const eqY = 160 + (idx === 1 ? 70 : -20);
                  return (
                    <g key={eq.unitId}>
                      <rect x={eqX - 8} y={eqY - 8} width="16" height="16" rx="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                      <text x={eqX} y={eqY + 3.5} fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">
                        {eq.type === "Excavator" ? "EX" : eq.type === "Dumper" ? "D" : "EQ"}
                      </text>
                      <text x={eqX} y={eqY + 16} fill="#bae6fd" fontSize="7" textAnchor="middle" fontFamily="monospace">
                        {eq.unitId}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Overlay Badge */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-2 rounded-lg text-[10px] font-mono text-slate-300">
                <div className="text-amber-400 font-bold">Selected: {activeBlock.blockCode} ({activeBlock.name})</div>
                <div>UNFC: {activeBlock.unfcCategory} • Grade: {activeBlock.actualLabMnPct}% Mn • Area: {activeBlock.areaHectares} Ha</div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-amber-500 rounded"></span>
                  <span>High-Grade (&gt;43% Mn)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-500 rounded"></span>
                  <span>Medium-Grade (40-43% Mn)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>Core Borehole Collars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-sky-600 rounded"></span>
                  <span>Active Mining Fleet</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Lat: 21.6528°N, Long: 79.6742°E
              </span>
            </div>
          </div>

          {/* Right 5 Cols: Active Inspector / Attribute Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ParcelPropertyInspector
              block={activeBlock}
              onUpdateBlock={handleUpdateBlock}
            />

            {/* Space Telemetry Mini-Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white">Space & Weather Telemetry (ISRO / NASA / IMD)</span>
                </div>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                  {weather.satelliteProvider}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block">7-Day Precipitation</span>
                  <span className="text-white font-bold text-sm">{weather.rainfall7DayCumulativeMm} mm</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block">SMAP Soil Saturation</span>
                  <span className="text-amber-400 font-bold text-sm">{weather.soilMoistureSaturationPct}%</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block">Pit Pore Pressure</span>
                  <span className="text-orange-400 font-bold text-sm">{weather.pitSlopePorePressureKPa} kPa</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block">Surface Temp (LST)</span>
                  <span className="text-white font-bold text-sm">{weather.landSurfaceTemperatureC}°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation: The 3 Core Pillars + Field Geotech */}
        <div className="border-b border-slate-800">
          <nav className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveTab("reservelens")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === "reservelens"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. ReserveLens (Spatial Mapping)</span>
            </button>

            <button
              onClick={() => setActiveTab("shortfall")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === "shortfall"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>2. Shortfall Sentinel (7/30/90-Day Risk)</span>
            </button>

            <button
              onClick={() => setActiveTab("actionpilot")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === "actionpilot"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>3. ActionPilot (Prescriptive Engine)</span>
            </button>

            <button
              onClick={() => setActiveTab("geotech")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === "geotech"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>4. FieldLink & TopoGuard</span>
            </button>
          </nav>
        </div>

        {/* Tab 1 Content: ReserveLens */}
        {activeTab === "reservelens" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* DSM / DTM Elevation Profile */}
            <DSMElevationInspector
              selectedBlock={activeBlock}
              boreholes={boreholes}
            />

            {/* Subsurface Boreholes Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">
                    Diamond Drill Core Boreholes & Assay Strata
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {boreholes.length} Core Holes Logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 font-mono">
                      <th className="pb-2">Collar ID</th>
                      <th className="pb-2">Elevation RL</th>
                      <th className="pb-2">Depth</th>
                      <th className="pb-2">Core Recovery</th>
                      <th className="pb-2">Primary Ore Horizon</th>
                      <th className="pb-2">Mn % Grade</th>
                      <th className="pb-2">Phosphorus %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {boreholes.map((bh) => {
                      const oreLode = bh.assays.find((a) => a.lithology.includes("Ore") || a.lithology.includes("Braunite")) || bh.assays[0];
                      return (
                        <tr key={bh.id} className="hover:bg-slate-900/60">
                          <td className="py-2.5 font-mono font-bold text-slate-200">{bh.collarId}</td>
                          <td className="py-2.5 font-mono text-slate-300">+{bh.elevationRL}m</td>
                          <td className="py-2.5 font-mono text-slate-300">{bh.depthMeters}m</td>
                          <td className="py-2.5 font-mono text-emerald-400 font-semibold">{bh.coreRecoveryPct}%</td>
                          <td className="py-2.5 text-amber-300">{oreLode.lithology} ({oreLode.fromMeters}-{oreLode.toMeters}m)</td>
                          <td className="py-2.5 font-bold text-white font-mono">{oreLode.mnGradePct}% Mn</td>
                          <td className="py-2.5 font-mono text-slate-400">{oreLode.phosphorusPct}% P</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Shortfall Sentinel */}
        {activeTab === "shortfall" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 7, 30, 90-Day Shortfall Horizon Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shortfalls.map((item) => (
                <div
                  key={item.horizon}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                        {item.horizon} Forecast
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.severity === "HIGH"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30 font-mono"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono"
                        }`}
                      >
                        {item.severity} RISK
                      </span>
                    </div>

                    <div className="text-2xl font-black text-white mb-1">
                      -{item.shortfallVolumeMT.toLocaleString()} <span className="text-xs text-slate-400 font-normal">MT Deficit</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Target: <strong className="text-slate-200">{item.targetProductionMT.toLocaleString()} MT</strong> • Projected: <strong className="text-amber-400">{item.predictedProductionMT.toLocaleString()} MT</strong>
                    </p>

                    <div className="space-y-2 mb-3">
                      <div className="text-[11px] font-semibold text-slate-300">
                        Primary Contributing Constraints:
                      </div>
                      {item.topDrivers.map((d, dIdx) => (
                        <div key={dIdx} className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-xs">
                          <div className="flex justify-between font-medium text-slate-200">
                            <span>{d.driver}</span>
                            <span className="text-amber-400 font-bold">{d.contributionPct}%</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            Impact: -{d.impactMT.toLocaleString()} MT
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between font-mono">
                    <span>Deficit Probability:</span>
                    <span className="font-bold text-red-400">{item.probabilityPct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mining Fleet Telemetry Grid */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white">
                    Heavy Mining Fleet Telemetry & Availability Tracker
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {equipmentList.filter(e => e.status === "Operational").length} / {equipmentList.length} Units Operational
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {equipmentList.map((eq) => (
                  <div
                    key={eq.unitId}
                    className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-white">{eq.unitId}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            eq.status === "Operational"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                              : eq.status === "Degraded"
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                              : "bg-red-500/10 text-red-300 border border-red-500/20"
                          }`}
                        >
                          {eq.status}
                        </span>
                      </div>
                      <div className="text-slate-300 font-medium mb-2">{eq.model}</div>
                      <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                        <div>Location: {eq.currentLocationBlock}</div>
                        <div>Hydraulic Pressure: {eq.hydraulicPressurePsi} PSI</div>
                        <div>Service Due: in {eq.nextServiceDueHrs} hrs</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Health: {eq.healthScorePct}%</span>
                      {eq.vibrationAlert && (
                        <span className="text-red-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Cavitation Risk
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 Content: ActionPilot */}
        {activeTab === "actionpilot" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      ActionPilot™ Prescriptive Mine Continuity Countermeasures
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Human-in-the-Loop Approved
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Evaluates tonnes protected, DGMS safety constraints, and fleet redeployment
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-emerald-400 font-bold">
                  +{totalProtectedTonnes.toLocaleString()} MT Protected Total
                </span>
              </div>

              {/* Scenarios List */}
              <div className="space-y-4">
                {scenarios.map((scen) => (
                  <div
                    key={scen.id}
                    className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {scen.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {scen.targetHorizon}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            scen.status === "Approved by Mine Manager"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {scen.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        {scen.title}
                      </h4>

                      <ul className="text-xs text-slate-300 space-y-1">
                        {scen.actions.map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 mt-0.5 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="text-[11px] text-slate-400 italic">
                        Safety: {scen.safetyCompliance}
                      </div>

                      {scen.auditableTrail.approvedBy && (
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-950/60 p-2 rounded border border-slate-800/80">
                          Approved by: {scen.auditableTrail.approvedBy} at {scen.auditableTrail.approvedAt}
                          {scen.auditableTrail.notes && <div className="mt-0.5 text-slate-400">Note: {scen.auditableTrail.notes}</div>}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 text-right">
                      <div>
                        <div className="text-xl font-black text-emerald-400">
                          +{scen.tonnesProtectedMT.toLocaleString()} <span className="text-xs text-slate-400 font-normal">MT Protected</span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          Est. Savings: ₹{scen.costImpactLakhs} Lakhs • Feasibility: {scen.feasibilityScorePct}%
                        </div>
                      </div>

                      {scen.status !== "Approved by Mine Manager" ? (
                        <button
                          onClick={() => handleApproveScenario(scen.id)}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve Countermeasure</span>
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold font-mono">
                          <CheckCircle2 className="w-4 h-4" /> Active on Shift
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4 Content: FieldLink & TopoGuard */}
        {activeTab === "geotech" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {/* FieldLink Rover Queue */}
            <FieldLinkRoverQueue
              tasks={roverTasks}
              onSyncAll={handleSyncRoverTasks}
              onAddTask={handleAddRoverTask}
            />

            {/* TopoGuard Hazard Matrix */}
            <TopoGuardMatrix
              hazards={hazards}
              onResolveHazard={handleResolveHazard}
            />
          </div>
        )}
      </main>

      {/* Footer / Governance Notice */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-slate-400">MANGAN-ORBIT:</span> Evidence-led exploration. Forecast-led production. Human-approved action.
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Smart India Hackathon 2026 • MOIL Limited • SIH26009
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SIHDeckModal
        isOpen={showDeckModal}
        onClose={() => setShowDeckModal(false)}
      />

      <GeoAIAuditModal
        isOpen={showGeoAIModal}
        onClose={() => setShowGeoAIModal(false)}
        selectedBlock={activeBlock}
        weather={weather}
        equipmentList={equipmentList}
      />

      <SpatialExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        parcels={mineBlocks}
      />

      <StatutoryReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        parcels={mineBlocks}
        weather={weather}
        shortfalls={shortfalls}
        activeAction={scenarios[0]}
      />
    </div>
  );
}
