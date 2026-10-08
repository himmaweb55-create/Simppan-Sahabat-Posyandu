import React from 'react';
import { useApp } from '../../context/AppContext';
import { Database, ExternalLink, Users, Home } from 'lucide-react';

export const SahabatRumahData: React.FC = () => {
  const { villages } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Rumah Data
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            18 Desa & Kelurahan
          </span>
        </div>
      </div>

      {/* Grid of 18 Village Linktree Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {villages.map((v) => (
          <div
            key={v.id}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-[#1E9E6A] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#1E9E6A] uppercase tracking-wider">
                  Desa / Kelurahan
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {v.code}
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-[#1E9E6A] transition dark:text-white">
                {v.name}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Home className="h-3.5 w-3.5 text-slate-400" />
                  {v.posyanduCount} Posyandu
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  {v.kaderCount} Kader
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={v.linktreeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-[#1E9E6A] hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-[#1E9E6A]"
              >
                <span>Buka Rumah Data</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
