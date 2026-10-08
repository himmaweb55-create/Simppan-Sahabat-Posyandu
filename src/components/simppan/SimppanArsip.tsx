import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, Search, ArrowUpDown, Download, Printer } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SimppanArsip: React.FC = () => {
  const { reports, setPrintModalData } = useApp();
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const semesterMonths = selectedSemester === 1 ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];

  const filteredReports = reports.filter(
    (r) =>
      semesterMonths.includes(r.month) &&
      (r.posyanduName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.villageName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const verified = filteredReports.filter((r) => r.status === 'Terverifikasi').length;

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Arsip & Data Historis
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Penyimpanan Terstruktur Data Historis Pelaporan Semester 1 & 2 Tahun Anggaran 2026
        </p>
      </div>

      {/* Semester Comparison KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => setSelectedSemester(1)}
          className={`cursor-pointer rounded-3xl border p-5 transition ${
            selectedSemester === 1
              ? 'border-[#0F8B8D] bg-[#0F8B8D]/5 shadow-sm'
              : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-wider">
              Semester I 2026 (Baseline)
            </span>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              Arsip Selesai
            </span>
          </div>
          <h3 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            648 Target Laporan
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Data historis acuan dasar (Januari - Juni 2026) seluruh 108 Posyandu.
          </p>
        </div>

        <div
          onClick={() => setSelectedSemester(2)}
          className={`cursor-pointer rounded-3xl border p-5 transition ${
            selectedSemester === 2
              ? 'border-[#0F8B8D] bg-[#0F8B8D]/5 shadow-sm'
              : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-wider">
              Semester II 2026 (Berjalan)
            </span>
            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600">
              Proses Aktif
            </span>
          </div>
          <h3 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            648 Target Laporan
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Pelaporan berjalan Juli - Desember 2026 (Sinkronisasi Waktu Nyata).
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari arsip berdasarkan nama Posyandu atau Desa..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      {/* Table of Archived Reports */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4">ID Berkas</th>
              <th className="py-3 px-4">Posyandu</th>
              <th className="py-3 px-4">Desa / Kelurahan</th>
              <th className="py-3 px-3 text-center">Bulan</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Verifikator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredReports.slice(0, 40).map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-mono font-bold text-[#0F8B8D]">{r.id}</td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  {r.posyanduName}
                </td>
                <td className="py-3 px-4 text-slate-500">{r.villageName}</td>
                <td className="py-3 px-3 text-center font-bold">Bulan {r.month}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={r.status} size="sm" />
                </td>
                <td className="py-3 px-4 text-slate-500">{r.verifiedBy || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
