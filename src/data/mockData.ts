import {
  Village,
  Posyandu,
  UserAccount,
  MonthlyReport,
  PosyanduLHK,
  TaskItem,
  DigitalActivity,
  SapDocument,
  NotulenDocument,
  LhkActivityDocument,
  ProgramIndicator,
  FollowUpItem,
  CoachingRecord,
  PublicArticle,
  LearningMaterial,
  ScheduleEvent,
  PublicFeedback,
  AppNotification,
  AuditLog,
  SystemUsageStats,
  SyncConfiguration,
  LifecycleData
} from '../types';

export const INITIAL_VILLAGES: Village[] = [
  { id: 'D01', code: '01', name: 'Kepanjen', linktreeUrl: 'https://linktr.ee/DataInformasiKepanjen', posyanduCount: 6, kaderCount: 62 },
  { id: 'D02', code: '02', name: 'Cepokomulyo', linktreeUrl: 'https://linktr.ee/DataInformasiCepokomulyo', posyanduCount: 6, kaderCount: 60 },
  { id: 'D03', code: '03', name: 'Penarukan', linktreeUrl: 'https://linktr.ee/DataInformasiPenarukan', posyanduCount: 6, kaderCount: 58 },
  { id: 'D04', code: '04', name: 'Ardirejo', linktreeUrl: 'https://linktr.ee/DataInformasiArdirejo', posyanduCount: 6, kaderCount: 64 },
  { id: 'D05', code: '05', name: 'Dilem', linktreeUrl: 'https://linktr.ee/DataInformasiDilem', posyanduCount: 6, kaderCount: 59 },
  { id: 'D06', code: '06', name: 'Talangagung', linktreeUrl: 'https://linktr.ee/DataInformasiTalangagung', posyanduCount: 6, kaderCount: 65 },
  { id: 'D07', code: '07', name: 'Ngadilangkung', linktreeUrl: 'https://linktr.ee/DataInformasiNgadilangkung', posyanduCount: 6, kaderCount: 57 },
  { id: 'D08', code: '08', name: 'Mojosari', linktreeUrl: 'https://linktr.ee/datainformasimojosari', posyanduCount: 6, kaderCount: 56 },
  { id: 'D09', code: '09', name: 'Jatirejoyoso', linktreeUrl: 'https://linktr.ee/DataInformasiJatirejoyoso', posyanduCount: 6, kaderCount: 63 },
  { id: 'D10', code: '10', name: 'Curungrejo', linktreeUrl: 'https://linktr.ee/DataInformasiCurungrejo1', posyanduCount: 6, kaderCount: 61 },
  { id: 'D11', code: '11', name: 'Sukoraharjo', linktreeUrl: 'https://linktr.ee/DataInformasiSukoraharjo', posyanduCount: 6, kaderCount: 60 },
  { id: 'D12', code: '12', name: 'Kedungpedaringan', linktreeUrl: 'https://linktr.ee/DataInformasiKedungpedaringan', posyanduCount: 6, kaderCount: 58 },
  { id: 'D13', code: '13', name: 'Tegalsari', linktreeUrl: 'https://linktr.ee/DataInformasiTegalsari', posyanduCount: 6, kaderCount: 59 },
  { id: 'D14', code: '14', name: 'Panggungrejo', linktreeUrl: 'https://linktr.ee/DataInformasiPanggungrejo', posyanduCount: 6, kaderCount: 62 },
  { id: 'D15', code: '15', name: 'Mangunrejo', linktreeUrl: 'https://linktr.ee/DataInformasiMangunrejo', posyanduCount: 6, kaderCount: 60 },
  { id: 'D16', code: '16', name: 'Kemiri', linktreeUrl: 'https://linktr.ee/datainformasikemiri', posyanduCount: 6, kaderCount: 58 },
  { id: 'D17', code: '17', name: 'Jenggolo', linktreeUrl: 'https://linktr.ee/DataInformasiJenggolo', posyanduCount: 6, kaderCount: 59 },
  { id: 'D18', code: '18', name: 'Sengguruh', linktreeUrl: 'https://linktr.ee/DataInformasiSengguruh', posyanduCount: 6, kaderCount: 62 },
];

const POSYANDU_NAMES_POOL = [
  'Melati', 'Dahlia', 'Mawar', 'Kenanga', 'Nusa Indah', 'Anggrek',
  'Cempaka', 'Bougenville', 'Teratai', 'Flamboyan', 'Kamboja', 'Sedap Malam'
];

export const INITIAL_POSYANDU: Posyandu[] = [];
let pIndex = 1;

INITIAL_VILLAGES.forEach((village, vIdx) => {
  for (let i = 1; i <= 6; i++) {
    const id = `P${String(pIndex).padStart(3, '0')}`;
    const flower = POSYANDU_NAMES_POOL[(vIdx + i - 1) % POSYANDU_NAMES_POOL.length];
    const strataList: Array<'Pratama' | 'Madya' | 'Purnama' | 'Mandiri'> = ['Madya', 'Purnama', 'Mandiri', 'Purnama', 'Mandiri', 'Madya'];
    
    INITIAL_POSYANDU.push({
      id,
      villageId: village.id,
      villageName: village.name,
      name: `Posyandu ${flower} ${i}`,
      strata: strataList[(i - 1) % strataList.length],
      address: `RW 0${i}, Desa/Kelurahan ${village.name}`,
      scheduleDay: `Minggu ke-${(i % 4) + 1} hari ${['Senin', 'Selasa', 'Rabu', 'Kamis', 'Sabtu'][(i - 1) % 5]}`,
      activeKaders: 10,
      contactPerson: `Kader ${flower} ${i}`,
      phone: '',
      targetCount: {
        ibuHamil: 25 + (i * 2),
        balita: 90 + (i * 5),
        remaja: 80 + (i * 4),
        dewasa: 210 + (i * 12),
        lansia: 75 + (i * 3)
      }
    });
    pIndex++;
  }
});

