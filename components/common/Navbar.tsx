"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, FileText, Users, Image as ImageIcon, History, Layers } from "lucide-react";
import { useHistory } from "@/context/HistoryContext";

export function Navbar() {
  const pathname = usePathname();
  const { history, setIsHistoryOpen } = useHistory();

  const isTabActive = (route: string) => {
    if (route === "/lorem" && (pathname === "/" || pathname === "/lorem")) {
      return true;
    }
    return pathname.startsWith(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group" title="Sakode MockLab Beranda">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">
                  Sakode<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">MockLab</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
                  v2.0 Toolkit
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                All-in-One Mock & Dummy Data Toolkit Indonesia
              </p>
            </div>
          </Link>

          {/* Navigation Links using Next.js Link */}
          <nav aria-label="Menu Utama" className="flex items-center gap-1 sm:gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isTabActive("/lorem")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Teks Mock</span>
            </Link>

            <Link
              href="/users"
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isTabActive("/users")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Dummy</span> User
            </Link>

            <Link
              href="/image"
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isTabActive("/image")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Placeholder</span> Gambar
            </Link>
          </nav>

          {/* Right Action: History & Badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
              title="Riwayat Teks Tersimpan"
              aria-label="Buka Riwayat Teks Tersimpan"
            >
              <History className="w-4 h-4" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-slate-950 rounded-full flex items-center justify-center">
                  {history.length}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sakode Labs</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
