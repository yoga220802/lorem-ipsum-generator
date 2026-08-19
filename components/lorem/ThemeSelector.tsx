"use client";

import React from "react";
import { Sparkles, BookOpen, Compass, Code2, Briefcase, Smile, Utensils } from "lucide-react";
import { PRESET_THEMES } from "@/lib/data/themes";

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

const THEME_ICONS: Record<string, React.ReactNode> = {
  latin: <BookOpen className="w-5 h-5 text-indigo-300" />,
  nusantara: <Compass className="w-5 h-5 text-emerald-400" />,
  tech: <Code2 className="w-5 h-5 text-indigo-400" />,
  corporate: <Briefcase className="w-5 h-5 text-amber-400" />,
  slang: <Smile className="w-5 h-5 text-pink-400" />,
  foodie: <Utensils className="w-5 h-5 text-rose-400" />
};

export function ThemeSelector({ selectedThemeId, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Pilih Tema & Gaya Teks
        </h2>
        <span className="text-xs text-slate-400">6 Pilihan Khas Indonesia & Latin</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.values(PRESET_THEMES).map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40"
                  : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  {THEME_ICONS[theme.id]}
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    isSelected
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {theme.badge}
                </span>
              </div>
              <span className="font-semibold text-sm leading-snug line-clamp-1">{theme.name}</span>
              <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{theme.subtitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
