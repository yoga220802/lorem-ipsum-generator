import React from "react";
import { ExternalLink } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  width: number;
  height: number;
}

export function ImagePreview({ imageUrl, width, height }: ImagePreviewProps) {
  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center space-y-3 min-h-[280px]">
      <div className="flex items-center justify-between w-full pb-2 border-b border-slate-800 text-xs text-slate-400">
        <span>
          Preview Visual ({width} x {height} px)
        </span>
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
  );
}
