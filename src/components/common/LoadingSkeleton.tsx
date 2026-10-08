import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string }> = ({
  rows = 3,
  height = 'h-12'
}) => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`w-full ${height} rounded-xl bg-slate-200/80 dark:bg-slate-700/50`} />
      ))}
    </div>
  );
};
