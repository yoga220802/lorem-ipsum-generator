"use client";

import React from "react";
import { BookOpen, Compass, Code2, Briefcase, Smile, Utensils } from "lucide-react";
import { PRESET_THEMES } from "@/lib/data/themes";

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

const THEME_ICONS: Record<string, React.ReactNode> = {
  latin: <BookOpen className="w-5 h-5 text-[#71cffe]" />,
  nusantara: <Compass className="w-5 h-5 text-[#10b981]" />,
  tech: <Code2 className="w-5 h-5 text-[#bc71fe]" />,
  corporate: <Briefcase className="w-5 h-5 text-[#f9723b]" />,
  slang: <Smile className="w-5 h-5 text-[#ec4899]" />,
  foodie: <Utensils className="w-5 h-5 text-[#f59e0b]" />
};

export function ThemeSelector({ selectedThemeId, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="sakode-lbl">
          <div className="sakode-lbl-num">1</div>
          <span>Pilih Tema & Gaya Teks</span>
        </div>
        <span className="text-xs font-bold text-[var(--text-muted)]">
          6 Pilihan Bahasa & Nuansa
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.values(PRESET_THEMES).map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`sakode-card p-3.5 flex flex-col items-start text-left cursor-pointer transition-all ${
                isSelected
                  ? "border-[#71cffe] ring-2 ring-[#71cffe]/20 bg-[var(--primary-soft)]"
                  : "hover:border-[var(--border-hi)]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2.5">
                <div className="p-2 rounded-[var(--r-sm)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                  {THEME_ICONS[theme.id]}
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    isSelected
                      ? "bg-[#71cffe] text-[#172033] border-[#71cffe]"
                      : "bg-[var(--surface-subtle)] text-[var(--text-muted)] border-[var(--border)]"
                  }`}
                >
                  {theme.badge}
                </span>
              </div>
              <span className="font-extrabold text-xs sm:text-sm text-[var(--text)] leading-snug line-clamp-1">
                {theme.name}
              </span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] line-clamp-1 mt-0.5">
                {theme.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
