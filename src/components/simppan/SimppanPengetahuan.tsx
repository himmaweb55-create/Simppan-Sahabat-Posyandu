import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Share2, Lightbulb, Plus, BookOpen, ExternalLink, X } from 'lucide-react';

export const SimppanPengetahuan: React.FC = () => {
  const { articles, saveArticle } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Integrasi Layanan Primer');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800');

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    saveArticle({
      id: `ART-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: 'Tim Promkes',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      imageUrl: newImage,
      content: newContent.trim()
    });

    setModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const innovations = [
    {
      title: 'SAHABAT POSYANDU & SIMPPAN Terintegrasi',
      desc: 'Digitalisasi alur pelaporan kader Posyandu 18 desa dan monitoring otomatis Tim Promkes Puskesmas Kepanjen.',
      status: 'Berjalan Aktif'
    },
    {
      title: 'Dapur Gizi PMT Berbasis Pangan Lokal Malang',
      desc: 'Inovasi olahan menu hewani telur dan ikan air tawar oleh kader desa untuk pemulihan balita berisiko stunting.',
      status: 'Pengembangan'
    },
    {
      title: 'Klinik Berhenti Merokok (UBM) Keliling Desa',
      desc: 'Skrining kadar karbon monoksida (CO analyzer) dan konseling terpadu di balai desa binaan.',
      status: 'Terjadwal'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Publikasi, Pembelajaran & Inovasi
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manajemen Konten Publikasi, Praktik Baik, dan Inovasi Promosi Kesehatan
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Publikasi</span>
        </button>
      </div>

      {/* Inovasi Promkes Section */}
      <div className="space-y-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#0F8B8D]">
          Inovasi & Praktik Baik
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {innovations.map((inv, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  {inv.status}
                </span>
              </div>
              <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                {inv.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {inv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Konten Publikasi Terdaftar */}
      <div className="space-y-4 pt-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#0F8B8D]">
          Konten Publikasi Aktif ({articles.length})
        </h3>
        <div className="space-y-3">
          {articles.map((art) => (
            <div
              key={art.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                  {art.category}
                </span>
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {art.date} · Oleh {art.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Article */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Tambah Artikel Publikasi
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kategori *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="Integrasi Layanan Primer">Integrasi Layanan Primer</option>
                  <option value="Gizi & Pencegahan Anemia">Gizi & Pencegahan Anemia</option>
                  <option value="Penyakit Tidak Menular">Penyakit Tidak Menular</option>
                  <option value="Pemberdayaan Masyarakat">Pemberdayaan Masyarakat</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tautan Gambar Sampul (URL)
                </label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Isi Artikel *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
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
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