// Helper for initial mock reports
function createLifecycleData(p: Posyandu, achievementFactor: number = 0.9): LifecycleData[] {
  return [
    {
      group: 'ibu_hamil',
      groupName: 'Ibu Hamil, Nifas, dan Menyusui',
      targetCount: p.targetCount.ibuHamil,
      visitCount: Math.round(p.targetCount.ibuHamil * achievementFactor),
      achievementRate: Math.round(achievementFactor * 100),
      serviceTypes: ['Pemeriksaan Kehamilan', 'Konseling Gizi', 'Pemberian TTD', 'Pemantauan Nifas'],
      serviceDate: '2026-09-10',
      notes: 'Pelayanan berjalan tertib',
      issues: '1 bumil anemia ringan',
      followUp: 'Kunjungan rumah & konseling tablet Fe'
    },
    {
      group: 'balita',
      groupName: 'Bayi, Balita, dan Apras (0-6 tahun)',
      targetCount: p.targetCount.balita,
      visitCount: Math.round(p.targetCount.balita * achievementFactor),
      achievementRate: Math.round(achievementFactor * 100),
      serviceTypes: ['Penimbangan BB', 'Pengukuran TB/PB', 'Imunisasi Rutin', 'Pemberian Vitamin A', 'Konseling PMBA'],
      serviceDate: '2026-09-10',
      notes: 'Balita hadir didampingi orang tua',
      issues: '2 balita berat badan kurang',
      followUp: 'Rujukan ke Puskesmas & PMT Lokal'
    },
    {
      group: 'remaja',
      groupName: 'Usia Sekolah dan Remaja (>6-18 tahun)',
      targetCount: p.targetCount.remaja,
      visitCount: Math.round(p.targetCount.remaja * (achievementFactor * 0.85)),
      achievementRate: Math.round(achievementFactor * 85),
      serviceTypes: ['Skrining Anemia', 'Pengukuran Antropometri', 'Pemberian TTD Rematri', 'Edukasi Gizi Seimbang'],
      serviceDate: '2026-09-10',
      notes: 'Posyandu remaja hari Sabtu'
    },
    {
      group: 'dewasa',
      groupName: 'Dewasa/Produktif (>18-59 tahun)',
      targetCount: p.targetCount.dewasa,
      visitCount: Math.round(p.targetCount.dewasa * (achievementFactor * 0.92)),
      achievementRate: Math.round(achievementFactor * 92),
      serviceTypes: ['Skrining PTM (Tekanan Darah, Gula Darah)', 'Pengukuran Lingkar Perut', 'Konseling Upaya Berhenti Merokok'],
      serviceDate: '2026-09-10'
    },
    {
      group: 'lansia',
      groupName: 'Lansia (>60 tahun)',
      targetCount: p.targetCount.lansia,
      visitCount: Math.round(p.targetCount.lansia * achievementFactor),
      achievementRate: Math.round(achievementFactor * 100),
      serviceTypes: ['Skrining Kesehatan Lansia', 'Pemeriksaan TD & Asam Urat', 'Senam Lansia', 'Konseling Aktivitas Fisik'],
      serviceDate: '2026-09-10'
    }
  ];
}

// Reports generation:
// Jan-Jun (Semester 1) = 648 reports (baseline)
// Jul-Sep (Semester 2) = partially filled matching user dashboard screenshot (Sep: 77.47% kelengkapan, 502/648)
export const INITIAL_REPORTS: MonthlyReport[] = [];
export const INITIAL_POSYANDU_LHK: PosyanduLHK[] = [];

// Populate Semester 1 baseline (all 108 posyandu x 6 months)
for (let month = 1; month <= 6; month++) {
  INITIAL_POSYANDU.forEach((p, idx) => {
    const isComplete = idx % 10 !== 0; // 90% verified
    const repId = `REP-2026-${String(month).padStart(2, '0')}-${p.id}`;
    const status: MonthlyReport['status'] = isComplete ? 'Terverifikasi' : 'Belum lengkap';
    
    INITIAL_REPORTS.push({
      id: repId,
      posyanduId: p.id,
      posyanduName: p.name,
      villageId: p.villageId,
      villageName: p.villageName,
      year: 2026,
      month,
      status,
      openDayDate: `2026-0${month}-12`,
      kadersPresent: 8,
      nakesPresent: 1,
      nakesName: 'Bdn. Rina Triana, A.Md.Keb',
      lifecycleData: createLifecycleData(p, isComplete ? 0.92 : 0.75),
      outsideOpenDayActivities: 'Kunjungan rumah balita resti',
      homeVisitsCount: 5,
      homeVisitsNotes: 'Pendampingan PMT',
      generalIssues: isComplete ? 'Kader aktif, sarana memadai' : 'Partisipasi remaja perlu ditingkatkan',
      generalFollowUp: 'Koordinasi dengan bidan desa',
      photos: ['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80'],
      updatedAt: `2026-0${month}-15 10:00:00`,
      submittedAt: `2026-0${month}-13 14:00:00`,
      verifiedAt: isComplete ? `2026-0${month}-16 09:00:00` : undefined,
      verifiedBy: isComplete ? 'Tim Promkes' : undefined
    });

    if (isComplete) {
      INITIAL_POSYANDU_LHK.push({
        id: `LHK-P-${month}-${p.id}`,
        reportId: repId,
        posyanduId: p.id,
        posyanduName: p.name,
        villageName: p.villageName,
        year: 2026,
        month,
        date: `2026-0${month}-12`,
        kadersPresent: 8,
        nakesPresent: 1,
        totalSasaran: Object.values(p.targetCount).reduce((a, b) => a + b, 0),
        totalKunjungan: Math.round(Object.values(p.targetCount).reduce((a, b) => a + b, 0) * 0.9),
        summaryResults: 'Pelayanan 5 siklus hidup ILP berjalan tertib',
        issues: 'Perlu penguatan pencatatan posyandu remaja',
        followUp: 'Pembinaan kader remaja oleh Tim Promkes',
        documentationPhotos: ['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80'],
        status: 'Terverifikasi',
        signedByKader: p.contactPerson || 'Ketua Kader',
        verifiedByNakes: 'Bdn. Rina Triana'
      });
    }
  });
}

// Populate Semester 2: Jul, Agu, Sep, Okt (partial)
[7, 8, 9].forEach((month) => {
  INITIAL_POSYANDU.forEach((p, idx) => {
    // For September (month 9): reproduce 77.47% (roughly 84 out of 108 report complete)
    let reportStatus: MonthlyReport['status'] = 'Terverifikasi';
    if (month === 9) {
      if (idx >= 84) {
        reportStatus = 'Draft';
      } else if (idx >= 75) {
        reportStatus = 'Perlu diperbaiki';
      } else if (idx >= 68) {
        reportStatus = 'Belum lengkap';
      }
    } else {
      if (idx % 12 === 0) reportStatus = 'Belum lengkap';
    }

    const repId = `REP-2026-0${month}-${p.id}`;
    INITIAL_REPORTS.push({
      id: repId,
      posyanduId: p.id,
      posyanduName: p.name,
      villageId: p.villageId,
      villageName: p.villageName,
      year: 2026,
      month,
      status: reportStatus,
      openDayDate: `2026-0${month}-10`,
      kadersPresent: 9,
      nakesPresent: 1,
      nakesName: 'Bdn. Siti Maisaroh, S.Tr.Keb',
      lifecycleData: createLifecycleData(p, reportStatus === 'Terverifikasi' ? 0.94 : 0.70),
      outsideOpenDayActivities: 'Skrining lansia risti di rumah',
      homeVisitsCount: 6,
      generalIssues: reportStatus === 'Perlu diperbaiki' ? 'Foto dokumentasi belum diunggah' : 'Kunjungan balita mencapai target',
      generalFollowUp: 'Tindak lanjut pada minggu ke-3',
      photos: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80'],
      reviewerNotes: reportStatus === 'Perlu diperbaiki' ? 'Mohon lengkapi dokumentasi foto kegiatan penimbangan balita' : undefined,
      updatedAt: `2026-0${month}-12 11:30:00`,
      submittedAt: reportStatus !== 'Draft' ? `2026-0${month}-11 15:00:00` : undefined,
      verifiedAt: reportStatus === 'Terverifikasi' ? `2026-0${month}-13 08:30:00` : undefined,
      verifiedBy: reportStatus === 'Terverifikasi' ? 'Ners Siti Aminah' : undefined
    });

    if (reportStatus === 'Terverifikasi') {
      INITIAL_POSYANDU_LHK.push({
        id: `LHK-P-${month}-${p.id}`,
        reportId: repId,
        posyanduId: p.id,
        posyanduName: p.name,
        villageName: p.villageName,
        year: 2026,
        month,
        date: `2026-0${month}-10`,
        kadersPresent: 9,
        nakesPresent: 1,
        totalSasaran: Object.values(p.targetCount).reduce((a, b) => a + b, 0),
        totalKunjungan: Math.round(Object.values(p.targetCount).reduce((a, b) => a + b, 0) * 0.92),
        summaryResults: 'Pelayanan penimbangan dan pemeriksaan kesehatan 5 siklus terlaksana baik',
        issues: 'Terdapat lansia dengan tensi tinggi tanpa kontrol rutin',
        followUp: 'Kunjungan rumah terpadu oleh Pustu',
        documentationPhotos: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80'],
        status: status === 'Terverifikasi' ? 'Terverifikasi' : 'Sudah diisi',
        signedByKader: p.contactPerson || 'Ketua Kader',
        verifiedByNakes: 'Bdn. Siti Maisaroh'
      });
    }
  });
});

