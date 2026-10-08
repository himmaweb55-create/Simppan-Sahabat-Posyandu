import React, { useState } from 'react';
import { useApp, ActiveSpace } from '../../context/AppContext';
import {
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Building2,
  Stethoscope,
  MapPin,
  Users2,
  Database,
  GraduationCap,
  HeartPulse,
  Newspaper,
  Calendar,
  MessageSquare,
  Search,
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  ClipboardList,
  ShieldAlert,
  LogIn,
  LogOut,
  Moon,
  Sun,
  Activity,
  Layers
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const {
    activeSpace,
    setActiveSpace,
    activePage,
    setActivePage,
    currentUser,
    setLoginModalOpen,
    logout,
    darkMode,
    toggleDarkMode,
    setGlobalSearchOpen
  } = useApp();

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNav = (space: ActiveSpace, page: string) => {
    setActiveSpace(space);
    setActivePage(page);
    onClose();
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleLoginClick = () => {
    onClose();
    setLoginModalOpen(true);
  };

  const handleLogoutClick = () => {
    onClose();
    logout();
  };

  const handleSearchClick = () => {
    onClose();
    setGlobalSearchOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel: ~85% width */}
      <div className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-10">
        {/* Header inside drawer */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E9E6A] to-[#0F8B8D] text-white font-bold text-sm">
              PK
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Puskesmas Kepanjen
              </p>
              <p className="text-[11px] text-[#0F8B8D] font-medium">
                {activeSpace === 'simppan' ? 'SIMPPAN' : 'SAHABAT POSYANDU'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Tutup menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Space Switcher Pill */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-200/60 p-1 dark:bg-slate-800">
            <button
              onClick={() => setActiveSpace('sahabat')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                activeSpace === 'sahabat'
                  ? 'bg-white text-[#1E9E6A] shadow-xs dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              SAHABAT
            </button>
            <button
              onClick={() => setActiveSpace('simppan')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                activeSpace === 'simppan'
                  ? 'bg-white text-[#0F8B8D] shadow-xs dark:bg-slate-900'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              SIMPPAN
            </button>
          </div>
        </div>

        {/* Navigation Items (min-h 48px, min font 16px) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {activeSpace === 'sahabat' ? (
            <>
              <button
                onClick={() => handleNav('sahabat', 'beranda')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'beranda'
                    ? 'bg-[#1E9E6A]/10 text-[#1E9E6A] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Home className="h-5 w-5 shrink-0" />
                <span>Beranda</span>
              </button>

              <button
                onClick={() => handleNav('sahabat', 'posyandu')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'posyandu'
                    ? 'bg-[#1E9E6A]/10 text-[#1E9E6A] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Users2 className="h-5 w-5 shrink-0" />
                <span>108 Posyandu</span>
              </button>

              <button
                onClick={() => handleNav('sahabat', 'rumah_data')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'rumah_data'
                    ? 'bg-[#1E9E6A]/10 text-[#1E9E6A] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Database className="h-5 w-5 shrink-0" />
                <span>Rumah Data</span>
              </button>

              <button
                onClick={() => handleNav('sahabat', 'belajar')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'belajar'
                    ? 'bg-[#1E9E6A]/10 text-[#1E9E6A] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="h-5 w-5 shrink-0" />
                <span>Belajar Kader</span>
              </button>

              {/* Accordion: Informasi & Layanan */}
              <div>
                <button
                  onClick={() => toggleAccordion('info')}
                  className="flex h-12 w-full items-center justify-between rounded-xl px-3.5 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3.5">
                    <HeartPulse className="h-5 w-5 shrink-0 text-[#1E9E6A]" />
                    <span>Informasi & Layanan</span>
                  </div>
                  {openAccordion === 'info' ? (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                {openAccordion === 'info' && (
                  <div className="ml-5 mt-1 space-y-1 border-l-2 border-slate-200 pl-3 dark:border-slate-800">
                    <button
                      onClick={() => handleNav('sahabat', 'profil')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>Profil Puskesmas</span>
                    </button>
                    <button
                      onClick={() => handleNav('sahabat', 'layanan')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Stethoscope className="h-4 w-4" />
                      <span>Layanan Puskesmas</span>
                    </button>
                    <button
                      onClick={() => handleNav('sahabat', 'info_kesehatan')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <HeartPulse className="h-4 w-4" />
                      <span>Informasi Kesehatan</span>
                    </button>
                    <button
                      onClick={() => handleNav('sahabat', 'artikel')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Newspaper className="h-4 w-4" />
                      <span>Artikel & Berita</span>
                    </button>
                    <button
                      onClick={() => handleNav('sahabat', 'jadwal')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Jadwal Kegiatan</span>
                    </button>
                    <button
                      onClick={() => handleNav('sahabat', 'kontak')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Lokasi & Kontak</span>
                    </button>
                    <button
                      onClick={() => handleNav('sahabat', 'pengaduan')}
                      className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Pengaduan & Umpan Balik</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Logged in sections for Posyandu */}
              {currentUser && (
                <div>
                  <button
                    onClick={() => toggleAccordion('operasional')}
                    className="flex h-12 w-full items-center justify-between rounded-xl px-3.5 text-left text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-3.5">
                      <LayoutDashboard className="h-5 w-5 shrink-0 text-[#1E9E6A]" />
                      <span>Portal Operasional</span>
                    </div>
                    {openAccordion === 'operasional' ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </button>

                  {openAccordion === 'operasional' && (
                    <div className="ml-5 mt-1 space-y-1 border-l-2 border-slate-200 pl-3 dark:border-slate-800">
                      <button
                        onClick={() => handleNav('sahabat', 'dashboard_posyandu')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dasbor Wilayah</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'pelaporan')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Pelaporan Posyandu</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'data_pelayanan')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Data Pelayanan</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'lhk_posyandu')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <ClipboardList className="h-4 w-4" />
                        <span>LHK Posyandu</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'status_laporan')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <Layers className="h-4 w-4" />
                        <span>Status Laporan 108 Posyandu</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'monitoring_pelaporan')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <Activity className="h-4 w-4" />
                        <span>Monitoring Pelaporan</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'monitoring_pelayanan')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Monitoring Pelayanan</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'pws')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <Activity className="h-4 w-4" />
                        <span>PWS Posyandu</span>
                      </button>
                      <button
                        onClick={() => handleNav('sahabat', 'pembinaan')}
                        className="flex h-11 w-full items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        <span>Pembinaan & Strata</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* SIMPPAN Nav */
            <>
              <button
                onClick={() => handleNav('simppan', 'dashboard')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'dashboard'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="h-5 w-5 shrink-0" />
                <span>Dashboard SIMPPAN</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'ruang_kerja')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'ruang_kerja'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="h-5 w-5 shrink-0" />
                <span>Ruang Kerja</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'kegiatan')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'kegiatan'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Calendar className="h-5 w-5 shrink-0" />
                <span>Agenda & Kegiatan</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'perencanaan')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'perencanaan'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="h-5 w-5 shrink-0" />
                <span>Perencanaan</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'dokumen_kegiatan')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'dokumen_kegiatan'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <ClipboardList className="h-5 w-5 shrink-0" />
                <span>Dokumen Kegiatan (SAP/LHK/SPJ)</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'data_capaian')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'data_capaian'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="h-5 w-5 shrink-0" />
                <span>Data & Capaian PKP</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'monitoring')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'monitoring'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Activity className="h-5 w-5 shrink-0" />
                <span>Monitoring & Evaluasi</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'print_center')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'print_center'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="h-5 w-5 shrink-0" />
                <span>Print & Export Center</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'pengetahuan')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'pengetahuan'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="h-5 w-5 shrink-0" />
                <span>Publikasi & Inovasi</span>
              </button>

              <button
                onClick={() => handleNav('simppan', 'arsip')}
                className={`flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium transition ${
                  activePage === 'arsip'
                    ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Database className="h-5 w-5 shrink-0" />
                <span>Arsip & Data Historis</span>
              </button>

              {currentUser?.role === 'superadmin' && (
                <button
                  onClick={() => handleNav('superadmin', 'dashboard')}
                  className="flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                >
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <span>Superadmin</span>
                </button>
              )}
            </>
          )}

          {/* Quick utility rows */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <button
              onClick={handleSearchClick}
              className="flex h-12 w-full items-center gap-3.5 rounded-xl px-3.5 text-left text-base text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Search className="h-5 w-5 text-slate-400" />
              <span>Cari</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="flex h-12 w-full items-center justify-between rounded-xl px-3.5 text-left text-base text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-3.5">
                {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-500" />}
                <span>{darkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer inside drawer: Login / Logout always visible at bottom */}
        <div className="border-t border-slate-100 p-4 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          {currentUser ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F8B8D]/20 text-[#0F8B8D] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {currentUser.title || currentUser.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogoutClick}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white text-sm font-medium text-red-600 shadow-xs hover:bg-red-50 dark:border-red-900 dark:bg-slate-900 dark:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F8B8D] text-base font-semibold text-white shadow-md shadow-[#0F8B8D]/20 hover:bg-[#0d7a7c]"
            >
              <LogIn className="h-5 w-5" />
              <span>Masuk</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
