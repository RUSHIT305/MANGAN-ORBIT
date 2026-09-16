import React, { useState, useEffect } from "react";
import { Edit3, Check, Layers, AlertCircle, Save, Percent, Compass, Shield, Scale } from "lucide-react";
import type { MineBlockParcel, UNFCClassification } from "../../types/index.ts";

interface ParcelPropertyInspectorProps {
  block: MineBlockParcel;
  onUpdateBlock: (updated: MineBlockParcel) => void;
}

export const ParcelPropertyInspector: React.FC<ParcelPropertyInspectorProps> = ({
  block,
  onUpdateBlock
}) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<MineBlockParcel>(block);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    setFormData(block);
    setEditing(false);
  }, [block]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBlock(formData);
    setEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2200);
  };

  const unfcOptions: UNFCClassification[] = [
    "UNFC-111",
    "UNFC-121",
    "UNFC-122",
    "UNFC-333",
    "UNFC-334"
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Cadastral Block Inspector & Attributes
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {formData.blockCode}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              UNFC Reserve classification & statutory ore grades
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-pulse">
              <Check className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              editing
                ? "bg-slate-800 text-white border-slate-600"
                : "bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{editing ? "Cancel" : "Edit Attributes"}</span>
          </button>
        </div>
      </div>

      {/* Form / Property Grid */}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Block Name
            </span>
            <span className="font-bold text-slate-100">{formData.name}</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Mining Lease No.
            </span>
            <span className="font-mono text-slate-300 text-[11px]">{formData.leaseId}</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              UNFC Classification
            </span>
            {editing ? (
              <select
                value={formData.unfcCategory}
                onChange={(e) => setFormData({ ...formData, unfcCategory: e.target.value as UNFCClassification })}
                className="w-full bg-slate-950 border border-slate-700 text-amber-300 rounded px-2 py-1 font-bold text-xs"
              >
                {unfcOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <span className="font-bold text-amber-400 font-mono">{formData.unfcCategory}</span>
            )}
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Extraction Status
            </span>
            {editing ? (
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
              >
                <option value="Active Extraction">Active Extraction</option>
                <option value="Blasting Scheduled">Blasting Scheduled</option>
                <option value="Exploration Drilling">Exploration Drilling</option>
                <option value="Dewatering">Dewatering</option>
                <option value="Reclaimed">Reclaimed</option>
              </select>
            ) : (
              <span className="font-semibold text-slate-200">{formData.status}</span>
            )}
          </div>
        </div>

        {/* Quantities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Measured MT</span>
            {editing ? (
              <input
                type="number"
                step="0.01"
                value={formData.measuredReservesMT}
                onChange={(e) => setFormData({ ...formData, measuredReservesMT: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-emerald-400 font-bold"
              />
            ) : (
              <div className="text-base font-bold text-emerald-400">{formData.measuredReservesMT} <span className="text-[10px] text-slate-500 font-normal">MT</span></div>
            )}
          </div>

          <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Indicated MT</span>
            {editing ? (
              <input
                type="number"
                step="0.01"
                value={formData.indicatedReservesMT}
                onChange={(e) => setFormData({ ...formData, indicatedReservesMT: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-sky-400 font-bold"
              />
            ) : (
              <div className="text-base font-bold text-sky-400">{formData.indicatedReservesMT} <span className="text-[10px] text-slate-500 font-normal">MT</span></div>
            )}
          </div>

          <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Inferred MT</span>
            {editing ? (
              <input
                type="number"
                step="0.01"
                value={formData.inferredReservesMT}
                onChange={(e) => setFormData({ ...formData, inferredReservesMT: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-amber-400 font-bold"
              />
            ) : (
              <div className="text-base font-bold text-amber-400">{formData.inferredReservesMT} <span className="text-[10px] text-slate-500 font-normal">MT</span></div>
            )}
          </div>

          <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Ore Grade (Mn %)</span>
            {editing ? (
              <input
                type="number"
                step="0.1"
                value={formData.actualLabMnPct}
                onChange={(e) => setFormData({ ...formData, actualLabMnPct: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-white font-bold"
              />
            ) : (
              <div className="text-base font-bold text-white">{formData.actualLabMnPct}% <span className="text-[10px] text-slate-400 font-normal">(AI: {formData.predictedAIGradeMnPct}%)</span></div>
            )}
          </div>

          <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Bench RL</span>
            {editing ? (
              <input
                type="number"
                step="0.5"
                value={formData.benchRL}
                onChange={(e) => setFormData({ ...formData, benchRL: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-slate-200 font-bold"
              />
            ) : (
              <div className="text-base font-bold text-slate-200">+{formData.benchRL}m</div>
            )}
          </div>

          <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">Stripping Ratio</span>
            {editing ? (
              <input
                type="number"
                step="0.1"
                value={formData.strippingRatio}
                onChange={(e) => setFormData({ ...formData, strippingRatio: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-slate-200 font-bold"
              />
            ) : (
              <div className="text-base font-bold text-slate-200">{formData.strippingRatio}:1 <span className="text-[10px] text-slate-400 font-normal">W:O</span></div>
            )}
          </div>
        </div>

        {editing && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-md shadow-amber-500/10"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Cadastral Revision</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