// October 2026 (ongoing)
INITIAL_POSYANDU.slice(0, 30).forEach((p, idx) => {
  INITIAL_REPORTS.push({
    id: `REP-2026-10-${p.id}`,
    posyanduId: p.id,
    posyanduName: p.name,
    villageId: p.villageId,
    villageName: p.villageName,
    year: 2026,
    month: 10,
    status: idx < 15 ? 'Sudah dikirim' : 'Draft',
    openDayDate: '2026-10-05',
    kadersPresent: 8,
    nakesPresent: 1,
    lifecycleData: createLifecycleData(p, 0.88),
    outsideOpenDayActivities: 'Posyandu integrasi layanan primer',
    homeVisitsCount: 4,
    photos: [],
    updatedAt: '2026-10-06 09:00:00'
  });
});

// Accounts setup matching the exact user specification:
// superadmin = superadmin123
// adminpuskesmas123
// pimpinan123
// promkes123
// petugasprogram123
// kecamatan123
// koordinator1123, koordinator2123
// kader001123 - kader108123
// desa01123 - desa18123
// nakes1123
export const INITIAL_ACCOUNTS: UserAccount[] = [
  {
    id: 'ACC-SA',
    role: 'superadmin',
    name: 'Super Administrator',
    title: 'Administrator Utama Sistem',
    passwordHash: 'superadmin123',
    active: true,
    lastLogin: '2026-10-07 18:30:00'
  },
  {
    id: 'ACC-ADMIN',
    role: 'admin_puskesmas',
    name: 'Admin Promkes Kepanjen',
    title: 'Pengelola Data & Verifikasi',
    passwordHash: 'adminpuskesmas123',
    active: true,
    lastLogin: '2026-10-07 19:15:00'
  },
  {
    id: 'ACC-KAPUS',
    role: 'pimpinan',
    name: 'dr. H. Bambang Irawan, M.Kes',
    title: 'Kepala Puskesmas Kepanjen',
    passwordHash: 'pimpinan123',
    active: true,
    lastLogin: '2026-10-07 14:20:00'
  },
  {
    id: 'ACC-PROMKES',
    role: 'tim_promkes',
    name: 'Ners Siti Aminah, S.Kep',
    title: 'Tim Promosi Kesehatan',
    passwordHash: 'promkes123',
    active: true,
    lastLogin: '2026-10-07 19:40:00'
  },
  {
    id: 'ACC-PROGRAM',
    role: 'petugas_program',
    name: 'Ahmad Fauzi, S.KM',
    title: 'Petugas Program Gizi & PTM',
    passwordHash: 'petugasprogram123',
    active: true,
    lastLogin: '2026-10-07 16:10:00'
  },
  {
    id: 'ACC-KEC',
    role: 'kecamatan',
    name: 'Kantor Kecamatan Kepanjen',
    title: 'Seksi Kesos Kec. Kepanjen',
    passwordHash: 'kecamatan123',
    active: true,
    lastLogin: '2026-10-06 11:00:00'
  },
  {
    id: 'ACC-KOORD1',
    role: 'koordinator_posyandu',
    name: 'Ibu Rahayu Kusuma',
    title: 'Koordinator Posyandu Kec. Kepanjen Wilayah Barat',
    passwordHash: 'koordinator1123',
    assignedVillageIds: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'],
    active: true,
    lastLogin: '2026-10-07 10:45:00'
  },
  {
    id: 'ACC-KOORD2',
    role: 'koordinator_posyandu',
    name: 'Ibu Endang Sri Lestari',
    title: 'Koordinator Posyandu Kec. Kepanjen Wilayah Timur',
    passwordHash: 'koordinator2123',
    assignedVillageIds: ['D07', 'D08', 'D09', 'D10', 'D11', 'D12'],
    active: true,
    lastLogin: '2026-10-06 15:30:00'
  },
  {
    id: 'ACC-NAKES1',
    role: 'nakes_pustu',
    name: 'Bdn. Rina Triana, A.Md.Keb',
    title: 'Bidan Pustu Jatirejoyoso',
    passwordHash: 'nakes1123',
    assignedVillageIds: ['D09'],
    active: true,
    lastLogin: '2026-10-07 13:00:00'
  }
];

// Add 18 village accounts (desa01123 - desa18123)
INITIAL_VILLAGES.forEach((v) => {
  INITIAL_ACCOUNTS.push({
    id: `ACC-DESA-${v.code}`,
    role: 'desa',
    name: `Pemerintah Desa/Kelurahan ${v.name}`,
    title: `Seksi Pelayanan Desa ${v.name}`,
    passwordHash: `desa${v.code}123`,
    jurisdictionId: v.id,
    jurisdictionName: v.name,
    active: true,
    lastLogin: '2026-10-05 09:20:00'
  });
});

// Add 108 Kader Posyandu operational accounts (kader001123 - kader108123)
INITIAL_POSYANDU.forEach((p) => {
  const pCode = p.id.replace('P', '');
  INITIAL_ACCOUNTS.push({
    id: `ACC-KADER-${p.id}`,
    role: 'kader_posyandu',
    name: `Kader ${p.name}`,
    title: `Operator ${p.name} (${p.villageName})`,
    passwordHash: `kader${pCode}123`,
    jurisdictionId: p.id,
    jurisdictionName: `${p.name} - ${p.villageName}`,
    active: true,
    lastLogin: '2026-10-07 08:30:00'
  });
});

