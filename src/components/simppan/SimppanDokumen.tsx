import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SapDocument, NotulenDocument, LhkActivityDocument } from '../../types';
import {
  FileText,
  Printer,
  Plus,
  Check,
  Edit3,
  Calendar,
  User,
  MapPin,
  X
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SimppanDokumen: React.FC = () => {
  const {
    sapList,
    saveSap,
    notulenList,
    saveNotulen,
    lhkActivityList,
    saveLhkActivity,
    setPrintModalData,
    currentUser
  } = useApp();

  const [docCategory, setDocCategory] = useState<'SAP' | 'NOTULEN' | 'LHK'>('SAP');

  // SAP modal state
  const [sapModalOpen, setSapModalOpen] = useState(false);
  const [sapTitle, setSapTitle] = useState('');
  const [sapTopic, setSapTopic] = useState('');
  const [sapDate, setSapDate] = useState('2026-10-15');
  const [sapTime, setSapTime] = useState('09:00 - 11:00 WIB');
  const [sapLocation, setSapLocation] = useState('Aula Puskesmas Kepanjen');
  const [sapTarget, setSapTarget] = useState('Masyarakat & Kader');
  const [sapCount, setSapCount] = useState(40);
  const [sapGeneralGoal, setSapGeneralGoal] = useState('');
  const [sapSpecificGoal, setSapSpecificGoal] = useState('');
  const [sapMaterial, setSapMaterial] = useState('');
  const [sapMethod, setSapMethod] = useState('Ceramah, tanya jawab, simulasi');
  const [sapMedia, setSapMedia] = useState('Slide presentasi, lembar balik');
  const [sapDuration, setSapDuration] = useState(120);
  const [sapSpeaker, setSapSpeaker] = useState('Ners Siti Aminah');

  const handleCreateSap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sapTitle.trim()) return;

    saveSap({
      id: `SAP-${Date.now()}`,
      title: sapTitle.trim(),
      topic: sapTopic.trim(),
      date: sapDate,
      time: sapTime,
      location: sapLocation,
      targetAudience: sapTarget,
      participantCount: sapCount,
      generalObjective: sapGeneralGoal,
      specificObjective: sapSpecificGoal,
      materialSummary: sapMaterial,
      method: sapMethod,
      media: sapMedia,
      durationMinutes: sapDuration,
      evaluationMethod: 'Tanya jawab dan post-test singkat',
      speaker: sapSpeaker,
      facilitator: 'Tim Promkes',
      pic: currentUser?.name || 'Ners Siti Aminah',
      status: 'Terverifikasi'
    });

    setSapModalOpen(false);
  };

  const handlePrintSap = (sap: SapDocument) => {
    setPrintModalData({
      title: `SATUAN ACARA PENYULUHAN (SAP)`,
      type: 'SAP',
      referenceNo: `SAP/PKM/${sap.id}/2026`,
      date: sap.date,
      content: {
        'Topik Penyuluhan': sap.topic,
        'Waktu & Lokasi': `${sap.date} (${sap.time}) di ${sap.location}`,
        'Sasaran & Peserta': `${sap.targetAudience} (${sap.participantCount} orang)`,
        'Tujuan Umum': sap.generalObjective,
        'Tujuan Khusus': sap.specificObjective,
        'Pokok Materi': sap.materialSummary,
        'Metode & Media': `Metode: ${sap.method} | Media: ${sap.media}`,
        'Durasi & Evaluasi': `${sap.durationMinutes} Menit | Evaluasi: ${sap.evaluationMethod}`,
        'Narasumber & Fasilitator': `${sap.speaker} (Fasilitator: ${sap.facilitator})`,
        'Penanggung Jawab': sap.pic
      }
    });
  };

  const handlePrintNotulen = (not: NotulenDocument) => {
    setPrintModalData({
      title: `NOTULEN KEGIATAN`,
      type: 'NOTULEN',
      referenceNo: `NOT/PKM/${not.id}/2026`,
      date: not.date,
      content: {
        'Nama Kegiatan': not.title,
        'Waktu & Tempat': `${not.date} (${not.time}) di ${not.location}`,
        'Pimpinan & Narasumber': `Pimpinan: ${not.leader} | Narasumber: ${not.speaker}`,
        'Peserta': not.participants,
        'Agenda Pembahasan': not.agenda,
        'Jalannya Kegiatan': not.proceedings,
        'Keputusan / Kesimpulan': not.decisions,
        'Tindak Lanjut & PIC': `${not.followUp} (PIC: ${not.pic})`
      }
    });
  };

  const handlePrintLhk = (lhk: LhkActivityDocument) => {
    setPrintModalData({
      title: `LAPORAN HASIL KEGIATAN (LHK)`,
      type: 'LHK_KEGIATAN',
      referenceNo: `LHK/PKM/${lhk.id}/2026`,
      date: lhk.date,
      content: {
        'Nama Kegiatan': lhk.title,
        'Waktu & Lokasi': `${lhk.date} (${lhk.time}) di ${lhk.location}`,
        'Tujuan': lhk.objective,
        'Uraian Pelaksanaan': lhk.description,
        'Hasil Kegiatan': lhk.results,
        'Jumlah Peserta': `${lhk.participantCount} Orang`,
        'Kendala / Hambatan': lhk.obstacles,
        'Tindak Lanjut': lhk.followUp
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Dokumen Kegiatan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan Dokumen Resmi: SAP, Notulen, LHK Kegiatan & SPJ
          </p>
        </div>

        {docCategory === 'SAP' && (
          <button
            onClick={() => setSapModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
          >
            <Plus className="h-4 w-4" />
            <span>Buat SAP Baru</span>
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {(['SAP', 'NOTULEN', 'LHK'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setDocCategory(cat)}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
              docCategory === cat
                ? 'bg-[#0F8B8D] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {cat === 'SAP' ? 'Satuan Acara Penyuluhan (SAP)' : cat === 'NOTULEN' ? 'Notulen Kegiatan' : 'LHK Kegiatan'}
          </button>
        ))}
      </div>

      {/* SAP Documents */}
      {docCategory === 'SAP' && (
        <div className="space-y-3">
          {sapList.map((sap) => (
            <div
              key={sap.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                    {sap.id} · {sap.date}
                  </span>
                  <StatusBadge status={sap.status} size="sm" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {sap.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Topik: {sap.topic} · Sasaran: {sap.targetAudience} ({sap.participantCount} org) · Narasumber: {sap.speaker}
                </p>
              </div>

              <button
                onClick={() => handlePrintSap(sap)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Notulen Documents */}
      {docCategory === 'NOTULEN' && (
        <div className="space-y-3">
          {notulenList.map((not) => (
            <div
              key={not.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                    {not.id} · {not.date}
                  </span>
                  <StatusBadge status={not.status} size="sm" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {not.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Pimpinan: {not.leader} · Agenda: {not.agenda}
                </p>
              </div>

              <button
                onClick={() => handlePrintNotulen(not)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* LHK Activity Documents */}
      {docCategory === 'LHK' && (
        <div className="space-y-3">
          {lhkActivityList.map((lhk) => (
            <div
              key={lhk.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                    {lhk.id} · {lhk.date}
                  </span>
                  <StatusBadge status={lhk.status} size="sm" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {lhk.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Tujuan: {lhk.objective} · Peserta: {lhk.participantCount} Orang
                </p>
              </div>

              <button
                onClick={() => handlePrintLhk(lhk)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SAP Modal */}
      {sapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setSapModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Buat Satuan Acara Penyuluhan (SAP)
              </h2>
              <button
                onClick={() => setSapModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSap} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Judul Acara Penyuluhan *
                </label>
                <input
                  type="text"
                  required
                  value={sapTitle}
                  onChange={(e) => setSapTitle(e.target.value)}
                  placeholder="Satuan Acara Penyuluhan: PHBS Rumah Tangga"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Topik Bahasan *
                </label>
                <input
                  type="text"
                  required
                  value={sapTopic}
                  onChange={(e) => setSapTopic(e.target.value)}
                  placeholder="Pencegahan Penyakit Menular dan Sanitasi Lingkungan"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tanggal Pelaksanaan *
                  </label>
                  <input
                    type="date"
                    required
                    value={sapDate}
                    onChange={(e) => setSapDate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Waktu *
                  </label>
                  <input
                    type="text"
                    required
                    value={sapTime}
                    onChange={(e) => setSapTime(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Lokasi *
                  </label>
                  <input
                    type="text"
                    required
                    value={sapLocation}
                    onChange={(e) => setSapLocation(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Sasaran Peserta *
                  </label>
                  <input
                    type="text"
                    required
                    value={sapTarget}
                    onChange={(e) => setSapTarget(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tujuan Umum *
                </label>
                <textarea
                  rows={2}
                  required
                  value={sapGeneralGoal}
                  onChange={(e) => setSapGeneralGoal(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tujuan Khusus *
                </label>
                <textarea
                  rows={2}
                  required
                  value={sapSpecificGoal}
                  onChange={(e) => setSapSpecificGoal(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Narasumber *
                  </label>
                  <input
                    type="text"
                    required
                    value={sapSpeaker}
                    onChange={(e) => setSapSpeaker(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Durasi (Menit)
                  </label>
                  <input
                    type="number"
                    value={sapDuration}
                    onChange={(e) => setSapDuration(Number(e.target.value))}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSapModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
                >
                  Simpan SAP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
