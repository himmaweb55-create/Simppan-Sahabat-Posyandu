import React, { useState } from 'react';
import { HeartPulse, Baby, Users, Shield, ArrowRight } from 'lucide-react';

export const SahabatInfoKesehatan: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  const groups = [
    {
      title: 'Ibu Hamil, Nifas & Menyusui',
      icon: HeartPulse,
      points: [
        'Pemeriksaan kehamilan minimal 6 kali selama masa kehamilan dengan minimal 2 kali USG oleh dokter.',
        'Konsumsi minimal 90 butir Tablet Tambah Darah (TTD) selama kehamilan.',
        'Pemenuhan asupan gizi seimbang kaya protein hewani untuk cegah BBLR dan stunting.',
        'Inisiasi Menyusu Dini (IMD) dan ASI Eksklusif selama 6 bulan pertama kehidupan bayi.'
      ]
    },
    {
      title: 'Bayi, Balita & Anak Pra-Sekolah (0-6 Tahun)',
      icon: Baby,
      points: [
        'Penimbangan berat badan dan pengukuran panjang/tinggi badan rutin setiap bulan di Posyandu.',
        'Pemberian Imunisasi Dasar Lengkap (IDL) dan imunisasi lanjutan sesuai jadwal usia.',
        'Pemberian Kapsul Vitamin A pada bulan Februari dan Agustus.',
        'Pemberian Makanan Pendamping ASI (MP-ASI) bergizi kaya protein hewani mulai usia 6 bulan.'
      ]
    },
    {
      title: 'Usia Sekolah & Remaja (>6-18 Tahun)',
      icon: Users,
      points: [
        'Konsumsi 1 Tablet Tambah Darah (TTD) setiap minggu bagi seluruh remaja putri.',
        'Skrining anemia berkala dan pemantauan Indeks Massa Tubuh (IMT) menurut umur.',
        'Aktivitas fisik minimal 30 menit sehari dan pembatasan screen time.',
        'Pencegahan perilaku berisiko: tidak merokok, tidak miras, dan literasi kesehatan reproduksi.'
      ]
    },
    {
      title: 'Dewasa & Usia Produktif (>18-59 Tahun)',
      icon: Shield,
      points: [
        'Pemeriksaan tekanan darah dan gula darah secara rutin minimal sekali sebulan.',
        'Penerapan perilaku CERDIK: Cek kesehatan, Enyahkan asap rokok, Rajin olahraga, Diet seimbang, Istirahat cukup, Kelola stres.',
        'Pengukuran lingkar perut untuk deteksi dini obesitas sentral.',
        'Konseling Upaya Berhenti Merokok (UBM) di fasilitas kesehatan.'
      ]
    },
    {
      title: 'Lanjut Usia (>60 Tahun)',
      icon: HeartPulse,
      points: [
        'Skrining instrumen Pengkajian Paripurna Pasien Geriatri (P3G) rutin di Posyandu Lansia.',
        'Pemeriksaan asam urat, kolesterol, dan fungsi kognitif/kemandirian.',
        'Senam lansia rutin 2 kali seminggu untuk menjaga mobilitas dan kelenturan sendi.',
        'Pola makan rendah garam, rendah gula, dan cukup serat air.'
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Informasi Kesehatan
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {groups.map((g, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedGroup(idx)}
            className={`rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
              selectedGroup === idx
                ? 'bg-[#1E9E6A] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* Active Group Details */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="flex items-center gap-3 text-[#1E9E6A]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E9E6A]/10">
            {React.createElement(groups[selectedGroup].icon, { className: 'h-6 w-6' })}
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              {groups[selectedGroup].title}
            </h2>
            <p className="text-xs text-slate-400">Panduan Edukasi Standar Kemenkes RI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groups[selectedGroup].points.map((pt, pIdx) => (
            <div
              key={pIdx}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E9E6A] text-white font-bold text-xs mt-0.5">
                {pIdx + 1}
              </div>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                {pt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
