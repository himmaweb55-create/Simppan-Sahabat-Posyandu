import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronDown,
  User,
  LogOut,
  LogIn,
  KeyRound,
  ShieldCheck,
  WifiOff
} from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

export const Header: React.FC = () => {
  const {
    activeSpace,
    setActiveSpace,
    activePage,
    setActivePage,
    currentUser,
    setLoginModalOpen,
    setChangePasswordModalOpen,
    logout,
    darkMode,
    toggleDarkMode,
    isOnline,
    setGlobalSearchOpen,
    setNotificationDrawerOpen,
    notifications
  } = useApp();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [lainnyaMenuOpen, setLainnyaMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  const lainnyaRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (lainnyaRef.current && !lainnyaRef.current.contains(e.target as Node)) {
        setLainnyaMenuOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setQuickActionOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLainnyaMenuOpen(false);
        setUserMenuOpen(false);
        setQuickActionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-3 sm:px-6">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveSpace('sahabat');
                setActivePage('beranda');
              }}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1E9E6A] to-[#0F8B8D] text-white shadow-sm font-bold text-sm">
                PK
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-slate-900 dark:text-white leading-none">
                    Puskesmas Kepanjen
                  </span>
                  {!isOnline && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      <WifiOff className="h-3 w-3" />
                      Offline
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-[#0F8B8D]">
                  {activeSpace === 'simppan'
                    ? 'SIMPPAN · Ruang Kerja Promkes'
                    : 'SAHABAT POSYANDU'}
                </span>
              </div>
            </button>

            {/* Space Switcher Pill (Desktop) */}
            <div className="hidden lg:flex items-center ml-4 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                onClick={() => {
                  setActiveSpace('sahabat');
                  setActivePage('beranda');
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeSpace === 'sahabat'
                    ? 'bg-white text-[#1E9E6A] shadow-xs dark:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                SAHABAT POSYANDU
              </button>
              <button
                onClick={() => {
                  setActiveSpace('simppan');
                  setActivePage('dashboard');
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeSpace === 'simppan'
                    ? 'bg-white text-[#0F8B8D] shadow-xs dark:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                SIMPPAN
              </button>
            </div>
          </div>

          {/* Center / Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {activeSpace === 'sahabat' ? (
              <>
                <button
                  onClick={() => setActivePage('beranda')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'beranda'
                      ? 'text-[#1E9E6A] bg-[#1E9E6A]/10'
                      : 'text-slate-700 hover:text-[#1E9E6A] dark:text-slate-200'
                  }`}
                >
                  Beranda
                </button>

                <button
                  onClick={() => setActivePage('posyandu')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'posyandu'
                      ? 'text-[#1E9E6A] bg-[#1E9E6A]/10'
                      : 'text-slate-700 hover:text-[#1E9E6A] dark:text-slate-200'
                  }`}
                >
                  108 Posyandu
                </button>

                <button
                  onClick={() => setActivePage('rumah_data')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'rumah_data'
                      ? 'text-[#1E9E6A] bg-[#1E9E6A]/10'
                      : 'text-slate-700 hover:text-[#1E9E6A] dark:text-slate-200'
                  }`}
                >
                  Rumah Data
                </button>

                <button
                  onClick={() => setActivePage('belajar')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'belajar'
                      ? 'text-[#1E9E6A] bg-[#1E9E6A]/10'
                      : 'text-slate-700 hover:text-[#1E9E6A] dark:text-slate-200'
                  }`}
                >
                  Belajar Kader
                </button>

                {/* Dropdown: Lainnya */}
                <div ref={lainnyaRef} className="relative">
                  <button
                    onClick={() => setLainnyaMenuOpen(!lainnyaMenuOpen)}
                    className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#1E9E6A] dark:text-slate-200"
                  >
                    <span>Lainnya</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  {lainnyaMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900 z-50">
                      <button
                        onClick={() => {
                          setActivePage('profil');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Profil Puskesmas
                      </button>
                      <button
                        onClick={() => {
                          setActivePage('layanan');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Layanan Puskesmas
                      </button>
                      <button
                        onClick={() => {
                          setActivePage('info_kesehatan');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Informasi Kesehatan
                      </button>
                      <button
                        onClick={() => {
                          setActivePage('artikel');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Artikel & Berita
                      </button>
                      <button
                        onClick={() => {
                          setActivePage('jadwal');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Jadwal Kegiatan
                      </button>
                      <button
                        onClick={() => {
                          setActivePage('kontak');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Lokasi & Kontak
                      </button>
                      <button
                        onClick={() => {
                          setActivePage('pengaduan');
                          setLainnyaMenuOpen(false);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Pengaduan & Feedback
                      </button>
                    </div>
                  )}
                </div>

                {/* If logged in: Portal Operasional */}
                {currentUser && (
                  <button
                    onClick={() => setActivePage('dashboard_posyandu')}
                    className="rounded-xl bg-[#1E9E6A]/10 px-3 py-2 text-xs font-bold text-[#1E9E6A] hover:bg-[#1E9E6A]/20 transition"
                  >
                    Portal Posyandu
                  </button>
                )}
              </>
            ) : (
              /* SIMPPAN Nav */
              <>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'dashboard'
                      ? 'text-[#0F8B8D] bg-[#0F8B8D]/10'
                      : 'text-slate-700 hover:text-[#0F8B8D] dark:text-slate-200'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActivePage('ruang_kerja')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'ruang_kerja'
                      ? 'text-[#0F8B8D] bg-[#0F8B8D]/10'
                      : 'text-slate-700 hover:text-[#0F8B8D] dark:text-slate-200'
                  }`}
                >
                  Ruang Kerja
                </button>
                <button
                  onClick={() => setActivePage('kegiatan')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'kegiatan'
                      ? 'text-[#0F8B8D] bg-[#0F8B8D]/10'
                      : 'text-slate-700 hover:text-[#0F8B8D] dark:text-slate-200'
                  }`}
                >
                  Kegiatan
                </button>
                <button
                  onClick={() => setActivePage('data_capaian')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'data_capaian'
                      ? 'text-[#0F8B8D] bg-[#0F8B8D]/10'
                      : 'text-slate-700 hover:text-[#0F8B8D] dark:text-slate-200'
                  }`}
                >
                  Capaian PKP
                </button>
                <button
                  onClick={() => setActivePage('monitoring')}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    activePage === 'monitoring'
                      ? 'text-[#0F8B8D] bg-[#0F8B8D]/10'
                      : 'text-slate-700 hover:text-[#0F8B8D] dark:text-slate-200'
                  }`}
                >
                  Monitoring
                </button>
              </>
            )}
          </nav>

          {/* Right: Actions, Quick Action, Theme, Notifications, Login/Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Action in SIMPPAN */}
            {activeSpace === 'simppan' && (
              <div ref={quickRef} className="relative hidden md:block">
                <button
                  onClick={() => setQuickActionOpen(!quickActionOpen)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c] transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Quick Action</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {quickActionOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900 z-50">
                    <button
                      onClick={() => {
                        setActivePage('kegiatan');
                        setQuickActionOpen(false);
                      }}
                      className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      + Tambah Kegiatan
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('ruang_kerja');
                        setQuickActionOpen(false);
                      }}
                      className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      + Tambah Tugas
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('dokumen_kegiatan');
                        setQuickActionOpen(false);
                      }}
                      className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      + Buat SAP / LHK
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('print_center');
                        setQuickActionOpen(false);
                      }}
                      className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Cetak Laporan
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Global Search Icon */}
            <button
              onClick={() => setGlobalSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Cari"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Notifikasi"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Ganti Tema"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Auth Button in Menu: "Masuk" or User profile dropdown */}
            {currentUser ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F8B8D]/20 text-[#0F8B8D] font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-xs font-semibold text-slate-800 dark:text-white leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize truncate max-w-[120px]">
                      {currentUser.title || currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="hidden sm:block h-3 w-3 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900 z-50">
                    <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {currentUser.title || currentUser.role}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setChangePasswordModalOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-slate-400" />
                      <span>Ubah Kata Sandi</span>
                    </button>

                    {currentUser.role === 'superadmin' && (
                      <button
                        onClick={() => {
                          setActiveSpace('superadmin');
                          setActivePage('dashboard');
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Panel Superadmin</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-xs hover:border-[#0F8B8D] hover:text-[#0F8B8D] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Masuk</span>
              </button>
            )}

            {/* Mobile Hamburger Button (Touch target >= 44px) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="flex md:hidden h-11 w-11 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Buka Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Hamburger Drawer for Mobile */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </>
  );
};
