import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export const SahabatDataPelayanan: React.FC = () => {
  const { reports, villages } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // September 2026 default
  const [selectedVillageId, setSelectedVillageId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentReports = reports.filter(
    (r) =>
      r.year === 2026 &&
      (selectedMonth === 0 || r.month === selectedMonth) &&
      (selectedVillageId === 'all' || r.villageId === selectedVillageId) &&
      (r.posyanduName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.posyanduId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const months = [
    'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Data Pelayanan Posyandu
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Rincian Pelayanan dan Cakupan Kunjungan per Posyandu
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama Posyandu..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="sm:w-56">
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
        </div>

        <div className="sm:w-60">
          <select
            value={selectedVillageId}
            onChange={(e) => setSelectedVillageId(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">Semua Desa/Kelurahan</option>
            {villages.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4">Posyandu</th>
              <th className="py-3 px-4">Desa</th>
              <th className="py-3 px-3 text-center">Bumil (Kunj/Sas)</th>
              <th className="py-3 px-3 text-center">Balita (Kunj/Sas)</th>
              <th className="py-3 px-3 text-center">Remaja (Kunj/Sas)</th>
              <th className="py-3 px-3 text-center">Dewasa (Kunj/Sas)</th>
              <th className="py-3 px-3 text-center">Lansia (Kunj/Sas)</th>
              <th className="py-3 px-3 text-center">Kunjungan Rumah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentReports.slice(0, 50).map((r) => {
              const bumil = r.lifecycleData.find((l) => l.group === 'ibu_hamil');
              const balita = r.lifecycleData.find((l) => l.group === 'balita');
              const remaja = r.lifecycleData.find((l) => l.group === 'remaja');
              const dewasa = r.lifecycleData.find((l) => l.group === 'dewasa');
              const lansia = r.lifecycleData.find((l) => l.group === 'lansia');

              return (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {r.posyanduName}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{r.villageName}</td>
                  <td className="py-3 px-3 text-center font-medium">
                    {bumil ? `${bumil.visitCount}/${bumil.targetCount}` : '-'}
                  </td>
                  <td className="py-3 px-3 text-center font-medium">
                    {balita ? `${balita.visitCount}/${balita.targetCount}` : '-'}
                  </td>
                  <td className="py-3 px-3 text-center font-medium">
                    {remaja ? `${remaja.visitCount}/${remaja.targetCount}` : '-'}
                  </td>
                  <td className="py-3 px-3 text-center font-medium">
                    {dewasa ? `${dewasa.visitCount}/${dewasa.targetCount}` : '-'}
                  </td>
                  <td className="py-3 px-3 text-center font-medium">
                    {lansia ? `${lansia.visitCount}/${lansia.targetCount}` : '-'}
                  </td>
                  <td className="py-3 px-3 text-center text-[#1E9E6A] font-bold">
                    {r.homeVisitsCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
