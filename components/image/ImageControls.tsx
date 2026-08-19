import React from "react";
import { Sliders } from "lucide-react";
import { ImagePlaceholderOptions, ImageProvider } from "@/types/image";
import { IMAGE_PRESETS } from "@/lib/generators/image";

interface ImageControlsProps {
  options: ImagePlaceholderOptions;
  setOptions: React.Dispatch<React.SetStateAction<ImagePlaceholderOptions>>;
}

const PROVIDERS: { id: ImageProvider; name: string }[] = [
  { id: "placehold", name: "Placehold.co" },
  { id: "picsum", name: "Picsum Photos" },
  { id: "unsplash", name: "Unsplash Art" }
];

const COLOR_PRESETS = ["1e293b", "0f172a", "71cffe", "f9723b", "bc71fe", "10b981", "ffffff"];

export function ImageControls({ options, setOptions }: ImageControlsProps) {
  const applyPreset = (w: number, h: number, label: string) => {
    setOptions((prev) => ({
      ...prev,
      width: w,
      height: h,
      customText: `Banner ${label} ${w}x${h}`
    }));
  };

  return (
    <div className="sakode-card">
      {/* Header */}
      <div className="sakode-card-section">
        <div className="sakode-lbl mb-0">
          <div className="sakode-lbl-num">1</div>
          <span>Parameter Dimensi & Warna</span>
        </div>
      </div>

      {/* Provider Selector */}
      <div className="sakode-card-section space-y-2">
        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
          Layanan Provider
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PROVIDERS.map((prov) => (
            <button
              key={prov.id}
              onClick={() => setOptions((prev) => ({ ...prev, provider: prov.id }))}
              className={`py-2 px-2 rounded-[var(--r-sm)] text-xs font-bold border text-center transition-all cursor-pointer ${
                options.provider === prov.id
                  ? "bg-[#71cffe] text-[#172033] border-[#71cffe] shadow-xs font-extrabold"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {prov.name}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Ukuran Standar */}
      <div className="sakode-card-section space-y-2">
        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
          Preset Ukuran Standar
        </label>
        <div className="flex flex-wrap gap-1.5">
          {IMAGE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p.width, p.height, p.name.split(" ")[0])}
              className="px-2.5 py-1 rounded-[var(--r-sm)] bg-[var(--surface-subtle)] hover:bg-[var(--border)] text-[var(--text)] border border-[var(--border)] text-[11px] font-bold transition-colors cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Width & Height */}
      <div className="sakode-card-section grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[var(--text-muted)]">Lebar (Width - px)</label>
          <input
            type="number"
            min={50}
            max={3000}
            value={options.width}
            onChange={(e) => setOptions((prev) => ({ ...prev, width: parseInt(e.target.value) || 100 }))}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[var(--text-muted)]">Tinggi (Height - px)</label>
          <input
            type="number"
            min={50}
            max={3000}
            value={options.height}
            onChange={(e) => setOptions((prev) => ({ ...prev, height: parseInt(e.target.value) || 100 }))}
          />
        </div>
      </div>

      {/* Colors & Custom Text (Placehold.co only) */}
      {options.provider === "placehold" && (
        <div className="sakode-card-section space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Background Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-muted)]">Warna Latar (Hex)</label>
              <div className="flex items-center gap-2 p-1.5 rounded-[var(--r-sm)] bg-[var(--surface)] border border-[var(--border)]">
                <input
                  type="color"
                  value={`#${options.bgColor.replace("#", "")}`}
                  onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value.replace("#", "") }))}
                  className="w-7 h-7 rounded-[4px] cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={options.bgColor}
                  onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value }))}
                  className="font-mono text-xs border-0 p-0 shadow-none focus:shadow-none focus:border-0"
                />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-muted)]">Warna Teks (Hex)</label>
              <div className="flex items-center gap-2 p-1.5 rounded-[var(--r-sm)] bg-[var(--surface)] border border-[var(--border)]">
                <input
                  type="color"
                  value={`#${options.textColor.replace("#", "")}`}
                  onChange={(e) => setOptions((prev) => ({ ...prev, textColor: e.target.value.replace("#", "") }))}
                  className="w-7 h-7 rounded-[4px] cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={options.textColor}
                  onChange={(e) => setOptions((prev) => ({ ...prev, textColor: e.target.value }))}
                  className="font-mono text-xs border-0 p-0 shadow-none focus:shadow-none focus:border-0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-muted)]">Teks Label Kustom</label>
            <input
              type="text"
              value={options.customText}
              onChange={(e) => setOptions((prev) => ({ ...prev, customText: e.target.value }))}
              placeholder="Contoh: Banner Utama 800x450"
            />
          </div>
        </div>
      )}
    </div>
  );
}
