import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Belum ada data',
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500">
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
        {icon || <Inbox className="h-6 w-6 stroke-[1.5]" />}
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</p>
    </div>
  );
};
