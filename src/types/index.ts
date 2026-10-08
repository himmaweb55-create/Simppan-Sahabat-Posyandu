export type UserRole =
  | 'publik'
  | 'superadmin'
  | 'admin_puskesmas'
  | 'pimpinan'
  | 'tim_promkes'
  | 'petugas_program'
  | 'koordinator_posyandu'
  | 'kader_posyandu'
  | 'desa'
  | 'nakes_pustu'
  | 'kecamatan';

export interface UserAccount {
  id: string;
  role: UserRole;
  name: string;
  title?: string;
  passwordHash: string;
  isInitialPassword?: boolean;
  jurisdictionId?: string; // village ID or posyandu ID
  jurisdictionName?: string;
  assignedVillageIds?: string[];
  assignedPosyanduIds?: string[];
  active: boolean;
  lastLogin?: string;
}

export interface Village {
  id: string; // e.g. "D01"
  code: string;
  name: string;
  linktreeUrl: string;
  headOfficeAddress?: string;
  posyanduCount: number;
  kaderCount: number;
}

export interface Posyandu {
  id: string; // "P001" - "P108"
  villageId: string;
  villageName: string;
  name: string;
  strata: 'Pratama' | 'Madya' | 'Purnama' | 'Mandiri';
  address: string;
  scheduleDay: string;
  activeKaders: number;
  contactPerson?: string;
  phone?: string;
  targetCount: {
    ibuHamil: number;
    balita: number;
    remaja: number;
    dewasa: number;
    lansia: number;
  };
}

export type ReportStatus =
  | 'Draft'
  | 'Sudah dikirim'
  | 'Belum lengkap'
  | 'Perlu diperbaiki'
  | 'Terverifikasi';

export type LifecycleGroup =
  | 'ibu_hamil'
  | 'balita'
  | 'remaja'
  | 'dewasa'
  | 'lansia';

export interface LifecycleData {
  group: LifecycleGroup;
  groupName: string;
  targetCount: number;
  visitCount: number;
  achievementRate: number; // percentage
  serviceTypes: string[];
  serviceDate: string;
  notes?: string;
  issues?: string;
  followUp?: string;
  photoUrl?: string;
}

