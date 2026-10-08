import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Database,
  BarChart2,
  HardDrive,
  FileCheck,
  RefreshCw,
  AlertTriangle,
  Layers
} from 'lucide-react';

export const SuperadminDashboard: React.FC = () => {
  const {
    accounts,
    posyanduList,
    villages,
    reports,
    systemUsage,
    syncConfig,
    setActivePage
  } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Dashboard Superadmin
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pusat Kontrol Sistem Informasi Digital Puskesmas Kepanjen
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Akun Terdaftar</span>
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            {accounts.length}
          </p>
          <p className="text-[11px] text-slate-400">108 Posyandu + 18 Desa + Staf</p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Basis Data Posyandu</span>
            <Layers className="h-5 w-5 text-[#1E9E6A]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#1E9E6A]">
            108 Posyandu
          </p>
          <p className="text-[11px] text-slate-400">18 Desa & Kelurahan</p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Arsip Pelaporan 2026</span>
            <FileCheck className="h-5 w-5 text-[#0F8B8D]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F8B8D]">
            {reports.length}
          </p>
          <p className="text-[11px] text-slate-400">Laporan tersimpan terstruktur</p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Status Sinkronisasi</span>
            <RefreshCw className="h-5 w-5 text-blue-600" />
          </div>
          <p className="font-heading text-base font-extrabold text-blue-600">
            {syncConfig.connected ? 'Terhubung' : 'Siap Diuji'}
          </p>
          <p className="text-[11px] text-slate-400">Google Drive & Sheets</p>
        </div>
      </div>

      {/* Quick Access Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => setActivePage('sinkronisasi')}
          className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-purple-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Tab Sinkronisasi
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Google Apps Script generator, Drive folder 1SPqoKmWBYQi1tJ_NUNR8iV0wqxAl2g9b, Sheets sync.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('penggunaan_sistem')}
          className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#0F8B8D] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
            <BarChart2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Penggunaan Sistem
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Grafik kuota database, penyimpanan storage, bandwidth, dan traffic baca/tulis.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('akun')}
          className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1E9E6A] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1E9E6A]/10 text-[#1E9E6A]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Manajemen Akun
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pengaturan 108 akun kader Posyandu, 18 desa, peran, dan reset kata sandi.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('master_data')}
          className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#0F8B8D] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Master Data
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Desa, Posyandu, Program, Siklus Hidup, Jenis Layanan, Strata, dan Indikator.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('cadangan')}
          className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-blue-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
            <HardDrive className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Cadangan & Impor Data
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cadangkan data JSON / CSV dan impor fleksibel dari Google Sheets.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('validasi_data')}
          className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-amber-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Validasi Integritas Data
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pemeriksaan otomatis ID ganda, anomali angka, dan konsistensi relasi.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
