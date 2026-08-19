"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Users, Image as ImageIcon, History, Sun, Moon, Sparkles } from "lucide-react";
import { useHistory } from "@/context/HistoryContext";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const pathname = usePathname();
  const { history, setIsHistoryOpen } = useHistory();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTabActive = (route: string) => {
    if (route === "/lorem" && (pathname === "/" || pathname === "/lorem")) {
      return true;
    }
    return pathname.startsWith(route);
  };

  return (
    <header className="sticky top-0 z-50 h-[68px] bg-[color-mix(in_srgb,var(--surface)_96%,transparent)] border-b border-[var(--border)] backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-7 flex items-center justify-between">
        {/* Brand Logo with Sakode Academy Logo */}
        <Link href="/" className="flex items-center gap-3 group" title="Sakode MockLab — Beranda">
          <img
            src="/brand/logo-sakode.png"
            alt="Sakode Academy"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="h-6 w-[1px] bg-[var(--border)] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-[var(--text)]">
              Mock<span className="text-[#71cffe]">Lab</span>
            </span>
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--text)] border border-[color-mix(in_srgb,var(--primary)_40%,transparent)]">
              Free Tools
            </span>
          </div>
        </Link>

        {/* Navigation Tabs (Sakode Pill Style) */}
        <nav
          aria-label="Menu Navigasi Generator"
          className="flex items-center gap-1 bg-[var(--bg)] p-1 rounded-[var(--r-sm)] border border-[var(--border)]"
        >
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
              isTabActive("/lorem")
                ? "bg-[var(--surface)] text-[var(--text)] shadow-sm border border-[var(--border)] font-extrabold"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#71cffe]" />
            <span>Teks Mock</span>
          </Link>

          <Link
            href="/users"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
              isTabActive("/users")
                ? "bg-[var(--surface)] text-[var(--text)] shadow-sm border border-[var(--border)] font-extrabold"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#bc71fe]" />
            <span className="hidden sm:inline">Dummy</span> User
          </Link>

          <Link
            href="/image"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition-all ${
              isTabActive("/image")
                ? "bg-[var(--surface)] text-[var(--text)] shadow-sm border border-[var(--border)] font-extrabold"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#f9723b]" />
            <span className="hidden sm:inline">Placeholder</span> Gambar
          </Link>
        </nav>

        {/* Right Actions: History Drawer & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="relative w-9 h-9 rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hi)] text-[var(--text-muted)] hover:text-[var(--text)] flex items-center justify-center transition-all cursor-pointer"
            title="Riwayat Teks Tersimpan"
            aria-label="Buka Riwayat Teks Tersimpan"
          >
            <History className="w-4 h-4" />
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#71cffe] text-[10px] font-extrabold text-[#172033] rounded-full flex items-center justify-center shadow-sm">
                {history.length}
              </span>
            )}
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hi)] text-[var(--text-muted)] hover:text-[var(--text)] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            title={mounted ? (theme === "dark" ? "Ganti ke Tema Terang" : "Ganti ke Tema Gelap") : "Ganti Tema"}
            aria-label="Ganti tema gelap/terang"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#f9723b]" />
            ) : (
              <Moon className="w-4 h-4 text-[#71cffe]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