export interface MonthlyReport {
  id: string;
  posyanduId: string;
  posyanduName: string;
  villageId: string;
  villageName: string;
  year: number;
  month: number; // 1-12
  status: ReportStatus;
  openDayDate: string;
  kadersPresent: number;
  nakesPresent: number;
  nakesName?: string;
  lifecycleData: LifecycleData[];
  outsideOpenDayActivities?: string;
  homeVisitsCount: number;
  homeVisitsNotes?: string;
  generalIssues?: string;
  generalFollowUp?: string;
  photos: string[];
  reviewerNotes?: string;
  updatedAt: string;
  submittedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface PosyanduLHK {
  id: string;
  reportId: string;
  posyanduId: string;
  posyanduName: string;
  villageName: string;
  year: number;
  month: number;
  date: string;
  kadersPresent: number;
  nakesPresent: number;
  totalSasaran: number;
  totalKunjungan: number;
  summaryResults: string;
  issues: string;
  followUp: string;
  documentationPhotos: string[];
  status: 'Belum dibuat' | 'Draft' | 'Sudah diisi' | 'Lengkap' | 'Terverifikasi' | 'Sudah dicetak';
  signedByKader: string;
  verifiedByNakes?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  program: string;
  assignee: string;
  priority: 'Rendah' | 'Normal' | 'Sedang' | 'Tinggi';
  deadline: string;
  status: 'Menunggu' | 'Dalam Proses' | 'Berjalan' | 'Selesai';
  commentsCount: number;
  description?: string;
}

export type ActivityStatus =
  | 'Draft'
  | 'Direncanakan'
  | 'Persiapan'
  | 'Siap'
  | 'Berlangsung'
  | 'Dokumentasi'
  | 'SPJ Diproses'
  | 'Menunggu Verifikasi'
  | 'Terverifikasi'
  | 'Diarsipkan';

export interface DigitalActivity {
  id: string;
  title: string;
  program: string;
  date: string;
  time: string;
  location: string;
  pic: string;
  status: ActivityStatus;
  targetAudience: string;
  participantCount: number;
  results?: string;
  followUp?: string;
  // Documents checklist & data
  invitationLetterUrl?: string;
  dutyLetterUrl?: string;
  sapId?: string;
  materialUrls?: string[];
  attendanceListUrl?: string;
  documentationUrls?: string[];
  notulenId?: string;
  lhkId?: string;
  spjCompleted?: boolean;
  spjFilesCount?: number;
}

export interface SapDocument {
  id: string;
  activityId?: string;
  title: string;
  topic: string;
  date: string;
  time: string;
  location: string;
  targetAudience: string;
  participantCount: number;
  generalObjective: string;
  specificObjective: string;
  materialSummary: string;
  method: string;
  media: string;
  durationMinutes: number;
  evaluationMethod: string;
  speaker: string;
  facilitator: string;
  pic: string;
  status: 'Draft' | 'Terverifikasi' | 'Diarsipkan';
}

export interface NotulenDocument {
  id: string;
  activityId?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  leader: string;
  speaker: string;
  participants: string;
  agenda: string;
  proceedings: string;
  decisions: string;
  followUp: string;
  pic: string;
  documentationUrls: string[];
  signatureName: string;
  status: 'Draft' | 'Terverifikasi' | 'Diarsipkan';
}

export interface LhkActivityDocument {
  id: string;
  activityId?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  objective: string;
  description: string;
  results: string;
  participantCount: number;
  obstacles: string;
  followUp: string;
  documentationUrls: string[];
  signatureName: string;
  status: 'Draft' | 'Terverifikasi' | 'Diarsipkan';
}

export interface ProgramIndicator {
  id: string;
  programName: string;
  indicatorName: string;
  targetPercent: number;
  realizationPercent: number;
  deviationPercent: number;
  period: string; // e.g. "Tahun 2026"
  unit: string;
}

export interface FollowUpItem {
  id: string;
  source: 'Kegiatan' | 'Evaluasi' | 'Monitoring' | 'Pembinaan';
  title: string;
  villageOrPosyandu: string;
  pic: string;
  deadline: string;
  status: 'Belum Selesai' | 'Dalam Proses' | 'Selesai';
  priority: 'Normal' | 'Tinggi';
}

export interface CoachingRecord {
  id: string;
  posyanduId: string;
  posyanduName: string;
  villageName: string;
  date: string;
  coachName: string;
  findings: string;
  recommendations: string;
  followUp: string;
  status: 'Dalam Proses' | 'Selesai';
}

export interface PublicArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  category: 'Ibu & Anak' | 'Remaja' | 'Dewasa & Lansia' | 'Keterampilan Kader' | 'Gizi & PHBS';
  type: 'Modul' | 'Panduan' | 'Video' | 'Presentasi';
  fileUrl?: string;
  videoUrl?: string;
  durationOrPages: string;
  updatedAt: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  pic: string;
  category: 'Posyandu' | 'Penyuluhan' | 'Bimtek' | 'Supervisi' | 'Lintas Sektor';
  status: 'Terjadwal' | 'Persiapan' | 'Selesai';
}

export interface PublicFeedback {
  id: string;
  date: string;
  name?: string;
  contact?: string;
  category: 'Layanan Posyandu' | 'Puskesmas' | 'Promkes' | 'Lainnya';
  message: string;
  status: 'Masuk' | 'Diproses' | 'Selesai';
  responseNote?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  date: string;
  type: 'laporan' | 'tindak_lanjut' | 'verifikasi' | 'agenda';
  read: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  accountName: string;
  role: string;
  action: string;
  targetData: string;
  timestamp: string;
  changes?: string;
}

export interface SystemUsageStats {
  storedDocumentsCount: number;
  activeAccountsCount: number;
  monthlyReads: number;
  monthlyWrites: number;
  monthlyDeletes: number;
  storageMb: number;
  databaseBandwidthMb: number;
  maxMonthlyReadsQuota: number;
  maxMonthlyWritesQuota: number;
  maxStorageMbQuota: number;
  uptimePercent: number;
}

export interface SyncConfiguration {
  webAppUrl: string;
  token: string;
  driveFolderId: string;
  spreadsheetId: string;
  connected: boolean;
  lastSyncTimestamp: string;
  syncCollections: string[];
}
