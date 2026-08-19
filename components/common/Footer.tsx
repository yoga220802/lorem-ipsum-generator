import React from "react";
import Link from "next/link";
import { Command, Heart, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)] transition-colors duration-200">
      {/* ── 1. Steps & Features Guide (Sakode Info Section) ── */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-subtle)] py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-7">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--primary)] block mb-1">
              Cara Penggunaan
            </span>
            <h2 className="text-2xl font-extrabold text-[var(--text)]">Mulai dalam 3 langkah mudah</h2>
            <p className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] mt-1">
              Sakode MockLab dirancang agar siapa pun bisa langsung membuat data dummy tanpa mendaftar atau menginstal library.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sakode-card p-5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[#172033] font-extrabold flex items-center justify-center text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-[var(--text)]">Pilih Modul Data</h3>
              <p className="text-xs font-semibold text-[var(--text-muted)] leading-relaxed">
                Pilih tab Teks Mock (Lorem multi-tema), Dummy User Indonesia, atau Placeholder Gambar UI.
              </p>
            </div>

            <div className="sakode-card p-5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#bc71fe] text-white font-extrabold flex items-center justify-center text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-[var(--text)]">Kustomisasi Parameter</h3>
              <p className="text-xs font-semibold text-[var(--text-muted)] leading-relaxed">
                Atur tema, jumlah baris, panjang paragraf, dimensi gambar, atau format tag HTML & Markdown sesuai kebutuhan UI.
              </p>
            </div>

            <div className="sakode-card p-5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#f9723b] text-white font-extrabold flex items-center justify-center text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-[var(--text)]">Salin & Unduh Instan</h3>
              <p className="text-xs font-semibold text-[var(--text-muted)] leading-relaxed">
                Salin langsung ke clipboard atau download file (.txt, .html, .md, .json, .csv) siap pakai untuk code & database.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. About Sakode Platform ── */}
      <div className="py-12 border-b border-[var(--border)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent)]">
                Tentang Platform
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text)]">
                Sakode MockLab by Sakode Academy
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] leading-relaxed">
                Platform ini dibangun oleh <strong>Sakode Academy</strong> — komunitas belajar pemrograman dan pengembangan web di Indonesia. MockLab adalah salah satu produk open-source dari ekosistem Sakode untuk mempercepat workflow developer dan desainer.
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
                <div className="about-stat">
                  <span className="about-stat-num text-[#71cffe]">6+</span>
                  <span className="about-stat-label">Tema Teks</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num text-[#bc71fe]">100%</span>
                  <span className="about-stat-label">Open Source</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num text-[#f9723b]">0</span>
                  <span className="about-stat-label">Registrasi</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://sakode.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-sakode-primary"
                >
                  <span>Kunjungi sakode.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center p-6 sakode-card bg-[var(--surface-subtle)]">
              <img
                src="/brand/logo-sakode.png"
                alt="Sakode Academy"
                className="max-h-24 w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Bottom Links & Copyright ── */}
      <div className="py-8 bg-[var(--surface)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/brand/logo-sakode.png" alt="Sakode" className="h-7 w-auto object-contain" />
            <span className="text-xs font-bold text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} Sakode Academy. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text)] transition-colors">
              Teks Mock
            </Link>
            <Link href="/users" className="hover:text-[var(--text)] transition-colors">
              Dummy User
            </Link>
            <Link href="/image" className="hover:text-[var(--text)] transition-colors">
              Placeholder Gambar
            </Link>
            <a
              href="https://sakode.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#71cffe] hover:underline flex items-center gap-1"
            >
              <span>sakode.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
