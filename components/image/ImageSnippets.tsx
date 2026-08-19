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
    <div className="sakode-card">
      <div className="sakode-card-section">
        <h4 className="font-extrabold text-[var(--text)] text-xs uppercase tracking-wider">
          Salin URL &amp; Snippet Kode
        </h4>
      </div>

      <div className="sakode-card-section space-y-3.5">
        {/* Direct URL */}
        <div className="space-y-1">
          <span className="text-[11px] text-[var(--text-muted)] font-bold">Direct Image URL</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={imageUrl}
              className="font-mono text-xs text-[#71cffe] bg-[var(--surface-subtle)]"
            />
            <button
              onClick={() => onCopy(imageUrl, "URL Direct")}
              className="btn-sakode-primary text-xs py-2 px-3 shrink-0"
            >
              {copiedType === "URL Direct" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin</span>
            </button>
          </div>
        </div>

        {/* HTML Tag */}
        <div className="space-y-1">
          <span className="text-[11px] text-[var(--text-muted)] font-bold">HTML Tag (&lt;img&gt;)</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={htmlTag}
              className="font-mono text-xs text-[#10b981] bg-[var(--surface-subtle)]"
            />
            <button
              onClick={() => onCopy(htmlTag, "Tag HTML")}
              className="btn-sakode-secondary text-xs py-2 px-3 shrink-0"
            >
              {copiedType === "Tag HTML" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin</span>
            </button>
          </div>
        </div>

        {/* Markdown Tag */}
        <div className="space-y-1">
          <span className="text-[11px] text-[var(--text-muted)] font-bold">Markdown Snippet (![])</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={markdownTag}
              className="font-mono text-xs text-[#bc71fe] bg-[var(--surface-subtle)]"
            />
            <button
              onClick={() => onCopy(markdownTag, "Snippet Markdown")}
              className="btn-sakode-secondary text-xs py-2 px-3 shrink-0"
            >
              {copiedType === "Snippet Markdown" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
