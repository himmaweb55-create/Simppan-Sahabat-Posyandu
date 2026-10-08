import React from 'react';
import { Stethoscope, Baby, Heart, ShieldCheck, Microscope, Syringe, Ambulance, Apple } from 'lucide-react';

export const SahabatServices: React.FC = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'Poli Umum',
      desc: 'Pemeriksaan kesehatan umum, pengobatan rawat jalan, dan rujukan berjenjang untuk seluruh usia.'
    },
    {
      icon: Baby,
      title: 'Poli KIA & KB',
      desc: 'Pemeriksaan kehamilan (ANC terpadu), pelayanan nifas, konseling laktasi, dan alat kontrasepsi.'
    },
    {
      icon: Heart,
      title: 'Poli Lansia & PTM',
      desc: 'Skrining berkala hipertensi, diabetes melitus, dan pemantauan kesehatan geriatri terpadu.'
    },
    {
      icon: ShieldCheck,
      title: 'Konseling Promkes & Sanitasi',
      desc: 'Konseling Berhenti Merokok (KBM), konsultasi PHBS rumah tangga, dan kesehatan lingkungan.'
    },
    {
      icon: Apple,
      title: 'Poli Gizi',
      desc: 'Konseling gizi balita, pendampingan PMT, gizi ibu hamil, dan penanganan anemia defisiensi besi.'
    },
    {
      icon: Microscope,
      title: 'Laboratorium Sederhana',
      desc: 'Pemeriksaan darah rutin, gula darah, asam urat, kolesterol, tes kehamilan, dan tes dahak.'
    },
    {
      icon: Syringe,
      title: 'Imunisasi Lengkap',
      desc: 'Imunisasi dasar lengkap bayi balita, imunisasi wanita usia subur, dan vaksinasi booster.'
    },
    {
      icon: Ambulance,
      title: 'Unit Gawat Darurat (UGD)',
      desc: 'Pelayanan penanganan medis kegawatdaruratan 24 jam dengan ambulans rujukan siaga.'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Layanan Puskesmas
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {srv.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {srv.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
