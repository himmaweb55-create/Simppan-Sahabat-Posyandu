import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Users2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Database
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatKaderDashboard: React.FC = () => {
  const {
    currentUser,
    posyanduList,
    reports,
    posyanduLHKList,
    setActivePage,
    setSelectedPosyanduId
  } = useApp();

  // Determine user's target Posyandu or jurisdiction
  let myPosyandu = posyanduList[0];
  if (currentUser?.jurisdictionId) {
    const found = posyanduList.find(
      (p) => p.id === currentUser.jurisdictionId || p.villageId === currentUser.jurisdictionId
    );
    if (found) myPosyandu = found;
  }

  // Monthly reports for this posyandu
  const myReports = reports.filter((r) => r.posyanduId === myPosyandu.id);
  const latestReport = myReports.find((r) => r.month === 9) || myReports[0];

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  const totalSasaran = Object.values(myPosyandu.targetCount).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-br from-[#1E9E6A] to-[#0F8B8D] p-6 text-white shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold backdrop-blur-xs">
            <span>{myPosyandu.villageName}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            {myPosyandu.name}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            ID: {myPosyandu.id} · Strata: {myPosyandu.strata} · {myPosyandu.scheduleDay}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSelectedPosyanduId(myPosyandu.id);
              setActivePage('pelaporan');
            }}
            className="rounded-2xl bg-white px-4 py-2.5 text-xs font-bold text-[#1E9E6A] shadow-xs hover:bg-emerald-50 transition"
          >
            + Input Laporan Bulanan
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Status Laporan (Sep)</span>
          <div className="mt-2 flex items-center justify-between">
            <StatusBadge status={latestReport ? latestReport.status : 'Belum lapor'} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Total Sasaran</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalSasaran} <span className="text-xs font-normal text-slate-400">jiwa</span>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Kunjungan Terlayani</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#1E9E6A]">
            {Math.round(totalSasaran * 0.91)} <span className="text-xs font-normal text-slate-400">jiwa</span>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Kader Aktif</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#0F8B8D]">
            {myPosyandu.activeKaders} <span className="text-xs font-normal text-slate-400">orang</span>
          </p>
        </div>
      </div>

      {/* 12-Month Reporting Status Track */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Status Pelaporan Tahun 2026
          </h3>
          <button
            onClick={() => setActivePage('status_laporan')}
            className="text-xs font-semibold text-[#1E9E6A] hover:underline"
          >
            Matriks 108 Posyandu
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 text-center">
          {months.map((m, idx) => {
            const rep = myReports.find((r) => r.month === idx + 1);
            const status = rep ? rep.status : idx < 9 ? 'Belum lapor' : 'Draft';
            let bg = 'bg-slate-100 text-slate-400 dark:bg-slate-800';
            if (status === 'Terverifikasi') bg = 'bg-[#22A06B] text-white';
            else if (status === 'Sudah dikirim') bg = 'bg-[#2E7DD7] text-white';
            else if (status === 'Belum lengkap' || status === 'Perlu diperbaiki') bg = 'bg-[#F2A024] text-white';
            else if (status === 'Belum lapor') bg = 'bg-[#D64545] text-white';

            return (
              <div
                key={m}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-200/60 p-2.5 dark:border-slate-800"
              >
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {m}
                </span>
                <span className={`mt-1.5 h-3 w-3 rounded-full ${bg}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Operasional Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setActivePage('pelaporan')}
          className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1E9E6A] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E9E6A]/10 text-[#1E9E6A]">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Pelaporan Posyandu
            </h4>
            <p className="text-xs text-slate-400">Formulir 5 Siklus Hidup</p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('lhk_posyandu')}
          className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#0F8B8D] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              LHK Posyandu
            </h4>
            <p className="text-xs text-slate-400">Otomatisasi Laporan & PDF</p>
          </div>
        </button>

        <button
          onClick={() => setActivePage('data_pelayanan')}
          className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition hover:border-[#1F6FB5] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1F6FB5]/10 text-[#1F6FB5]">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Data Pelayanan
            </h4>
            <p className="text-xs text-slate-400">Rekap Cakupan Kunjungan</p>
          </div>
        </button>
      </div>
    </div>
  );
};
