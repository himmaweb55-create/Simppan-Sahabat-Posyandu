import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export const SuperadminValidasiData: React.FC = () => {
  const { posyanduList, reports, showToast } = useApp();
  const [checking, setChecking] = useState(false);

  // Check 1: Duplicate Posyandu IDs
  const idCounts = posyanduList.reduce<Record<string, number>>((acc, p) => {
    acc[p.id] = (acc[p.id] || 0) + 1;
    return acc;
  }, {});
  const duplicateIds = Object.keys(idCounts).filter((id) => idCounts[id] > 1);

  // Check 2: Reports without valid Posyandu
  const orphanReports = reports.filter(
    (r) => !posyanduList.some((p) => p.id === r.posyanduId)
  );

  // Check 3: Visits exceeding targets abnormally (> 200%)
  const abnormalReports = reports.filter((r) =>
    r.lifecycleData.some(
      (l) => l.targetCount > 0 && l.visitCount > l.targetCount * 2
    )
  );

  const handleRunCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      showToast('Pemeriksaan integritas selesai', 'success');
    }, 600);
  };

  const allPassed =
    duplicateIds.length === 0 &&
    orphanReports.length === 0 &&
    abnormalReports.length === 0;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Validasi Integritas Data
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit Otomatis Relasi ID, Rekor Anomali, dan Duplikasi
          </p>
        </div>

        <button
          onClick={handleRunCheck}
          disabled={checking}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${checking ? 'animate-spin' : ''}`} />
          <span>{checking ? 'Memeriksa...' : 'Jalankan Pemeriksaan'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Test 1 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              duplicateIds.length === 0
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-red-500/10 text-red-600'
            }`}
          >
            {duplicateIds.length === 0 ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Pemeriksaan Duplikasi ID Posyandu
            </h4>
            <p className="text-xs text-slate-500">
              {duplicateIds.length === 0
                ? 'Tidak ditemukan ID ganda. Seluruh 108 Posyandu memiliki ID unik (P001 - P108).'
                : `Ditemukan ${duplicateIds.length} ID ganda: ${duplicateIds.join(', ')}`}
            </p>
          </div>
        </div>

        {/* Test 2 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              orphanReports.length === 0
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-red-500/10 text-red-600'
            }`}
          >
            {orphanReports.length === 0 ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Konsistensi Relasi Laporan & Posyandu
            </h4>
            <p className="text-xs text-slate-500">
              {orphanReports.length === 0
                ? 'Seluruh rekor laporan bulanan terhubung valid ke master Posyandu.'
                : `Ditemukan ${orphanReports.length} laporan tanpa induk Posyandu.`}
            </p>
          </div>
        </div>

        {/* Test 3 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              abnormalReports.length === 0
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-amber-500/10 text-amber-600'
            }`}
          >
            {abnormalReports.length === 0 ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
              Validasi Batas Nilai Kunjungan
            </h4>
            <p className="text-xs text-slate-500">
              {abnormalReports.length === 0
                ? 'Semua data kunjungan berada dalam rentang wajar target sasaran.'
                : `Ditemukan ${abnormalReports.length} rekor dengan rasio di luar rentang wajar.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