// SIMPPAN Tasks (Ruang Kerja Saya - as on screenshot)
export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'TSK-01',
    title: 'Pengolahan Data Posyandu Siklus Hidup',
    program: 'Promosi Kesehatan',
    assignee: 'Ners Siti Aminah',
    priority: 'Tinggi',
    deadline: '10 Okt 2026',
    status: 'Dalam Proses',
    commentsCount: 3,
    description: 'Kompilasi form ILP dari 18 desa/kelurahan untuk pemantauan PWS triwulan 3.'
  },
  {
    id: 'TSK-02',
    title: 'Penyusunan Laporan Semester Promkes',
    program: 'Promosi Kesehatan',
    assignee: 'Ners Siti Aminah',
    priority: 'Tinggi',
    deadline: '15 Okt 2026',
    status: 'Menunggu',
    commentsCount: 1,
    description: 'Drafting bab evaluasi capaian kuantitatif Dinkes Kab. Malang.'
  },
  {
    id: 'TSK-03',
    title: 'Monitoring Pelaporan 108 Posyandu (September)',
    program: 'Posyandu Bidang Kesehatan',
    assignee: 'Ners Siti Aminah',
    priority: 'Sedang',
    deadline: '20 Okt 2026',
    status: 'Berjalan',
    commentsCount: 4,
    description: 'Cross-check kelengkapan instrumen kader dan konfirmasi data desa belum lengkap.'
  },
  {
    id: 'TSK-04',
    title: 'Validasi LHK Penyuluhan Desa Sengguruh',
    program: 'Pemberdayaan Masyarakat',
    assignee: 'Ahmad Fauzi, S.KM',
    priority: 'Normal',
    deadline: '22 Okt 2026',
    status: 'Selesai',
    commentsCount: 2,
    description: 'Arsip dokumentasi & daftar hadir peserta penyuluhan PHBS rumah tangga.'
  },
  {
    id: 'TSK-05',
    title: 'Bimbingan Teknis Kader 25 Keterampilan Dasar',
    program: 'Promosi Kesehatan',
    assignee: 'Ners Siti Aminah',
    priority: 'Tinggi',
    deadline: '25 Okt 2026',
    status: 'Berjalan',
    commentsCount: 5,
    description: 'Persiapan materi modul dan uji kompetensi kader purwa, madya, utama.'
  },
  {
    id: 'TSK-06',
    title: 'Survey Mawas Diri (SMD) Desa Jatirejoyoso',
    program: 'Pemberdayaan Masyarakat',
    assignee: 'Ahmad Fauzi, S.KM',
    priority: 'Sedang',
    deadline: '28 Okt 2026',
    status: 'Dalam Proses',
    commentsCount: 2,
    description: 'Tabulasi kuesioner PHBS dan analisis kebutuhan kesehatan masyarakat desa.'
  },
  {
    id: 'TSK-07',
    title: 'Evaluasi Kawasan Tanpa Rokok (KTR) Sekolah',
    program: 'Promosi Kesehatan',
    assignee: 'Ners Siti Aminah',
    priority: 'Normal',
    deadline: '30 Okt 2026',
    status: 'Menunggu',
    commentsCount: 0,
    description: 'Inspeksi berkala 12 SMP/SMA di wilayah kerja Puskesmas Kepanjen.'
  },
  {
    id: 'TSK-08',
    title: 'Pembaruan Tautan 18 Rumah Data Linktree',
    program: 'Sistem Informasi',
    assignee: 'Admin Promkes',
    priority: 'Rendah',
    deadline: '05 Nov 2026',
    status: 'Selesai',
    commentsCount: 1,
    description: 'Sinkronisasi folder Drive arsip SK Kader dan data sasaran tiap desa.'
  }
];

// SIMPPAN Digital Activities (Agenda & Ruang Digital Kegiatan)
export const INITIAL_ACTIVITIES: DigitalActivity[] = [
  {
    id: 'ACT-01',
    title: 'Bimtek Kader Posyandu ILP Desa Talangagung',
    program: 'Promosi Kesehatan',
    date: '2026-10-08',
    time: '09:00 WIB',
    location: 'Balai Desa Talangagung',
    pic: 'Ners Siti Aminah',
    status: 'Siap',
    targetAudience: 'Kader Posyandu Desa Talangagung',
    participantCount: 35,
    results: 'Kader memahami 5 klaster ILP dan pengisian lembar kerja pelayanan.',
    followUp: 'Pendampingan langsung saat hari buka posyandu siklus hidup.',
    sapId: 'SAP-01',
    notulenId: 'NOT-01',
    lhkId: 'LHK-ACT-01',
    attendanceListUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    documentationUrls: ['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80'],
    spjCompleted: true,
    spjFilesCount: 4
  },
  {
    id: 'ACT-02',
    title: 'Supervisi Posyandu Balita & Lansia Ardirejo',
    program: 'Promosi Kesehatan',
    date: '2026-10-10',
    time: '08:30 WIB',
    location: 'Posyandu Mawar 1 Ardirejo',
    pic: 'Ahmad Fauzi, S.KM',
    status: 'Persiapan',
    targetAudience: 'Sasaran Balita dan Lansia RW 01',
    participantCount: 65,
    sapId: 'SAP-02',
    documentationUrls: [],
    spjCompleted: false,
    spjFilesCount: 1
  },
  {
    id: 'ACT-03',
    title: 'Penyuluhan PHBS Rumah Tangga & Cegah Stunting',
    program: 'Pemberdayaan Masyarakat',
    date: '2026-10-14',
    time: '09:30 WIB',
    location: 'Pendopo Desa Sengguruh',
    pic: 'Ners Siti Aminah',
    status: 'Direncanakan',
    targetAudience: 'Ibu Hamil & Ibu Balita',
    participantCount: 45,
    documentationUrls: [],
    spjCompleted: false,
    spjFilesCount: 0
  },
  {
    id: 'ACT-04',
    title: 'Pertemuan Lintas Sektor Tribulanan Kepanjen',
    program: 'Manajemen Puskesmas',
    date: '2026-09-28',
    time: '08:00 WIB',
    location: 'Aula Kantor Kecamatan Kepanjen',
    pic: 'dr. H. Bambang Irawan',
    status: 'Terverifikasi',
    targetAudience: 'Kepala Desa, Lurah, Tim Penggerak PKK',
    participantCount: 50,
    results: 'Kesepakatan alokasi dana desa untuk PMT berbahan pangan lokal.',
    followUp: 'Penerbitan surat edaran Camat tentang dukungan Posyandu ILP.',
    notulenId: 'NOT-02',
    lhkId: 'LHK-ACT-02',
    documentationUrls: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80'],
    spjCompleted: true,
    spjFilesCount: 6
  },
  {
    id: 'ACT-05',
    title: 'Bimbingan Teknis 25 Kompetensi Dasar Kader',
    program: 'Promosi Kesehatan',
    date: '2026-09-18',
    time: '08:30 WIB',
    location: 'Aula Puskesmas Kepanjen',
    pic: 'Ners Siti Aminah',
    status: 'Terverifikasi',
    targetAudience: 'Perwakilan Kader 18 Desa/Kelurahan',
    participantCount: 54,
    results: 'Seluruh peserta lulus uji praktik antropometri standar.',
    spjCompleted: true,
    spjFilesCount: 5
  },
  {
    id: 'ACT-06',
    title: 'Sosialisasi Kawasan Tanpa Rokok (KTR) Sekolah',
    program: 'Promosi Kesehatan',
    date: '2026-09-08',
    time: '10:00 WIB',
    location: 'SMPN 1 Kepanjen',
    pic: 'Ahmad Fauzi, S.KM',
    status: 'Terverifikasi',
    targetAudience: 'Siswa & Guru Pembina UKS',
    participantCount: 120,
    spjCompleted: true,
    spjFilesCount: 4
  },
  {
    id: 'ACT-07',
    title: 'Musyawarah Masyarakat Desa (MMD) Jatirejoyoso',
    program: 'Pemberdayaan Masyarakat',
    date: '2026-08-25',
    time: '19:30 WIB',
    location: 'Balai Desa Jatirejoyoso',
    pic: 'Ners Siti Aminah',
    status: 'Diarsipkan',
    targetAudience: 'Tokoh Masyarakat, RT/RW, BPD',
    participantCount: 40,
    spjCompleted: true,
    spjFilesCount: 4
  },
  {
    id: 'ACT-08',
    title: 'Orientasi Komunikasi Antar Pribadi (KAP) Kader',
    program: 'Promosi Kesehatan',
    date: '2026-08-12',
    time: '08:30 WIB',
    location: 'Aula Puskesmas Kepanjen',
    pic: 'Ners Siti Aminah',
    status: 'Diarsipkan',
    targetAudience: 'Kader Pendamping Bumil KEK',
    participantCount: 36,
    spjCompleted: true,
    spjFilesCount: 5
  }
];

