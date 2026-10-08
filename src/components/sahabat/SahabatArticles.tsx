import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PublicArticle } from '../../types';
import { Search, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export const SahabatArticles: React.FC = () => {
  const { articles, showToast } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<PublicArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan disalin', 'success');
  };

  if (selectedArticle) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto pb-12">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar</span>
        </button>

        <article className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="space-y-3">
            <span className="inline-block rounded-xl bg-[#0F8B8D]/10 px-3 py-1 text-xs font-bold text-[#0F8B8D]">
              {selectedArticle.category}
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 text-xs text-slate-500 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {selectedArticle.author}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          <div className="h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <img
              src={selectedArticle.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-line">
            {selectedArticle.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Artikel & Berita
          </h1>
        </div>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari artikel..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:border-[#0F8B8D] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition hover:border-[#0F8B8D] hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={art.imageUrl}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                  {art.category}
                </span>
                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-[#0F8B8D] transition dark:text-white line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {art.content}
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-slate-800">
                {art.date} · {art.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
