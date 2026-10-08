import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, Download, X } from 'lucide-react';

export const PrintDocumentModal: React.FC = () => {
  const { printModalData, setPrintModalData } = useApp();

  if (!printModalData) return null;

  const handlePrint = () => {
    window.print();
  };

  const { title, type, referenceNo, date, content, headerVillage, headerPosyandu } = printModalData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[95vh] rounded-2xl bg-white shadow-2xl dark:bg-slate-900 overflow-hidden">
        {/* Modal Controls (No print) */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 px-6 py-3.5 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F8B8D]">
              Pratinjau Dokumen
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-xs sm:max-w-md">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#0d7a7c]"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={() => setPrintModalData(null)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Paper Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 bg-slate-100 dark:bg-slate-950 flex justify-center">
          <div className="print-container w-full max-w-3xl bg-white p-8 sm:p-12 text-slate-900 shadow-sm border border-slate-200 dark:border-none min-h-[842px]">
            {/* Kop Surat Resmi */}
            <div className="border-b-2 border-slate-900 pb-4 text-center">
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Pemerintah Kabupaten Malang · Dinas Kesehatan
              </h3>
              <h2 className="text-base font-extrabold uppercase tracking-wide">
                UPTD Puskesmas Kepanjen
              </h2>
              <p className="text-[11px] text-slate-600">
                Jl. Raya Jatirejoyoso No. 4, Dawukan, Jatirejoyoso, Kec. Kepanjen, Kab. Malang, Jawa Timur 65163
              </p>
              <p className="text-[10px] text-slate-500">
                Layanan Informasi & WhatsApp: 08889924444
              </p>
            </div>

            {/* Document Title & Reference */}
            <div className="my-6 text-center space-y-1">
              <h1 className="text-sm font-bold uppercase tracking-wide underline underline-offset-4">
                {title}
              </h1>
              {referenceNo && (
                <p className="text-xs text-slate-600">Nomor: {referenceNo}</p>
              )}
              {headerVillage && (
                <p className="text-xs font-semibold text-slate-700">
                  Desa/Kelurahan: {headerVillage} {headerPosyandu ? `· ${headerPosyandu}` : ''}
                </p>
              )}
            </div>

            {/* Metadata Bar */}
            <div className="mb-6 grid grid-cols-2 gap-2 text-xs border border-slate-200 p-3 rounded-lg bg-slate-50">
              <div>
                <span className="font-semibold">Tanggal Dokumen: </span>
                <span>{date}</span>
              </div>
              <div>
                <span className="font-semibold">Format: </span>
                <span>{type}</span>
              </div>
            </div>

            {/* Content Table / Sections */}
            <div className="space-y-4 text-xs">
              {Object.entries(content).map(([k, v], idx) => {
                if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                  return (
                    <div key={idx} className="border border-slate-200 rounded-lg p-3">
                      <h4 className="font-bold text-slate-800 mb-2 uppercase">{k}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(v).map(([subK, subV], sIdx) => (
                          <div key={sIdx}>
                            <span className="font-medium text-slate-500">{subK}: </span>
                            <span className="font-semibold">{String(subV)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (Array.isArray(v)) {
                  return (
                    <div key={idx} className="border border-slate-200 rounded-lg p-3">
                      <h4 className="font-bold text-slate-800 mb-2 uppercase">{k}</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {v.map((item, iIdx) => (
                          <li key={iIdx}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-700 block uppercase tracking-wide text-[11px] mb-0.5">
                      {k}
                    </span>
                    <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{String(v)}</p>
                  </div>
                );
              })}
            </div>

            {/* Signature Block */}
            <div className="mt-12 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <p className="text-slate-600 mb-16">Mengetahui,</p>
                <div className="border-b border-slate-900 mx-auto w-44 mb-1"></div>
                <p className="font-bold">NIP. ........................................</p>
              </div>

              <div>
                <p className="text-slate-600 mb-16">Kepanjen, {date}<br />Petugas / Penanggung Jawab,</p>
                <div className="border-b border-slate-900 mx-auto w-44 mb-1"></div>
                <p className="font-bold">Nama Jelas & Tanda Tangan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
