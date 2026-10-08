import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { SimppanSidebar } from './components/layout/SimppanSidebar';
import { Footer } from './components/layout/Footer';
import { LoginModal } from './components/layout/LoginModal';
import { ChangePasswordModal } from './components/layout/ChangePasswordModal';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { PrintDocumentModal } from './components/layout/PrintDocumentModal';
import { ToastContainer } from './components/common/ToastContainer';

// SAHABAT Components
import { SahabatHome } from './components/sahabat/SahabatHome';
import { SahabatProfile } from './components/sahabat/SahabatProfile';
import { SahabatServices } from './components/sahabat/SahabatServices';
import { SahabatContact } from './components/sahabat/SahabatContact';
import { SahabatPosyanduList } from './components/sahabat/SahabatPosyanduList';
import { SahabatRumahData } from './components/sahabat/SahabatRumahData';
import { SahabatBelajarKader } from './components/sahabat/SahabatBelajarKader';
import { SahabatInfoKesehatan } from './components/sahabat/SahabatInfoKesehatan';
import { SahabatArticles } from './components/sahabat/SahabatArticles';
import { SahabatJadwal } from './components/sahabat/SahabatJadwal';
import { SahabatFeedback } from './components/sahabat/SahabatFeedback';
import { SahabatKaderDashboard } from './components/sahabat/SahabatKaderDashboard';
import { SahabatPelaporanForm } from './components/sahabat/SahabatPelaporanForm';
import { SahabatDataPelayanan } from './components/sahabat/SahabatDataPelayanan';
import { SahabatLHKPosyandu } from './components/sahabat/SahabatLHKPosyandu';
import { SahabatStatusLaporan } from './components/sahabat/SahabatStatusLaporan';
import { SahabatMonitoringPelaporan } from './components/sahabat/SahabatMonitoringPelaporan';
import { SahabatMonitoringPelayanan } from './components/sahabat/SahabatMonitoringPelayanan';
import { SahabatPWS } from './components/sahabat/SahabatPWS';
import { SahabatPembinaanStrata } from './components/sahabat/SahabatPembinaanStrata';

// SIMPPAN Components
import { SimppanDashboard } from './components/simppan/SimppanDashboard';
import { SimppanRuangKerja } from './components/simppan/SimppanRuangKerja';
import { SimppanKegiatan } from './components/simppan/SimppanKegiatan';
import { SimppanPerencanaan } from './components/simppan/SimppanPerencanaan';
import { SimppanDokumen } from './components/simppan/SimppanDokumen';
import { SimppanDataCapaian } from './components/simppan/SimppanDataCapaian';
import { SimppanMonitoring } from './components/simppan/SimppanMonitoring';
import { SimppanPrintCenter } from './components/simppan/SimppanPrintCenter';
import { SimppanPKPLaporan } from './components/simppan/SimppanPKPLaporan';
import { SimppanPengetahuan } from './components/simppan/SimppanPengetahuan';
import { SimppanArsip } from './components/simppan/SimppanArsip';

// SUPERADMIN Components
import { SuperadminDashboard } from './components/superadmin/SuperadminDashboard';
import { SuperadminAkun } from './components/superadmin/SuperadminAkun';
import { SuperadminMasterData } from './components/superadmin/SuperadminMasterData';
import { SuperadminPengaturan } from './components/superadmin/SuperadminPengaturan';
import { SuperadminPenggunaanSistem } from './components/superadmin/SuperadminPenggunaanSistem';
import { SuperadminLogAudit } from './components/superadmin/SuperadminLogAudit';
import { SuperadminCadanganData } from './components/superadmin/SuperadminCadanganData';
import { SuperadminValidasiData } from './components/superadmin/SuperadminValidasiData';
import { SuperadminSinkronisasi } from './components/superadmin/SuperadminSinkronisasi';

