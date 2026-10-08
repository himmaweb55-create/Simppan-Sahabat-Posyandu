import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserAccount, UserRole } from '../../types';
import { Users, Search, KeyRound, Plus, ShieldCheck, Check, X, Filter } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SuperadminAkun: React.FC = () => {
  const { accounts, saveAccount, resetUserPassword, showToast } = useApp();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resetModalAccount, setResetModalAccount] = useState<UserAccount | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const filtered = accounts.filter((acc) => {
    const matchRole = roleFilter === 'all' || acc.role === roleFilter;
    const matchSearch =
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.jurisdictionName && acc.jurisdictionName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRole && matchSearch;
  });

  const handleToggleActive = (acc: UserAccount) => {
    saveAccount({
      ...acc,
      active: !acc.active
    });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalAccount || !newPassword.trim()) return;

    resetUserPassword(resetModalAccount.id, newPassword.trim());
    setResetModalAccount(null);
    setNewPassword('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Manajemen Akun Pengguna
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pengelolaan 108 Akun Kader Posyandu, 18 Desa/Kelurahan & Petugas Wilayah
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama akun atau ID..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="sm:w-64">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">Semua Peran ({accounts.length})</option>
            <option value="kader_posyandu">Kader Posyandu (108)</option>
            <option value="desa">Pemerintah Desa/Kelurahan (18)</option>
            <option value="tim_promkes">Tim Promkes</option>
            <option value="admin_puskesmas">Admin Puskesmas</option>
            <option value="pimpinan">Kepala Puskesmas</option>
            <option value="koordinator_posyandu">Koordinator Posyandu</option>
            <option value="petugas_program">Petugas Program</option>
            <option value="nakes_pustu">Nakes Pustu</option>
            <option value="kecamatan">Kecamatan</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
              <th className="py-3 px-4">Nama Akun</th>
              <th className="py-3 px-4">Peran</th>
              <th className="py-3 px-4">Wilayah / Yurisdiksi</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Terakhir Masuk</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.slice(0, 50).map((acc) => (
              <tr key={acc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4">
                  <p className="font-semibold text-slate-900 dark:text-white leading-snug">
                    {acc.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{acc.id}</p>
                </td>
                <td className="py-3 px-4">
                  <span className="capitalize text-slate-700 dark:text-slate-300">
                    {acc.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500">
                  {acc.jurisdictionName || '-'}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      acc.active
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-red-500/10 text-red-600'
                    }`}
                  >
                    {acc.active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{acc.lastLogin || '-'}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setResetModalAccount(acc);
                        setNewPassword('');
                      }}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Reset Kata Sandi"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-[#0F8B8D]" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(acc)}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-semibold"
                    >
                      {acc.active ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reset Password Modal */}
      {resetModalAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setResetModalAccount(null)}
          />

          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Reset Kata Sandi
              </h2>
              <button
                onClick={() => setResetModalAccount(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleResetSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <span className="text-slate-400">Akun:</span>
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  {resetModalAccount.name}
                </p>
                <p className="text-[11px] text-slate-400">ID: {resetModalAccount.id}</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kata Sandi Baru *
                </label>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalAccount(null)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
                >
                  Simpan Kata Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
