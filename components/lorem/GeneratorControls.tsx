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
    <div className="sakode-card">
      {/* Card Header */}
      <div className="sakode-card-section flex items-center justify-between">
        <div className="sakode-lbl mb-0">
          <div className="sakode-lbl-num">2</div>
          <span>Pengaturan Generator</span>
        </div>
        <button
          onClick={onGenerate}
          className="btn-sakode-primary text-xs py-1.5 px-3"
          title="Acak Ulang (Ctrl + Enter)"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
          <span>Generate Ulang</span>
        </button>
      </div>

      {/* Output Type Selector */}
      <div className="sakode-card-section space-y-2">
        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
          Tipe Output
        </label>
        <div className="grid grid-cols-3 gap-2">
          {OUTPUT_TYPES.map((item) => (
            <button
              key={item.id}
              onClick={() => setOptions((prev) => ({ ...prev, type: item.id }))}
              className={`py-2 px-2 rounded-[var(--r-sm)] text-xs font-bold border transition-all cursor-pointer text-center ${
                options.type === item.id
                  ? "bg-[#71cffe] text-[#172033] border-[#71cffe] shadow-xs"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hi)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Slider */}
      <div className="sakode-card-section space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Jumlah ({options.type === "paragraphs" ? "Paragraf" : options.type === "sentences" ? "Kalimat" : "Item"})
          </label>
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-[var(--r-sm)] bg-[var(--primary-soft)] text-[var(--text)] border border-[color-mix(in_srgb,var(--primary)_40%,transparent)]">
            {options.count}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={maxCount}
          value={options.count}
          onChange={(e) => setOptions((prev) => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
        />
        <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-[var(--text-muted)] pt-1">
          <span>Quick:</span>
          {QUICK_COUNTS.map((num) => (
            <button
              key={num}
              onClick={() => setOptions((prev) => ({ ...prev, count: num }))}
              className="px-2 py-0.5 rounded-[4px] bg-[var(--surface-subtle)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--text)] transition-colors cursor-pointer"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Paragraph Length (if paragraphs) */}
      {options.type === "paragraphs" && (
        <div className="sakode-card-section space-y-2">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Panjang Paragraf
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PARAGRAPH_LENGTHS.map((len) => (
              <button
                key={len.id}
                onClick={() => setOptions((prev) => ({ ...prev, paragraphLength: len.id }))}
                className={`py-1.5 rounded-[var(--r-sm)] text-xs font-bold border text-center transition-all cursor-pointer ${
                  options.paragraphLength === len.id
                    ? "bg-[#71cffe] text-[#172033] border-[#71cffe]"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {len.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Switches / Checkboxes */}
      <div className="sakode-card-section space-y-3">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-bold text-[var(--text)] group-hover:text-[#71cffe] transition-colors">
            Mulai dengan frasa pembuka tema
          </span>
          <input
            type="checkbox"
            checked={options.startWithLorem}
            onChange={(e) => setOptions((prev) => ({ ...prev, startWithLorem: e.target.checked }))}
            className="w-4 h-4 rounded accent-[#71cffe] cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-bold text-[var(--text)] group-hover:text-[#71cffe] transition-colors">
            Sertakan Tag Format HTML (<code>&lt;p&gt;</code>, <code>&lt;li&gt;</code>)
          </span>
          <input
            type="checkbox"
            checked={options.includeHtml}
            onChange={(e) => setOptions((prev) => ({ ...prev, includeHtml: e.target.checked }))}
            className="w-4 h-4 rounded accent-[#71cffe] cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-bold text-[var(--text)] group-hover:text-[#71cffe] transition-colors">
            Tambahkan Format Tebal (<b>bold</b>) & Miring (<i>italic</i>)
          </span>
          <input
            type="checkbox"
            checked={options.addDecoration}
            onChange={(e) => setOptions((prev) => ({ ...prev, addDecoration: e.target.checked }))}
            className="w-4 h-4 rounded accent-[#71cffe] cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-bold text-[var(--text)] group-hover:text-[#71cffe] transition-colors">
            Tambahkan Tag Kode Inline (<code>&lt;code&gt;</code>)
          </span>
          <input
            type="checkbox"
            checked={options.addCodeTags}
            onChange={(e) => setOptions((prev) => ({ ...prev, addCodeTags: e.target.checked }))}
            className="w-4 h-4 rounded accent-[#71cffe] cursor-pointer"
          />
        </label>
      </div>

      <div className="p-3 bg-[var(--surface-subtle)] text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#71cffe] shrink-0" />
        <span>Pintasan: Tekan <b>Ctrl + Enter</b> untuk generate ulang cepat.</span>
      </div>
    </div>
  );
}
