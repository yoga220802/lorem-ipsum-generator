import React from "react";
import { ExternalLink } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  width: number;
  height: number;
}

export function ImagePreview({ imageUrl, width, height }: ImagePreviewProps) {
  return (
    <div className="sakode-card overflow-hidden">
      <div className="sakode-card-section flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--text)]">
          Preview Visual ({width} &times; {height} px)
        </span>
        <a
          href={imageUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-[#71cffe] hover:underline flex items-center gap-1"
        >
          <span>Buka Direct URL</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="p-6 bg-[var(--bg)] flex items-center justify-center min-h-[220px]">
        <img
          src={imageUrl}
          alt="Placeholder Preview"
          className="max-h-[280px] max-w-full object-contain rounded-[var(--r-sm)] border border-[var(--border)] shadow-md"
        />
      </div>
    </div>
  );
}
