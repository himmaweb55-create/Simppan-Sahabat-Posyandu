import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  MessageCircle,
  Filter,
  ArrowRight,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatMonitoringPelaporan: React.FC = () => {
  const {
    posyanduList,
    villages,
    reports,
    saveFollowUp,
    showToast,
    setSelectedPosyanduId,
    setActivePage
  } = useApp();

  const [selectedSemester, setSelectedSemester] = useState<number>(2); // Semester 2 (Jul - Des)
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // September 2026 default
  const [selectedVillageId, setSelectedVillageId] = useState<string>('all');

  // Filter reports by period
  const relevantReports = reports.filter((r) => {
    const matchYear = r.year === 2026;
    const matchMonth = selectedMonth === 0 || r.month === selectedMonth;
    const matchVillage = selectedVillageId === 'all' || r.villageId === selectedVillageId;
    return matchYear && matchMonth && matchVillage;
  });

  const totalPosyandu = selectedVillageId === 'all' ? 108 : posyanduList.filter(p => p.villageId === selectedVillageId).length;
  const verifiedCount = relevantReports.filter((r) => r.status === 'Terverifikasi').length;
  const revisionCount = relevantReports.filter((r) => r.status === 'Perlu diperbaiki' || r.status === 'Belum lengkap').length;
  const pendingCount = relevantReports.filter((r) => r.status === 'Sudah dikirim').length;
  const notReportedCount = Math.max(0, totalPosyandu - (verifiedCount + revisionCount + pendingCount));

  const totalLapor = verifiedCount + pendingCount + revisionCount;
  const percentage = totalPosyandu > 0 ? ((totalLapor / totalPosyandu) * 100).toFixed(1) : '0';

  // Problematic posyandus list (belum lapor or perlu perbaikan)
  const problemPosyandu = posyanduList
    .filter((p) => selectedVillageId === 'all' || p.villageId === selectedVillageId)
    .map((p) => {
      const rep = relevantReports.find((r) => r.posyanduId === p.id);
      return {
        posyandu: p,
        report: rep,
        status: rep ? rep.status : 'Belum lapor'
      };
    })
    .filter((item) => item.status === 'Belum lapor' || item.status === 'Perlu diperbaiki' || item.status === 'Belum lengkap');

  const handleCreateFollowUp = (pName: string, vName: string, status: string) => {
    saveFollowUp({
      id: `FLW-${Date.now()}`,
      source: 'Monitoring',
      title: `Pendampingan ${status}: ${pName} (${vName})`,
      villageOrPosyandu: `${pName} (${vName})`,
      pic: 'Tim Promkes',
      deadline: '15 Okt 2026',
      status: 'Belum Selesai',
      priority: 'Tinggi'
    });
  };

  const months = [
    'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Monitoring Pelaporan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pemantauan Kepatuhan dan Kelengkapan Laporan 108 Posyandu
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value={1}>Semester 1 (Jan - Jun 2026)</option>
            <option value={2}>Semester 2 (Jul - Des 2026)</option>
          </select>
        </div>

        <div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedVillageId}
            onChange={(e) => setSelectedVillageId(e.target.value)}
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Total Posyandu</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalPosyandu}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Kelengkapan</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#0F8B8D]">
            {percentage}%
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Terverifikasi</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#22A06B]">
            {verifiedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Perlu Perbaikan</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#F2A024]">
            {revisionCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-slate-500">Belum Lapor</span>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#D64545]">
            {notReportedCount}
          </p>
        </div>
      </div>

      {/* Village Recap Aggregation */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
          Rekapitulasi 18 Desa/Kelurahan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {villages.map((v) => {
            const vPosyandu = posyanduList.filter((p) => p.villageId === v.id);
            const vReports = relevantReports.filter((r) => r.villageId === v.id);
            const vDone = vReports.filter((r) => r.status === 'Terverifikasi').length;
            const vRate = vPosyandu.length > 0 ? Math.round((vDone / vPosyandu.length) * 100) : 0;

            return (
              <div
                key={v.id}
                onClick={() => setSelectedVillageId(v.id)}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  selectedVillageId === v.id
                    ? 'border-[#0F8B8D] bg-[#0F8B8D]/5'
                    : 'border-slate-200/80 hover:border-slate-400 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
                    {v.name}
                  </span>
                  <span className="text-xs font-extrabold text-[#0F8B8D]">
                    {vRate}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#0F8B8D] rounded-full"
                    style={{ width: `${vRate}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  {vDone} dari {vPosyandu.length} Posyandu selesai
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Problematic Posyandus: WhatsApp Reminder & Tindak Lanjut */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
            Posyandu Memerlukan Perhatian ({problemPosyandu.length})
          </h3>
        </div>

        <div className="space-y-3">
          {problemPosyandu.slice(0, 8).map((item) => {
            const p = item.posyandu;
            const waText = encodeURIComponent(
              `Halo Kader ${p.name} (${p.villageName}), mohon segera melengkapi pelaporan bulanan Posyandu siklus hidup di portal SAHABAT POSYANDU Puskesmas Kepanjen.`
            );

            return (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0F8B8D]">
                      {p.id} · {p.villageName}
                    </span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                    {p.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Kader: {p.contactPerson} · Jadwal: {p.scheduleDay}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/628889924444?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-[#1E9E6A] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#188156]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Ingatkan WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleCreateFollowUp(p.name, p.villageName, item.status)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <span>Tindak Lanjut</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {problemPosyandu.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            Seluruh Posyandu telah melapor lengkap
          </div>
        )}
      </div>
    </div>
  );
};
