import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Trophy,
  Plus,
  ArrowRight,
  TrendingUp,
  Download,
  Clock,
  Layers,
  MapPin,
  User,
  Radio,
  Edit3,
  Eye,
  Check
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SimppanDashboard: React.FC = () => {
  const {
    tasks,
    activities,
    reports,
    posyanduList,
    setActivePage,
    setActiveSpace,
    setPrintModalData
  } = useApp();

  // Active items
  const activeTasks = tasks.slice(0, 4);
  const upcomingActivities = activities.slice(0, 2);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-bold text-[#0F8B8D]">SIMPPAN</span>
        </div>
      </div>

      {/* Welcome Hero Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Puskesmas Kepanjen · Kab. Malang
              </span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Selamat Datang di SIMPPAN
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Ruang Kerja Digital Tim Promosi Kesehatan Puskesmas Kepanjen · Tahun Anggaran 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Terakhir sinkron: Hari ini, 08:30 WIB</span>
            </div>
            <button
              onClick={() => setActivePage('ruang_kerja')}
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Lihat Ruang Kerja
            </button>
            <button
              onClick={() => setActivePage('kegiatan')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0d7a7c]"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Kegiatan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 KPI Cards (Matching Image) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1: Kegiatan Aktif */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Kegiatan Aktif</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">12</p>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              ↗ +3 kegiatan bulan ini
            </p>
          </div>
        </div>

        {/* Card 2: Tugas Berjalan */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Tugas Berjalan</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">8</p>
            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
              4 tenggat minggu ini
            </p>
          </div>
        </div>

        {/* Card 3: Perlu Tindak Lanjut */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Perlu Tindak Lanjut</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">5</p>
            <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 mt-0.5">
              2 prioritas tinggi
            </p>
          </div>
        </div>

        {/* Card 4: Dokumen Terbaru */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Dokumen Terbaru</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">24</p>
            <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOCX, XLSX</p>
          </div>
        </div>

        {/* Card 5: Capaian Program */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Capaian Program</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Trophy className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-extrabold text-[#1E9E6A]">
              92% <span className="text-xs font-normal text-slate-400">/ Target 85%</span>
            </p>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              Target PKP Promkes Tercapai
            </p>
          </div>
        </div>
      </div>

      {/* Aksi Cepat & Navigasi Operasional */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Aksi Cepat & Navigasi Operasional
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            Terhubung dengan Sistem Informasi Promkes Terintegrasi
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setActivePage('kegiatan')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-[#0F8B8D] hover:text-white transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <Plus className="h-3.5 w-3.5 text-[#0F8B8D]" />
            <span>+ Tambah Kegiatan</span>
          </button>

          <button
            onClick={() => setActivePage('data_capaian')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-[#0F8B8D] hover:text-white transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <TrendingUp className="h-3.5 w-3.5 text-[#0F8B8D]" />
            <span>+ Input Capaian</span>
          </button>

          <button
            onClick={() => setActivePage('dokumen_kegiatan')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-[#0F8B8D] hover:text-white transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <FileText className="h-3.5 w-3.5 text-[#0F8B8D]" />
            <span>+ Upload Dokumen</span>
          </button>

          <button
            onClick={() => setActivePage('print_center')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-[#0F8B8D] hover:text-white transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <FileText className="h-3.5 w-3.5 text-[#0F8B8D]" />
            <span>+ Buat Laporan</span>
          </button>

          <button
            onClick={() => setActivePage('monitoring')}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-[#0F8B8D] hover:text-white transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <Eye className="h-3.5 w-3.5 text-[#0F8B8D]" />
            <span>Lihat Monitoring</span>
          </button>

          <button
            onClick={() => {
              setActiveSpace('sahabat');
              setActivePage('monitoring_pelaporan');
            }}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0F8B8D] py-2.5 px-3 text-xs font-bold text-white shadow-xs hover:bg-[#0d7a7c] transition"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>108 Posyandu →</span>
          </button>
        </div>
      </div>

      {/* Two Columns: Monitoring Capaian Promosi Kesehatan & Status 108 Posyandu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Monitoring Capaian Promosi Kesehatan */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0F8B8D]" />
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Monitoring Capaian Promosi Kesehatan
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Evaluasi tren bulanan realisasi target kinerja pelayanan (PKP) Kec. Kepanjen
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-lg bg-slate-100 px-2 py-1 font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Tahun: 2026
              </span>
              <span className="rounded-lg bg-[#0F8B8D]/10 px-2 py-1 font-semibold text-[#0F8B8D]">
                Indikator: PKP Promkes
              </span>
            </div>
          </div>

          {/* Metric Triplet */}
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/40 text-center text-xs">
            <div>
              <span className="text-slate-500">Target Standar</span>
              <p className="font-heading text-lg font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                85.0%
              </p>
            </div>
            <div>
              <span className="text-slate-500">Realisasi Berjalan</span>
              <p className="font-heading text-lg font-extrabold text-[#0F8B8D] mt-0.5">
                92.4%
              </p>
            </div>
            <div>
              <span className="text-slate-500">Deviasi Capaian</span>
              <p className="font-heading text-lg font-bold text-[#22A06B] mt-0.5">
                +7.4% ▲
              </p>
            </div>
          </div>

          {/* Area Chart Simulation (SVG with Jan-Sep curve & 85% target line) */}
          <div className="relative pt-4 pb-2">
            <svg viewBox="0 0 600 160" className="w-full h-40 overflow-visible">
              <defs>
                <linearGradient id="promkesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F8B8D" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0F8B8D" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Target Line 85% (y = 50) */}
              <line x1="20" y1="50" x2="580" y2="50" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="540" y="44" fill="#94a3b8" fontSize="10" fontWeight="bold">85% Target</text>

              {/* Area Fill */}
              <path
                d="M 30,120 Q 90,110 150,95 T 270,75 T 390,55 T 510,40 T 570,30 L 570,140 L 30,140 Z"
                fill="url(#promkesGradient)"
              />

              {/* Trend Curve */}
              <path
                d="M 30,120 Q 90,110 150,95 T 270,75 T 390,55 T 510,40 T 570,30"
                fill="none"
                stroke="#0F8B8D"
                strokeWidth="3"
              />

              {/* Data points */}
              <circle cx="30" cy="120" r="3.5" fill="#0F8B8D" />
              <circle cx="90" cy="110" r="3.5" fill="#0F8B8D" />
              <circle cx="150" cy="95" r="3.5" fill="#0F8B8D" />
              <circle cx="210" cy="85" r="3.5" fill="#0F8B8D" />
              <circle cx="270" cy="75" r="3.5" fill="#0F8B8D" />
              <circle cx="330" cy="65" r="3.5" fill="#0F8B8D" />
              <circle cx="390" cy="55" r="3.5" fill="#0F8B8D" />
              <circle cx="450" cy="48" r="3.5" fill="#0F8B8D" />
              <circle cx="510" cy="40" r="3.5" fill="#0F8B8D" />
              <circle cx="570" cy="30" r="5" fill="#1E9E6A" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* X-axis Month Labels */}
            <div className="flex justify-between text-[10px] text-slate-500 pt-1 px-2 border-t border-slate-100 dark:border-slate-800">
              <span>Jan (64%)</span>
              <span>Feb (68%)</span>
              <span>Mar (74%)</span>
              <span>Apr (77%)</span>
              <span>Mei (81%)</span>
              <span>Jun (86%)</span>
              <span>Jul (89%)</span>
              <span>Agu (90%)</span>
              <span className="font-bold text-[#0F8B8D]">Sep (92.4%)</span>
            </div>
          </div>

          {/* Badges Legend */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F8B8D]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0F8B8D]">
              <span className="h-2 w-2 rounded-full bg-[#0F8B8D]" />
              Realisasi 2026
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <span className="h-0.5 w-3 bg-slate-400" />
              Garis Target (85%)
            </span>
            <span className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-500">
              KTR
            </span>
            <span className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-500">
              PHBS
            </span>
            <span className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-500">
              Posyandu ILP
            </span>
          </div>
        </div>

        {/* Right Column (1 col): Status 108 Posyandu */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#0F8B8D]" />
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Status 108 Posyandu
                </h3>
              </div>
              <span className="rounded-lg bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600">
                Bulan: Sept 2026
              </span>
            </div>

            {/* Percentage & Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Kelengkapan Laporan</span>
                <span className="font-heading text-2xl font-extrabold text-[#0F8B8D]">
                  77.47%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#1E9E6A] to-[#0F8B8D] rounded-full" style={{ width: '77.47%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                <span>Masuk / Target: <strong>502 / 648 Lap</strong></span>
                <span className="text-red-500 font-semibold">146 Lap (22.5%)</span>
              </div>
            </div>

            {/* Counts list */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-[#22A06B]" />
                  Laporan Terverifikasi
                </span>
                <span className="font-bold text-slate-900 dark:text-white">450 pos</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-[#2E7DD7]" />
                  Perlu Revisi / Feedback
                </span>
                <span className="font-bold text-slate-900 dark:text-white">52 pos</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-[#D64545]" />
                  Belum Mengirim LHK
                </span>
                <span className="font-bold text-slate-900 dark:text-white">146 pos</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={() => {
                setActiveSpace('sahabat');
                setActivePage('monitoring_pelaporan');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F8B8D] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0d7a7c] transition"
            >
              <span>Buka Dashboard Posyandu</span>
            </button>

            <button
              onClick={() => {
                setActiveSpace('sahabat');
                setActivePage('rumah_data');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              <span>18 Rumah Data (Linktree Desa)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Section: Ruang Kerja Saya & Agenda Mendatang */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Ruang Kerja Saya */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Ruang Kerja Saya
              </h3>
              <p className="text-[11px] text-slate-400">
                Daftar agenda tugas dan berkas yang memerlukan aksi segera
              </p>
            </div>
            <button
              onClick={() => setActivePage('ruang_kerja')}
              className="text-xs font-semibold text-[#0F8B8D] hover:underline"
            >
              Lihat Semua ({tasks.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Pekerjaan & Tanggung Jawab</th>
                  <th className="py-2.5 px-3">Program</th>
                  <th className="py-2.5 px-3">Prioritas</th>
                  <th className="py-2.5 px-3">Deadline</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-900 dark:text-white leading-snug">
                        {t.title}
                      </p>
                      {t.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {t.description}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {t.program}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          t.priority === 'Tinggi'
                            ? 'bg-red-500/10 text-red-600'
                            : t.priority === 'Sedang'
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {t.deadline}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={t.status} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setActivePage('ruang_kerja')}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Ubah Tugas"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1 col): Agenda Mendatang */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#0F8B8D]" />
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Agenda Mendatang
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {upcomingActivities.map((act) => (
                <div
                  key={act.id}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#0F8B8D]/10 px-2 py-0.5 text-[10px] font-bold text-[#0F8B8D]">
                      {act.date} · {act.time}
                    </span>
                    <StatusBadge status={act.status} size="sm" />
                  </div>

                  <h4 className="font-heading text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {act.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {act.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {act.pic}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActivePage('kegiatan')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Lihat Kalender Lengkap</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Dokumen Terbaru & Aktivitas Terkini */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dokumen Terbaru */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0F8B8D]" />
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Dokumen Terbaru
              </h3>
            </div>
            <button
              onClick={() => setActivePage('print_center')}
              className="text-xs font-semibold text-[#0F8B8D] hover:underline"
            >
              Semua Arsip →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Laporan Kegiatan Promkes September 2026.pdf', meta: 'PDF · 3.4 MB · PJ: Siti Aminah · 04 Okt 2026', ext: 'pdf' },
              { title: 'Notulen Bimtek Transformasi Posyandu.docx', meta: 'DOCX · 850 KB · PJ: Ahmad F. · 02 Okt 2026', ext: 'docx' },
              { title: 'Rekap Pelaporan 108 Posyandu Q3.xlsx', meta: 'XLSX · 1.2 MB · PJ: Siti Aminah · 30 Sep 2026', ext: 'xlsx' },
              { title: 'Dokumen Evaluasi PKP Promkes 2026.pdf', meta: 'PDF · 4.8 MB · PJ: Drg. Rahayu · 28 Sep 2026', ext: 'pdf' }
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold text-xs uppercase">
                    {doc.ext}
                  </div>
                  <div className="space-y-0.5 truncate">
                    <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-100 truncate">
                      {doc.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 truncate">{doc.meta}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePage('print_center')}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  aria-label="Unduh Dokumen"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Aktivitas Terkini (Live Sync Online) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-emerald-500" />
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Aktivitas Terkini
              </h3>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Live Sync Online
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E9E6A]/10 text-[#1E9E6A]">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-800 dark:text-slate-200">
                  Laporan Posyandu Dahlia Ardirejo diperbarui oleh <strong>Kader Sri Lestari</strong>
                </p>
                <p className="text-[10px] text-slate-400">5 menit yang lalu · Sinkronisasi Mobile</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F8B8D]/10 text-[#0F8B8D]">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-800 dark:text-slate-200">
                  Dokumen LHK Penyuluhan PHBS diunggah oleh <strong>Ners Siti Aminah</strong>
                </p>
                <p className="text-[10px] text-slate-400">1 jam yang lalu · Modul Dokumentasi</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-800 dark:text-slate-200">
                  Data capaian Kawasan Tanpa Rokok (KTR) divalidasi oleh <strong>Tim Promkes</strong>
                </p>
                <p className="text-[10px] text-slate-400">Hari ini, 09:15 WIB · Verifikasi Dinkes</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-800 dark:text-slate-200">
                  Agenda baru: Supervisi Posyandu Mangunrejo ditambahkan ke kalender kerja
                </p>
                <p className="text-[10px] text-slate-400">Hari ini, 08:45 WIB · Modul Perencanaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
