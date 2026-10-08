import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FollowUpItem } from '../../types';
import {
  Activity,
  Plus,
  Check,
  AlertCircle,
  Clock,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SimppanMonitoring: React.FC = () => {
  const { followUps, saveFollowUp, currentUser } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>('all');

  const [title, setTitle] = useState('');
  const [source, setSource] = useState<FollowUpItem['source']>('Monitoring');
  const [target, setTarget] = useState('Desa Kepanjen');
  const [pic, setPic] = useState('Ners Siti Aminah');
  const [deadline, setDeadline] = useState('18 Okt 2026');
  const [priority, setPriority] = useState<'Normal' | 'Tinggi'>('Tinggi');

  const filtered = followUps.filter(
    (f) => selectedSource === 'all' || f.source === selectedSource
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    saveFollowUp({
      id: `FLW-${Date.now()}`,
      source,
      title: title.trim(),
      villageOrPosyandu: target.trim(),
      pic: pic.trim(),
      deadline,
      status: 'Belum Selesai',
      priority
    });

    setModalOpen(false);
    setTitle('');
  };

  const handleToggleStatus = (item: FollowUpItem) => {
    const nextStatus = item.status === 'Selesai' ? 'Belum Selesai' : 'Selesai';
    saveFollowUp({
      ...item,
      status: nextStatus
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Monitoring, Evaluasi & Tindak Lanjut
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Daftar Terpadu Tindak Lanjut: Kegiatan, Evaluasi, Monitoring, dan Pembinaan
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Tindak Lanjut</span>
        </button>
      </div>

      {/* Filter Source Pills */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Monitoring', 'Evaluasi', 'Kegiatan', 'Pembinaan'].map((src) => (
          <button
            key={src}
            onClick={() => setSelectedSource(src)}
            className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${
              selectedSource === src
                ? 'bg-[#0F8B8D] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {src === 'all' ? 'Semua Sumber' : src}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 uppercase">
                  Sumber: {item.source}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.priority === 'Tinggi'
                      ? 'bg-red-500/10 text-red-600'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {item.priority}
                </span>
                <StatusBadge status={item.status} size="sm" />
              </div>

              <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h4>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>Lokasi: {item.villageOrPosyandu}</span>
                <span>PIC: {item.pic}</span>
                <span>Tenggat: {item.deadline}</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => handleToggleStatus(item)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  item.status === 'Selesai'
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                    : 'bg-[#22A06B] text-white hover:bg-[#1c8458]'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
                <span>{item.status === 'Selesai' ? 'Buka Kembali' : 'Tandai Selesai'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Tambah Tindak Lanjut
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Judul Tindak Lanjut *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Sumber Masalah *
                  </label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Monitoring">Monitoring</option>
                    <option value="Evaluasi">Evaluasi</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pembinaan">Pembinaan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Prioritas *
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Wilayah / Posyandu Sasaran *
                </label>
                <input
                  type="text"
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Penanggung Jawab (PIC) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tenggat Waktu *
                  </label>
                  <input
                    type="text"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
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
                  Simpan Tindak Lanjut
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
