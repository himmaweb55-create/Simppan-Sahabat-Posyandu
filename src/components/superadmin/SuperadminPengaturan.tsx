import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save } from 'lucide-react';

export const SuperadminPengaturan: React.FC = () => {
  const { appSettings, updateAppSettings } = useApp();

  const [title, setTitle] = useState(appSettings.heroTitle);
  const [tagline, setTagline] = useState(appSettings.heroTagline);
  const [waNumber, setWaNumber] = useState(appSettings.waNumber);
  const [address, setAddress] = useState(appSettings.contactAddress);
  const [mapsUrl, setMapsUrl] = useState(appSettings.mapsUrl);
  const [hours, setHours] = useState(appSettings.officeHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppSettings({
      heroTitle: title.trim(),
      heroTagline: tagline.trim(),
      waNumber: waNumber.trim(),
      contactAddress: address.trim(),
      mapsUrl: mapsUrl.trim(),
      officeHours: hours.trim()
    });
  };

  return (
    <div className="space-y-6 max-w-3xl pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Pengaturan Sistem
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Identitas Portal, Kontak Resmi, dan Konfigurasi Pelayanan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 text-xs">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Judul Hero Portal SAHABAT *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Tagline / Slogan Resmi *
          </label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Nomor WhatsApp Tim Promkes *
          </label>
          <input
            type="text"
            required
            value={waNumber}
            onChange={(e) => setWaNumber(e.target.value)}
            placeholder="628889924444"
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Alamat Lengkap Puskesmas *
          </label>
          <textarea
            rows={2}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Tautan Google Maps *
          </label>
          <input
            type="url"
            required
            value={mapsUrl}
            onChange={(e) => setMapsUrl(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Jam Operasional Pelayanan *
          </label>
          <input
            type="text"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0d7a7c]"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
