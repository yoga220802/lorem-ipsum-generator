"use client";

import React, { useState } from "react";
import { X, Copy, Trash2, History as HistoryIcon, Check } from "lucide-react";
import { useHistory } from "@/context/HistoryContext";
import { useToast } from "@/context/ToastContext";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { HistoryItem } from "@/types/common";

export function HistoryDrawer() {
  const { history, isHistoryOpen, setIsHistoryOpen, clearHistory } = useHistory();
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isHistoryOpen) return null;

  const handleCopyItem = async (item: HistoryItem) => {
    const success = await copyToClipboard(item.text);
    if (success) {
      setCopiedId(item.id);
      showToast("Tersalin!", "Teks riwayat berhasil disalin.", "success");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleClear = () => {
    clearHistory();
    showToast("Riwayat Dibersihkan", "Semua riwayat telah dihapus.", "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-[var(--surface)] border-l border-[var(--border)] h-full flex flex-col justify-between shadow-2xl animate-toast">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-[#71cffe]" />
            <h3 className="font-extrabold text-[var(--text)] text-base">Riwayat Teks Tersimpan</h3>
          </div>
          <button
            onClick={() => setIsHistoryOpen(false)}
            className="p-1 rounded-[var(--r-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3.5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-[var(--text-muted)] space-y-2">
              <HistoryIcon className="w-8 h-8 opacity-30" />
              <p className="text-sm font-bold">Belum ada riwayat teks.</p>
              <p className="text-xs">
                Klik tombol "Simpan" pada generator untuk menambahkan snippet ke sini.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--surface-subtle)] border border-[var(--border)] p-4 rounded-[var(--r-sm)] space-y-2 hover:border-[var(--border-hi)] transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#71cffe] px-2 py-0.5 rounded-[4px] bg-[var(--primary-soft)] border border-[color-mix(in_srgb,var(--primary)_30%,transparent)]">
                    {item.themeName}
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--text-muted)]">{item.timestamp}</span>
                </div>

                <p className="text-xs text-[var(--text)] line-clamp-3 font-mono leading-relaxed">
                  {item.text}
                </p>

                <div className="flex items-center justify-end pt-2 border-t border-[var(--border)]">
                  <button
                    onClick={() => handleCopyItem(item)}
                    className="btn-sakode-primary text-xs py-1 px-3"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? "Tersalin!" : "Salin"}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--surface-subtle)]">
            <span className="text-xs font-bold text-[var(--text-muted)]">{history.length} item tersimpan</span>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-sm)] text-xs font-extrabold text-[var(--danger)] hover:bg-[var(--danger-soft)] border border-[var(--danger)]/30 transition-colors cursor-pointer"
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