const AppContent: React.FC = () => {
  const { activeSpace, activePage, currentUser } = useApp();

  const renderContent = () => {
    // 1. Superadmin Space
    if (activeSpace === 'superadmin') {
      switch (activePage) {
        case 'dashboard':
          return <SuperadminDashboard />;
        case 'akun':
          return <SuperadminAkun />;
        case 'master_data':
          return <SuperadminMasterData />;
        case 'pengaturan':
          return <SuperadminPengaturan />;
        case 'penggunaan_sistem':
          return <SuperadminPenggunaanSistem />;
        case 'log_audit':
          return <SuperadminLogAudit />;
        case 'cadangan':
          return <SuperadminCadanganData />;
        case 'validasi_data':
          return <SuperadminValidasiData />;
        case 'sinkronisasi':
          return <SuperadminSinkronisasi />;
        default:
          return <SuperadminDashboard />;
      }
    }

    // 2. SIMPPAN Space
    if (activeSpace === 'simppan') {
      switch (activePage) {
        case 'dashboard':
          return <SimppanDashboard />;
        case 'ruang_kerja':
          return <SimppanRuangKerja />;
        case 'kegiatan':
          return <SimppanKegiatan />;
        case 'perencanaan':
          return <SimppanPerencanaan />;
        case 'dokumen_kegiatan':
          return <SimppanDokumen />;
        case 'data_capaian':
          return <SimppanDataCapaian />;
        case 'monitoring':
        case 'evaluasi':
          return <SimppanMonitoring />;
        case 'print_center':
          return <SimppanPrintCenter />;
        case 'pkp_laporan':
          return <SimppanPKPLaporan />;
        case 'pengetahuan':
        case 'inovasi':
          return <SimppanPengetahuan />;
        case 'arsip':
          return <SimppanArsip />;
        case 'pengaturan':
          return <SuperadminPengaturan />;
        default:
          return <SimppanDashboard />;
      }
    }

    // 3. SAHABAT Space
    switch (activePage) {
      case 'beranda':
        return <SahabatHome />;
      case 'profil':
        return <SahabatProfile />;
      case 'layanan':
        return <SahabatServices />;
      case 'kontak':
        return <SahabatContact />;
      case 'posyandu':
      case 'posyandu_detail':
        return <SahabatPosyanduList />;
      case 'rumah_data':
        return <SahabatRumahData />;
      case 'belajar':
        return <SahabatBelajarKader />;
      case 'info_kesehatan':
        return <SahabatInfoKesehatan />;
      case 'artikel':
        return <SahabatArticles />;
      case 'jadwal':
        return <SahabatJadwal />;
      case 'pengaduan':
        return <SahabatFeedback />;
      case 'dashboard_posyandu':
        return <SahabatKaderDashboard />;
      case 'pelaporan':
        return <SahabatPelaporanForm />;
      case 'data_pelayanan':
        return <SahabatDataPelayanan />;
      case 'lhk_posyandu':
        return <SahabatLHKPosyandu />;
      case 'status_laporan':
        return <SahabatStatusLaporan />;
      case 'monitoring_pelaporan':
        return <SahabatMonitoringPelaporan />;
      case 'monitoring_pelayanan':
        return <SahabatMonitoringPelayanan />;
      case 'pws':
        return <SahabatPWS />;
      case 'pembinaan':
        return <SahabatPembinaanStrata />;
      default:
        return <SahabatHome />;
    }
  };

  const showSidebar = activeSpace === 'simppan' || activeSpace === 'superadmin';

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6F8] text-[#2B3640] dark:bg-[#0F1A20] dark:text-[#E6EEF2] transition-colors">
      <Header />

      <div className="flex-1 flex w-full">
        {showSidebar && <SimppanSidebar />}

        <main className={`flex-1 p-4 sm:p-6 lg:p-8 ${showSidebar ? 'max-w-7xl' : 'max-w-7xl mx-auto w-full'}`}>
          {renderContent()}
        </main>
      </div>

      <Footer />

      {/* Global Modals & Notifications */}
      <LoginModal />
      <ChangePasswordModal />
      <GlobalSearchModal />
      <NotificationDrawer />
      <PrintDocumentModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
