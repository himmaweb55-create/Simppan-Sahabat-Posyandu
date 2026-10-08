import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Eye, EyeOff, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, loginWithPassword, setChangePasswordModalOpen } = useApp();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!loginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = loginWithPassword(password);
      setLoading(false);
      if (res.success) {
        setLoginModalOpen(false);
        setPassword('');
        // Check if initial password
        if (
          password === 'promkes123' ||
          password === 'superadmin123' ||
          password === 'adminpuskesmas123' ||
          password === 'pimpinan123' ||
          password === 'petugasprogram123' ||
          password === 'kecamatan123' ||
          password.startsWith('kader') ||
          password.startsWith('desa') ||
          password.startsWith('koordinator')
        ) {
          setChangePasswordModalOpen(true);
        }
      } else {
        setErrorMsg(res.error || 'Kata sandi salah');
      }
    }, 400);
  };

  const handleClose = () => {
    setLoginModalOpen(false);
    setPassword('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F8B8D]/10 text-[#0F8B8D] dark:bg-[#0F8B8D]/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Masuk
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kata Sandi *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 focus:border-[#0F8B8D] focus:outline-none focus:ring-1 focus:ring-[#0F8B8D] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {errorMsg && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errorMsg}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F8B8D] py-3 text-sm font-semibold text-white shadow-md shadow-[#0F8B8D]/20 transition hover:bg-[#0d7a7c] disabled:opacity-50"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk'}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
