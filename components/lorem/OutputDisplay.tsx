"use client";

import React from "react";
import {
  Copy,
  Check,
  Download,
  Bookmark,
  Search,
  Maximize2,
  Minimize2,
  RefreshCw,
  FileCode2
} from "lucide-react";
import { ExportFormat } from "@/types/lorem";
import { HighlightedText } from "./HighlightedText";

interface OutputDisplayProps {
  lines: string[];
  currentFormattedText: string;
  viewFormat: ExportFormat;
  setViewFormat: (fmt: ExportFormat) => void;
  copiedFormat: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFullScreen: boolean;
  setIsFullScreen: (full: boolean) => void;
  isPending: boolean;
  onCopy: (format?: ExportFormat) => void;
  onDownload: () => void;
  onBookmark: () => void;
}

const FORMAT_TABS: { id: ExportFormat; label: string }[] = [
  { id: "plain", label: "Teks Polos" },
  { id: "html", label: "HTML" },
  { id: "markdown", label: "Markdown" },
  { id: "json", label: "JSON" }
];

export function OutputDisplay({
  lines,
  currentFormattedText,
  viewFormat,
  setViewFormat,
  copiedFormat,
  searchQuery,
  setSearchQuery,
  isFullScreen,
  setIsFullScreen,
  isPending,
  onCopy,
  onDownload,
  onBookmark
}: OutputDisplayProps) {
  return (
    <div className="sakode-card flex flex-col overflow-hidden">
      {/* Top Toolbar */}
      <div className="sakode-card-section flex flex-wrap items-center justify-between gap-3 bg-[var(--surface)]">
        {/* Format Selector (Sakode Pill Style) */}
        <div className="flex items-center gap-1 bg-[var(--bg)] p-1 rounded-[var(--r-sm)] border border-[var(--border)]">
          {FORMAT_TABS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setViewFormat(fmt.id)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer ${
                viewFormat === fmt.id
                  ? "bg-[var(--surface)] text-[var(--text)] shadow-xs border border-[var(--border)] font-extrabold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onCopy(viewFormat)}
            className="btn-sakode-primary text-xs py-1.5 px-3.5"
            title="Salin ke clipboard"
          >
            {copiedFormat === viewFormat ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedFormat === viewFormat ? "Tersalin!" : "Salin Teks"}</span>
          </button>

          <button
            onClick={onDownload}
            className="btn-sakode-secondary text-xs py-1.5 px-3"
            title="Unduh file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </button>

          <button
            onClick={onBookmark}
            className="btn-sakode-secondary text-xs py-1.5 px-3"
            title="Simpan ke Riwayat"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#f9723b]" />
            <span className="hidden sm:inline">Simpan</span>
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="btn-sakode-secondary text-xs p-2"
            title={isFullScreen ? "Kecilkan Layar" : "Layar Penuh"}
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Filter / Search inside output */}
      <div className="px-5 py-2.5 bg-[var(--surface-subtle)] border-b border-[var(--border)]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Cari kata kunci dalam teks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[var(--r-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
          />
        </div>
      </div>

      {/* Text Output Box */}
      <div
        className={`p-6 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed bg-[var(--bg)] transition-colors ${
          isFullScreen ? "h-[75vh]" : "min-h-[320px] max-h-[500px]"
        }`}
      >
        {isPending ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-3 text-[var(--text-muted)]">
            <RefreshCw className="w-6 h-6 animate-spin text-[#71cffe]" />
            <p className="text-xs font-bold">Menggenerasi teks baru...</p>
          </div>
        ) : lines.length === 0 ? (
          <p className="text-[var(--text-muted)] text-xs italic">Belum ada teks yang digenerasi.</p>
        ) : (
          <div className="whitespace-pre-wrap selection:bg-[#71cffe] selection:text-[#172033] text-[var(--text)]">
            {viewFormat === "json" ? (
              <pre className="text-[#10b981] text-xs font-mono">{currentFormattedText}</pre>
            ) : (
              <HighlightedText text={currentFormattedText} highlight={searchQuery} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
