import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, Plus, Edit3, Trash2, Check, X } from 'lucide-react';
import { Village, Posyandu } from '../../types';

export const SuperadminMasterData: React.FC = () => {
  const { villages, updateVillage, posyanduList, updatePosyandu, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'desa' | 'posyandu' | 'strata' | 'siklus'>('desa');

  const [editingVillage, setEditingVillage] = useState<Village | null>(null);
  const [villageName, setVillageName] = useState('');
  const [villageLinktree, setVillageLinktree] = useState('');

  const openEditVillage = (v: Village) => {
    setEditingVillage(v);
    setVillageName(v.name);
    setVillageLinktree(v.linktreeUrl);
  };

  const handleSaveVillage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVillage) return;

    updateVillage({
      ...editingVillage,
      name: villageName.trim(),
      linktreeUrl: villageLinktree.trim()
    });

    setEditingVillage(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Master Data
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Pengaturan Entitas Pokok Wilayah, Posyandu, dan Parameter Pelayanan
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('desa')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
            activeTab === 'desa'
              ? 'bg-[#0F8B8D] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          Desa / Kelurahan (18)
        </button>

        <button
          onClick={() => setActiveTab('posyandu')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
            activeTab === 'posyandu'
              ? 'bg-[#0F8B8D] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          Posyandu (108)
        </button>

        <button
          onClick={() => setActiveTab('strata')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
            activeTab === 'strata'
              ? 'bg-[#0F8B8D] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          Tingkat Strata
        </button>

        <button
          onClick={() => setActiveTab('siklus')}
          className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
            activeTab === 'siklus'
              ? 'bg-[#0F8B8D] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          5 Siklus Hidup
        </button>
      </div>

      {/* Tab: Desa */}
      {activeTab === 'desa' && (
        <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Nama Desa / Kelurahan</th>
                <th className="py-3 px-4">Tautan Linktree Rumah Data</th>
                <th className="py-3 px-3 text-center">Posyandu</th>
                <th className="py-3 px-3 text-center">Kader</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {villages.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-[#0F8B8D]">{v.code}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {v.name}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px] truncate max-w-xs">
                    {v.linktreeUrl}
                  </td>
                  <td className="py-3 px-3 text-center">{v.posyanduCount}</td>
                  <td className="py-3 px-3 text-center">{v.kaderCount}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openEditVillage(v)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Ubah Desa"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Posyandu */}
      {activeTab === 'posyandu' && (
        <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Nama Posyandu</th>
                <th className="py-3 px-4">Desa</th>
                <th className="py-3 px-4">Strata</th>
                <th className="py-3 px-4">Jadwal Buka</th>
                <th className="py-3 px-3 text-center">Sasaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {posyanduList.slice(0, 30).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-[#0F8B8D]">{p.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{p.villageName}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{p.strata}</td>
                  <td className="py-3 px-4 text-slate-500">{p.scheduleDay}</td>
                  <td className="py-3 px-3 text-center font-bold">
                    {Object.values(p.targetCount).reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Strata & Siklus */}
      {(activeTab === 'strata' || activeTab === 'siklus') && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3 text-xs">
          {activeTab === 'strata' ? (
            <div className="space-y-2">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Strata Standar Kemenkes RI:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                <li>Posyandu Pratama (Kader &lt; 5, frekuensi belum rutin)</li>
                <li>Posyandu Madya (Kader &ge; 5, frekuensi rutin &gt; 8x/thn, cakupan &lt; 50%)</li>
                <li>Posyandu Purnama (Kader &ge; 5, frekuensi rutin &gt; 8x/thn, cakupan &gt; 50%, dana sehat &lt; 50%)</li>
                <li>Posyandu Mandiri (Kader &ge; 5, frekuensi rutin &gt; 8x/thn, cakupan &gt; 50%, dana sehat &gt; 50%)</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-semibold text-slate-700 dark:text-slate-300">5 Kelompok Siklus Hidup ILP:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                <li>Ibu Hamil, Nifas, dan Menyusui</li>
                <li>Bayi, Balita, dan Apras (0-6 tahun)</li>
                <li>Usia Sekolah dan Remaja (&gt;6-18 tahun)</li>
                <li>Dewasa/Produktif (&gt;18-59 tahun)</li>
                <li>Lansia (&gt;60 tahun)</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Edit Village Modal */}
      {editingVillage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setEditingVillage(null)}
          />

          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Ubah Data Desa
              </h2>
              <button
                onClick={() => setEditingVillage(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVillage} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Desa / Kelurahan *
                </label>
                <input
                  type="text"
                  required
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tautan Linktree Rumah Data *
                </label>
                <input
                  type="url"
                  required
                  value={villageLinktree}
                  onChange={(e) => setVillageLinktree(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingVillage(null)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
