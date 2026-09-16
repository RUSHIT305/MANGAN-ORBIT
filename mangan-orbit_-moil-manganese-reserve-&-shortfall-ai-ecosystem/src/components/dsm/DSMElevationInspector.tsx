import React, { useState } from "react";
import { Mountain, Eye, Ruler, Layers, AlertCircle, ArrowUpDown } from "lucide-react";
import { generateElevationProfile } from "../../utils/index.ts";
import type { MineBlockParcel, BoreholeRecord } from "../../types/index.ts";

interface DSMElevationInspectorProps {
  selectedBlock: MineBlockParcel;
  boreholes: BoreholeRecord[];
}

export const DSMElevationInspector: React.FC<DSMElevationInspectorProps> = ({
  selectedBlock,
  boreholes
}) => {
  const [sliceLengthM, setSliceLengthM] = useState(600);
  const [hoveredPoint, setHoveredPoint] = useState<{
    distanceM: number;
    elevationM: number;
    oreBedElevationM: number;
    waterTableM: number;
  } | null>(null);

  const profile = generateElevationProfile(selectedBlock.benchRL, sliceLengthM, 28);

  const minElev = Math.min(...profile.map(p => p.oreBedElevationM)) - 10;
  const maxElev = Math.max(...profile.map(p => p.elevationM)) + 15;
  const elevRange = maxElev - minElev;

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 220;
  const padLeft = 50;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 35;
  const drawWidth = svgWidth - padLeft - padRight;
  const drawHeight = svgHeight - padTop - padBottom;

  const getY = (elev: number) => {
    return padTop + drawHeight - ((elev - minElev) / elevRange) * drawHeight;
  };

  const getX = (dist: number) => {
    return padLeft + (dist / sliceLengthM) * drawWidth;
  };

  // Surface path
  const surfacePathD = profile.reduce((acc, pt, i) => {
    const x = getX(pt.distanceM);
    const y = getY(pt.elevationM);
    return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, "");

  // Ore bed path
  const oreBedPathD = profile.reduce((acc, pt, i) => {
    const x = getX(pt.distanceM);
    const y = getY(pt.oreBedElevationM);
    return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, "");

  // Filled polygon for ore layer between surface and ore base
  const oreFillD = `${surfacePathD} ${profile
    .slice()
    .reverse()
    .map(pt => `L ${getX(pt.distanceM)},${getY(pt.oreBedElevationM)}`)
    .join(" ")} Z`;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              DSM / DTM Elevation Profile & Subsurface Slice
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                CartoDEM 10m / Drone Photogrammetry
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Cross-section across {selectedBlock.blockCode} • Bench RL: {selectedBlock.benchRL}m • Slope stability monitored
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Slice Range:</span>
          <select
            value={sliceLengthM}
            onChange={(e) => setSliceLengthM(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value={400}>400 Meters</option>
            <option value={600}>600 Meters</option>
            <option value={1000}>1,000 Meters</option>
          </select>
        </div>
      </div>

      {/* SVG Elevation Cross-Section */}
      <div className="relative w-full overflow-x-auto bg-slate-900/60 rounded-lg p-2 border border-slate-800/80">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-56 select-none"
        >
          {/* Grid lines */}
          {[minElev, minElev + elevRange * 0.33, minElev + elevRange * 0.66, maxElev].map((elev, idx) => {
            const y = getY(elev);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  +{elev.toFixed(0)}m
                </text>
              </g>
            );
          })}

          {/* Ore Deposit Geological Layer (Braunite) */}
          <path d={oreFillD} fill="rgba(245, 158, 11, 0.18)" />

          {/* Water table dashed line */}
          <line
            x1={padLeft}
            y1={getY(profile[0].waterTableM)}
            x2={svgWidth - padRight}
            y2={getY(profile[profile.length - 1].waterTableM)}
            stroke="#38bdf8"
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />

          {/* Ore Bed Base Line */}
          <path
            d={oreBedPathD}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="2 2"
          />

          {/* Surface Profile Line */}
          <path
            d={surfacePathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Distance Axis Markers */}
          {[0, sliceLengthM * 0.25, sliceLengthM * 0.5, sliceLengthM * 0.75, sliceLengthM].map((dist, idx) => {
            const x = getX(dist);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={padTop + drawHeight}
                  x2={x}
                  y2={padTop + drawHeight + 4}
                  stroke="#64748b"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={padTop + drawHeight + 16}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {dist}m
                </text>
              </g>
            );
          })}

          {/* Synthetic Borehole Columns along slice */}
          {boreholes.slice(0, 3).map((bh, idx) => {
            const bhDist = 120 + idx * 180;
            const bhX = getX(bhDist);
            const bhTopY = getY(bh.elevationRL);
            const bhBotY = getY(bh.elevationRL - bh.depthMeters * 0.4);
            return (
              <g key={bh.id}>
                <line
                  x1={bhX}
                  y1={bhTopY}
                  x2={bhX}
                  y2={bhBotY}
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx={bhX} cy={bhTopY} r="3.5" fill="#f87171" stroke="#ffffff" strokeWidth="1" />
                <text
                  x={bhX}
                  y={bhTopY - 6}
                  fill="#fca5a5"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {bh.collarId.split(" ")[0]}
                </text>
              </g>
            );
          })}

          {/* Hover interaction points */}
          {profile.map((pt, i) => (
            <circle
              key={i}
              cx={getX(pt.distanceM)}
              cy={getY(pt.elevationM)}
              r="4"
              className="cursor-pointer fill-emerald-400 opacity-0 hover:opacity-100 transition-opacity"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 bg-slate-950/90 border border-slate-700 p-2.5 rounded-lg text-xs font-mono shadow-xl backdrop-blur-sm pointer-events-none">
            <div className="text-amber-300 font-bold">Slice Distance: {hoveredPoint.distanceM}m</div>
            <div className="text-emerald-400">Surface RL: +{hoveredPoint.elevationM}m</div>
            <div className="text-amber-400">Ore Footwall: +{hoveredPoint.oreBedElevationM}m</div>
            <div className="text-sky-400">Pore Water RL: +{hoveredPoint.waterTableM}m</div>
          </div>
        )}
      </div>

      {/* Legend & Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-emerald-400 rounded-full"></span>
          <span className="text-slate-300">Open-cast Surface Line</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 bg-amber-500/40 border border-amber-400 rounded"></span>
          <span className="text-slate-300">Braunite Ore Body (~43% Mn)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 border-b border-sky-400 border-dashed"></span>
          <span className="text-slate-300">Hydrostatic Water Table</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="text-slate-300">Diamond Core Boreholes</span>
        </div>
      </div>
    </div>
  );
};
