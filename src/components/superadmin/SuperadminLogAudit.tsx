import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Search, Clock, User } from 'lucide-react';

export const SuperadminLogAudit: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = auditLogs.filter(
    (l) =>
      l.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.targetData.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Log Audit & Keamanan
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Rekaman Riwayat Aktivitas Akun, Verifikasi Data, dan Perubahan Konfigurasi
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama akun atau aktivitas..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4">Pengguna</th>
              <th className="py-3 px-4">Peran</th>
              <th className="py-3 px-4">Aktivitas</th>
              <th className="py-3 px-4">Objek Data</th>
              <th className="py-3 px-4">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  {log.accountName}
                </td>
                <td className="py-3 px-4 capitalize text-slate-500">
                  {log.role.replace('_', ' ')}
                </td>
                <td className="py-3 px-4 font-medium text-[#0F8B8D]">
                  {log.action}
                </td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                  {log.targetData}
                </td>
                <td className="py-3 px-4 text-slate-400">
                  {log.changes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
