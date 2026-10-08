import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  UserAccount,
  Village,
  Posyandu,
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
  ReportStatus
} from '../types';
import {
  INITIAL_VILLAGES,
  INITIAL_POSYANDU,
  INITIAL_ACCOUNTS,
  INITIAL_REPORTS,
  INITIAL_POSYANDU_LHK,
  INITIAL_TASKS,
  INITIAL_ACTIVITIES,
  INITIAL_SAP,
  INITIAL_NOTULEN,
  INITIAL_LHK_ACTIVITY,
  INITIAL_INDICATORS,
  INITIAL_FOLLOW_UPS,
  INITIAL_COACHING,
  INITIAL_ARTICLES,
  INITIAL_LEARNING,
  INITIAL_SCHEDULES,
  INITIAL_FEEDBACK,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SYSTEM_USAGE,
  INITIAL_SYNC_CONFIG
} from '../data/mockData';

export type ActiveSpace = 'sahabat' | 'simppan' | 'superadmin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

export interface PrintDocumentData {
  title: string;
  type: 'SAP' | 'NOTULEN' | 'LHK_KEGIATAN' | 'LHK_POSYANDU' | 'REKAP_PELAPORAN' | 'PWS' | 'PKP';
  referenceNo?: string;
  date: string;
  headerVillage?: string;
  headerPosyandu?: string;
  content: Record<string, any>;
}

interface AppContextType {
  // Theme & Network
  darkMode: boolean;
  toggleDarkMode: () => void;
  isOnline: boolean;

