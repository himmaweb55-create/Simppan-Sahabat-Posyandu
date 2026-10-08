import React from 'react';
import { useApp } from '../../context/AppContext';
import { Database, HardDrive, Users, Activity, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SuperadminPenggunaanSistem: React.FC = () => {
  const { systemUsage } = useApp();

  const readsPercent = ((systemUsage.monthlyReads / systemUsage.maxMonthlyReadsQuota) * 100).toFixed(1);
  const writesPercent = ((systemUsage.monthlyWrites / systemUsage.maxMonthlyWritesQuota) * 100).toFixed(1);
  const storagePercent = ((systemUsage.storageMb / systemUsage.maxStorageMbQuota) * 100).toFixed(2);

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Penggunaan Sistem
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pemantauan Kuota Basis Data dan Penyimpanan Paket Sistem
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Kuota Baca (Reads)</span>
            <Activity className="h-4 w-4 text-[#0F8B8D]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            {systemUsage.monthlyReads.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-slate-400">
            Dari {systemUsage.maxMonthlyReadsQuota.toLocaleString('id-ID')} / bulan ({readsPercent}%)
          </p>
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-[#0F8B8D] rounded-full" style={{ width: `${readsPercent}%` }} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Kuota Tulis (Writes)</span>
            <BarChart2 className="h-4 w-4 text-[#1E9E6A]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#1E9E6A]">
            {systemUsage.monthlyWrites.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-slate-400">
            Dari {systemUsage.maxMonthlyWritesQuota.toLocaleString('id-ID')} / bulan ({writesPercent}%)
          </p>
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: `${writesPercent}%` }} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Penyimpanan Terpakai</span>
            <HardDrive className="h-4 w-4 text-purple-600" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            {systemUsage.storageMb} MB
          </p>
          <p className="text-[11px] text-slate-400">
            Kapasitas {systemUsage.maxStorageMbQuota} MB ({storagePercent}%)
          </p>
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${Math.max(2, Number(storagePercent))}%` }} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ketersediaan Sistem</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-emerald-600">
            {systemUsage.uptimePercent}%
          </p>
          <p className="text-[11px] text-slate-400">Uptime Aktif</p>
        </div>
      </div>

      {/* Visual Usage Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar breakdown */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Distribusi Operasi Database
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Operasi Baca Dokumen</span>
                <span className="font-bold">{systemUsage.monthlyReads} ({readsPercent}%)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-[#0F8B8D] rounded-full" style={{ width: `${readsPercent}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Operasi Simpan & Update</span>
                <span className="font-bold">{systemUsage.monthlyWrites} ({writesPercent}%)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: `${writesPercent}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Operasi Hapus (Deletes)</span>
                <span className="font-bold">{systemUsage.monthlyDeletes} (0.7%)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '0.7%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Storage Donut Chart Simulation */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between">
          <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Proporsi Penyimpanan Basis Data
          </h3>

          <div className="flex items-center justify-center py-4">
            <svg viewBox="0 0 160 160" className="h-40 w-40">
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="#e2e8f0" strokeWidth="24" />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#0F8B8D"
                strokeWidth="24"
                strokeDasharray="377"
                strokeDashoffset="120"
                strokeLinecap="round"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#1E9E6A"
                strokeWidth="24"
                strokeDasharray="377"
                strokeDashoffset="280"
                strokeLinecap="round"
              />
              <text x="80" y="85" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">
                {storagePercent}%
              </text>
            </svg>
          </div>

          <div className="flex justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#0F8B8D]" />
              <span>Dokumen Teks Laporan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#1E9E6A]" />
              <span>Master Data & Akun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
