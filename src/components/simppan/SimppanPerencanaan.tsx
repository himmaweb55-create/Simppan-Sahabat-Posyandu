import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';

interface PlanItem {
  id: string;
  idea: string;
  goal: string;
  targetAudience: string;
  proposedDate: string;
  indicator: string;
  pic: string;
  converted: boolean;
}

export const SimppanPerencanaan: React.FC = () => {
  const { saveActivity, setSelectedActivityId, setActivePage, showToast } = useApp();

  const [plans, setPlans] = useState<PlanItem[]>([
    {
      id: 'PLN-01',
      idea: 'Kelas Ibu Balita Tematik MP-ASI Lokal',
      goal: 'Menurunkan risiko stunting balita usia 6-23 bulan di wilayah rawan pangan.',
      targetAudience: 'Ibu balita berat badan kurang di Desa Sukoraharjo',
      proposedDate: '2026-10-24',
      indicator: 'Peningkatan berat badan balita target minimal 80%',
      pic: 'Ners Siti Aminah',
      converted: false
    },
    {
      id: 'PLN-02',
      idea: 'Pojok Konseling Berhenti Merokok (UBM) di Balai Desa',
      goal: 'Meningkatkan kesadaran kepala keluarga terhadap bahaya asap rokok di dalam rumah.',
      targetAudience: 'Warga perokok aktif Desa Mojosari',
      proposedDate: '2026-10-28',
      indicator: 'Cakupan rumah tangga bebas asap rokok naik 10%',
      pic: 'Ahmad Fauzi, S.KM',
      converted: false
    }
  ]);

  const [newIdea, setNewIdea] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newDate, setNewDate] = useState('2026-11-05');
  const [newIndicator, setNewIndicator] = useState('');
  const [newPic, setNewPic] = useState('Ners Siti Aminah');
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) return;

    setPlans((prev) => [
      {
        id: `PLN-${Date.now()}`,
        idea: newIdea.trim(),
        goal: newGoal.trim(),
        targetAudience: newTarget.trim(),
        proposedDate: newDate,
        indicator: newIndicator.trim(),
        pic: newPic.trim(),
        converted: false
      },
      ...prev
    ]);

    setModalOpen(false);
    setNewIdea('');
    setNewGoal('');
    setNewTarget('');
    setNewIndicator('');
    showToast('Rencana kerja ditambahkan', 'success');
  };

  const handleConvertToActivity = (p: PlanItem) => {
    const actId = `ACT-${Date.now()}`;
    saveActivity({
      id: actId,
      title: p.idea,
      program: 'Promosi Kesehatan',
      date: p.proposedDate,
      time: '09:00 WIB',
      location: 'Puskesmas Kepanjen',
      pic: p.pic,
      status: 'Direncanakan',
      targetAudience: p.targetAudience,
      participantCount: 30,
      results: p.goal
    });

    setPlans((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, converted: true } : item))
    );

    setSelectedActivityId(actId);
    setActivePage('kegiatan');
    showToast('Berhasil dijadikan kegiatan', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Perencanaan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Alur Gagasan Kerja: Ide → Tujuan → Sasaran → Jadwal → Indikator
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Rencana</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                  Rencana Inisiatif
                </span>
                {p.converted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" />
                    Sudah Jadi Kegiatan
                  </span>
                )}
              </div>

              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {p.idea}
              </h3>

              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl dark:bg-slate-800/40">
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Tujuan:</span>
                  <p className="text-slate-800 dark:text-slate-200">{p.goal}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Sasaran:</span>
                  <p className="text-slate-800 dark:text-slate-200">{p.targetAudience}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 block mb-0.5">Target Indikator:</span>
                  <p className="text-slate-800 dark:text-slate-200">{p.indicator}</p>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-slate-400">
                  <span>Rencana Jadwal: {p.proposedDate}</span>
                  <span>PIC: {p.pic}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                disabled={p.converted}
                onClick={() => handleConvertToActivity(p)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F8B8D] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0d7a7c] transition disabled:opacity-50"
              >
                <span>{p.converted ? 'Tersalin ke Kegiatan' : 'Jadikan Kegiatan'}</span>
                {!p.converted && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Buat Gagasan Perencanaan
              </h2>
            </div>

            <form onSubmit={handleCreatePlan} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Ide / Rencana Inisiatif *
                </label>
                <input
                  type="text"
                  required
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tujuan Kerja *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Sasaran *
                </label>
                <input
                  type="text"
                  required
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Rencana Tanggal *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Penanggung Jawab *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPic}
                    onChange={(e) => setNewPic(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Indikator
                </label>
                <input
                  type="text"
                  value={newIndicator}
                  onChange={(e) => setNewIndicator(e.target.value)}
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
                  Simpan Rencana
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
