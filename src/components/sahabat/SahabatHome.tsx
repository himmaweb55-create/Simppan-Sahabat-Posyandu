import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users2,
  Database,
  GraduationCap,
  HeartPulse,
  Stethoscope,
  Phone,
  MessageSquare,
  Calendar,
  ArrowRight,
  MapPin,
  Building2,
  FileCheck2
} from 'lucide-react';

export const SahabatHome: React.FC = () => {
  const {
    setActivePage,
    schedules,
    articles,
    villages,
    posyanduList,
    appSettings
  } = useApp();

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E9E6A] via-[#168a5c] to-[#0F8B8D] p-6 text-white sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <span>UPTD Puskesmas Kepanjen</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            {appSettings.heroTitle}
          </h1>

          <p className="text-base sm:text-lg font-medium text-emerald-50 leading-relaxed max-w-2xl">
            {appSettings.heroTagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${appSettings.waNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#1E9E6A] shadow-md hover:bg-emerald-50 transition"
            >
              <Phone className="h-4 w-4" />
              <span>Hubungi Tim Promkes</span>
            </a>

            <button
              onClick={() => setActivePage('rumah_data')}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition"
            >
              <Database className="h-4 w-4" />
              <span>Rumah Data</span>
            </button>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Regional Stats */}
      <section className="grid grid-cols-3 gap-3 sm:gap-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <p className="font-heading text-2xl sm:text-4xl font-extrabold text-[#1E9E6A]">
            18
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
            Desa & Kelurahan
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <p className="font-heading text-2xl sm:text-4xl font-extrabold text-[#0F8B8D]">
            108
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
            Posyandu Aktif
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <p className="font-heading text-2xl sm:text-4xl font-extrabold text-[#1F6FB5]">
            1.083
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
            Kader Kesehatan
          </p>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Akses Utama
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setActivePage('posyandu')}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1E9E6A] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1E9E6A]/10 text-[#1E9E6A]">
              <Users2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                108 Posyandu
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                Daftar profil, jadwal pelayanan, dan sebaran wilayah kerja 18 desa.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePage('rumah_data')}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#0F8B8D] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
              <Database className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                Rumah Data
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                Portal data terpadu 18 Desa/Kelurahan via Linktree resmi.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePage('belajar')}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1F6FB5] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1F6FB5]/10 text-[#1F6FB5]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                Belajar Kader
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                Modul, video, dan panduan 25 keterampilan dasar kader Posyandu.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePage('info_kesehatan')}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1E9E6A] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1E9E6A]/10 text-[#1E9E6A]">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                Informasi Kesehatan
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                Panduan edukasi kesehatan berbasis 5 kelompok siklus hidup.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePage('layanan')}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#0F8B8D] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                Layanan Puskesmas
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                Informasi poli rawat jalan, konseling promkes, dan laboratorium.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActivePage('pengaduan')}
            className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1F6FB5] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1F6FB5]/10 text-[#1F6FB5]">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                Pengaduan & Umpan Balik
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                Sampaikan masukan dan aspirasi pelayanan langsung ke Puskesmas.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Two columns: Upcoming Schedule & Latest Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming events */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Jadwal Kegiatan Terdekat
            </h2>
            <button
              onClick={() => setActivePage('jadwal')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E9E6A] hover:underline"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {schedules.slice(0, 3).map((sch) => (
              <div
                key={sch.id}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#1E9E6A]/10 text-[#1E9E6A] font-bold">
                  <span className="text-xs leading-none">
                    {sch.date.split('-')[2]}
                  </span>
                  <span className="text-[10px] uppercase font-semibold">
                    {sch.date.split('-')[1] === '10' ? 'Okt' : 'Sep'}
                  </span>
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {sch.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {sch.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {sch.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Artikel & Berita
            </h2>
            <button
              onClick={() => setActivePage('artikel')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F8B8D] hover:underline"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 3).map((art) => (
              <div
                key={art.id}
                onClick={() => setActivePage('artikel')}
                className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900 cursor-pointer hover:border-[#0F8B8D] transition"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={art.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                    {art.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">{art.date} · {art.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
