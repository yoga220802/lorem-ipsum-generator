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
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Generator Data User Indonesia (Dummy User)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Buat data profil pengguna realistis lengkap dengan NIK, email, no HP, dan kota untuk pengujian API/UI.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onGenerate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Baru</span>
          </button>

          <button
            onClick={onCopyJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Tersalin!" : "Salin JSON"}</span>
          </button>

          <button
            onClick={onDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Options Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-xl">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <span>Jumlah Data:</span>
            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold text-sm">
              {count}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-32 sm:w-48 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama, kota, pekerjaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === "cards" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Kartu Profil"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Tabel Data"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
