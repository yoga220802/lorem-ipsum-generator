"use client";

import React from "react";
import { Sliders, RefreshCw, Info } from "lucide-react";
import { GeneratorOptions, OutputType, ParagraphLength } from "@/types/lorem";

interface GeneratorControlsProps {
  options: GeneratorOptions;
  setOptions: React.Dispatch<React.SetStateAction<GeneratorOptions>>;
  onGenerate: () => void;
  isPending: boolean;
}

const OUTPUT_TYPES: { id: OutputType; label: string }[] = [
  { id: "paragraphs", label: "Paragraf" },
  { id: "sentences", label: "Kalimat" },
  { id: "words", label: "Kata" },
  { id: "list_unordered", label: "List Bullets" },
  { id: "list_ordered", label: "List Angka" },
  { id: "html_structure", label: "Struktur HTML" }
];

const PARAGRAPH_LENGTHS: { id: ParagraphLength; label: string }[] = [
  { id: "short", label: "Pendek" },
  { id: "medium", label: "Sedang" },
  { id: "long", label: "Panjang" },
  { id: "random", label: "Acak" }
];

const QUICK_COUNTS = [1, 3, 5, 10, 20, 50];

export function GeneratorControls({
  options,
  setOptions,
  onGenerate,
  isPending
}: GeneratorControlsProps) {
  const maxCount = options.type === "words" ? 200 : 50;

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-bold text-slate-200 flex items-center gap-2 text-base">
          <Sliders className="w-4 h-4 text-indigo-400" />
          Pengaturan Generator
        </h3>
        <button
          onClick={onGenerate}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
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
          {OUTPUT_TYPES.map((item) => (
            <button
              key={item.id}
              onClick={() => setOptions((prev) => ({ ...prev, type: item.id }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
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

      {/* Quantity Slider */}
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
          max={maxCount}
          value={options.count}
          onChange={(e) => setOptions((prev) => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400">
          <span>Quick:</span>
          {QUICK_COUNTS.map((num) => (
            <button
              key={num}
              onClick={() => setOptions((prev) => ({ ...prev, count: num }))}
              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Paragraph Length (if paragraphs) */}
      {options.type === "paragraphs" && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Panjang Paragraf
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PARAGRAPH_LENGTHS.map((len) => (
              <button
                key={len.id}
                onClick={() => setOptions((prev) => ({ ...prev, paragraphLength: len.id }))}
                className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
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
            Mulai dengan frasa pembuka tema
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
  );
}
