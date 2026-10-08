import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Layers, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatStatusLaporan: React.FC = () => {
  const { posyanduList, reports, villages, setActivePage, setSelectedPosyanduId } = useApp();
  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const filtered = posyanduList.filter((p) => {
    const matchVillage = selectedVillage === 'all' || p.villageId === selectedVillage;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchVillage && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Status Pelaporan 108 Posyandu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Matriks Pelaporan Bulanan Tahun 2026 (Semester 1 & 2)
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-300">Status:</span>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#22A06B]" />
          <span>Terverifikasi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#2E7DD7]" />
          <span>Sudah Dikirim</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#F2A024]" />
          <span>Belum Lengkap / Perbaikan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#D64545]" />
          <span>Belum Lapor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span>Draft / NA</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama posyandu atau ID..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="sm:w-64">
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4 min-w-[180px]">Nama Posyandu</th>
              <th className="py-3 px-4 min-w-[120px]">Desa</th>
              {months.map((m) => (
                <th key={m} className="py-3 px-2 text-center w-12">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
              >
                <td className="py-2.5 px-4 font-mono font-bold text-[#1E9E6A]">
                  {p.id}
                </td>
                <td className="py-2.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                  {p.name}
                </td>
                <td className="py-2.5 px-4 text-slate-500">
                  {p.villageName}
                </td>
                {months.map((_, mIdx) => {
                  const monthNum = mIdx + 1;
                  const rep = reports.find(
                    (r) => r.posyanduId === p.id && r.year === 2026 && r.month === monthNum
                  );

                  let dotColor = 'bg-slate-200 dark:bg-slate-700'; // NA
                  let titleStr = 'NA';

                  if (rep) {
                    titleStr = rep.status;
                    if (rep.status === 'Terverifikasi') dotColor = 'bg-[#22A06B] shadow-xs';
                    else if (rep.status === 'Sudah dikirim') dotColor = 'bg-[#2E7DD7]';
                    else if (rep.status === 'Belum lengkap' || rep.status === 'Perlu diperbaiki')
                      dotColor = 'bg-[#F2A024]';
                    else if (rep.status === 'Draft') dotColor = 'bg-[#D64545]';
                  } else if (monthNum <= 9) {
                    dotColor = 'bg-[#D64545]'; // Belum lapor
                    titleStr = 'Belum lapor';
                  }

                  return (
                    <td key={mIdx} className="py-2.5 px-2 text-center" title={`${p.name} (${months[mIdx]}): ${titleStr}`}>
                      <div className="flex justify-center">
                        <span className={`h-3 w-3 rounded-full ${dotColor}`} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
