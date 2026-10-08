import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalActivity, ActivityStatus } from '../../types';
import {
  Calendar,
  Plus,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Upload,
  Check,
  X,
  Printer
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { ImageUploadField } from '../common/ImageUploadField';

export const SimppanKegiatan: React.FC = () => {
  const { activities, saveActivity, selectedActivityId, setSelectedActivityId, setPrintModalData } = useApp();
  const [activeTab, setActiveTab] = useState<string>('detail');
  const [modalOpen, setModalOpen] = useState(false);

  const selectedActivity =
    activities.find((a) => a.id === selectedActivityId) || activities[0];

  // New activity form states
  const [newTitle, setNewTitle] = useState('');
  const [newProgram, setNewProgram] = useState('Promosi Kesehatan');
  const [newDate, setNewDate] = useState('2026-10-18');
  const [newTime, setNewTime] = useState('09:00 WIB');
  const [newLocation, setNewLocation] = useState('Puskesmas Kepanjen');
  const [newPic, setNewPic] = useState('Ners Siti Aminah');
  const [newTarget, setNewTarget] = useState('Kader Kesehatan');
  const [newParticipantCount, setNewParticipantCount] = useState(30);

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const act: DigitalActivity = {
      id: `ACT-${Date.now()}`,
      title: newTitle.trim(),
      program: newProgram,
      date: newDate,
      time: newTime,
      location: newLocation,
      pic: newPic,
      status: 'Direncanakan',
      targetAudience: newTarget,
      participantCount: newParticipantCount,
      spjCompleted: false,
      spjFilesCount: 0
    };

    saveActivity(act);
    setSelectedActivityId(act.id);
    setModalOpen(false);
    setNewTitle('');
  };

  const handleStatusChange = (status: ActivityStatus) => {
    if (!selectedActivity) return;
    saveActivity({ ...selectedActivity, status });
  };

  const handlePrintKegiatan = () => {
    if (!selectedActivity) return;
    setPrintModalData({
      title: `LEMBAR KERJA KEGIATAN: ${selectedActivity.title.toUpperCase()}`,
      type: 'LHK_KEGIATAN',
      referenceNo: `KEG/PKM/${selectedActivity.id}/2026`,
      date: selectedActivity.date,
      content: {
        'Nama Kegiatan': selectedActivity.title,
        'Program': selectedActivity.program,
        'Waktu & Tempat': `${selectedActivity.date} (${selectedActivity.time}) di ${selectedActivity.location}`,
        'Penanggung Jawab': selectedActivity.pic,
        'Sasaran & Peserta': `${selectedActivity.targetAudience} (${selectedActivity.participantCount} orang)`,
        'Status Pelaksanaan': selectedActivity.status,
        'Hasil Kegiatan': selectedActivity.results || 'Kegiatan terlaksana sesuai rencana kerja.',
        'Tindak Lanjut': selectedActivity.followUp || 'Monitoring evaluasi berkala.'
      }
    });
  };

  const tabs = [
    { key: 'detail', label: 'Ringkasan & Detail' },
    { key: 'undangan', label: 'Surat Undangan' },
    { key: 'tugas', label: 'Surat Tugas' },
    { key: 'sap', label: 'SAP / Materi' },
    { key: 'presensi', label: 'Daftar Hadir' },
    { key: 'dokumentasi', label: 'Dokumentasi' },
    { key: 'notulen', label: 'Notulen' },
    { key: 'lhk', label: 'LHK' },
    { key: 'spj', label: 'Berkas SPJ' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Agenda & Kegiatan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ruang Digital Pengelolaan Siklus Dokumen Kegiatan
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Kegiatan</span>
        </button>
      </div>

      {/* Activities Grid / Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activities.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelectedActivityId(a.id)}
            className={`flex flex-col text-left rounded-2xl border p-4 transition ${
              selectedActivity?.id === a.id
                ? 'border-[#0F8B8D] bg-[#0F8B8D]/5 shadow-sm'
                : 'border-slate-200/80 bg-white hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                {a.date}
              </span>
              <StatusBadge status={a.status} size="sm" />
            </div>
            <h4 className="font-heading text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
              {a.title}
            </h4>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{a.location}</span>
            </p>
          </button>
        ))}
      </div>

      {/* Selected Activity Digital Room */}
      {selectedActivity && (
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          {/* Digital Room Top Bar */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0F8B8D]">
                    {selectedActivity.id} · {selectedActivity.program}
                  </span>
                  <StatusBadge status={selectedActivity.status} size="sm" />
                </div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {selectedActivity.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>Tanggal: {selectedActivity.date} ({selectedActivity.time})</span>
                  <span>Lokasi: {selectedActivity.location}</span>
                  <span>PIC: {selectedActivity.pic}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintKegiatan}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Printer className="h-4 w-4" />
                  <span>Cetak Lembar Kerja</span>
                </button>

                <select
                  value={selectedActivity.status}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="rounded-xl border border-slate-300 bg-white py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="Draft">Draft</option>
                  <option value="Direncanakan">Direncanakan</option>
                  <option value="Persiapan">Persiapan</option>
                  <option value="Siap">Siap</option>
                  <option value="Berlangsung">Berlangsung</option>
                  <option value="Dokumentasi">Dokumentasi</option>
                  <option value="SPJ Diproses">SPJ Diproses</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                  <option value="Diarsipkan">Diarsipkan</option>
                </select>
              </div>
            </div>

            {/* Digital Room Tabs */}
            <div className="flex overflow-x-auto gap-1 border-b border-slate-100 pt-2 dark:border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                    activeTab === tab.key
                      ? 'border-[#0F8B8D] text-[#0F8B8D]'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Contents */}
          <div className="p-6">
            {activeTab === 'detail' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40 space-y-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">
                      Sasaran Kegiatan
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedActivity.targetAudience} ({selectedActivity.participantCount} Orang Peserta)
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40 space-y-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">
                      Capaian Hasil
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedActivity.results || 'Belum diinput'}
                    </p>
                  </div>
                </div>

                {/* Auto Checklist */}
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[11px]">
                    Checklist Kelengkapan Digital
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { name: 'Surat Tugas', done: true },
                      { name: 'SAP / Materi', done: !!selectedActivity.sapId },
                      { name: 'Daftar Presensi', done: !!selectedActivity.attendanceListUrl },
                      { name: 'Foto Dokumentasi', done: (selectedActivity.documentationUrls?.length || 0) > 0 },
                      { name: 'Notulensi', done: !!selectedActivity.notulenId },
                      { name: 'LHK Terverifikasi', done: !!selectedActivity.lhkId }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 rounded-xl p-2.5 border ${
                          item.done
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300'
                            : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'undangan' && (
              <div className="space-y-4 text-xs">
                <ImageUploadField
                  label="Surat Undangan Kegiatan"
                  accept="document"
                  value={selectedActivity.invitationLetterUrl || ''}
                  onChange={(val) => saveActivity({ ...selectedActivity, invitationLetterUrl: val })}
                />
              </div>
            )}

            {activeTab === 'tugas' && (
              <div className="space-y-4 text-xs">
                <ImageUploadField
                  label="Surat Tugas Resmi"
                  accept="document"
                  value={selectedActivity.dutyLetterUrl || ''}
                  onChange={(val) => saveActivity({ ...selectedActivity, dutyLetterUrl: val })}
                />
              </div>
            )}

            {activeTab === 'dokumentasi' && (
              <div className="space-y-4 text-xs">
                <ImageUploadField
                  label="Dokumentasi Foto Kegiatan"
                  value={selectedActivity.documentationUrls?.[0] || ''}
                  onChange={(val) =>
                    saveActivity({
                      ...selectedActivity,
                      documentationUrls: val ? [val] : []
                    })
                  }
                />
              </div>
            )}

            {activeTab === 'presensi' && (
              <div className="space-y-4 text-xs">
                <ImageUploadField
                  label="Daftar Hadir / Presensi Peserta"
                  accept="document"
                  value={selectedActivity.attendanceListUrl || ''}
                  onChange={(val) => saveActivity({ ...selectedActivity, attendanceListUrl: val })}
                />
              </div>
            )}

            {activeTab === 'spj' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Status SPJ Kegiatan
                    </span>
                    <p className="text-slate-400 mt-0.5">
                      Kelengkapan administrasi non-tunai
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      saveActivity({
                        ...selectedActivity,
                        spjCompleted: !selectedActivity.spjCompleted
                      })
                    }
                    className={`rounded-xl px-4 py-2 font-semibold transition ${
                      selectedActivity.spjCompleted
                        ? 'bg-[#22A06B] text-white'
                        : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {selectedActivity.spjCompleted ? 'SPJ Lengkap' : 'Tandai Lengkap'}
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'sap' || activeTab === 'notulen' || activeTab === 'lhk') && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  Dokumen terhubung dalam modul Dokumen Kegiatan (SAP / Notulen / LHK).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Add Activity */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Tambah Kegiatan Baru
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Program *
                  </label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Promosi Kesehatan">Promosi Kesehatan</option>
                    <option value="Pemberdayaan Masyarakat">Pemberdayaan Masyarakat</option>
                    <option value="Manajemen Puskesmas">Manajemen Puskesmas</option>
                    <option value="Gizi & KIA">Gizi & KIA</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Penanggung Jawab *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPic}
                    onChange={(e) => setNewPic(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
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
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Lokasi Pelaksanaan *
                </label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Sasaran Peserta *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Peserta (Orang)
                  </label>
                  <input
                    type="number"
                    value={newParticipantCount}
                    onChange={(e) => setNewParticipantCount(Number(e.target.value))}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
                >
                  Simpan Kegiatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
