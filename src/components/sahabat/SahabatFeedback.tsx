import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send } from 'lucide-react';

export const SahabatFeedback: React.FC = () => {
  const { submitFeedback } = useApp();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState<'Layanan Posyandu' | 'Puskesmas' | 'Promkes' | 'Lainnya'>('Layanan Posyandu');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitFeedback({
      name: name.trim() || undefined,
      contact: contact.trim() || undefined,
      category,
      message: message.trim()
    });

    setName('');
    setContact('');
    setMessage('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Pengaduan dan Umpan Balik
        </h1>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1E9E6A]/10 text-[#1E9E6A]">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Pesan Terkirim
            </h3>
            <div className="pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
              >
                Kirim Pesan Lain
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nama Pengirim
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmad"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F8B8D] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nomor Kontak / Telepon
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="08123456789"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F8B8D] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kategori Layanan *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F8B8D] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="Layanan Posyandu">Layanan Posyandu</option>
                <option value="Puskesmas">Puskesmas</option>
                <option value="Promkes">Promkes</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Isi Pengaduan / Umpan Balik *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-xs sm:text-sm text-slate-800 focus:border-[#0F8B8D] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0F8B8D] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#0F8B8D]/20 hover:bg-[#0d7a7c] transition"
              >
                <Send className="h-4 w-4" />
                <span>Kirim</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
