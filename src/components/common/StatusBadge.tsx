import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const s = status.toLowerCase();

  let bgClass = 'bg-[#9AA5B1]/10 text-[#9AA5B1] border-[#9AA5B1]/30';
  let dotClass = 'bg-[#9AA5B1]';

  if (
    s.includes('terverifikasi') ||
    s.includes('lengkap') ||
    s.includes('selesai') ||
    s.includes('sudah dicetak') ||
    s.includes('aktif')
  ) {
    bgClass = 'bg-[#22A06B]/10 text-[#22A06B] border-[#22A06B]/30';
    dotClass = 'bg-[#22A06B]';
  } else if (
    s.includes('sudah dikirim') ||
    s.includes('sudah diisi') ||
    s.includes('dalam proses') ||
    s.includes('berjalan') ||
    s.includes('informasi') ||
    s.includes('terjadwal')
  ) {
    bgClass = 'bg-[#2E7DD7]/10 text-[#2E7DD7] border-[#2E7DD7]/30';
    dotClass = 'bg-[#2E7DD7]';
  } else if (
    s.includes('belum lengkap') ||
    s.includes('perlu diperbaiki') ||
    s.includes('persiapan') ||
    s.includes('sedang')
  ) {
    bgClass = 'bg-[#F2A024]/10 text-[#F2A024] border-[#F2A024]/30';
    dotClass = 'bg-[#F2A024]';
  } else if (
    s.includes('belum lapor') ||
    s.includes('belum dibuat') ||
    s.includes('belum selesai') ||
    s.includes('tinggi') ||
    s.includes('draft')
  ) {
    bgClass = 'bg-[#D64545]/10 text-[#D64545] border-[#D64545]/30';
    dotClass = 'bg-[#D64545]';
  }

  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${pad} ${bgClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      <span>{status}</span>
    </span>
  );
};
