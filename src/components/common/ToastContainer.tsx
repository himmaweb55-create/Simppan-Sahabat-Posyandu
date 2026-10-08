import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map(toast => {
        let bg = 'bg-slate-900 text-white';
        let Icon = Info;

        if (toast.type === 'success') {
          bg = 'bg-[#1E9E6A] text-white';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bg = 'bg-[#D64545] text-white';
          Icon = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-lg text-sm font-medium transition-all duration-200 ${bg}`}
          >
            <Icon className="h-4 w-4 shrink-0 stroke-[2]" />
            <span className="truncate">{toast.text}</span>
          </div>
        );
      })}
    </div>
  );
};
