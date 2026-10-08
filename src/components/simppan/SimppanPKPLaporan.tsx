import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Printer, BarChart3 } from 'lucide-react';

export const SimppanPKPLaporan: React.FC = () => {
  const { indicators, setPrintModalData } = useApp();
  const [reportPeriod, setReportPeriod] = useState<string>('semester2');

  const handlePrintPKP = () => {
    setPrintModalData({
      title: `LAPORAN PENILAIAN KINERJA PUSKESMAS (PKP) PROMKES`,
      type: 'PKP',
      referenceNo: `PKP/PROMKES/PKM/2026`,
      date: '2026-10-07',
      content: {
        'Program': 'Promosi Kesehatan & Pemberdayaan Masyarakat',
        'Tahun Anggaran': '2026',
        'Capaian Indikator': indicators.map(
          (i) => `${i.indicatorName}: Target ${i.targetPercent}% | Realisasi ${i.realizationPercent}% (Deviasi: ${i.deviationPercent}%)`
        ),
        'Kesimpulan Kinerja': 'Target Kinerja Promosi Kesehatan Triwulan III tercapai 92.4% melampaui target standar 85.0%.'
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            PKP & Laporan Berkala
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kompilasi Laporan Bulanan, Semesteran, dan Penilaian Kinerja Puskesmas
          </p>
        </div>

        <button
          onClick={handlePrintPKP}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <Printer className="h-4 w-4" />
          <span>Cetak Laporan PKP</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Laporan Capaian PKP Triwulan III 2026',
            meta: 'Evaluasi 6 Indikator Kinerja Promkes',
            period: 'Januari - September 2026'
          },
          {
            title: 'Laporan Semester I Promosi Kesehatan 2026',
            meta: 'Baseline 108 Posyandu & Pemberdayaan Masyarakat',
            period: 'Januari - Juni 2026'
          },
          {
            title: 'Profil Promosi Kesehatan Puskesmas Kepanjen',
            meta: 'Kompilasi Data Wilayah & 18 Rumah Data',
            period: 'Tahun 2026'
          },
          {
            title: 'Rekapitulasi Kunjungan Rumah Terintegrasi',
            meta: 'Hasil Kunjungan 1.083 Kader Kesehatan',
            period: 'Semester II Berjalan'
          }
        ].map((lap, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                {lap.period}
              </span>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {lap.title}
              </h3>
              <p className="text-xs text-slate-500">{lap.meta}</p>
            </div>

            <button
              onClick={handlePrintPKP}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              <Printer className="h-4 w-4" />
              <span>Pratinjau & Cetak</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
