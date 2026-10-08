import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LearningMaterial } from '../../types';
import { Search, GraduationCap, FileText, Video, Presentation, Download, X } from 'lucide-react';

export const SahabatBelajarKader: React.FC = () => {
  const { learningList, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMaterial, setActiveMaterial] = useState<LearningMaterial | null>(null);

  const categories = ['all', 'Keterampilan Kader', 'Ibu & Anak', 'Remaja', 'Dewasa & Lansia', 'Gizi & PHBS'];

  const filtered = learningList.filter((m) => {
    const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (title: string) => {
    showToast(`Mengunduh ${title}`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Belajar Kader
          </h1>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi pembelajaran..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:border-[#1E9E6A] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#1E9E6A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mat) => {
          let Icon = FileText;
          if (mat.type === 'Video') Icon = Video;
          if (mat.type === 'Presentasi') Icon = Presentation;

          return (
            <div
              key={mat.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-[#1E9E6A] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#1E9E6A] uppercase tracking-wider">
                    {mat.category}
                  </span>
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {mat.type}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E9E6A]/10 text-[#1E9E6A]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-slate-900 group-hover:text-[#1E9E6A] transition dark:text-white leading-snug">
                      {mat.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {mat.durationOrPages} · Diperbarui {mat.updatedAt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setActiveMaterial(mat)}
                  className="flex-1 rounded-xl bg-slate-100 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-[#1E9E6A] hover:text-white transition dark:bg-slate-800 dark:text-slate-200"
                >
                  Buka Materi
                </button>
                <button
                  onClick={() => handleDownload(mat.title)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400"
                  aria-label="Unduh Materi"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Material Preview Dialog */}
      {activeMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setActiveMaterial(null)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <span className="text-xs font-bold text-[#1E9E6A]">
                {activeMaterial.type} · {activeMaterial.category}
              </span>
              <button
                onClick={() => setActiveMaterial(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {activeMaterial.title}
              </h2>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 space-y-2">
                <p className="text-slate-600 dark:text-slate-300">
                  Materi panduan resmi Promkes Puskesmas Kepanjen untuk peningkatan 25 kompetensi dasar kader Posyandu siklus hidup.
                </p>
                <p className="font-medium text-slate-500">
                  Volume: {activeMaterial.durationOrPages}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    handleDownload(activeMaterial.title);
                    setActiveMaterial(null);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#1E9E6A] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#168a5c]"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Unduh Berkas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