  // Auth & Session
  currentUser: UserAccount | null;
  loginWithPassword: (password: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  resetUserPassword: (userId: string, newPass: string) => boolean;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  changePasswordModalOpen: boolean;
  setChangePasswordModalOpen: (open: boolean) => void;

  // Navigation
  activeSpace: ActiveSpace;
  setActiveSpace: (space: ActiveSpace) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  selectedPosyanduId: string | null;
  setSelectedPosyanduId: (id: string | null) => void;
  selectedVillageId: string | null;
  setSelectedVillageId: (id: string | null) => void;
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;

  // Search & Notifications
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  notificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;

  // Printing
  printModalData: PrintDocumentData | null;
  setPrintModalData: (data: PrintDocumentData | null) => void;

  // Data Collections
  villages: Village[];
  updateVillage: (village: Village) => void;
  posyanduList: Posyandu[];
  updatePosyandu: (posyandu: Posyandu) => void;
  reports: MonthlyReport[];
  saveReport: (report: MonthlyReport) => void;
  verifyReport: (reportId: string, status: ReportStatus, reviewerNotes?: string) => void;
  posyanduLHKList: PosyanduLHK[];
  savePosyanduLHK: (lhk: PosyanduLHK) => void;
  tasks: TaskItem[];
  saveTask: (task: TaskItem) => void;
  deleteTask: (id: string) => void;
  activities: DigitalActivity[];
  saveActivity: (activity: DigitalActivity) => void;
  sapList: SapDocument[];
  saveSap: (sap: SapDocument) => void;
  notulenList: NotulenDocument[];
  saveNotulen: (notulen: NotulenDocument) => void;
  lhkActivityList: LhkActivityDocument[];
  saveLhkActivity: (lhk: LhkActivityDocument) => void;
  indicators: ProgramIndicator[];
  updateIndicator: (indicator: ProgramIndicator) => void;
  followUps: FollowUpItem[];
  saveFollowUp: (item: FollowUpItem) => void;
  coachingList: CoachingRecord[];
  saveCoaching: (item: CoachingRecord) => void;
  articles: PublicArticle[];
  saveArticle: (article: PublicArticle) => void;
  deleteArticle: (id: string) => void;
  learningList: LearningMaterial[];
  saveLearning: (material: LearningMaterial) => void;
  schedules: ScheduleEvent[];
  saveSchedule: (event: ScheduleEvent) => void;
  feedbackList: PublicFeedback[];
  submitFeedback: (feedback: Omit<PublicFeedback, 'id' | 'date' | 'status'>) => void;
  updateFeedbackStatus: (id: string, status: 'Masuk' | 'Diproses' | 'Selesai', note?: string) => void;

  // Superadmin Collections
  accounts: UserAccount[];
  saveAccount: (acc: UserAccount) => void;
  auditLogs: AuditLog[];
  systemUsage: SystemUsageStats;
  syncConfig: SyncConfiguration;
  saveSyncConfig: (config: SyncConfiguration) => void;

  // Settings
  appSettings: {
    appName: string;
    heroTitle: string;
    heroTagline: string;
    waNumber: string; // 628889924444
    contactAddress: string;
    mapsUrl: string;
    officeHours: string;
  };
  updateAppSettings: (settings: Partial<AppContextType['appSettings']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('simppan_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('simppan_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('simppan_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // 2. Online status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 3. User & Auth state
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('simppan_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('simppan_session_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false);

  // 4. Navigation
  const [activeSpace, setActiveSpace] = useState<ActiveSpace>('sahabat');
  const [activePage, setActivePage] = useState<string>('beranda');
  const [selectedPosyanduId, setSelectedPosyanduId] = useState<string | null>(null);
  const [selectedVillageId, setSelectedVillageId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  // 5. Search & Notification Drawer
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // 6. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // 7. Print Modal Data
  const [printModalData, setPrintModalData] = useState<PrintDocumentData | null>(null);

  // 8. Collections
  const [villages, setVillages] = useState<Village[]>(() => {
    const saved = localStorage.getItem('simppan_villages');
    return saved ? JSON.parse(saved) : INITIAL_VILLAGES;
  });

  const [posyanduList, setPosyanduList] = useState<Posyandu[]>(() => {
    const saved = localStorage.getItem('simppan_posyandu');
    return saved ? JSON.parse(saved) : INITIAL_POSYANDU;
  });

  const [reports, setReports] = useState<MonthlyReport[]>(() => {
    const saved = localStorage.getItem('simppan_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [posyanduLHKList, setPosyanduLHKList] = useState<PosyanduLHK[]>(() => {
    const saved = localStorage.getItem('simppan_posyandu_lhk');
    return saved ? JSON.parse(saved) : INITIAL_POSYANDU_LHK;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('simppan_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activities, setActivities] = useState<DigitalActivity[]>(() => {
    const saved = localStorage.getItem('simppan_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [sapList, setSapList] = useState<SapDocument[]>(() => {
    const saved = localStorage.getItem('simppan_sap');
    return saved ? JSON.parse(saved) : INITIAL_SAP;
  });

  const [notulenList, setNotulenList] = useState<NotulenDocument[]>(() => {
    const saved = localStorage.getItem('simppan_notulen');
    return saved ? JSON.parse(saved) : INITIAL_NOTULEN;
  });

  const [lhkActivityList, setLhkActivityList] = useState<LhkActivityDocument[]>(() => {
    const saved = localStorage.getItem('simppan_lhk_activity');
    return saved ? JSON.parse(saved) : INITIAL_LHK_ACTIVITY;
  });

  const [indicators, setIndicators] = useState<ProgramIndicator[]>(INITIAL_INDICATORS);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(INITIAL_FOLLOW_UPS);
  const [coachingList, setCoachingList] = useState<CoachingRecord[]>(INITIAL_COACHING);
  const [articles, setArticles] = useState<PublicArticle[]>(INITIAL_ARTICLES);
  const [learningList, setLearningList] = useState<LearningMaterial[]>(INITIAL_LEARNING);
  const [schedules, setSchedules] = useState<ScheduleEvent[]>(INITIAL_SCHEDULES);
  const [feedbackList, setFeedbackList] = useState<PublicFeedback[]>(INITIAL_FEEDBACK);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [systemUsage] = useState<SystemUsageStats>(INITIAL_SYSTEM_USAGE);
  const [syncConfig, setSyncConfig] = useState<SyncConfiguration>(() => {
    const saved = localStorage.getItem('simppan_sync_config');
    return saved ? JSON.parse(saved) : INITIAL_SYNC_CONFIG;
  });

  // 9. App Settings
  const [appSettings, setAppSettings] = useState({
    appName: 'SIMPPAN & SAHABAT POSYANDU',
    heroTitle: 'SAHABAT POSYANDU',
    heroTagline: 'Teman Kader untuk Belajar dan Melayani',
    waNumber: '628889924444',
    contactAddress: 'Puskesmas Kepanjen, Jl. Raya Jatirejoyoso No. 4, Dawukan, Jatirejoyoso, Kecamatan Kepanjen, Kabupaten Malang, Jawa Timur',
    mapsUrl: 'https://www.google.com/maps/place/Puskesmas+Kepanjen,+Dawukan,+Jatirejoyoso,+Kec.+Kepanjen,+Kabupaten+Malang,+Jawa+Timur/',
    officeHours: 'Senin - Kamis: 07.30 - 14.00 WIB | Jumat: 07.30 - 11.00 WIB | Sabtu: 07.30 - 12.30 WIB'
  });

  // Local storage persistence helper
  useEffect(() => {
    localStorage.setItem('simppan_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('simppan_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('simppan_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('simppan_accounts', JSON.stringify(accounts));
  }, [accounts]);

  // Session idle timeout: 30 minutes
  useEffect(() => {
    if (!currentUser) return;
    let timer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logout();
        showToast('Sesi berakhir', 'info');
      }, 30 * 60 * 1000);
    };

    window.addEventListener('click', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);
    resetIdleTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
    };
  }, [currentUser]);

  // Auth Functions
  const loginWithPassword = useCallback((password: string) => {
    const trimmed = password.trim();
    if (!trimmed) {
      return { success: false, error: 'Kata sandi tidak boleh kosong' };
    }

    const matchedAccount = accounts.find(a => a.passwordHash === trimmed && a.active);
    if (!matchedAccount) {
      return { success: false, error: 'Kata sandi salah atau tidak terdaftar' };
    }

    const updatedAccount = {
      ...matchedAccount,
      lastLogin: new Date().toLocaleString('id-ID')
    };

    setCurrentUser(updatedAccount);
    localStorage.setItem('simppan_session_user', JSON.stringify(updatedAccount));

    // Audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      accountName: updatedAccount.name,
      role: updatedAccount.role,
      action: 'Masuk Sistem',
      targetData: 'Sesi Pengguna',
      timestamp: new Date().toLocaleString('id-ID')
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Route user to appropriate default view
    if (updatedAccount.role === 'superadmin') {
      setActiveSpace('superadmin');
      setActivePage('dashboard');
    } else if (
      updatedAccount.role === 'admin_puskesmas' ||
      updatedAccount.role === 'pimpinan' ||
      updatedAccount.role === 'tim_promkes' ||
      updatedAccount.role === 'petugas_program'
    ) {
      setActiveSpace('simppan');
      setActivePage('dashboard');
    } else {
      setActiveSpace('sahabat');
      setActivePage('dashboard_posyandu');
    }

    showToast('Berhasil masuk', 'success');
    return { success: true };
  }, [accounts, showToast]);

  const logout = useCallback(() => {
    if (currentUser) {
      const newLog: AuditLog = {
        id: `LOG-${Date.now()}`,
        accountName: currentUser.name,
        role: currentUser.role,
        action: 'Keluar Sistem',
        targetData: 'Sesi Pengguna',
        timestamp: new Date().toLocaleString('id-ID')
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
    setCurrentUser(null);
    localStorage.removeItem('simppan_session_user');
    setActiveSpace('sahabat');
    setActivePage('beranda');
    showToast('Berhasil keluar', 'info');
  }, [currentUser, showToast]);

  const changePassword = useCallback((oldPass: string, newPass: string) => {
    if (!currentUser) return { success: false, error: 'Pengguna belum masuk' };
    if (currentUser.passwordHash !== oldPass.trim()) {
      return { success: false, error: 'Kata sandi lama tidak sesuai' };
    }
    if (newPass.length < 8) {
      return { success: false, error: 'Kata sandi baru minimal 8 karakter' };
    }

    // Check uniqueness across accounts
    const isConflict = accounts.some(a => a.id !== currentUser.id && a.passwordHash === newPass);
    if (isConflict) {
      return { success: false, error: 'Kata sandi sudah digunakan akun lain' };
    }

    const updatedUser: UserAccount = {
      ...currentUser,
      passwordHash: newPass,
      isInitialPassword: false
    };

    setAccounts(prev => prev.map(a => a.id === currentUser.id ? updatedUser : a));
    setCurrentUser(updatedUser);
    localStorage.setItem('simppan_session_user', JSON.stringify(updatedUser));
    showToast('Kata sandi berhasil diperbarui', 'success');
    return { success: true };
  }, [currentUser, accounts, showToast]);

  const resetUserPassword = useCallback((userId: string, newPass: string) => {
    setAccounts(prev => prev.map(a => {
      if (a.id === userId) {
        return { ...a, passwordHash: newPass, isInitialPassword: true };
      }
      return a;
    }));
    showToast('Kata sandi berhasil direset', 'success');
    return true;
  }, [showToast]);

  // Notifications
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  // Data Actions
  const updateVillage = useCallback((village: Village) => {
    setVillages(prev => prev.map(v => v.id === village.id ? village : v));
    showToast('Berhasil disimpan', 'success');
  }, [showToast]);

  const updatePosyandu = useCallback((posyandu: Posyandu) => {
    setPosyanduList(prev => prev.map(p => p.id === posyandu.id ? posyandu : p));
    showToast('Berhasil disimpan', 'success');
  }, [showToast]);

  const saveReport = useCallback((report: MonthlyReport) => {
    setReports(prev => {
      const idx = prev.findIndex(r => r.id === report.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = report;
        return copy;
      }
      return [report, ...prev];
    });
    showToast('Berhasil disimpan', 'success');
  }, [showToast]);

  const verifyReport = useCallback((reportId: string, status: ReportStatus, reviewerNotes?: string) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status,
          reviewerNotes: reviewerNotes || r.reviewerNotes,
          verifiedAt: status === 'Terverifikasi' ? new Date().toLocaleString('id-ID') : undefined,
          verifiedBy: currentUser ? currentUser.name : 'Verifikator'
        };
      }
      return r;
    }));
    showToast('Status laporan diperbarui', 'success');
  }, [currentUser, showToast]);

  const savePosyanduLHK = useCallback((lhk: PosyanduLHK) => {
    setPosyanduLHKList(prev => {
      const idx = prev.findIndex(item => item.id === lhk.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = lhk;
        return copy;
      }
      return [lhk, ...prev];
    });
    showToast('LHK Posyandu tersimpan', 'success');
  }, [showToast]);

  const saveTask = useCallback((task: TaskItem) => {
    setTasks(prev => {
      const idx = prev.findIndex(t => t.id === task.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = task;
        return copy;
      }
      return [task, ...prev];
    });
    showToast('Berhasil disimpan', 'success');
  }, [showToast]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast('Tugas dihapus', 'info');
  }, [showToast]);

  const saveActivity = useCallback((activity: DigitalActivity) => {
    setActivities(prev => {
      const idx = prev.findIndex(a => a.id === activity.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = activity;
        return copy;
      }
      return [activity, ...prev];
    });
    showToast('Kegiatan berhasil disimpan', 'success');
  }, [showToast]);

  const saveSap = useCallback((sap: SapDocument) => {
    setSapList(prev => {
      const idx = prev.findIndex(s => s.id === sap.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = sap;
        return copy;
      }
      return [sap, ...prev];
    });
    showToast('SAP berhasil disimpan', 'success');
  }, [showToast]);

  const saveNotulen = useCallback((notulen: NotulenDocument) => {
    setNotulenList(prev => {
      const idx = prev.findIndex(n => n.id === notulen.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = notulen;
        return copy;
      }
      return [notulen, ...prev];
    });
    showToast('Notulen berhasil disimpan', 'success');
  }, [showToast]);

  const saveLhkActivity = useCallback((lhk: LhkActivityDocument) => {
    setLhkActivityList(prev => {
      const idx = prev.findIndex(l => l.id === lhk.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = lhk;
        return copy;
      }
      return [lhk, ...prev];
    });
    showToast('LHK Kegiatan disimpan', 'success');
  }, [showToast]);

  const updateIndicator = useCallback((indicator: ProgramIndicator) => {
    setIndicators(prev => prev.map(i => i.id === indicator.id ? indicator : i));
    showToast('Indikator diperbarui', 'success');
  }, [showToast]);

  const saveFollowUp = useCallback((item: FollowUpItem) => {
    setFollowUps(prev => {
      const idx = prev.findIndex(f => f.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [item, ...prev];
    });
    showToast('Tindak lanjut disimpan', 'success');
  }, [showToast]);

  const saveCoaching = useCallback((item: CoachingRecord) => {
    setCoachingList(prev => {
      const idx = prev.findIndex(c => c.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [item, ...prev];
    });
    showToast('Catatan pembinaan disimpan', 'success');
  }, [showToast]);

  const saveArticle = useCallback((article: PublicArticle) => {
    setArticles(prev => {
      const idx = prev.findIndex(a => a.id === article.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = article;
        return copy;
      }
      return [article, ...prev];
    });
    showToast('Artikel berhasil disimpan', 'success');
  }, [showToast]);

  const deleteArticle = useCallback((id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    showToast('Artikel dihapus', 'info');
  }, [showToast]);

  const saveLearning = useCallback((material: LearningMaterial) => {
    setLearningList(prev => {
      const idx = prev.findIndex(l => l.id === material.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = material;
        return copy;
      }
      return [material, ...prev];
    });
    showToast('Materi berhasil disimpan', 'success');
  }, [showToast]);

  const saveSchedule = useCallback((event: ScheduleEvent) => {
    setSchedules(prev => {
      const idx = prev.findIndex(s => s.id === event.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = event;
        return copy;
      }
      return [event, ...prev];
    });
    showToast('Jadwal berhasil disimpan', 'success');
  }, [showToast]);

  const submitFeedback = useCallback((feedback: Omit<PublicFeedback, 'id' | 'date' | 'status'>) => {
    const newFeedback: PublicFeedback = {
      ...feedback,
      id: `FDB-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Masuk'
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    showToast('Pengaduan berhasil dikirim', 'success');
  }, [showToast]);

  const updateFeedbackStatus = useCallback((id: string, status: 'Masuk' | 'Diproses' | 'Selesai', note?: string) => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, status, responseNote: note || f.responseNote } : f));
    showToast('Status pengaduan diperbarui', 'success');
  }, [showToast]);

  const saveAccount = useCallback((acc: UserAccount) => {
    setAccounts(prev => {
      const idx = prev.findIndex(a => a.id === acc.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = acc;
        return copy;
      }
      return [acc, ...prev];
    });
    showToast('Akun berhasil disimpan', 'success');
  }, [showToast]);

  const saveSyncConfig = useCallback((config: SyncConfiguration) => {
    setSyncConfig(config);
    localStorage.setItem('simppan_sync_config', JSON.stringify(config));
    showToast('Konfigurasi sinkronisasi disimpan', 'success');
  }, [showToast]);

  const updateAppSettings = useCallback((newSettings: Partial<AppContextType['appSettings']>) => {
    setAppSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Pengaturan diperbarui', 'success');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        isOnline,
        currentUser,
        loginWithPassword,
        logout,
        changePassword,
        resetUserPassword,
        loginModalOpen,
        setLoginModalOpen,
        changePasswordModalOpen,
        setChangePasswordModalOpen,
        activeSpace,
        setActiveSpace,
        activePage,
        setActivePage,
        selectedPosyanduId,
        setSelectedPosyanduId,
        selectedVillageId,
        setSelectedVillageId,
        selectedActivityId,
        setSelectedActivityId,
        globalSearchOpen,
        setGlobalSearchOpen,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        notifications,
        markNotificationAsRead,
        toasts,
        showToast,
        printModalData,
        setPrintModalData,
        villages,
        updateVillage,
        posyanduList,
        updatePosyandu,
        reports,
        saveReport,
        verifyReport,
        posyanduLHKList,
        savePosyanduLHK,
        tasks,
        saveTask,
        deleteTask,
        activities,
        saveActivity,
        sapList,
        saveSap,
        notulenList,
        saveNotulen,
        lhkActivityList,
        saveLhkActivity,
        indicators,
        updateIndicator,
        followUps,
        saveFollowUp,
        coachingList,
        saveCoaching,
        articles,
        saveArticle,
        deleteArticle,
        learningList,
        saveLearning,
        schedules,
        saveSchedule,
        feedbackList,
        submitFeedback,
        updateFeedbackStatus,
        accounts,
        saveAccount,
        auditLogs,
        systemUsage,
        syncConfig,
        saveSyncConfig,
        appSettings,
        updateAppSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
