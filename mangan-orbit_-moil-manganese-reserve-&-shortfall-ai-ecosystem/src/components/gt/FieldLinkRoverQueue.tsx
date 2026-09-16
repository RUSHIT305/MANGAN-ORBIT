import React, { useState } from "react";
import { Radio, MapPin, RefreshCw, CheckCircle, Clock, AlertTriangle, Plus, Satellite, X } from "lucide-react";
import type { GroundTruthingRoverTask } from "../../types/index.ts";

interface FieldLinkRoverQueueProps {
  tasks: GroundTruthingRoverTask[];
  onSyncAll: () => void;
  onAddTask: (task: GroundTruthingRoverTask) => void;
}

export const FieldLinkRoverQueue: React.FC<FieldLinkRoverQueueProps> = ({
  tasks,
  onSyncAll,
  onAddTask
}) => {
  const [syncing, setSyncing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCollar, setNewCollar] = useState("BH-DB-2026-106");
  const [newBlock, setNewBlock] = useState("DB-PIT-A1");
  const [newFieldMn, setNewFieldMn] = useState("44.5");
  const [newLithology, setNewLithology] = useState("Braunite Lode with Pyrolusite nodules");

  const handleTriggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      onSyncAll();
      setSyncing(false);
    }, 1200);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: GroundTruthingRoverTask = {
      id: `GT-ROV-${Date.now().toString(36).slice(-4).toUpperCase()}`,
      boreholeOrCollarId: newCollar,
      blockCode: newBlock,
      gnssCoordinates: {
        latitude: 21.6525 + (Math.random() - 0.5) * 0.005,
        longitude: 79.6730 + (Math.random() - 0.5) * 0.005,
        altitudeM: +(285 + Math.random() * 20).toFixed(1),
        rtkAccuracyCm: +(1.2 + Math.random() * 0.8).toFixed(1),
        satelliteCount: Math.floor(18 + Math.random() * 6)
      },
      geologistAssignee: "Field Geologist (On Shift)",
      lithologySample: newLithology,
      fieldMnReadingPct: parseFloat(newFieldMn) || 42.0,
      syncStatus: "FIELD_LOGGED",
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onAddTask(newTask);
    setShowAddModal(false);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              FieldLink™ RTK Rover Queue & Ground Truthing
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                GNSS Dual-Freq RTK Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Correlates field spectrometer assays & collar coordinates with ReserveLens model
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Log Sample</span>
          </button>
          <button
            onClick={handleTriggerSync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : "Sync GPS Assays"}</span>
          </button>
        </div>
      </div>

      {/* Task Queue List */}
      <div className="space-y-2.5 overflow-y-auto max-h-72">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-slate-800 text-amber-400 rounded mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">
                    {task.boreholeOrCollarId}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                    {task.blockCode}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    {task.fieldMnReadingPct}% Mn
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {task.lithologySample} • <span className="text-slate-500">{task.geologistAssignee}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:text-right text-xs">
              <div className="text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1 text-slate-300">
                  <Satellite className="w-3 h-3 text-sky-400" />
                  <span>±{task.gnssCoordinates.rtkAccuracyCm}cm RTK ({task.gnssCoordinates.satelliteCount} Sats)</span>
                </div>
                <span className="text-[10px] text-slate-500">RL +{task.gnssCoordinates.altitudeM}m</span>
              </div>

              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                    task.syncStatus === "SYNCED"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : task.syncStatus === "FIELD_LOGGED"
                      ? "bg-sky-500/10 text-sky-300 border border-sky-500/20"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  }`}
                >
                  {task.syncStatus === "SYNCED" ? (
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  <span>{task.syncStatus}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-white">Log Field Ground Truth Sample</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Collar / Borehole ID</label>
                <input
                  type="text"
                  value={newCollar}
                  onChange={(e) => setNewCollar(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Mine Block</label>
                  <input
                    type="text"
                    value={newBlock}
                    onChange={(e) => setNewBlock(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Field Mn Grade (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFieldMn}
                    onChange={(e) => setNewFieldMn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Lithology Description</label>
                <input
                  type="text"
                  value={newLithology}
                  onChange={(e) => setNewLithology(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200"
                  required
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 font-bold text-slate-950 rounded-lg hover:bg-amber-400"
                >
                  Save to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
