"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  PRESET_THEMES,
  PresetTheme
} from "@/lib/generator-data";
import {
  GeneratorOptions,
  OutputType,
  ParagraphLength,
  generateLoremText,
  calculateTextStats,
  formatOutput,
  TextStats
} from "@/lib/lorem-generator";
import {
  BookOpen,
  Compass,
  Code2,
  Briefcase,
  Smile,
  Utensils,
  Copy,
  Check,
  RefreshCw,
  Download,
  Bookmark,
  FileCode,
  Sliders,
  Sparkles,
  Search,
  Maximize2,
  Minimize2,
  Info
} from "lucide-react";

interface LoremGeneratorProps {
  onShowToast: (title: string, message?: string, type?: "success" | "error" | "info") => void;
  onSaveToHistory: (text: string, themeName: string) => void;
}

const THEME_ICONS: Record<string, React.ReactNode> = {
  latin: <BookOpen className="w-5 h-5" />,
  nusantara: <Compass className="w-5 h-5 text-emerald-400" />,
  tech: <Code2 className="w-5 h-5 text-indigo-400" />,
  corporate: <Briefcase className="w-5 h-5 text-amber-400" />,
  slang: <Smile className="w-5 h-5 text-pink-400" />,
  foodie: <Utensils className="w-5 h-5 text-rose-400" />
};

