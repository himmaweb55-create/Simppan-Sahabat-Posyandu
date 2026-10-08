import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Check, FileCheck, Calendar, AlertCircle } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    notificationDrawerOpen,
    setNotificationDrawerOpen,
    notifications,
    markNotificationAsRead
  } = useApp();

  if (!notificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setNotificationDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-sm bg-white dark:bg-slate-900 shadow-xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0F8B8D]" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Notifikasi
              </h2>
            </div>
            <button
              onClick={() => setNotificationDrawerOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map((notif) => {
              let Icon = Bell;
              if (notif.type === 'laporan') Icon = FileCheck;
              if (notif.type === 'verifikasi') Icon = Check;
              if (notif.type === 'agenda') Icon = Calendar;
              if (notif.type === 'tindak_lanjut') Icon = AlertCircle;

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`flex items-start gap-3 rounded-xl p-3 border transition cursor-pointer ${
                    notif.read
                      ? 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-800/40'
                      : 'border-[#0F8B8D]/30 bg-[#0F8B8D]/5 dark:bg-[#0F8B8D]/10'
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0F8B8D]/10 text-[#0F8B8D]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-slate-400">{notif.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