// Documents SAP, Notulen, LHK Kegiatan
export const INITIAL_SAP: SapDocument[] = [
  {
    id: 'SAP-01',
    activityId: 'ACT-01',
    title: 'Satuan Acara Penyuluhan: Integrasi Layanan Primer di Posyandu',
    topic: 'Transformasi Pelayanan Kesehatan Primer Berdasarkan Siklus Hidup',
    date: '2026-10-08',
    time: '09:00 - 11:30 WIB',
    location: 'Balai Desa Talangagung',
    targetAudience: 'Kader Posyandu Desa Talangagung',
    participantCount: 35,
    generalObjective: 'Meningkatkan pemahaman kader dalam alur pelayanan Posyandu ILP.',
    specificObjective: 'Kader mampu membagi tugas 5 langkah dan melakukan pencatatan siklus hidup.',
    materialSummary: 'Kebijakan Kemenkes RI tentang Posyandu ILP, 5 siklus hidup, form pelaporan terpadu.',
    method: 'Ceramah tanya jawab, simulasi langkah pelayanan, praktik pencatatan.',
    media: 'Slide presentasi, lembar balik, buku register kader, leaflet.',
    durationMinutes: 150,
    evaluationMethod: 'Pre-test, post-test, dan simulasi kasus.',
    speaker: 'Ners Siti Aminah, S.Kep',
    facilitator: 'Bdn. Endah S., A.Md.Keb',
    pic: 'Ners Siti Aminah',
    status: 'Terverifikasi'
  },
  {
    id: 'SAP-02',
    activityId: 'ACT-02',
    title: 'Satuan Acara Penyuluhan: Pemantauan Tumbuh Kembang dan Gizi Seimbang',
    topic: 'Pencegahan Stunting Melalui Pola Asuh dan PMBA Tepat',
    date: '2026-10-10',
    time: '08:30 - 10:30 WIB',
    location: 'Posyandu Mawar 1 Ardirejo',
    targetAudience: 'Orang tua balita dan ibu hamil',
    participantCount: 65,
    generalObjective: 'Meningkatkan kesadaran masyarakat tentang pentingnya 1000 HPK.',
    specificObjective: 'Orang tua memahami jadwal imunisasi rutin dan stimulasi tumbuh kembang anak.',
    materialSummary: 'Menu MP-ASI kaya protein hewani, KMS dan Buku KIA, tanda bahaya balita sakit.',
    method: 'Konseling kelompok, demonstrasi memasak PMT lokal.',
    media: 'Buku KIA, food model, timbangan dacin dan digital.',
    durationMinutes: 120,
    evaluationMethod: 'Tanya jawab interaktif dan evaluasi berat badan balita.',
    speaker: 'Ahmad Fauzi, S.KM',
    facilitator: 'Kader Posyandu Ardirejo',
    pic: 'Ahmad Fauzi, S.KM',
    status: 'Draft'
  }
];

export const INITIAL_NOTULEN: NotulenDocument[] = [
  {
    id: 'NOT-01',
    activityId: 'ACT-01',
    title: 'Notulen Bimbingan Teknis Kader Posyandu ILP Talangagung',
    date: '2026-10-08',
    time: '09:00 - 11:30 WIB',
    location: 'Balai Desa Talangagung',
    leader: 'Kepala Desa Talangagung',
    speaker: 'Ners Siti Aminah, S.Kep',
    participants: '35 Kader Posyandu, Bidan Desa, Babinsa',
    agenda: 'Sosialisasi Alur ILP, Pembagian Tugas 5 Langkah, Simulasi Pencatatan Register',
    proceedings: 'Pembukaan oleh Kades, pemaparan materi konsep 5 siklus hidup, diskusi kendala sarana dacin dan microtoise, serta uji coba form digital SAHABAT POSYANDU.',
    decisions: 'Disepakati pelaksanaan Posyandu serentak ILP dimulai bulan November 2026.',
    followUp: 'Pustu Talangagung mendistribusikan form register siklus hidup ke 6 posyandu.',
    pic: 'Ners Siti Aminah',
    documentationUrls: ['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80'],
    signatureName: 'Ners Siti Aminah, S.Kep',
    status: 'Terverifikasi'
  },
  {
    id: 'NOT-02',
    activityId: 'ACT-04',
    title: 'Notulen Pertemuan Lintas Sektor Tribulanan III Kec. Kepanjen',
    date: '2026-09-28',
    time: '08:00 - 12:00 WIB',
    location: 'Aula Kantor Kecamatan Kepanjen',
    leader: 'Camat Kepanjen',
    speaker: 'dr. H. Bambang Irawan, M.Kes',
    participants: '18 Kepala Desa/Lurah, TP PKK, Danramil, Kapolsek',
    agenda: 'Evaluasi Capaian Kesehatan, Akselerasi Penurunan Stunting, Integrasi Pelayanan Kesehatan Desa',
    proceedings: 'Kepala Puskesmas menyampaikan capaian PKP triwulan 3 sebesar 92.4%. Camat meminta komitmen desa mendukung kelengkapan pelaporan kader.',
    decisions: 'Penganggaran insentif kader dan PMT lokal dalam APBDes 2027.',
    followUp: 'Tim Promkes melakukan bimtek rutin di 18 desa.',
    pic: 'dr. H. Bambang Irawan',
    documentationUrls: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80'],
    signatureName: 'dr. H. Bambang Irawan, M.Kes',
    status: 'Terverifikasi'
  }
];

