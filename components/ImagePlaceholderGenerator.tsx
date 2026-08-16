"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Copy,
  Check,
  ExternalLink,
  Download,
  Sliders,
  Sparkles,
  Maximize
} from "lucide-react";

interface ImagePlaceholderGeneratorProps {
  onShowToast: (title: string, message?: string, type?: "success" | "error" | "info") => void;
}

export function ImagePlaceholderGenerator({ onShowToast }: ImagePlaceholderGeneratorProps) {
  const [service, setService] = useState<"placehold" | "picsum" | "unsplash">("placehold");
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(450);
  const [bgColor, setBgColor] = useState<string>("1e293b");
  const [textColor, setTextColor] = useState<string>("f8fafc");
  const [customText, setCustomText] = useState<string>("Sakode Placeholder 800x450");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Construct URL based on selected service
  const getImageUrl = (): string => {
    const cleanBg = bgColor.replace("#", "");
    const cleanTextCol = textColor.replace("#", "");
    
    if (service === "placehold") {
      const textParam = customText ? `?text=${encodeURIComponent(customText)}` : "";
      return `https://placehold.co/${width}x${height}/${cleanBg}/${cleanTextCol}${textParam}`;
    }

    if (service === "picsum") {
      return `https://picsum.photos/${width}/${height}`;
    }

    // Unsplash source fallback
    return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
  };

  const imageUrl = getImageUrl();
  const htmlTag = `<img src="${imageUrl}" alt="${customText || "Placeholder Image"}" width="${width}" height="${height}" />`;
  const markdownTag = `![${customText || "Placeholder Image"}](${imageUrl})`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    onShowToast("Tersalin!", `${label} berhasil disalin ke clipboard.`, "success");
    setTimeout(() => setCopiedType(null), 2000);
  };

  const applyPreset = (w: number, h: number, label: string) => {
    setWidth(w);
    setHeight(h);
    setCustomText(`Banner ${label} ${w}x${h}`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            Generator Gambar Placeholder UI
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Buat URL gambar sampel kustom dengan dimensi, warna, dan label khusus untuk mockup website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: CONTROLS (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-5">
          <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Parameter Dimensi & Warna
          </h3>

          {/* Service Provider */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Layanan Provider
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "placehold", name: "Placehold.co" },
                { id: "picsum", name: "Picsum Photos" },
                { id: "unsplash", name: "Unsplash Art" }
              ].map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => setService(prov.id as any)}
                  className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    service === prov.id
                      ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {prov.name}
                </button>
              ))}
            </div>
          </div>

          {/* Presets Grid */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Preset Ukuran Standar
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { w: 1200, h: 630, name: "OG Banner (1200x630)" },
                { w: 800, h: 450, name: "HD 16:9 (800x450)" },
                { w: 600, h: 400, name: "Card (600x400)" },
                { w: 400, h: 400, name: "Avatar (400x400)" },
                { w: 375, h: 812, name: "Mobile (375x812)" }
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.w, p.h, p.name.split(" ")[0])}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors"
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
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tinggi (Height - px)</label>
              <input
                type="number"
                min={50}
                max={3000}
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Colors (for Placehold.co) */}
          {service === "placehold" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Warna Latar (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={`#${bgColor}`}
                      onChange={(e) => setBgColor(e.target.value.replace("#", ""))}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Warna Teks (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={`#${textColor}`}
                      onChange={(e) => setTextColor(e.target.value.replace("#", ""))}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Teks Label Kustom</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Contoh: Banner Utama 800x450"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>

        {/* RIGHT: PREVIEW & CODE TAGS (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Visual Image Preview */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center space-y-3 min-h-[280px]">
            <div className="flex items-center justify-between w-full pb-2 border-b border-slate-800 text-xs text-slate-400">
              <span>Preview Visual ({width} x {height} px)</span>
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-400 hover:underline"
              >
                <span>Buka Link Direct</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full flex items-center justify-center bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 overflow-hidden min-h-[200px]">
              <img
                src={imageUrl}
                alt="Placeholder Preview"
                className="max-h-[300px] w-auto object-contain rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Quick Copy URL & Tags */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Salin URL & Snippet Kode
            </h4>

            {/* Direct URL */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold">Direct Image URL</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={imageUrl}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(imageUrl, "URL Direct")}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors shrink-0"
                >
                  {copiedType === "URL Direct" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin</span>
                </button>
              </div>
            </div>

            {/* HTML Tag */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold">HTML Tag (&lt;img&gt;)</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={htmlTag}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(htmlTag, "Tag HTML")}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1 border border-slate-700 transition-colors shrink-0"
                >
                  {copiedType === "Tag HTML" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin</span>
                </button>
              </div>
            </div>

            {/* Markdown Tag */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold">Markdown Snippet (![])</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={markdownTag}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-amber-300 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(markdownTag, "Snippet Markdown")}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1 border border-slate-700 transition-colors shrink-0"
                >
                  {copiedType === "Snippet Markdown" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
