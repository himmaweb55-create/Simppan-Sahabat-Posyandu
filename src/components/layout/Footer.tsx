import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { appSettings } = useApp();

  return (
    <footer className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Identity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F8B8D] text-white font-bold text-xs">
                PK
              </div>
              <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                Puskesmas Kepanjen
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ekosistem Digital Promosi Kesehatan & Pelayanan Posyandu Terintegrasi Kecamatan Kepanjen, Kabupaten Malang.
            </p>
          </div>

          {/* Location & Contact */}
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#0F8B8D] mt-0.5" />
              <span>{appSettings.contactAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#1E9E6A]" />
              <a
                href={`https://wa.me/${appSettings.waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#1E9E6A] font-semibold text-slate-700 dark:text-slate-300"
              >
                WhatsApp: +62 888-9924-444
              </a>
            </div>
          </div>

          {/* Operating hours */}
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[#1F6FB5] mt-0.5" />
              <span>{appSettings.officeHours}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-4 text-center text-xs text-slate-400 dark:border-slate-800">
          <p>© 2026 Puskesmas Kepanjen · SIMPPAN & SAHABAT POSYANDU</p>
        </div>
      </div>
    </footer>
  );
};
