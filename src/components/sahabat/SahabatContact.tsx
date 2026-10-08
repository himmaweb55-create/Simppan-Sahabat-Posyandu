import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export const SahabatContact: React.FC = () => {
  const { appSettings } = useApp();

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Lokasi dan Kontak
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Info Box */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 text-[#0F8B8D] shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Alamat Lengkap
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {appSettings.contactAddress}
                </p>
                <div className="pt-3">
                  <a
                    href={appSettings.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c] transition"
                  >
                    <span>Buka di Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="h-6 w-6 text-[#1E9E6A] shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Kontak WhatsApp Tim Promkes
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  08889924444 (+62 888-9924-444)
                </p>
                <div className="pt-3">
                  <a
                    href={`https://wa.me/${appSettings.waNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1E9E6A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#188156] transition"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Hubungi Tim Promkes</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-[#1F6FB5] shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Jam Pelayanan
                </h3>
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-800 dark:text-slate-100">Senin - Kamis:</span> 07.30 - 14.00 WIB</p>
                  <p><span className="font-semibold text-slate-800 dark:text-slate-100">Jumat:</span> 07.30 - 11.00 WIB</p>
                  <p><span className="font-semibold text-slate-800 dark:text-slate-100">Sabtu:</span> 07.30 - 12.30 WIB</p>
                  <p className="text-[#0F8B8D] font-bold pt-1">UGD & Persalinan: 24 Jam Setiap Hari</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Display Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col h-full min-h-[380px]">
          <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <iframe
              title="Peta Lokasi Puskesmas Kepanjen"
              src="https://maps.google.com/maps?q=Puskesmas%20Kepanjen%2C%20Jatirejoyoso%2C%20Kepanjen%2C%20Malang&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
