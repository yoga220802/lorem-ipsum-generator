import React from "react";
import { TextStats } from "@/types/lorem";

interface TextStatsFooterProps {
  stats: TextStats;
}

export function TextStatsFooter({ stats }: TextStatsFooterProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="about-stat">
        <span className="about-stat-num text-[#71cffe]">
          {stats.words.toLocaleString("id-ID")}
        </span>
        <span className="about-stat-label">Total Kata</span>
      </div>

      <div className="about-stat">
        <span className="about-stat-num text-[#10b981]">
          {stats.charactersWithSpaces.toLocaleString("id-ID")}
        </span>
        <span className="about-stat-label">Total Karakter</span>
      </div>

      <div className="about-stat">
        <span className="about-stat-num text-[#bc71fe]">
          {stats.sentences}
        </span>
        <span className="about-stat-label">Total Kalimat</span>
      </div>

      <div className="about-stat">
        <span className="about-stat-num text-[#f9723b]">
          {stats.readingTimeFormatted}
        </span>
        <span className="about-stat-label">Waktu Baca</span>
      </div>
    </div>
  );
}
