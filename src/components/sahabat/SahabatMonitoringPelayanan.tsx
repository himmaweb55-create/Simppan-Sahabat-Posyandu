import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, HeartPulse, Baby, Shield } from 'lucide-react';

export const SahabatMonitoringPelayanan: React.FC = () => {
  const { reports, villages, posyanduList } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // September 2026 default
  const [selectedVillageId, setSelectedVillageId] = useState<string>('all');

  // Filter reports
  const currentReports = reports.filter(
    (r) =>
      r.year === 2026 &&
      (selectedMonth === 0 || r.month === selectedMonth) &&
      (selectedVillageId === 'all' || r.villageId === selectedVillageId)
  );

  // Calculate aggregations for each of the 5 lifecycle groups
  const groupsSummary = [
    { key: 'ibu_hamil', label: 'Ibu Hamil, Nifas & Menyusui', icon: HeartPulse, color: '#1E9E6A' },
    { key: 'balita', label: 'Bayi, Balita & Apras (0-6 thn)', icon: Baby, color: '#0F8B8D' },
    { key: 'remaja', label: 'Usia Sekolah & Remaja (>6-18 thn)', icon: Users, color: '#1F6FB5' },
    { key: 'dewasa', label: 'Dewasa / Usia Produktif (>18-59 thn)', icon: Shield, color: '#2E7DD7' },
    { key: 'lansia', label: 'Lansia (>60 thn)', icon: HeartPulse, color: '#F2A024' }
  ].map((g) => {
    let totalTarget = 0;
    let totalVisit = 0;

    currentReports.forEach((r) => {
      const lc = r.lifecycleData.find((item) => item.group === g.key);
      if (lc) {
        totalTarget += lc.targetCount || 0;
        totalVisit += lc.visitCount || 0;
      }
    });

    const rate = totalTarget > 0 ? ((totalVisit / totalTarget) * 100).toFixed(1) : '0';

    return {
      ...g,
      target: totalTarget,
      visit: totalVisit,
      rate
    };
  });

  const months = [
    'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Monitoring Pelayanan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Rekapitulasi Cakupan Kunjungan Pelayanan 5 Kelompok Siklus Hidup
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {months.map((m, idx) => (
            <option key={idx} value={idx}>
              {m} 2026
            </option>
          ))}
        </select>

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

      {/* 5 Lifecycle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groupsSummary.map((grp) => {
          const Icon = grp.icon;
          return (
            <div
              key={grp.key}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 truncate max-w-[200px]">
                  {grp.label}
                </span>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white font-bold text-xs"
                  style={{ backgroundColor: grp.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <p className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
                  {grp.rate}%
                </p>
                <span className="text-xs text-slate-400">
                  Target Min: 85%
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min(100, Number(grp.rate))}%`, backgroundColor: grp.color }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Sasaran: {grp.target}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Terlayani: {grp.visit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
