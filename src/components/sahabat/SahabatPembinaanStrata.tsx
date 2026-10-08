import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CoachingRecord } from '../../types';
import { ShieldCheck, Plus, Check, Award, X } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatPembinaanStrata: React.FC = () => {
  const { coachingList, posyanduList, saveCoaching, currentUser } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPosyanduId, setSelectedPosyanduId] = useState<string>('P001');
  const [coachName, setCoachName] = useState<string>(currentUser?.name || 'Tim Promkes');
  const [findings, setFindings] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [followUp, setFollowUp] = useState('');

  const activePosyandu = posyanduList.find((p) => p.id === selectedPosyanduId) || posyanduList[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!findings.trim()) return;

    saveCoaching({
      id: `COACH-${Date.now()}`,
      posyanduId: selectedPosyanduId,
      posyanduName: activePosyandu.name,
      villageName: activePosyandu.villageName,
      date: new Date().toISOString().split('T')[0],
      coachName,
      findings,
      recommendations,
      followUp,
      status: 'Dalam Proses'
    });

    setModalOpen(false);
    setFindings('');
    setRecommendations('');
    setFollowUp('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Pembinaan dan Strata Posyandu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Supervisi Teknis dan Pemantauan Peningkatan Strata Posyandu
          </p>
        </div>

        {currentUser && (
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Pembinaan</span>
          </button>
        )}
      </div>

      {/* Coaching History List */}
      <div className="space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[#0F8B8D]">
          Riwayat Pembinaan Wilayah
        </h3>

        <div className="space-y-3">
          {coachingList.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                    {c.posyanduId} · {c.villageName}
                  </span>
                  <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                    {c.posyanduName}
                  </h4>
                </div>
                <StatusBadge status={c.status} size="sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl dark:bg-slate-800/40">
                <div>
                  <span className="font-semibold text-slate-400 block mb-1">Temuan Pembinaan:</span>
                  <p className="text-slate-800 dark:text-slate-200">{c.findings}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-1">Rekomendasi:</span>
                  <p className="text-slate-800 dark:text-slate-200">{c.recommendations}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-1">Rencana Tindak Lanjut:</span>
                  <p className="text-slate-800 dark:text-slate-200">{c.followUp}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Pembina: {c.coachName}</span>
                <span>Tanggal: {c.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Coaching */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Catat Pembinaan Posyandu
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Posyandu Sasaran *
                </label>
                <select
                  value={selectedPosyanduId}
                  onChange={(e) => setSelectedPosyanduId(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  {posyanduList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name} ({p.villageName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Petugas Pembina *
                </label>
                <input
                  type="text"
                  required
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Temuan Supervisi *
                </label>
                <textarea
                  required
                  rows={2}
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Rekomendasi
                </label>
                <textarea
                  rows={2}
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Rencana Tindak Lanjut
                </label>
                <textarea
                  rows={2}
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
