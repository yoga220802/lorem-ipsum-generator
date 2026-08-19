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
  RefreshCw
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
    <div className="space-y-4">
      {/* Top Bar: View Format Tabs & Action Buttons */}
      <div className="glass-panel p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        {/* View Format Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {FORMAT_TABS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setViewFormat(fmt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewFormat === fmt.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onCopy(viewFormat)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
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
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors cursor-pointer"
            title="Unduh file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </button>

          <button
            onClick={onBookmark}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors cursor-pointer"
            title="Simpan ke Riwayat"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Simpan</span>
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={isFullScreen ? "Kecilkan Layar" : "Layar Penuh"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
        <input
          type="text"
          placeholder="Cari kata kunci dalam teks hasil..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Text Output Box */}
      <div
        className={`glass-panel rounded-2xl p-5 overflow-y-auto font-mono text-sm leading-relaxed border border-slate-800 bg-slate-950/60 ${
          isFullScreen ? "h-[75vh]" : "min-h-[320px] max-h-[500px]"
        }`}
      >
        {isPending ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-3 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
            <p className="text-xs">Menggenerasi teks baru...</p>
          </div>
        ) : lines.length === 0 ? (
          <p className="text-slate-500 text-xs italic">Belum ada teks yang digenerasi.</p>
        ) : (
          <div className="whitespace-pre-wrap selection:bg-indigo-500 selection:text-white">
            {viewFormat === "json" ? (
              <pre className="text-emerald-400 text-xs font-mono">{currentFormattedText}</pre>
            ) : (
              <HighlightedText text={currentFormattedText} highlight={searchQuery} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
