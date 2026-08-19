"use client";

import React, { useState, useMemo } from "react";
import { Image as ImageIcon } from "lucide-react";
import { ImagePlaceholderOptions } from "@/types/image";
import {
  buildImageUrl,
  buildHtmlImageSnippet,
  buildMarkdownImageSnippet
} from "@/lib/generators/image";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { useToast } from "@/context/ToastContext";
import { ImageControls } from "./ImageControls";
import { ImagePreview } from "./ImagePreview";
import { ImageSnippets } from "./ImageSnippets";

const INITIAL_IMAGE_OPTIONS: ImagePlaceholderOptions = {
  provider: "placehold",
  width: 800,
  height: 450,
  bgColor: "1e293b",
  textColor: "f8fafc",
  customText: "Sakode Placeholder 800x450"
};

export function ImagePlaceholderGenerator() {
  const { showToast } = useToast();
  const [options, setOptions] = useState<ImagePlaceholderOptions>(INITIAL_IMAGE_OPTIONS);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const imageUrl = useMemo(() => buildImageUrl(options), [options]);
  const htmlTag = useMemo(
    () => buildHtmlImageSnippet(imageUrl, options.customText, options.width, options.height),
    [imageUrl, options.customText, options.width, options.height]
  );
  const markdownTag = useMemo(
    () => buildMarkdownImageSnippet(imageUrl, options.customText),
    [imageUrl, options.customText]
  );

  const handleCopy = async (text: string, label: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedType(label);
      showToast("Tersalin!", `${label} berhasil disalin ke clipboard.`, "success");
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
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
        {/* Left Column: Controls (5 cols) */}
        <div className="lg:col-span-5">
          <ImageControls options={options} setOptions={setOptions} />
        </div>

        {/* Right Column: Preview & Snippets (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <ImagePreview imageUrl={imageUrl} width={options.width} height={options.height} />
          <ImageSnippets
            imageUrl={imageUrl}
            htmlTag={htmlTag}
            markdownTag={markdownTag}
            copiedType={copiedType}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
