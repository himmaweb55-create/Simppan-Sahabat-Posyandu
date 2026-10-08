import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProgramIndicator } from '../../types';
import { BarChart3, TrendingUp, Plus, Edit3, X, Check } from 'lucide-react';

export const SimppanDataCapaian: React.FC = () => {
  const { indicators, updateIndicator, showToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInd, setEditingInd] = useState<ProgramIndicator | null>(null);

  const [realization, setRealization] = useState<number>(90);

  const openEdit = (ind: ProgramIndicator) => {
    setEditingInd(ind);
    setRealization(ind.realizationPercent);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInd) return;

    const dev = Number((realization - editingInd.targetPercent).toFixed(1));
    updateIndicator({
      ...editingInd,
      realizationPercent: realization,
      deviationPercent: dev
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Data dan Capaian PKP
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Penilaian Kinerja Puskesmas (PKP) Program Promosi Kesehatan Tahun 2026
          </p>
        </div>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicators.map((ind) => {
          const isPassed = ind.realizationPercent >= ind.targetPercent;

          return (
            <div
              key={ind.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                  {ind.programName}
                </span>
                <button
                  onClick={() => openEdit(ind)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Ubah Capaian"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </div>

              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {ind.indicatorName}
              </h3>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[11px] text-slate-400">Realisasi</span>
                  <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
                    {ind.realizationPercent}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400">Target: {ind.targetPercent}%</span>
                  <p
                    className={`text-xs font-bold ${
                      isPassed ? 'text-[#22A06B]' : 'text-[#D64545]'
                    }`}
                  >
                    {ind.deviationPercent >= 0
                      ? `+${ind.deviationPercent}% ▲`
                      : `${ind.deviationPercent}% ▼`}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isPassed ? 'bg-[#22A06B]' : 'bg-[#D64545]'
                  }`}
                  style={{ width: `${Math.min(100, ind.realizationPercent)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {modalOpen && editingInd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Update Capaian Indikator
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400">Indikator:</span>
                <p className="font-bold text-slate-900 dark:text-white">
                  {editingInd.indicatorName}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Standar: {editingInd.targetPercent}%
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Realisasi Berjalan (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  required
                  value={realization}
                  onChange={(e) => setRealization(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
                >
                  Simpan Capaian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
