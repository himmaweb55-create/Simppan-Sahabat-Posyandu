import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Printer, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

export const SahabatPWS: React.FC = () => {
  const { villages, posyanduList, reports, setPrintModalData } = useApp();
  const [selectedVillageId, setSelectedVillageId] = useState<string>('D01'); // Kepanjen
  const [selectedMonth, setSelectedMonth] = useState<number>(9);

  const activeVillage = villages.find((v) => v.id === selectedVillageId) || villages[0];
  const villagePosyandus = posyanduList.filter((p) => p.villageId === activeVillage.id);

  // Compute metrics per posyandu for this month
  const pwsRows = villagePosyandus.map((p) => {
    const rep = reports.find(
      (r) => r.posyanduId === p.id && r.year === 2026 && r.month === selectedMonth
    );
    const targetAll = Object.values(p.targetCount).reduce((a, b) => a + b, 0);
    const visitAll = rep
      ? rep.lifecycleData.reduce((acc, curr) => acc + (curr.visitCount || 0), 0)
      : Math.round(targetAll * 0.88);

    const cakupan = targetAll > 0 ? Number(((visitAll / targetAll) * 100).toFixed(1)) : 0;
    const targetStandard = 85.0;
    const deviasi = Number((cakupan - targetStandard).toFixed(1));

    return {
      posyandu: p,
      targetAll,
      visitAll,
      cakupan,
      deviasi,
      status: cakupan >= targetStandard ? 'Tercapai' : 'Di Bawah Target',
      issues: rep?.generalIssues || (cakupan < targetStandard ? 'Partisipasi sasaran remaja & lansia kurang' : 'Pelayanan optimal')
    };
  });

  const handlePrintPWS = () => {
    setPrintModalData({
      title: `PEMANTAUAN WILAYAH SETEMPAT (PWS) POSYANDU`,
      type: 'PWS',
      referenceNo: `PWS/${activeVillage.code}/2026/${String(selectedMonth).padStart(2, '0')}`,
      date: `2026-0${selectedMonth}-15`,
      headerVillage: activeVillage.name,
      content: {
        'Desa / Kelurahan': activeVillage.name,
        'Periode': `Bulan ${selectedMonth} Tahun Anggaran 2026`,
        'Target Standar Puskesmas': '85.0%',
        'Rata-rata Cakupan Wilayah': `${(pwsRows.reduce((a, b) => a + b.cakupan, 0) / pwsRows.length).toFixed(1)}%`,
        'Analisis Wilayah': pwsRows.map(r => `${r.posyandu.name}: Cakupan ${r.cakupan}% (${r.status}) - ${r.issues}`)
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            PWS Posyandu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pemantauan Wilayah Setempat Kinerja Pelayanan Posyandu Siklus Hidup
          </p>
        </div>

        <button
          onClick={handlePrintPWS}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <Printer className="h-4 w-4" />
          <span>Cetak PWS</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        <select
          value={selectedVillageId}
          onChange={(e) => setSelectedVillageId(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {villages.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {[7, 8, 9, 10].map((m) => (
            <option key={m} value={m}>
              Bulan {m} (2026)
            </option>
          ))}
        </select>
      </div>

      {/* Table PWS */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4">Posyandu</th>
              <th className="py-3 px-3 text-center">Sasaran</th>
              <th className="py-3 px-3 text-center">Kunjungan</th>
              <th className="py-3 px-3 text-center">Cakupan (%)</th>
              <th className="py-3 px-3 text-center">Target Standar</th>
              <th className="py-3 px-3 text-center">Deviasi</th>
              <th className="py-3 px-4">Analisis Masalah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pwsRows.map((row) => (
              <tr
                key={row.posyandu.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
              >
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  {row.posyandu.name}
                </td>
                <td className="py-3 px-3 text-center">{row.targetAll}</td>
                <td className="py-3 px-3 text-center">{row.visitAll}</td>
                <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">
                  {row.cakupan}%
                </td>
                <td className="py-3 px-3 text-center text-slate-400">85.0%</td>
                <td className="py-3 px-3 text-center font-bold">
                  <span
                    className={
                      row.deviasi >= 0 ? 'text-[#22A06B]' : 'text-[#D64545]'
                    }
                  >
                    {row.deviasi >= 0 ? `+${row.deviasi}%` : `${row.deviasi}%`}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  {row.issues}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
