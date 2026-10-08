import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MonthlyReport, LifecycleData } from '../../types';
import { Save, Send, ArrowLeft, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { ImageUploadField } from '../common/ImageUploadField';

export const SahabatPelaporanForm: React.FC = () => {
  const {
    currentUser,
    posyanduList,
    reports,
    saveReport,
    selectedPosyanduId,
    setActivePage,
    showToast
  } = useApp();

  const [posyanduId, setPosyanduId] = useState<string>(
    selectedPosyanduId || (currentUser?.jurisdictionId?.startsWith('P') ? currentUser.jurisdictionId : 'P001')
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(10); // default to October 2026

  const activePosyandu = posyanduList.find((p) => p.id === posyanduId) || posyanduList[0];

  // Find existing report or create template
  const existingReport = reports.find(
    (r) => r.posyanduId === posyanduId && r.year === 2026 && r.month === selectedMonth
  );

  const [openDayDate, setOpenDayDate] = useState<string>('2026-10-10');
  const [kadersPresent, setKadersPresent] = useState<number>(8);
  const [nakesPresent, setNakesPresent] = useState<number>(1);
  const [nakesName, setNakesName] = useState<string>('Bdn. Rina Triana, A.Md.Keb');
  const [homeVisitsCount, setHomeVisitsCount] = useState<number>(4);
  const [outsideActivities, setOutsideActivities] = useState<string>('Kunjungan rumah balita resti');
  const [generalIssues, setGeneralIssues] = useState<string>('');
  const [generalFollowUp, setGeneralFollowUp] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoSource, setPhotoSource] = useState<'drive' | 'tautan'>('tautan');

  // 5 Lifecycle Groups
  const defaultLifecycle: LifecycleData[] = [
    {
      group: 'ibu_hamil',
      groupName: 'Ibu Hamil, Nifas, dan Menyusui',
      targetCount: activePosyandu.targetCount.ibuHamil,
      visitCount: Math.round(activePosyandu.targetCount.ibuHamil * 0.9),
      achievementRate: 90,
      serviceTypes: ['Pemeriksaan Kehamilan', 'Pemberian TTD', 'Pemantauan Nifas'],
      serviceDate: '2026-10-10'
    },
    {
      group: 'balita',
      groupName: 'Bayi, Balita, dan Apras (0-6 tahun)',
      targetCount: activePosyandu.targetCount.balita,
      visitCount: Math.round(activePosyandu.targetCount.balita * 0.92),
      achievementRate: 92,
      serviceTypes: ['Penimbangan BB', 'Pengukuran TB/PB', 'Imunisasi Rutin'],
      serviceDate: '2026-10-10'
    },
    {
      group: 'remaja',
      groupName: 'Usia Sekolah dan Remaja (>6-18 tahun)',
      targetCount: activePosyandu.targetCount.remaja,
      visitCount: Math.round(activePosyandu.targetCount.remaja * 0.8),
      achievementRate: 80,
      serviceTypes: ['Skrining Anemia', 'Pemberian TTD Rematri'],
      serviceDate: '2026-10-10'
    },
    {
      group: 'dewasa',
      groupName: 'Dewasa/Produktif (>18-59 tahun)',
      targetCount: activePosyandu.targetCount.dewasa,
      visitCount: Math.round(activePosyandu.targetCount.dewasa * 0.88),
      achievementRate: 88,
      serviceTypes: ['Skrining Tekanan Darah', 'Gula Darah'],
      serviceDate: '2026-10-10'
    },
    {
      group: 'lansia',
      groupName: 'Lansia (>60 tahun)',
      targetCount: activePosyandu.targetCount.lansia,
      visitCount: Math.round(activePosyandu.targetCount.lansia * 0.94),
      achievementRate: 94,
      serviceTypes: ['Pemeriksaan TD', 'Skrining Lansia'],
      serviceDate: '2026-10-10'
    }
  ];

  const [lifecycle, setLifecycle] = useState<LifecycleData[]>(defaultLifecycle);

  useEffect(() => {
    if (existingReport) {
      setOpenDayDate(existingReport.openDayDate || '2026-10-10');
      setKadersPresent(existingReport.kadersPresent || 8);
      setNakesPresent(existingReport.nakesPresent || 1);
      setNakesName(existingReport.nakesName || '');
      setHomeVisitsCount(existingReport.homeVisitsCount || 0);
      setOutsideActivities(existingReport.outsideOpenDayActivities || '');
      setGeneralIssues(existingReport.generalIssues || '');
      setGeneralFollowUp(existingReport.generalFollowUp || '');
      setPhotoUrl(existingReport.photos[0] || '');
      if (existingReport.lifecycleData && existingReport.lifecycleData.length === 5) {
        setLifecycle(existingReport.lifecycleData);
      }
    } else {
      setLifecycle(defaultLifecycle);
      setGeneralIssues('');
      setGeneralFollowUp('');
      setPhotoUrl('');
    }
  }, [existingReport, posyanduId, selectedMonth]);

  const updateLifecycleField = (idx: number, field: keyof LifecycleData, val: any) => {
    setLifecycle((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      if (field === 'targetCount' || field === 'visitCount') {
        const target = field === 'targetCount' ? val : copy[idx].targetCount;
        const visit = field === 'visitCount' ? val : copy[idx].visitCount;
        copy[idx].achievementRate = target > 0 ? Math.round((visit / target) * 100) : 0;
      }
      return copy;
    });
  };

  const handleSave = (status: MonthlyReport['status']) => {
    const report: MonthlyReport = {
      id: existingReport?.id || `REP-2026-${String(selectedMonth).padStart(2, '0')}-${posyanduId}`,
      posyanduId,
      posyanduName: activePosyandu.name,
      villageId: activePosyandu.villageId,
      villageName: activePosyandu.villageName,
      year: 2026,
      month: selectedMonth,
      status,
      openDayDate,
      kadersPresent,
      nakesPresent,
      nakesName,
      lifecycleData: lifecycle,
      outsideOpenDayActivities: outsideActivities,
      homeVisitsCount,
      generalIssues,
      generalFollowUp,
      photos: photoUrl ? [photoUrl] : [],
      updatedAt: new Date().toISOString()
    };

    saveReport(report);
  };

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            Pelaporan Posyandu
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tahun Anggaran 2026 · {activePosyandu.villageName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {existingReport && <StatusBadge status={existingReport.status} />}
        </div>
      </div>

      {/* Reviewer Note if needed */}
      {existingReport?.reviewerNotes && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 text-xs">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold mb-1">
            <AlertCircle className="h-4 w-4" />
            <span>Catatan Perbaikan Verifikator</span>
          </div>
          <p className="text-amber-700 dark:text-amber-200">
            {existingReport.reviewerNotes}
          </p>
        </div>
      )}

      {/* Selector: Posyandu & Month */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Posyandu *
          </label>
          <select
            value={posyanduId}
            onChange={(e) => setPosyanduId(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {posyanduList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.name} ({p.villageName})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Bulan Pelaporan *
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {months.map((m, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {m} 2026
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 1: Hari Buka */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[#1E9E6A]">
          Kegiatan Hari Buka
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tanggal Pelaksanaan *
            </label>
            <input
              type="date"
              value={openDayDate}
              onChange={(e) => setOpenDayDate(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kader Hadir (Orang) *
            </label>
            <input
              type="number"
              min="1"
              value={kadersPresent}
              onChange={(e) => setKadersPresent(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nakes Hadir (Orang) *
            </label>
            <input
              type="number"
              min="0"
              value={nakesPresent}
              onChange={(e) => setNakesPresent(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Petugas Nakes
            </label>
            <input
              type="text"
              value={nakesName}
              onChange={(e) => setNakesName(e.target.value)}
              placeholder="Bdn. Rina Triana"
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Section 2: 5 Lifecycle Groups */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[#1E9E6A]">
          Data Pelayanan 5 Kelompok Siklus Hidup
        </h3>

        <div className="space-y-6">
          {lifecycle.map((lc, idx) => (
            <div
              key={lc.group}
              className="rounded-2xl border border-slate-200 p-4 sm:p-5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-slate-700">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {idx + 1}. {lc.groupName}
                </h4>
                <span className="text-xs font-bold text-[#1E9E6A]">
                  Cakupan: {lc.achievementRate}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Jumlah Sasaran *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={lc.targetCount}
                    onChange={(e) => updateLifecycleField(idx, 'targetCount', Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Jumlah Kunjungan *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={lc.visitCount}
                    onChange={(e) => updateLifecycleField(idx, 'visitCount', Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Masalah Ditemukan
                  </label>
                  <input
                    type="text"
                    value={lc.issues || ''}
                    onChange={(e) => updateLifecycleField(idx, 'issues', e.target.value)}
                    placeholder="Contoh: 1 balita gizi kurang"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Luar Hari Buka & Kunjungan Rumah */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[#1E9E6A]">
          Kegiatan Luar Hari Buka & Kunjungan Rumah
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jumlah Kunjungan Rumah
            </label>
            <input
              type="number"
              min="0"
              value={homeVisitsCount}
              onChange={(e) => setHomeVisitsCount(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Uraian Kegiatan Luar Hari Buka
            </label>
            <input
              type="text"
              value={outsideActivities}
              onChange={(e) => setOutsideActivities(e.target.value)}
              placeholder="Pendampingan PMT balita"
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kendala & Masalah Umum
            </label>
            <textarea
              rows={2}
              value={generalIssues}
              onChange={(e) => setGeneralIssues(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Rencana Tindak Lanjut
            </label>
            <textarea
              rows={2}
              value={generalFollowUp}
              onChange={(e) => setGeneralFollowUp(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Dokumentasi Foto */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[#1E9E6A]">
          Dokumentasi Pelayanan
        </h3>

        <ImageUploadField
          label="Foto Kegiatan Posyandu *"
          value={photoUrl}
          sourceType={photoSource}
          onChange={(val, src) => {
            setPhotoUrl(val);
            setPhotoSource(src);
          }}
        />
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <button
          type="button"
          onClick={() => setActivePage('dashboard_posyandu')}
          className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
        >
          Batal
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave('Draft')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave('Sudah dikirim')}
            className="flex items-center gap-1.5 rounded-xl bg-[#1E9E6A] px-5 py-2 text-xs font-bold text-white shadow-md shadow-[#1E9E6A]/20 hover:bg-[#168a5c]"
          >
            <Send className="h-4 w-4" />
            <span>Kirim Laporan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
