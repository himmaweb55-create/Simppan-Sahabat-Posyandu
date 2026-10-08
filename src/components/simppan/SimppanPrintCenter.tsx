import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Printer, Download, Filter, Search } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SimppanPrintCenter: React.FC = () => {
  const {
    sapList,
    notulenList,
    lhkActivityList,
    posyanduLHKList,
    setPrintModalData
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Unify docs
  const allDocs = [
    ...sapList.map((d) => ({
      id: d.id,
      title: d.title,
      type: 'SAP' as const,
      date: d.date,
      pic: d.pic,
      status: d.status,
      original: d
    })),
    ...notulenList.map((d) => ({
      id: d.id,
      title: d.title,
      type: 'NOTULEN' as const,
      date: d.date,
      pic: d.pic,
      status: d.status,
      original: d
    })),
    ...lhkActivityList.map((d) => ({
      id: d.id,
      title: d.title,
      type: 'LHK_KEGIATAN' as const,
      date: d.date,
      pic: d.signatureName,
      status: d.status,
      original: d
    })),
    ...posyanduLHKList.slice(0, 15).map((d) => ({
      id: d.id,
      title: `LHK ${d.posyanduName} (${d.villageName})`,
      type: 'LHK_POSYANDU' as const,
      date: d.date,
      pic: d.signedByKader,
      status: d.status,
      original: d
    }))
  ];

  const filtered = allDocs.filter((doc) => {
    const matchType = filterType === 'all' || doc.type === filterType;
    const matchSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const handlePrint = (doc: (typeof allDocs)[0]) => {
    setPrintModalData({
      title: doc.title,
      type: doc.type,
      referenceNo: `DOC/PKM/${doc.id}/2026`,
      date: doc.date,
      content: {
        'Nomor Dokumen': doc.id,
        'Judul Berkas': doc.title,
        'Format Template': doc.type,
        'Tanggal Penerbitan': doc.date,
        'Penanggung Jawab': doc.pic,
        'Status Verifikasi': doc.status
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Print & Export Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pusat Pratinjau dan Pencetakan Dokumen Resmi Puskesmas Kepanjen
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
            placeholder="Cari nama dokumen..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="sm:w-64">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">Semua Jenis Template</option>
            <option value="SAP">SAP (Satuan Acara Penyuluhan)</option>
            <option value="NOTULEN">Notulen Kegiatan</option>
            <option value="LHK_KEGIATAN">LHK Kegiatan</option>
            <option value="LHK_POSYANDU">LHK Posyandu</option>
          </select>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="space-y-3">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                  {doc.type} · {doc.id}
                </span>
                <StatusBadge status={doc.status} size="sm" />
              </div>
              <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {doc.title}
              </h4>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Tanggal: {doc.date}</span>
                <span>PJ: {doc.pic}</span>
              </div>
            </div>

            <button
              onClick={() => handlePrint(doc)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c] transition"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
