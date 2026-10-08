import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, MapPin, Calendar, FileText, Activity } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    globalSearchOpen,
    setGlobalSearchOpen,
    posyanduList,
    activities,
    reports,
    articles,
    setActivePage,
    setSelectedPosyanduId,
    setSelectedActivityId
  } = useApp();

  const [query, setQuery] = useState('');

  if (!globalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredPosyandu = q
    ? posyanduList.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.villageName.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const filteredActivities = q
    ? activities.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.program.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const filteredArticles = q
    ? articles.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const handleSelectPosyandu = (id: string) => {
    setSelectedPosyanduId(id);
    setActivePage('posyandu_detail');
    setGlobalSearchOpen(false);
  };

  const handleSelectActivity = (id: string) => {
    setSelectedActivityId(id);
    setActivePage('kegiatan_detail');
    setGlobalSearchOpen(false);
  };

  const handleSelectArticle = () => {
    setActivePage('artikel');
    setGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setGlobalSearchOpen(false)}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kegiatan, data, dokumen, laporan, atau Posyandu..."
            className="flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
          />
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {q && (
            <>
              {filteredPosyandu.length > 0 && (
                <div>
                  <h4 className="px-2 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Posyandu
                  </h4>
                  <div className="space-y-1">
                    {filteredPosyandu.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPosyandu(p.id)}
                        className="flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#1E9E6A]" />
                          <div>
                            <span className="font-semibold">{p.name}</span>
                            <span className="ml-2 text-slate-400">({p.id})</span>
                          </div>
                        </div>
                        <span className="text-slate-500">{p.villageName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredActivities.length > 0 && (
                <div>
                  <h4 className="px-2 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Kegiatan & Agenda
                  </h4>
                  <div className="space-y-1">
                    {filteredActivities.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelectActivity(a.id)}
                        className="flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#0F8B8D]" />
                          <span className="font-semibold">{a.title}</span>
                        </div>
                        <span className="text-slate-500">{a.date}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredArticles.length > 0 && (
                <div>
                  <h4 className="px-2 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Artikel & Informasi
                  </h4>
                  <div className="space-y-1">
                    {filteredArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={handleSelectArticle}
                        className="flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#1F6FB5]" />
                          <span className="font-semibold">{art.title}</span>
                        </div>
                        <span className="text-slate-500">{art.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredPosyandu.length === 0 &&
                filteredActivities.length === 0 &&
                filteredArticles.length === 0 && (
                  <div className="py-6 text-center text-xs text-slate-400">
                    Tidak ditemukan data
                  </div>
                )}
            </>
          )}

          {!q && (
            <div className="py-8 text-center text-xs text-slate-400">
              Ketik kata kunci untuk mencari
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
