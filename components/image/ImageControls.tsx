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
    <div className="glass-panel p-5 rounded-2xl space-y-5">
      <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 pb-2 border-b border-slate-800">
        <Sliders className="w-4 h-4 text-indigo-400" />
        Parameter Dimensi & Warna
      </h3>

      {/* Provider Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Layanan Provider
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PROVIDERS.map((prov) => (
            <button
              key={prov.id}
              onClick={() => setOptions((prev) => ({ ...prev, provider: prov.id }))}
              className={`py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                options.provider === prov.id
                  ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {prov.name}
            </button>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Preset Ukuran Standar
        </label>
        <div className="flex flex-wrap gap-1.5">
          {IMAGE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p.width, p.height, p.name.split(" ")[0])}
              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Width & Height */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Lebar (Width - px)</label>
          <input
            type="number"
            min={50}
            max={3000}
            value={options.width}
            onChange={(e) => setOptions((prev) => ({ ...prev, width: parseInt(e.target.value) || 100 }))}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Tinggi (Height - px)</label>
          <input
            type="number"
            min={50}
            max={3000}
            value={options.height}
            onChange={(e) => setOptions((prev) => ({ ...prev, height: parseInt(e.target.value) || 100 }))}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Colors & Custom Text (Placehold.co only) */}
      {options.provider === "placehold" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Warna Latar (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${options.bgColor.replace("#", "")}`}
                  onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value.replace("#", "") }))}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={options.bgColor}
                  onChange={(e) => setOptions((prev) => ({ ...prev, bgColor: e.target.value }))}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Warna Teks (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${options.textColor.replace("#", "")}`}
                  onChange={(e) => setOptions((prev) => ({ ...prev, textColor: e.target.value.replace("#", "") }))}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={options.textColor}
                  onChange={(e) => setOptions((prev) => ({ ...prev, textColor: e.target.value }))}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Teks Label Kustom</label>
            <input
              type="text"
              value={options.customText}
              onChange={(e) => setOptions((prev) => ({ ...prev, customText: e.target.value }))}
              placeholder="Contoh: Banner Utama 800x450"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  );
}
