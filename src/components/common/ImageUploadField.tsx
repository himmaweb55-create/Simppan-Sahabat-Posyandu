import React, { useState, useRef } from 'react';
import { Upload, Link2, Trash2, Loader2, Image as ImageIcon, FileText } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  sourceType?: 'drive' | 'tautan';
  onChange: (value: string, source: 'drive' | 'tautan') => void;
  accept?: 'image' | 'document';
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value = '',
  sourceType = 'tautan',
  onChange,
  accept = 'image'
}) => {
  const [activeTab, setActiveTab] = useState<'Unggah' | 'Tautan'>(
    sourceType === 'drive' ? 'Unggah' : 'Tautan'
  );
  const [urlInput, setUrlInput] = useState(sourceType === 'tautan' ? value : '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Client-side file preview and simulated Drive Apps Script upload
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        setIsUploading(false);
        const resultUrl = reader.result as string;
        onChange(resultUrl, 'drive');
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim(), 'tautan');
    }
  };

  const handleClear = () => {
    setUrlInput('');
    onChange('', 'tautan');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDoc = accept === 'document';

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('Unggah')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'Unggah'
              ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] dark:bg-[#0F8B8D]/20'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          <Upload className="h-3 w-3" />
          <span>Unggah</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('Tautan')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'Tautan'
              ? 'bg-[#0F8B8D]/10 text-[#0F8B8D] dark:bg-[#0F8B8D]/20'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          <Link2 className="h-3 w-3" />
          <span>Tautan</span>
        </button>
      </div>

      {activeTab === 'Unggah' ? (
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={isDoc ? '.pdf,.doc,.docx,.xls,.xlsx' : 'image/jpeg,image/png,image/webp'}
            onChange={handleFileChange}
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0F8B8D]" />
            ) : isDoc ? (
              <FileText className="h-3.5 w-3.5 text-[#0F8B8D]" />
            ) : (
              <Upload className="h-3.5 w-3.5 text-[#0F8B8D]" />
            )}
            <span>{isDoc ? 'Pilih Dokumen' : 'Pilih Gambar'}</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onBlur={handleUrlApply}
            placeholder="https://..."
            className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#0F8B8D] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="rounded-xl bg-[#0F8B8D] px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#0d7a7c]"
          >
            Terapkan
          </button>
        </div>
      )}

      {/* Preview block if value exists */}
      {value && (
        <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {isDoc ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40">
                <FileText className="h-5 w-5" />
              </div>
            ) : (
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
                <img
                  src={value}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23E2E8F0"/%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
            <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
              {isDoc ? 'Dokumen terpilih' : 'Gambar terpilih'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-red-500 dark:hover:bg-slate-700"
            aria-label="Hapus"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
