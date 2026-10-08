import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskItem } from '../../types';
import {
  Briefcase,
  Plus,
  LayoutGrid,
  List,
  Calendar,
  User,
  Clock,
  X,
  Check,
  Trash2,
  Edit3
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const SimppanRuangKerja: React.FC = () => {
  const { tasks, saveTask, deleteTask } = useApp();
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  const [title, setTitle] = useState('');
  const [program, setProgram] = useState('Promosi Kesehatan');
  const [assignee, setAssignee] = useState('Ners Siti Aminah');
  const [priority, setPriority] = useState<TaskItem['priority']>('Sedang');
  const [deadline, setDeadline] = useState('20 Okt 2026');
  const [status, setStatus] = useState<TaskItem['status']>('Dalam Proses');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingTask(null);
    setTitle('');
    setProgram('Promosi Kesehatan');
    setAssignee('Ners Siti Aminah');
    setPriority('Sedang');
    setDeadline('20 Okt 2026');
    setStatus('Dalam Proses');
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (t: TaskItem) => {
    setEditingTask(t);
    setTitle(t.title);
    setProgram(t.program);
    setAssignee(t.assignee);
    setPriority(t.priority);
    setDeadline(t.deadline);
    setStatus(t.status);
    setDescription(t.description || '');
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    saveTask({
      id: editingTask ? editingTask.id : `TSK-${Date.now()}`,
      title: title.trim(),
      program,
      assignee,
      priority,
      deadline,
      status,
      commentsCount: editingTask ? editingTask.commentsCount : 0,
      description: description.trim()
    });

    setModalOpen(false);
  };

  const kanbanColumns: TaskItem['status'][] = ['Menunggu', 'Dalam Proses', 'Berjalan', 'Selesai'];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ruang Kerja
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manajemen Tugas & Progres Kerja Tim Promosi Kesehatan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('board')}
              className={`rounded-lg p-1.5 transition ${
                viewMode === 'board'
                  ? 'bg-white text-[#0F8B8D] shadow-xs dark:bg-slate-900'
                  : 'text-slate-500'
              }`}
              aria-label="Tampilan Papan"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-lg p-1.5 transition ${
                viewMode === 'list'
                  ? 'bg-white text-[#0F8B8D] shadow-xs dark:bg-slate-900'
                  : 'text-slate-500'
              }`}
              aria-label="Tampilan Daftar"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Tugas</span>
          </button>
        </div>
      </div>

      {viewMode === 'board' ? (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((colStatus) => {
            const colTasks = tasks.filter((t) => t.status === colStatus);

            return (
              <div
                key={colStatus}
                className="flex flex-col rounded-3xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {colStatus}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto min-h-[300px]">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => openEditModal(t)}
                      className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-[#0F8B8D] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider">
                          {t.program}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            t.priority === 'Tinggi'
                              ? 'bg-red-500/10 text-red-600'
                              : t.priority === 'Sedang'
                              ? 'bg-amber-500/10 text-amber-600'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>

                      <h4 className="font-heading text-xs font-bold text-slate-900 group-hover:text-[#0F8B8D] transition dark:text-white leading-snug">
                        {t.title}
                      </h4>

                      {t.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {t.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {t.assignee}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {t.deadline}
                        </span>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                      Kosong
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">Tugas</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Penanggung Jawab</th>
                <th className="py-3 px-3 text-center">Prioritas</th>
                <th className="py-3 px-4">Tenggat</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 dark:text-white leading-snug">
                      {t.title}
                    </p>
                    {t.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {t.description}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{t.program}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{t.assignee}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'Tinggi'
                          ? 'bg-red-500/10 text-red-600'
                          : t.priority === 'Sedang'
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{t.deadline}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={t.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(t)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Ubah Tugas"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(t.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-slate-800"
                        aria-label="Hapus Tugas"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Add / Edit Task */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                {editingTask ? 'Ubah Tugas' : 'Tambah Tugas Baru'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Judul Tugas *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Program *
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Promosi Kesehatan">Promosi Kesehatan</option>
                    <option value="Pemberdayaan Masyarakat">Pemberdayaan Masyarakat</option>
                    <option value="Posyandu Bidang Kesehatan">Posyandu Bidang Kesehatan</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Gizi & PTM">Gizi & PTM</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Penanggung Jawab *
                  </label>
                  <input
                    type="text"
                    required
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Prioritas *
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Normal">Normal</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Deadline *
                  </label>
                  <input
                    type="text"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Berjalan">Berjalan</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Uraian Deskripsi
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0F8B8D] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0d7a7c]"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