export const INITIAL_LHK_ACTIVITY: LhkActivityDocument[] = [
  {
    id: 'LHK-ACT-01',
    activityId: 'ACT-01',
    title: 'Laporan Hasil Kegiatan: Bimtek Kader Posyandu ILP Desa Talangagung',
    date: '2026-10-08',
    time: '09:00 - 11:30 WIB',
    location: 'Balai Desa Talangagung',
    objective: 'Meningkatkan kapasitas 35 kader dalam mengimplementasikan transformasi posyandu siklus hidup.',
    description: 'Kegiatan berjalan lancar dengan dihadiri Kepala Desa, narasumber Promkes, dan seluruh perwakilan posyandu.',
    results: 'Tingkat pemahaman kader meningkat dari rata-rata pre-test 62% menjadi post-test 89%.',
    participantCount: 35,
    obstacles: 'Beberapa kader senior memerlukan pendampingan khusus pada pengisian digital.',
    followUp: 'Bidan desa menjadwalkan klinik konsultasi kader setiap hari Selasa.',
    documentationUrls: ['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80'],
    signatureName: 'Ners Siti Aminah, S.Kep',
    status: 'Terverifikasi'
  },
  {
    id: 'LHK-ACT-02',
    activityId: 'ACT-04',
    title: 'Laporan Hasil Kegiatan: Pertemuan Lintas Sektor Tribulanan III Kec. Kepanjen',
    date: '2026-09-28',
    time: '08:00 - 12:00 WIB',
    location: 'Aula Kantor Kecamatan Kepanjen',
    objective: 'Memperkuat sinergi lintas program dan lintas sektor dalam pembangunan kesehatan.',
    description: 'Dihadiri jajaran Forkopimcam dan 18 pimpinan desa/kelurahan se-Kecamatan Kepanjen.',
    results: 'Dihasilkannya komitmen bersama pencegahan stunting dan sanitasi total berbasis masyarakat.',
    participantCount: 50,
    obstacles: 'Perbedaan alokasi anggaran kesehatan antar desa.',
    followUp: 'Penerbitan surat edaran pedoman penggunaan dana desa untuk kesehatan.',
    documentationUrls: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80'],
    signatureName: 'dr. H. Bambang Irawan, M.Kes',
    status: 'Terverifikasi'
  }
];

// SIMPPAN Indicators (Data & Capaian PKP Promkes)
export const INITIAL_INDICATORS: ProgramIndicator[] = [
  {
    id: 'IND-01',
    programName: 'Promosi Kesehatan',
    indicatorName: 'Cakupan Posyandu Aktif (ILP)',
    targetPercent: 85.0,
    realizationPercent: 92.4,
    deviationPercent: 7.4,
    period: 'Tahun 2026',
    unit: '%'
  },
  {
    id: 'IND-02',
    programName: 'Promosi Kesehatan',
    indicatorName: 'Penyuluhan PHBS Rumah Tangga',
    targetPercent: 80.0,
    realizationPercent: 88.5,
    deviationPercent: 8.5,
    period: 'Tahun 2026',
    unit: '%'
  },
  {
    id: 'IND-03',
    programName: 'Promosi Kesehatan',
    indicatorName: 'Penerapan Kawasan Tanpa Rokok (KTR)',
    targetPercent: 75.0,
    realizationPercent: 82.0,
    deviationPercent: 7.0,
    period: 'Tahun 2026',
    unit: '%'
  },
  {
    id: 'IND-04',
    programName: 'Promosi Kesehatan',
    indicatorName: 'Desa Siaga Aktif Mandiri',
    targetPercent: 70.0,
    realizationPercent: 77.8,
    deviationPercent: 7.8,
    period: 'Tahun 2026',
    unit: '%'
  },
  {
    id: 'IND-05',
    programName: 'Pemberdayaan Masyarakat',
    indicatorName: 'Kelengkapan Pelaporan Bulanan Posyandu',
    targetPercent: 85.0,
    realizationPercent: 77.5,
    deviationPercent: -7.5,
    period: 'Tahun 2026',
    unit: '%'
  },
  {
    id: 'IND-06',
    programName: 'Gizi & KIA',
    indicatorName: 'Pemantauan Pertumbuhan Balita (D/S)',
    targetPercent: 85.0,
    realizationPercent: 89.2,
    deviationPercent: 4.2,
    period: 'Tahun 2026',
    unit: '%'
  }
];

// Unified Follow-up list (Tindak Lanjut)
export const INITIAL_FOLLOW_UPS: FollowUpItem[] = [
  {
    id: 'FLW-01',
    source: 'Monitoring',
    title: 'Klarifikasi data belum lengkap Posyandu Flamboyan 3 Sengguruh',
    villageOrPosyandu: 'Posyandu Flamboyan 3 (Sengguruh)',
    pic: 'Ners Siti Aminah',
    deadline: '12 Okt 2026',
    status: 'Belum Selesai',
    priority: 'Tinggi'
  },
  {
    id: 'FLW-02',
    source: 'Evaluasi',
    title: 'Pendampingan PMT Balita Gizi Kurang RW 02 Cepokomulyo',
    villageOrPosyandu: 'Desa Cepokomulyo',
    pic: 'Ahmad Fauzi, S.KM',
    deadline: '14 Okt 2026',
    status: 'Dalam Proses',
    priority: 'Tinggi'
  },
  {
    id: 'FLW-03',
    source: 'Pembinaan',
    title: 'Pelatihan kalibrasi alat ukur antropometri Posyandu Dahlia 2',
    villageOrPosyandu: 'Posyandu Dahlia 2 (Penarukan)',
    pic: 'Bdn. Rina Triana',
    deadline: '16 Okt 2026',
    status: 'Dalam Proses',
    priority: 'Normal'
  },
  {
    id: 'FLW-04',
    source: 'Kegiatan',
    title: 'Distribusi modul materi 25 keterampilan dasar kader ke 18 desa',
    villageOrPosyandu: 'Kecamatan Kepanjen',
    pic: 'Admin Promkes',
    deadline: '18 Okt 2026',
    status: 'Belum Selesai',
    priority: 'Normal'
  },
  {
    id: 'FLW-05',
    source: 'Monitoring',
    title: 'Koordinasi perbaikan draft laporan Posyandu Kenanga 4 Dilem',
    villageOrPosyandu: 'Posyandu Kenanga 4 (Dilem)',
    pic: 'Ners Siti Aminah',
    deadline: '11 Okt 2026',
    status: 'Belum Selesai',
    priority: 'Tinggi'
  },
  {
    id: 'FLW-06',
    source: 'Evaluasi',
    title: 'Verifikasi kepatuhan KTR di 4 sekolah binaan Jatirejoyoso',
    villageOrPosyandu: 'Desa Jatirejoyoso',
    pic: 'Ahmad Fauzi, S.KM',
    deadline: '24 Okt 2026',
    status: 'Dalam Proses',
    priority: 'Normal'
  },
  {
    id: 'FLW-07',
    source: 'Pembinaan',
    title: 'Peningkatan strata Posyandu Pratama di Desa Kemiri',
    villageOrPosyandu: 'Desa Kemiri',
    pic: 'Ners Siti Aminah',
    deadline: '30 Okt 2026',
    status: 'Dalam Proses',
    priority: 'Normal'
  },
  {
    id: 'FLW-08',
    source: 'Kegiatan',
    title: 'Kompilasi dokumentasi foto kegiatan penyuluhan tribulan 3',
    villageOrPosyandu: 'Puskesmas Kepanjen',
    pic: 'Admin Promkes',
    deadline: '15 Okt 2026',
    status: 'Selesai',
    priority: 'Normal'
  },
  {
    id: 'FLW-09',
    source: 'Evaluasi',
    title: 'Pembaruan data sasaran PWS bumil resti Semester 2',
    villageOrPosyandu: 'Kecamatan Kepanjen',
    pic: 'Ners Siti Aminah',
    deadline: '08 Okt 2026',
    status: 'Selesai',
    priority: 'Tinggi'
  },
  {
    id: 'FLW-10',
    source: 'Monitoring',
    title: 'Penyusunan ringkasan capaian PKP untuk laporan Dinkes',
    villageOrPosyandu: 'Puskesmas Kepanjen',
    pic: 'Ners Siti Aminah',
    deadline: '05 Okt 2026',
    status: 'Selesai',
    priority: 'Normal'
  }
];