export function LoremGenerator({ onShowToast, onSaveToHistory }: LoremGeneratorProps) {
  // Options State
  const [options, setOptions] = useState<GeneratorOptions>({
    themeId: "latin",
    type: "paragraphs",
    count: 3,
    paragraphLength: "medium",
    startWithLorem: true,
    includeHtml: false,
    addDecoration: false,
    addCodeTags: false
  });

  // Generated Lines & Stats
  const [lines, setLines] = useState<string[]>([]);
  const [stats, setStats] = useState<TextStats>({
    paragraphs: 0,
    sentences: 0,
    words: 0,
    charactersWithSpaces: 0,
    charactersWithoutSpaces: 0,
    readingTimeMinutes: 0,
    readingTimeFormatted: "0 dtk"
  });

  // View Format & Search State
  const [viewFormat, setViewFormat] = useState<"plain" | "html" | "markdown" | "json">("plain");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  // Generate text whenever options change
  const handleGenerate = () => {
    startTransition(() => {
      const generated = generateLoremText(options);
      setLines(generated);
      setStats(calculateTextStats(generated));
    });
  };

  useEffect(() => {
    handleGenerate();
  }, [options]);

  // Keyboard shortcut listener (Ctrl + Enter to regenerate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleGenerate();
        onShowToast("Diperbarui!", "Teks berhasil digenerate ulang.", "info");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options]);

  // Formatted output text string
  const currentFormattedText = formatOutput(lines, viewFormat);

  // Copy Handler
  const handleCopy = (format: "plain" | "html" | "markdown" | "json" = viewFormat) => {
    const textToCopy = formatOutput(lines, format);
    navigator.clipboard.writeText(textToCopy);
    setCopiedFormat(format);
    onShowToast("Teks Disalin!", `Format ${format.toUpperCase()} berhasil disalin ke clipboard.`, "success");
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Download Handler
  const handleDownload = () => {
    const extensions: Record<string, string> = {
      plain: "txt",
      html: "html",
      markdown: "md",
      json: "json"
    };
    const mimeTypes: Record<string, string> = {
      plain: "text/plain",
      html: "text/html",
      markdown: "text/markdown",
      json: "application/json"
    };

    const ext = extensions[viewFormat] || "txt";
    const mime = mimeTypes[viewFormat] || "text/plain";

    const blob = new Blob([currentFormattedText], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sakode-lorem-${options.themeId}-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onShowToast("File Diunduh!", `Format ${ext.toUpperCase()} telah disimpan.`, "success");
  };

  // Save to History
  const handleBookmark = () => {
    const themeName = PRESET_THEMES[options.themeId]?.name || "Lorem Ipsum";
    onSaveToHistory(formatOutput(lines, "plain"), themeName);
    onShowToast("Tersimpan!", "Hasil generator disimpan ke riwayat Anda.", "success");
  };

  const activeTheme = PRESET_THEMES[options.themeId] || PRESET_THEMES.latin;

  return (
    <div className="space-y-8">
      {/* 1. PRESET THEME SELECTOR GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Pilih Tema & Gaya Teks
          </h2>
          <span className="text-xs text-slate-400">
            6 Pilihan Khas Indonesia & Latin
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.values(PRESET_THEMES).map((theme) => {
            const isSelected = options.themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setOptions((prev) => ({ ...prev, themeId: theme.id }))}
                className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all ${
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

      {/* 2. CONTROLS PANEL & OUTPUT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: CONTROLS PANEL (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-slate-200 flex items-center gap-2 text-base">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Pengaturan Generator
            </h3>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
              <span>Acak Ulang</span>
            </button>
          </div>

          {/* Output Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Tipe Output
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "paragraphs", label: "Paragraf" },
                { id: "sentences", label: "Kalimat" },
                { id: "words", label: "Kata" },
                { id: "list_unordered", label: "List Bullets" },
                { id: "list_ordered", label: "List Angka" },
                { id: "html_structure", label: "Struktur HTML" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOptions((prev) => ({ ...prev, type: item.id as OutputType }))}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    options.type === item.id
                      ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Count Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Jumlah ({options.type === "paragraphs" ? "Paragraf" : options.type === "sentences" ? "Kalimat" : "Item"})
              </label>
              <span className="text-sm font-bold px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
                {options.count}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={options.type === "words" ? 200 : 50}
              value={options.count}
              onChange={(e) => setOptions((prev) => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400">
              <span>Quick:</span>
              {[1, 3, 5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  onClick={() => setOptions((prev) => ({ ...prev, count: num }))}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Paragraph Length option (if paragraphs) */}
          {options.type === "paragraphs" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Panjang Paragraf
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "short", label: "Pendek" },
                  { id: "medium", label: "Sedang" },
                  { id: "long", label: "Panjang" },
                  { id: "random", label: "Acak" }
                ].map((len) => (
                  <button
                    key={len.id}
                    onClick={() => setOptions((prev) => ({ ...prev, paragraphLength: len.id as ParagraphLength }))}
                    className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      options.paragraphLength === len.id
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold"
                        : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {len.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                Mulai dengan frasa pembuka pembawaan theme
              </span>
              <input
                type="checkbox"
                checked={options.startWithLorem}
                onChange={(e) => setOptions((prev) => ({ ...prev, startWithLorem: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                Sertakan Tag Format HTML (<code>&lt;p&gt;</code>, <code>&lt;li&gt;</code>)
              </span>
              <input
                type="checkbox"
                checked={options.includeHtml}
                onChange={(e) => setOptions((prev) => ({ ...prev, includeHtml: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                Tambahkan Cetak Tebal (<b>bold</b>) & Miring (<i>italic</i>)
              </span>
              <input
                type="checkbox"
                checked={options.addDecoration}
                onChange={(e) => setOptions((prev) => ({ ...prev, addDecoration: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                Tambahkan Tag Kode Inline (<code>&lt;code&gt;</code>)
              </span>
              <input
                type="checkbox"
                checked={options.addCodeTags}
                onChange={(e) => setOptions((prev) => ({ ...prev, addCodeTags: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900 cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Tip: Tekan <b>Ctrl + Enter</b> kapan saja untuk generate ulang cepat.</span>
          </div>
        </div>

        {/* RIGHT: GENERATED OUTPUT DISPLAY & ACTIONS (7 cols) */}
        <div className={`lg:col-span-7 flex flex-col space-y-4 ${isFullScreen ? "fixed inset-4 z-50 glass-panel p-6 rounded-2xl overflow-hidden space-y-4" : ""}`}>
          {/* Top Bar: View Format Tabs & Action Buttons */}
          <div className="glass-panel p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            {/* View Format Tabs */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {[
                { id: "plain", label: "Teks Polos" },
                { id: "html", label: "HTML" },
                { id: "markdown", label: "Markdown" },
                { id: "json", label: "JSON" }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setViewFormat(fmt.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewFormat === fmt.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => handleCopy(viewFormat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
              >
                {copiedFormat === viewFormat ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedFormat === viewFormat ? "Tersalin!" : "Salin Teks"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                title="Unduh file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Unduh</span>
              </button>

              <button
                onClick={handleBookmark}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
                title="Simpan ke Riwayat"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Simpan</span>
              </button>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title={isFullScreen ? "Kecilkan Layar" : "Layar Penuh"}
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Search / Filter Filter inside output */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Cari kata kunci dalam teks hasil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* TEXT OUTPUT AREA */}
          <div className={`glass-panel rounded-2xl p-5 overflow-y-auto flex-1 font-mono text-sm leading-relaxed border border-slate-800 bg-slate-950/60 ${isFullScreen ? "h-full" : "min-h-[320px] max-h-[500px]"}`}>
            {isPending ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-3 text-slate-400">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                <p className="text-xs">Menggenerasi teks baru...</p>
              </div>
            ) : lines.length === 0 ? (
              <p className="text-slate-500 text-xs italic">Belum ada teks yang digenerasi.</p>
            ) : (
              <div className="whitespace-pre-wrap selection:bg-indigo-500 selection:text-white">
                {viewFormat === "json" ? (
                  <pre className="text-emerald-400 text-xs font-mono">{currentFormattedText}</pre>
                ) : (
                  <HighlightedText text={currentFormattedText} highlight={searchQuery} />
                )}
              </div>
            )}
          </div>

          {/* LIVE STATISTICS FOOTER */}
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
        </div>
      </div>
    </div>
  );
}

// Component to highlight searched words
function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-400/30 text-amber-200 px-0.5 rounded border border-amber-400/40">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
