import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Posyandu } from '../../types';
import { Search, MapPin, Calendar, Users, X, Layers, Filter } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatPosyanduList: React.FC = () => {
  const { posyanduList, villages } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [activeModalPosyandu, setActiveModalPosyandu] = useState<Posyandu | null>(null);

  const filtered = posyanduList.filter((p) => {
    const matchVillage = selectedVillage === 'all' || p.villageId === selectedVillage;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.villageName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchVillage && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            108 Posyandu
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Total: {filtered.length} Posyandu
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama Posyandu, ID, atau desa..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="sm:w-64">
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">Semua Desa/Kelurahan (18)</option>
            {villages.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of 108 Posyandu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveModalPosyandu(p)}
            className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-[#1E9E6A] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-[#1E9E6A] uppercase tracking-wider">
                  {p.id} · {p.villageName}
                </span>
                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-[#1E9E6A] transition dark:text-white">
                  {p.name}
                </h3>
              </div>
              <StatusBadge status={p.strata} size="sm" />
            </div>

            <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{p.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{p.scheduleDay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span>{p.activeKaders} Kader Aktif</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Sasaran 5 Siklus:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {Object.values(p.targetCount).reduce((a, b) => a + b, 0)} jiwa
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-xs text-slate-400">
          Belum ada data Posyandu
        </div>
      )}

      {/* Posyandu Detail Modal */}
      {activeModalPosyandu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setActiveModalPosyandu(null)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-[#1E9E6A]">
                  {activeModalPosyandu.id} · {activeModalPosyandu.villageName}
                </span>
                <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  {activeModalPosyandu.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalPosyandu(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                <div>
                  <span className="text-slate-400">Strata Posyandu:</span>
                  <div className="mt-1">
                    <StatusBadge status={activeModalPosyandu.strata} size="sm" />
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Jumlah Kader:</span>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {activeModalPosyandu.activeKaders} Orang
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Jadwal Buka:</span>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                    {activeModalPosyandu.scheduleDay}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Alamat:</span>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                    {activeModalPosyandu.address}
                  </p>
                </div>
              </div>

              {/* Lifecycle Targets */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                  Sasaran Kelompok Siklus Hidup
                </h4>
                <div className="space-y-1.5 border border-slate-200 rounded-2xl p-3 dark:border-slate-700">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Ibu Hamil, Nifas & Menyusui:</span>
                    <span className="font-bold">{activeModalPosyandu.targetCount.ibuHamil}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Bayi & Balita (0-6 tahun):</span>
                    <span className="font-bold">{activeModalPosyandu.targetCount.balita}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Usia Sekolah & Remaja:</span>
                    <span className="font-bold">{activeModalPosyandu.targetCount.remaja}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Dewasa / Usia Produktif:</span>
                    <span className="font-bold">{activeModalPosyandu.targetCount.dewasa}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600 dark:text-slate-400">Lanjut Usia (Lansia):</span>
                    <span className="font-bold">{activeModalPosyandu.targetCount.lansia}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
