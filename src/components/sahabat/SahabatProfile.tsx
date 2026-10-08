import React from 'react';
import { Building2, Award, Users, CheckCircle2 } from 'lucide-react';

export const SahabatProfile: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Profil Puskesmas
        </h1>
      </div>

      {/* Overview Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-3 text-[#1E9E6A]">
          <Building2 className="h-6 w-6" />
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
            Puskesmas Kepanjen
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          UPTD Puskesmas Kepanjen merupakan fasilitas pelayanan kesehatan tingkat pertama yang melayani masyarakat Kecamatan Kepanjen, Kabupaten Malang. Sebagai pusat pelayanan kesehatan masyarakat, Puskesmas Kepanjen mengedepankan upaya promotif dan preventif terpadu tanpa mengabaikan aspek kuratif dan rehabilitatif, menjangkau 18 Desa/Kelurahan dan 108 Posyandu melalui transformasi Integrasi Layanan Primer (ILP).
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-[#0F8B8D]">
            <Award className="h-5 w-5" />
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
              Visi
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Terwujudnya masyarakat Kecamatan Kepanjen yang sehat, mandiri, dan berkeadilan melalui pelayanan kesehatan primer yang berkualitas dan terintegrasi.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-[#1F6FB5]">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
              Misi
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-[#1F6FB5] font-bold">1.</span>
              <span>Meningkatkan pemberdayaan masyarakat dan kapasitas kader dalam kemandirian hidup sehat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F6FB5] font-bold">2.</span>
              <span>Menyelenggarakan pelayanan kesehatan terpadu berbasis siklus hidup yang merata dan bermutu.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F6FB5] font-bold">3.</span>
              <span>Mengembangkan tata kelola data kesehatan digital yang akurat, terstruktur, dan transparan.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tim Promkes */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="flex items-center gap-3 text-[#1E9E6A]">
          <Users className="h-6 w-6" />
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
            Tim Promosi Kesehatan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Ners Siti Aminah, S.Kep
            </h4>
            <p className="text-xs text-[#0F8B8D] font-medium">Koordinator Promkes</p>
            <p className="text-xs text-slate-500">Pemberdayaan Kader & ILP Posyandu</p>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Ahmad Fauzi, S.KM
            </h4>
            <p className="text-xs text-[#0F8B8D] font-medium">Petugas Promkes & PTM</p>
            <p className="text-xs text-slate-500">Kawasan Tanpa Rokok & PHBS</p>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              drg. Rahayu Kusuma
            </h4>
            <p className="text-xs text-[#0F8B8D] font-medium">Pembina Teknis Posyandu</p>
            <p className="text-xs text-slate-500">Supervisi Pelayanan Wilayah</p>
          </div>
        </div>
      </div>
    </div>
  );
};
