import React from "react";
import { Copy, Check } from "lucide-react";

interface ImageSnippetsProps {
  imageUrl: string;
  htmlTag: string;
  markdownTag: string;
  copiedType: string | null;
  onCopy: (text: string, label: string) => void;
}

export function ImageSnippets({
  imageUrl,
  htmlTag,
  markdownTag,
  copiedType,
  onCopy
}: ImageSnippetsProps) {
  return (
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
            onClick={() => onCopy(imageUrl, "URL Direct")}
            className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
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
            onClick={() => onCopy(htmlTag, "Tag HTML")}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1 border border-slate-700 transition-colors shrink-0 cursor-pointer"
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
            onClick={() => onCopy(markdownTag, "Snippet Markdown")}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1 border border-slate-700 transition-colors shrink-0 cursor-pointer"
          >
            {copiedType === "Snippet Markdown" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Salin</span>
          </button>
        </div>
      </div>
    </div>
  );
}
