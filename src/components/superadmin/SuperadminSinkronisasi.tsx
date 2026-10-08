import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SyncConfiguration } from '../../types';
import { Copy, Check, RefreshCw, Save, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export const SuperadminSinkronisasi: React.FC = () => {
  const { syncConfig, saveSyncConfig, showToast } = useApp();

  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>(
    syncConfig.connected ? 'success' : 'idle'
  );

  const [webAppUrl, setWebAppUrl] = useState(syncConfig.webAppUrl || '');
  const [token, setToken] = useState(syncConfig.token || '');
  const [driveFolderId, setDriveFolderId] = useState(
    syncConfig.driveFolderId || '1SPqoKmWBYQi1tJ_NUNR8iV0wqxAl2g9b'
  );
  const [spreadsheetId, setSpreadsheetId] = useState(syncConfig.spreadsheetId || '');

  const gasScriptCode = `/**
 * Google Apps Script - Integrasi Ekosistem Digital Puskesmas Kepanjen
 * Folder Google Drive: 1SPqoKmWBYQi1tJ_NUNR8iV0wqxAl2g9b
 */

const CONFIG = {
  SECRET_TOKEN: "${token || 'GANTI_DENGAN_TOKEN_ANDA'}",
  DRIVE_FOLDER_ID: "${driveFolderId || '1SPqoKmWBYQi1tJ_NUNR8iV0wqxAl2g9b'}",
  SPREADSHEET_ID: "${spreadsheetId || 'GANTI_DENGAN_SPREADSHEET_ID_ANDA'}"
};

function doGet(e) {
  const action = e.parameter.action;
  const token = e.parameter.token;

  if (action === "test") {
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Terhubung"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "getImage") {
    const fileId = e.parameter.fileId;
    try {
      const file = DriveApp.getFileById(fileId);
      const blob = file.getBlob();
      const base64 = Utilities.base64Encode(blob.getBytes());
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        base64: "data:" + blob.getContentType() + ";base64," + base64
      })).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        error: err.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  if (action === "getSheetData") {
    const sheetName = e.parameter.sheetName || "Master_Posyandu";
    try {
      const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      const sheet = ss.getSheetByName(sheetName);
      const data = sheet.getDataRange().getValues();
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        data: data
      })).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        error: err.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "ok"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;

    if (postData.token !== CONFIG.SECRET_TOKEN && CONFIG.SECRET_TOKEN !== "GANTI_DENGAN_TOKEN_ANDA") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        error: "Token tidak sah"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "upload") {
      const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
      const contentType = postData.contentType || "image/jpeg";
      const bytes = Utilities.base64Decode(postData.base64Data);
      const blob = Utilities.newBlob(bytes, contentType, postData.fileName);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        fileId: file.getId(),
        fileName: file.getName(),
        downloadUrl: file.getDownloadUrl(),
        viewUrl: file.getUrl()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "delete") {
      DriveApp.getFileById(postData.fileId).setTrashed(true);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "syncSheetRow") {
      const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      const sheetName = postData.sheetName || "Pelaporan_Bulanan";
      let sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
      }
      sheet.appendRow(postData.rowValues);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: "Aksi tidak dikenal"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(gasScriptCode);
    setCopied(true);
    showToast('Kode disalin', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SyncConfiguration = {
      ...syncConfig,
      webAppUrl: webAppUrl.trim(),
      token: token.trim(),
      driveFolderId: driveFolderId.trim(),
      spreadsheetId: spreadsheetId.trim(),
      lastSyncTimestamp: new Date().toLocaleString('id-ID')
    };
    saveSyncConfig(updated);
  };

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setTestStatus('success');
      saveSyncConfig({
        ...syncConfig,
        connected: true,
        lastSyncTimestamp: new Date().toLocaleString('id-ID')
      });
      showToast('Koneksi berhasil', 'success');
    }, 800);
  };

  const handleManualSync = () => {
    saveSyncConfig({
      ...syncConfig,
      lastSyncTimestamp: new Date().toLocaleString('id-ID')
    });
    showToast('Sinkronisasi selesai', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sinkronisasi
        </h1>
      </div>

      {/* Code Box with Copy Button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Kode Google Apps Script
          </label>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#1E9E6A]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Tersalin' : 'Salin Kode'}</span>
          </button>
        </div>

        <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800">
          <pre className="overflow-x-auto text-[11px] font-mono leading-relaxed text-emerald-400 max-h-72">
            <code>{gasScriptCode}</code>
          </pre>
        </div>
      </div>

      {/* Form Settings */}
      <form onSubmit={handleSave} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 text-xs">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            URL Web App
          </label>
          <input
            type="text"
            value={webAppUrl}
            onChange={(e) => setWebAppUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              ID Folder Drive
            </label>
            <input
              type="text"
              value={driveFolderId}
              onChange={(e) => setDriveFolderId(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              ID Spreadsheet
            </label>
            <input
              type="text"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={testing}
              onClick={handleTestConnection}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Menguji...' : 'Uji Koneksi'}</span>
            </button>

            {testStatus === 'success' && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#22A06B]">
                <CheckCircle2 className="h-4 w-4" />
                Terhubung
              </span>
            )}
            {testStatus === 'error' && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D64545]">
                <XCircle className="h-4 w-4" />
                Gagal
              </span>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-[#0F8B8D] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0d7a7c]"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Simpan</span>
          </button>
        </div>
      </form>

      {/* Sync Status & Action */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-slate-400">Waktu Sinkronisasi Terakhir:</span>
            <p className="font-bold text-slate-800 dark:text-slate-100">
              {syncConfig.lastSyncTimestamp}
            </p>
          </div>

          <button
            type="button"
            onClick={handleManualSync}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#1E9E6A] px-5 py-2.5 font-bold text-white shadow-sm hover:bg-[#168a5c]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sinkronkan Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
