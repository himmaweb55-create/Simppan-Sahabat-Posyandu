import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  FileCheck2,
  FileText,
  BarChart3,
  Activity,
  Layers,
  Database,
  Users2,
  Search,
  Share2,
  Lightbulb,
  Settings,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const SimppanSidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    setActiveSpace,
    currentUser,
    setGlobalSearchOpen
  } = useApp();

  const handleNav = (page: string) => {
    setActivePage(page);
  };

  const navItemClass = (pageKey: string) => {
    const isActive = activePage === pageKey;
    return `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
      isActive
        ? 'bg-[#0F8B8D] text-white shadow-sm shadow-[#0F8B8D]/25'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`;
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 min-h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Brand tag in sidebar */}
        <div className="flex items-center gap-2.5 px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F8B8D] text-white font-extrabold text-xs">
            SP
          </div>
          <div>
            <h3 className="font-heading text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              SIMPPAN
            </h3>
            <p className="text-[10px] text-slate-400">Puskesmas Kepanjen</p>
          </div>
        </div>

        {/* Group: MAIN */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Main
          </p>
          <button
            onClick={() => handleNav('dashboard')}
            className={navItemClass('dashboard')}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => handleNav('ruang_kerja')}
            className={navItemClass('ruang_kerja')}
          >
            <Briefcase className="h-4 w-4 shrink-0" />
            <span>Ruang Kerja</span>
          </button>
        </div>

        {/* Group: KEGIATAN */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Kegiatan
          </p>
          <button
            onClick={() => handleNav('kegiatan')}
            className={navItemClass('kegiatan')}
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span>Agenda & Kegiatan</span>
          </button>
          <button
            onClick={() => handleNav('perencanaan')}
            className={navItemClass('perencanaan')}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>Perencanaan</span>
          </button>
          <button
            onClick={() => handleNav('dokumen_kegiatan')}
            className={navItemClass('dokumen_kegiatan')}
          >
            <FileCheck2 className="h-4 w-4 shrink-0" />
            <span>Dokumentasi & Bukti</span>
          </button>
        </div>

        {/* Group: DATA */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Data
          </p>
          <button
            onClick={() => handleNav('data_capaian')}
            className={navItemClass('data_capaian')}
          >
            <BarChart3 className="h-4 w-4 shrink-0" />
            <span>Data & Capaian</span>
          </button>
          <button
            onClick={() => handleNav('monitoring')}
            className={navItemClass('monitoring')}
          >
            <Activity className="h-4 w-4 shrink-0" />
            <span>Monitoring</span>
          </button>
          <button
            onClick={() => handleNav('evaluasi')}
            className={navItemClass('evaluasi')}
          >
            <FileCheck2 className="h-4 w-4 shrink-0" />
            <span>Evaluasi & Tindak Lanjut</span>
          </button>
        </div>

        {/* Group: PELAPORAN */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Pelaporan
          </p>
          <button
            onClick={() => handleNav('print_center')}
            className={navItemClass('print_center')}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>Print & Export Center</span>
          </button>
          <button
            onClick={() => handleNav('pkp_laporan')}
            className={navItemClass('pkp_laporan')}
          >
            <BarChart3 className="h-4 w-4 shrink-0" />
            <span>PKP & Laporan</span>
          </button>
          <button
            onClick={() => handleNav('arsip')}
            className={navItemClass('arsip')}
          >
            <Database className="h-4 w-4 shrink-0" />
            <span>Arsip & Data Historis</span>
          </button>
        </div>

        {/* Group: POSYANDU */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Posyandu
          </p>
          <button
            onClick={() => {
              setActiveSpace('sahabat');
              setActivePage('monitoring_pelaporan');
            }}
            className={navItemClass('monitoring_pelaporan')}
          >
            <Layers className="h-4 w-4 shrink-0" />
            <span>Monitoring 108 Posyandu</span>
          </button>
          <button
            onClick={() => {
              setActiveSpace('sahabat');
              setActivePage('posyandu');
            }}
            className={navItemClass('posyandu')}
          >
            <Users2 className="h-4 w-4 shrink-0" />
            <span>Data Posyandu</span>
          </button>
          <button
            onClick={() => {
              setActiveSpace('sahabat');
              setActivePage('beranda');
            }}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#1E9E6A] hover:bg-[#1E9E6A]/10 transition"
          >
            <div className="flex items-center gap-3">
              <Users2 className="h-4 w-4 shrink-0" />
              <span>SAHABAT POSYANDU</span>
            </div>
            <ExternalLink className="h-3 w-3" />
          </button>
          <button
            onClick={() => {
              setActiveSpace('sahabat');
              setActivePage('rumah_data');
            }}
            className={navItemClass('rumah_data')}
          >
            <Database className="h-4 w-4 shrink-0" />
            <span>18 Rumah Data Linktree</span>
          </button>
        </div>

        {/* Group: LAINNYA */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Lainnya
          </p>
          <button
            onClick={() => setGlobalSearchOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span>Pencarian</span>
          </button>
          <button
            onClick={() => handleNav('pengetahuan')}
            className={navItemClass('pengetahuan')}
          >
            <Share2 className="h-4 w-4 shrink-0" />
            <span>Publikasi</span>
          </button>
          <button
            onClick={() => handleNav('inovasi')}
            className={navItemClass('inovasi')}
          >
            <Lightbulb className="h-4 w-4 shrink-0" />
            <span>Pembelajaran & Inovasi</span>
          </button>
        </div>

        {/* Group: SYSTEM */}
        <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            System
          </p>
          <button
            onClick={() => handleNav('pengaturan')}
            className={navItemClass('pengaturan')}
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span>Pengaturan</span>
          </button>

          {currentUser?.role === 'superadmin' && (
            <button
              onClick={() => {
                setActiveSpace('superadmin');
                setActivePage('dashboard');
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/30 transition"
            >
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Superadmin</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