// Coaching records (Pembinaan dan Strata)
export const INITIAL_COACHING: CoachingRecord[] = [
  {
    id: 'COACH-01',
    posyanduId: 'P017',
    posyanduName: 'Posyandu Dahlia 5',
    villageName: 'Penarukan',
    date: '2026-09-22',
    coachName: 'Ners Siti Aminah',
    findings: 'Alat ukur tinggi badan belum terpasang tegak lurus, pencatatan KMS masih manual rawan sobek.',
    recommendations: 'Gunakan microtoise standar kalibrasi dan segera input data ke form SAHABAT POSYANDU.',
    followUp: 'Kader telah mengunduh format pelaporan dan mengikuti bimtek susulan.',
    status: 'Selesai'
  },
  {
    id: 'COACH-02',
    posyanduId: 'P049',
    posyanduName: 'Posyandu Melati 1',
    villageName: 'Jatirejoyoso',
    date: '2026-09-15',
    coachName: 'Bdn. Rina Triana',
    findings: 'Kehadiran sasaran lansia sangat tinggi namun waktu tunggu cukup lama.',
    recommendations: 'Terapkan pembagian kelompok jam kedatangan berdasarkan RT.',
    followUp: 'Dibuatkan jadwal kedatangan bergelombang per RT.',
    status: 'Selesai'
  },
  {
    id: 'COACH-03',
    posyanduId: 'P083',
    posyanduName: 'Posyandu Nusa Indah 5',
    villageName: 'Mangunrejo',
    date: '2026-09-29',
    coachName: 'Ahmad Fauzi, S.KM',
    findings: 'Pencatatan skrining usia produktif belum optimal, kader masih fokus pada balita.',
    recommendations: 'Bagi meja pelayanan menjadi 5 langkah siklus hidup sesuai panduan ILP.',
    followUp: 'Pendampingan meja skrining PTM pada jadwal hari buka berikutnya.',
    status: 'Dalam Proses'
  }
];

// Public Articles
export const INITIAL_ARTICLES: PublicArticle[] = [
  {
    id: 'ART-01',
    title: 'Transformasi Posyandu Siklus Hidup: Melayani Seluruh Anggota Keluarga',
    category: 'Integrasi Layanan Primer',
    author: 'Tim Promkes Puskesmas Kepanjen',
    date: '04 Okt 2026',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    content: 'Puskesmas Kepanjen memperkuat integrasi layanan kesehatan primer di seluruh 108 Posyandu. Pelayanan kini menjangkau seluruh siklus hidup: ibu hamil, bayi balita, anak sekolah, usia dewasa, hingga lanjut usia dalam satu atap pelayanan.'
  },
  {
    id: 'ART-02',
    title: 'Pentingnya Konsumsi Tablet Tambah Darah Teratur Bagi Remaja Putri',
    category: 'Gizi & Pencegahan Anemia',
    author: 'Ners Siti Aminah, S.Kep',
    date: '29 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    content: 'Anemia pada remaja putri berdampak langsung pada prestasi belajar dan kesiapan menjadi calon ibu sehat di masa depan. Tim Promkes bersama kader Posyandu rutin mendistribusikan TTD setiap minggu di sekolah dan posyandu remaja.'
  },
  {
    id: 'ART-03',
    title: 'Gaya Hidup CERDIK Cegah Penyakit Tidak Menular Sejak Dini',
    category: 'Penyakit Tidak Menular',
    author: 'Ahmad Fauzi, S.KM',
    date: '20 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    content: 'Cek kesehatan berkala, Enyahkan asap rokok, Rajin aktivitas fisik, Diet sehat seimbang, Istirahat cukup, dan Kelola stres merupakan kunci menjaga kebugaran di usia produktif.'
  },
  {
    id: 'ART-04',
    title: 'Inovasi Menu PMT Lokal Berbasis Bahan Pangan Bergizi Tinggi',
    category: 'Gizi Balita',
    author: 'Tim Gizi & Promkes',
    date: '12 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
    content: 'Pemanfaatan telur, ikan air tawar lokal Malang, dan sayuran segar pekarangan terbukti efektif dan disukai balita untuk mencegah terjadinya gagal tumbuh (stunting).'
  },
  {
    id: 'ART-05',
    title: 'Apresiasi 1.083 Kader Kesehatan Penggerak Posyandu Kepanjen',
    category: 'Pemberdayaan Masyarakat',
    author: 'Kepala Puskesmas Kepanjen',
    date: '01 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
    content: 'Dedikasi luar biasa para kader di 18 desa/kelurahan menjadi garda terdepan deteksi dini kesehatan warga dan mewujudkan masyarakat Kepanjen yang mandiri hidup sehat.'
  }
];

// Learning materials for Kaders (Belajar Kader)
export const INITIAL_LEARNING: LearningMaterial[] = [
  {
    id: 'LRN-01',
    title: 'Panduan Praktis 5 Langkah Pelayanan Posyandu Siklus Hidup',
    category: 'Keterampilan Kader',
    type: 'Panduan',
    durationOrPages: '28 Halaman',
    updatedAt: '02 Okt 2026'
  },
  {
    id: 'LRN-02',
    title: 'Modul Penimbangan Balita & Pengukuran Panjang Badan Standar WHO',
    category: 'Ibu & Anak',
    type: 'Modul',
    durationOrPages: '36 Halaman',
    updatedAt: '25 Sep 2026'
  },
  {
    id: 'LRN-03',
    title: 'Video Simulasi Deteksi Dini Tekanan Darah & Gula Darah Lansia',
    category: 'Dewasa & Lansia',
    type: 'Video',
    durationOrPages: '12 Menit',
    updatedAt: '18 Sep 2026'
  },
  {
    id: 'LRN-04',
    title: 'Buku Saku Komunikasi Antar Pribadi (KAP) untuk Kader Posyandu',
    category: 'Keterampilan Kader',
    type: 'Modul',
    durationOrPages: '42 Halaman',
    updatedAt: '10 Sep 2026'
  },
  {
    id: 'LRN-05',
    title: 'Presentasi Edukasi Bahaya Rokok & Pencegahan Anemia Remaja',
    category: 'Remaja',
    type: 'Presentasi',
    durationOrPages: '24 Slide',
    updatedAt: '05 Sep 2026'
  },
  {
    id: 'LRN-06',
    title: 'Panduan Pengolahan PMT Lokal Tinggi Protein Hewani',
    category: 'Gizi & PHBS',
    type: 'Panduan',
    durationOrPages: '20 Halaman',
    updatedAt: '28 Agu 2026'
  }
];

