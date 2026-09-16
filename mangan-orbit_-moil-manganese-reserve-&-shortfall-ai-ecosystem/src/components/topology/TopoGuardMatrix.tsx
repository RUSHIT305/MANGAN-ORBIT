import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle, Wrench, RefreshCw, Zap } from "lucide-react";
import type { TopoHazardError } from "../../types/index.ts";

interface TopoGuardMatrixProps {
  hazards: TopoHazardError[];
  onResolveHazard: (id: string) => void;
}

export const TopoGuardMatrix: React.FC<TopoGuardMatrixProps> = ({
  hazards,
  onResolveHazard
}) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/20">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              TopoGuard™ Geotech Error Matrix & Safety Guard
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">
                DGMS Tech Circular 3 Compliant
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Automated open-cast bench overhang, crack displacement & lease boundary checks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Active Hazards:</span>
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">
            {hazards.filter(h => h.status === "PENDING").length} Unresolved
          </span>
        </div>
      </div>

      {/* Hazards Table / Cards */}
      <div className="space-y-3">
        {hazards.map((hazard) => (
          <div
            key={hazard.id}
            className={`p-3.5 rounded-xl border transition-all ${
              hazard.status === "RESOLVED"
                ? "bg-slate-950/40 border-slate-800 opacity-60"
                : hazard.severity === "CRITICAL"
                ? "bg-red-950/20 border-red-900/60"
                : "bg-slate-900/70 border-slate-800"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    hazard.severity === "CRITICAL"
                      ? "bg-red-500 text-white font-mono"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono"
                  }`}
                >
                  {hazard.severity}
                </span>
                <span className="text-xs font-bold text-white font-mono">
                  {hazard.id}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {hazard.location}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  Detected by: <strong className="text-slate-200">{hazard.detectedBy}</strong>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              {hazard.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="text-[11px] text-amber-300/90 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                <span>Fix: {hazard.suggestedFix}</span>
              </div>

              <div>
                {hazard.status === "RESOLVED" ? (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => onResolveHazard(hazard.id)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Apply Corrective Action</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
