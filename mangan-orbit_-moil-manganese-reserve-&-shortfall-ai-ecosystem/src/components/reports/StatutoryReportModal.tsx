import React from "react";
import { X, Printer, Download, CheckCircle2, ShieldAlert, Award } from "lucide-react";
import type { MineBlockParcel, SpaceWeatherTelemetry, ShortfallPrediction, ActionPilotScenario } from "../../types/index.ts";

interface StatutoryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcels: MineBlockParcel[];
  weather: SpaceWeatherTelemetry;
  shortfalls: ShortfallPrediction[];
  activeAction: ActionPilotScenario;
}

export const StatutoryReportModal: React.FC<StatutoryReportModalProps> = ({
  isOpen,
  onClose,
  parcels,
  weather,
  shortfalls,
  activeAction
}) => {
  if (!isOpen) return null;

  const totalMeasured = parcels.reduce((acc, p) => acc + p.measuredReservesMT, 0);
  const totalIndicated = parcels.reduce((acc, p) => acc + p.indicatedReservesMT, 0);
  const totalInferred = parcels.reduce((acc, p) => acc + p.inferredReservesMT, 0);
  const avgGrade = (parcels.reduce((acc, p) => acc + p.actualLabMnPct * p.measuredReservesMT, 0) / (totalMeasured || 1)).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 print:hidden">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white tracking-wide">
              IBM MCDR 2017 Form F-1 Statutory Survey Sheet
            </h2>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
              Official MOIL Return
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Statutory Sheet</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="flex-1 overflow-y-auto p-8 bg-white text-slate-900 font-sans print:p-0">
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-black tracking-tight uppercase text-slate-900">
                  MOIL Limited (Formerly Manganese Ore India Ltd)
                </h1>
                <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  MCDR 2017 Statutory Monthly Production & Reserve Reconciliation Sheet
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Mine: Dongri Buzurg Manganese Mine • Lease Code: ML-MH-BHD-1962-09 • District: Bhandara (Maharashtra)
                </p>
              </div>
              <div className="text-right text-[11px] text-slate-600 font-mono">
                <div>Document ID: MOIL-MCDR-2026-09</div>
                <div>Date Generated: {new Date().toLocaleDateString("en-IN")}</div>
                <div>Compliance: UNFC 1999 / 2009 Norms</div>
              </div>
            </div>
          </div>

          {/* Table 1: Reserve Inventory (UNFC Classification) */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 p-2 border-l-4 border-amber-600 text-slate-800 mb-2">
              Section A: Cadastral Reserve Inventory (UNFC Classification)
            </h3>
            <table className="w-full text-[11px] border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold">
                  <th className="border border-slate-300 p-1.5 text-left">Block Code</th>
                  <th className="border border-slate-300 p-1.5 text-left">Sector / Bench</th>
                  <th className="border border-slate-300 p-1.5 text-center">UNFC Code</th>
                  <th className="border border-slate-300 p-1.5 text-right">Area (Ha)</th>
                  <th className="border border-slate-300 p-1.5 text-right">Measured (MT)</th>
                  <th className="border border-slate-300 p-1.5 text-right">Indicated (MT)</th>
                  <th className="border border-slate-300 p-1.5 text-right">Inferred (MT)</th>
                  <th className="border border-slate-300 p-1.5 text-right">Grade (Mn %)</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-1.5 font-mono font-semibold">{p.blockCode}</td>
                    <td className="border border-slate-300 p-1.5">{p.name}</td>
                    <td className="border border-slate-300 p-1.5 text-center font-bold text-amber-800">{p.unfcCategory}</td>
                    <td className="border border-slate-300 p-1.5 text-right">{p.areaHectares}</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono font-semibold text-emerald-800">{p.measuredReservesMT}</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono">{p.indicatedReservesMT}</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono">{p.inferredReservesMT}</td>
                    <td className="border border-slate-300 p-1.5 text-right font-bold">{p.actualLabMnPct}%</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold text-slate-900">
                  <td className="border border-slate-300 p-1.5" colSpan={3}>Consolidated Mine Totals</td>
                  <td className="border border-slate-300 p-1.5 text-right">{parcels.reduce((a, b) => a + b.areaHectares, 0).toFixed(2)}</td>
                  <td className="border border-slate-300 p-1.5 text-right font-mono text-emerald-900">{totalMeasured.toFixed(2)} MT</td>
                  <td className="border border-slate-300 p-1.5 text-right font-mono">{totalIndicated.toFixed(2)} MT</td>
                  <td className="border border-slate-300 p-1.5 text-right font-mono">{totalInferred.toFixed(2)} MT</td>
                  <td className="border border-slate-300 p-1.5 text-right">{avgGrade}% Mn</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Shortfall Sentinel Constraints */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 p-2 border-l-4 border-orange-600 text-slate-800 mb-2">
              Section B: Space Telemetry & Shortfall Constraint Analysis
            </h3>
            <div className="grid grid-cols-3 gap-3 text-[11px] mb-3">
              <div className="p-2 border border-slate-300 rounded bg-slate-50">
                <span className="text-slate-500 block text-[10px]">7-Day Cumulative Rainfall (IMD)</span>
                <span className="font-bold text-slate-800 text-sm">{weather.rainfall7DayCumulativeMm} mm</span>
                <span className="text-[10px] text-orange-700 block">Saturated bench slopes</span>
              </div>
              <div className="p-2 border border-slate-300 rounded bg-slate-50">
                <span className="text-slate-500 block text-[10px]">Soil Moisture Saturation (NASA SMAP)</span>
                <span className="font-bold text-slate-800 text-sm">{weather.soilMoistureSaturationPct}%</span>
                <span className="text-[10px] text-slate-600 block">Haul road traction reduced</span>
              </div>
              <div className="p-2 border border-slate-300 rounded bg-slate-50">
                <span className="text-slate-500 block text-[10px]">30-Day Shortfall Sentinel Forecast</span>
                <span className="font-bold text-red-700 text-sm">-{shortfalls[1]?.shortfallVolumeMT.toLocaleString()} MT</span>
                <span className="text-[10px] text-slate-600 block">Probability: {shortfalls[1]?.probabilityPct}%</span>
              </div>
            </div>
          </div>

          {/* Section C: Prescriptive Continuity Plan (ActionPilot) */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 p-2 border-l-4 border-emerald-600 text-slate-800 mb-2">
              Section C: Prescriptive Mine Continuity Countermeasures (ActionPilot)
            </h3>
            <div className="p-3 border border-slate-300 rounded text-[11px] bg-slate-50/50 space-y-2">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Active Countermeasure: {activeAction.title}</span>
                <span className="text-emerald-700 font-mono">Tonnes Protected: +{activeAction.tonnesProtectedMT.toLocaleString()} MT</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {activeAction.actions.join(" ")}
              </p>
              <div className="text-[10px] text-slate-600 italic">
                Safety Verification: {activeAction.safetyCompliance}
              </div>
            </div>
          </div>

          {/* Statutory Signatures */}
          <div className="pt-6 border-t-2 border-slate-400 grid grid-cols-3 gap-8 text-[11px] text-slate-700 text-center">
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1 font-semibold">Chief Mine Geologist</div>
              <div className="text-[10px] text-slate-500">MOIL Limited</div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1 font-semibold">Mine Manager (First Class Competency)</div>
              <div className="text-[10px] text-slate-500">Dongri Buzurg Mine</div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1 font-semibold">Director (Production & Planning)</div>
              <div className="text-[10px] text-slate-500">MOIL Corporate Office, Nagpur</div>
            </div>
          </div>

          <div className="mt-6 text-center text-[10px] text-slate-400 font-mono">
            MANGAN-ORBIT Decision-Support System • SIH 26009 • Team NeuroSpark Astra
          </div>
        </div>
      </div>
    </div>
  );
};