// Schedules
export const INITIAL_SCHEDULES: ScheduleEvent[] = [
  {
    id: 'SCH-01',
    title: 'Bimtek Kader Posyandu ILP Desa Talangagung',
    date: '2026-10-08',
    time: '09:00 WIB',
    location: 'Balai Desa Talangagung',
    pic: 'Ners Siti Aminah',
    category: 'Bimtek',
    status: 'Terjadwal'
  },
  {
    id: 'SCH-02',
    title: 'Supervisi Posyandu Balita & Lansia Ardirejo',
    date: '2026-10-10',
    time: '08:30 WIB',
    location: 'Posyandu Mawar 1 Ardirejo',
    pic: 'Ahmad Fauzi, S.KM',
    category: 'Supervisi',
    status: 'Persiapan'
  },
  {
    id: 'SCH-03',
    title: 'Hari Buka Posyandu Melati 1 Jatirejoyoso',
    date: '2026-10-12',
    time: '08:00 WIB',
    location: 'Balai RW 01 Jatirejoyoso',
    pic: 'Bdn. Rina Triana',
    category: 'Posyandu',
    status: 'Terjadwal'
  },
  {
    id: 'SCH-04',
    title: 'Penyuluhan PHBS Rumah Tangga di Sengguruh',
    date: '2026-10-14',
    time: '09:30 WIB',
    location: 'Pendopo Desa Sengguruh',
    pic: 'Ners Siti Aminah',
    category: 'Penyuluhan',
    status: 'Terjadwal'
  },
  {
    id: 'SCH-05',
    title: 'Koordinasi Lintas Program Evaluasi PKP Triwulan 3',
    date: '2026-10-16',
    time: '13:00 WIB',
    location: 'Ruang Rapat Puskesmas Kepanjen',
    pic: 'dr. H. Bambang Irawan',
    category: 'Lintas Sektor',
    status: 'Terjadwal'
  }
];

// Public Feedback
export const INITIAL_FEEDBACK: PublicFeedback[] = [
  {
    id: 'FDB-01',
    date: '2026-10-05',
    name: 'Warga Ardirejo',
    contact: '08123456xxxx',
    category: 'Layanan Posyandu',
    message: 'Pelayanan posyandu lansia sangat ramah dan tertib, kader menjelaskan hasil tensi dengan sabar.',
    status: 'Selesai',
    responseNote: 'Terima kasih atas apresiasi warga.'
  },
  {
    id: 'FDB-02',
    date: '2026-10-02',
    name: 'Ibu Balita Curungrejo',
    contact: '08578901xxxx',
    category: 'Layanan Posyandu',
    message: 'Mohon info ketersediaan vitamin A dan penambahan meja pendaftaran agar tidak antre lama.',
    status: 'Diproses',
    responseNote: 'Sudah dikoordinasikan dengan bidan desa untuk penambahan 1 meja antrean.'
  }
];

// Notifications
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Laporan Posyandu Dahlia Ardirejo diperbarui oleh Kader',
    date: '5 menit yang lalu',
    type: 'laporan',
    read: false
  },
  {
    id: 'NOTIF-02',
    title: 'Dokumen LHK Penyuluhan PHBS diunggah oleh Ners Siti Aminah',
    date: '1 jam yang lalu',
    type: 'verifikasi',
    read: false
  },
  {
    id: 'NOTIF-03',
    title: 'Data capaian Kawasan Tanpa Rokok (KTR) divalidasi',
    date: 'Hari ini, 09:15 WIB',
    type: 'tindak_lanjut',
    read: true
  },
  {
    id: 'NOTIF-04',
    title: 'Agenda baru: Supervisi Posyandu Mangunrejo ditambahkan',
    date: 'Hari ini, 08:45 WIB',
    type: 'agenda',
    read: true
  }
];

// Audit Logs
export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-01',
    accountName: 'Ners Siti Aminah, S.Kep',
    role: 'Tim Promkes',
    action: 'Verifikasi Laporan',
    targetData: 'Laporan Bulanan Posyandu Mawar 1 Ardirejo (Sep 2026)',
    timestamp: '2026-10-07 18:30:12',
    changes: 'Status diubah menjadi Terverifikasi'
  },
  {
    id: 'LOG-02',
    accountName: 'Kader Posyandu Dahlia 2',
    role: 'Kader Posyandu',
    action: 'Simpan Laporan',
    targetData: 'Laporan Bulanan Posyandu Dahlia 2 Penarukan (Sep 2026)',
    timestamp: '2026-10-07 17:15:40',
    changes: 'Input sasaran dan kunjungan balita'
  },
  {
    id: 'LOG-03',
    accountName: 'Ahmad Fauzi, S.KM',
    role: 'Petugas Program',
    action: 'Unggah Notulen',
    targetData: 'Notulen Bimtek Transformasi Posyandu',
    timestamp: '2026-10-07 14:02:19',
    changes: 'Unggah file dokumentasi dan notulensi'
  },
  {
    id: 'LOG-04',
    accountName: 'Super Administrator',
    role: 'Superadmin',
    action: 'Pembaruan Sinkronisasi',
    targetData: 'Google Apps Script Configuration',
    timestamp: '2026-10-06 09:44:00',
    changes: 'Uji koneksi berhasil'
  }
];

export const INITIAL_SYSTEM_USAGE: SystemUsageStats = {
  storedDocumentsCount: 246,
  activeAccountsCount: 138,
  monthlyReads: 14850,
  monthlyWrites: 3210,
  monthlyDeletes: 140,
  storageMb: 18.4,
  databaseBandwidthMb: 42.6,
  maxMonthlyReadsQuota: 50000,
  maxMonthlyWritesQuota: 20000,
  maxStorageMbQuota: 1024,
  uptimePercent: 99.98
};

export const INITIAL_SYNC_CONFIG: SyncConfiguration = {
  webAppUrl: '',
  token: '',
  driveFolderId: '1SPqoKmWBYQi1tJ_NUNR8iV0wqxAl2g9b',
  spreadsheetId: '',
  connected: false,
  lastSyncTimestamp: '2026-10-07 08:30 WIB',
  syncCollections: ['posyandu', 'laporan', 'pelayanan', 'kegiatan', 'dokumen', 'pws', 'tindak_lanjut']
};
