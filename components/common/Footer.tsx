import React from "react";
import Link from "next/link";
import { Sparkles, Command, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-bold text-base text-white">
                Sakode<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">MockLab</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All-in-One Mock & Dummy Data Toolkit Indonesia: Teks dummy multi-tema (Nusantara, Tech, Corporate, Slang), generator profil user realistis, dan placeholder gambar untuk kebutuhan prototyping & development.
            </p>
          </div>

          {/* Shortcuts Col */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Command className="w-3.5 h-3.5 text-indigo-400" /> Pintasan Keyboard
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Acak Ulang Teks:</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-indigo-300">
                  Ctrl + Enter
                </kbd>
              </li>
              <li className="flex items-center justify-between">
                <span>Salin Data:</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-indigo-300">
                  Tombol Salin
                </kbd>
              </li>
            </ul>
          </div>

          {/* Features Col */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-slate-300 uppercase tracking-wider">
              Modul & Fitur Unggulan
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Cicero Latin Klasik",
                "Tema Nusantara Indo",
                "Tech & Coding Terms",
                "Corporate Buzzwords",
                "Bahasa Gaul Slang",
                "Kuliner & Foodie",
                "Dummy User Indonesia",
                "Placeholder Gambar UI",
                "Ekspor HTML, MD & CSV"
              ].map((ft) => (
                <span
                  key={ft}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-400"
                >
                  {ft}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk Komunitas Developer & Designer Indonesia oleh Sakode.</span>
          </p>
          <p>© {new Date().getFullYear()} Sakode MockLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
