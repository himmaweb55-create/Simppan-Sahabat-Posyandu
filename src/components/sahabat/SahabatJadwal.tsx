import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SahabatJadwal: React.FC = () => {
  const { schedules } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Posyandu', 'Penyuluhan', 'Bimtek', 'Supervisi', 'Lintas Sektor'];

  const filtered = schedules.filter(
    (s) => filterCategory === 'all' || s.category === filterCategory
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Jadwal Kegiatan
          </h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`rounded-2xl px-4 py-2 text-xs font-semibold transition ${
              filterCategory === cat
                ? 'bg-[#0F8B8D] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {cat === 'all' ? 'Semua Jadwal' : cat}
          </button>
        ))}
      </div>

      {/* Schedules List */}
      <div className="space-y-3">
        {filtered.map((sch) => (
          <div
            key={sch.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D] font-bold">
                <span className="text-base leading-none">
                  {sch.date.split('-')[2]}
                </span>
                <span className="text-[10px] uppercase font-semibold">
                  {sch.date.split('-')[1] === '10' ? 'Okt 2026' : 'Sep 2026'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                    {sch.category}
                  </span>
                  <StatusBadge status={sch.status} size="sm" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {sch.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {sch.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {sch.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {sch.pic}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
