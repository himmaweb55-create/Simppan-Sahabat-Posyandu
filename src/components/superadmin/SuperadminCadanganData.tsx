import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { HardDrive, Download, Upload, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SuperadminCadanganData: React.FC = () => {
  const {
    villages,
    posyanduList,
    reports,
    tasks,
    activities,
    indicators,
    showToast
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const backupData = {
      version: '2026.1',
      exportedAt: new Date().toISOString(),
      villages,
      posyanduList,
      reports,
      tasks,
      activities,
      indicators
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_simppan_kepanjen_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Cadangan berhasil diunduh', 'success');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.posyanduList && json.reports) {
          showToast('Data cadangan berhasil diverifikasi', 'success');
        } else {
          showToast('Format berkas tidak sesuai', 'error');
        }
      } catch (err) {
        showToast('Gagal membaca berkas cadangan', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Cadangan dan Pemulihan Data
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pengelolaan Salinan Cadangan Sistem dan Sinkronisasi Arsip Luar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
              <Download className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
              Cadangkan Seluruh Data (JSON)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unduh salinan arsip data master 108 Posyandu, 18 Desa/Kelurahan, pelaporan bulanan 2026, dan capaian program.
            </p>
          </div>

          <button
            onClick={handleExportJson}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F8B8D] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0d7a7c] transition"
          >
            <Download className="h-4 w-4" />
            <span>Unduh Salinan Cadangan</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E9E6A]/10 text-[#1E9E6A]">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
              Impor dan Verifikasi Salinan
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unggah berkas salinan cadangan JSON untuk pemulihan atau verifikasi integritas data.
            </p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportJson}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              <Upload className="h-4 w-4" />
              <span>Pilih Berkas Cadangan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
