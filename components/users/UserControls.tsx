import React from "react";
import { Users, RefreshCw, Copy, Check, Download, Search, LayoutGrid, Table as TableIcon } from "lucide-react";
import { UserViewMode } from "@/types/user";

interface UserControlsProps {
  count: number;
  setCount: (count: number) => void;
  search: string;
  setSearch: (search: string) => void;
  viewMode: UserViewMode;
  setViewMode: (mode: UserViewMode) => void;
  onGenerate: () => void;
  onCopyJSON: () => void;
  onDownloadCSV: () => void;
  copied: boolean;
}

export function UserControls({
  count,
  setCount,
  search,
  setSearch,
  viewMode,
  setViewMode,
  onGenerate,
  onCopyJSON,
  onDownloadCSV,
  copied
}: UserControlsProps) {
  return (
    <div className="sakode-card space-y-0 overflow-hidden">
      {/* Top Header Card Section */}
      <div className="sakode-card-section flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="sakode-lbl mb-1">
            <div className="sakode-lbl-num">1</div>
            <span>Generator Profil Pengguna Indonesia</span>
          </div>
          <p className="text-xs font-semibold text-[var(--text-muted)]">
            Hasilkan sampel identitas pengguna lengkap (NIK 16-digit, email, no HP, pekerjaan, perusahaan) untuk seeding database & API.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onGenerate}
            className="btn-sakode-primary text-xs py-2 px-3.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Baru</span>
          </button>

          <button
            onClick={onCopyJSON}
            className="btn-sakode-secondary text-xs py-2 px-3.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5 text-[#bc71fe]" />}
            <span>{copied ? "Tersalin!" : "Salin JSON"}</span>
          </button>

          <button
            onClick={onDownloadCSV}
            className="btn-sakode-secondary text-xs py-2 px-3.5"
          >
            <Download className="w-3.5 h-3.5 text-[#f9723b]" />
            <span>Unduh CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Options Bar */}
      <div className="sakode-card-section bg-[var(--surface-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="text-xs font-bold text-[var(--text)] flex items-center gap-2">
            <span>Jumlah Data:</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[var(--primary-soft)] text-[var(--text)] border border-[color-mix(in_srgb,var(--primary)_40%,transparent)] font-extrabold text-xs">
              {count}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-32 sm:w-48"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Cari nama, kota, profesi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[var(--r-sm)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[var(--bg)] p-1 rounded-[var(--r-sm)] border border-[var(--border)]">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-[6px] text-xs transition-colors cursor-pointer ${
                viewMode === "cards"
                  ? "bg-[var(--surface)] text-[var(--text)] shadow-xs border border-[var(--border)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              title="Tampilan Kartu"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-[6px] text-xs transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-[var(--surface)] text-[var(--text)] shadow-xs border border-[var(--border)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              title="Tampilan Tabel"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
