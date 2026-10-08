import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PosyanduLHK } from '../../types';
import { FileCheck2, Printer, Check, Search, Eye, Filter } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatLHKPosyandu: React.FC = () => {
  const {
    posyanduLHKList,
    posyanduList,
    villages,
    setPrintModalData,
    savePosyanduLHK,
    currentUser
  } = useApp();

  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // September 2026 default
  const [activeLhk, setActiveLhk] = useState<PosyanduLHK | null>(null);

  const filtered = posyanduLHKList.filter((lhk) => {
    const p = posyanduList.find((item) => item.id === lhk.posyanduId);
    const matchVillage = selectedVillage === 'all' || p?.villageId === selectedVillage;
    const matchMonth = selectedMonth === 0 || lhk.month === selectedMonth;
    return matchVillage && matchMonth;
  });

  const handlePrint = (lhk: PosyanduLHK) => {
    setPrintModalData({
      title: `LAPORAN HASIL KEGIATAN (LHK) POSYANDU`,
      type: 'LHK_POSYANDU',
      referenceNo: `LHK/POS/${lhk.posyanduId}/${lhk.year}/${String(lhk.month).padStart(2, '0')}`,
      date: lhk.date,
      headerVillage: lhk.villageName,
      headerPosyandu: lhk.posyanduName,
      content: {
        'Nama Posyandu': lhk.posyanduName,
        'Desa / Kelurahan': lhk.villageName,
        'Bulan & Tanggal': `Bulan ${lhk.month} / ${lhk.date}`,
        'Kehadiran Petugas': `${lhk.kadersPresent} Kader, ${lhk.nakesPresent} Tenaga Kesehatan`,
        'Sasaran & Kunjungan': `Total Sasaran: ${lhk.totalSasaran} Jiwa | Kunjungan Terlayani: ${lhk.totalKunjungan} Jiwa`,
        'Hasil Pelayanan': lhk.summaryResults,
        'Permasalahan Ditemukan': lhk.issues,
        'Rencana Tindak Lanjut': lhk.followUp
      }
    });
  };

  const handleVerify = (lhk: PosyanduLHK) => {
    savePosyanduLHK({
      ...lhk,
      status: 'Terverifikasi',
      verifiedByNakes: currentUser?.name || 'Verifikator'
    });
  };

  const months = [
    'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            LHK Posyandu
          </h1>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="sm:w-64">
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">Semua Desa/Kelurahan</option>
            {villages.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:w-56">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((lhk) => (
          <div
            key={lhk.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#1E9E6A] uppercase tracking-wider">
                  {lhk.posyanduId} · {lhk.villageName}
                </span>
                <StatusBadge status={lhk.status} size="sm" />
              </div>

              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {lhk.posyanduName}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>Tanggal: {lhk.date}</span>
                <span>Sasaran: {lhk.totalSasaran}</span>
                <span>Kunjungan: {lhk.totalKunjungan}</span>
                <span>Kader: {lhk.signedByKader}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePrint(lhk)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak / PDF</span>
              </button>

              {currentUser && currentUser.role !== 'kader_posyandu' && lhk.status !== 'Terverifikasi' && (
                <button
                  onClick={() => handleVerify(lhk)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#1E9E6A] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#168a5c]"
                >
                  <Check className="h-4 w-4" />
                  <span>Verifikasi</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-xs text-slate-400">
          Belum ada data LHK Posyandu
        </div>
      )}
    </div>
  );
};
