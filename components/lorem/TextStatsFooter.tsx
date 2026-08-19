import React from "react";
import { TextStats } from "@/types/lorem";

interface TextStatsFooterProps {
  stats: TextStats;
}

export function TextStatsFooter({ stats }: TextStatsFooterProps) {
  return (
    <div className="glass-panel p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Kata</span>
        <span className="text-base font-bold text-indigo-400">{stats.words.toLocaleString("id-ID")}</span>
      </div>

      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Karakter</span>
        <span className="text-base font-bold text-emerald-400">{stats.charactersWithSpaces.toLocaleString("id-ID")}</span>
      </div>

      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Kalimat</span>
        <span className="text-base font-bold text-amber-400">{stats.sentences}</span>
      </div>

      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Waktu Baca</span>
        <span className="text-base font-bold text-pink-400">{stats.readingTimeFormatted}</span>
      </div>
    </div>
  );
}
