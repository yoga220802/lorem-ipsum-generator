"use client";

import React from "react";
import { X, Copy, Trash2, History, Check } from "lucide-react";

export interface HistoryItem {
  id: string;
  themeName: string;
  text: string;
  timestamp: string;
}

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onShowToast: (title: string, message?: string, type?: "success" | "error" | "info") => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onShowToast
}: HistoryDrawerProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyItem = (item: HistoryItem) => {
    navigator.clipboard.writeText(item.text);
    setCopiedId(item.id);
    onShowToast("Tersalin!", "Teks riwayat berhasil disalin.", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl animate-toast">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Riwayat Teks Tersimpan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500 space-y-2">
              <History className="w-8 h-8 opacity-40" />
              <p className="text-sm">Belum ada riwayat teks yang disimpan.</p>
              <p className="text-xs text-slate-600">
                Klik tombol "Simpan" pada generator untuk menambahkan snippet ke sini.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/60">
                    {item.themeName}
                  </span>
                  <span className="text-[11px] text-slate-500">{item.timestamp}</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 font-mono leading-relaxed">
                  {item.text}
                </p>

                <div className="flex items-center justify-end pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => handleCopyItem(item)}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? "Tersalin!" : "Salin Teks"}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">{history.length} item tersimpan</span>
            <button
              onClick={() => {
                onClearHistory();
                onShowToast("Riwayat Dibersihkan", "Semua riwayat telah dihapus.", "info");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-rose-900/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Semua</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
