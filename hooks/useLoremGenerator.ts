"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { GeneratorOptions, TextStats, ExportFormat } from "@/types/lorem";
import { generateLoremText, calculateTextStats, formatOutput } from "@/lib/generators/lorem";
import { downloadTextFile } from "@/lib/utils/download";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { PRESET_THEMES } from "@/lib/data/themes";
import { useToast } from "@/context/ToastContext";
import { useHistory } from "@/context/HistoryContext";

const INITIAL_OPTIONS: GeneratorOptions = {
  themeId: "latin",
  type: "paragraphs",
  count: 3,
  paragraphLength: "medium",
  startWithLorem: true,
  includeHtml: false,
  addDecoration: false,
  addCodeTags: false
};

const INITIAL_STATS: TextStats = {
  paragraphs: 0,
  sentences: 0,
  words: 0,
  charactersWithSpaces: 0,
  charactersWithoutSpaces: 0,
  readingTimeMinutes: 0,
  readingTimeFormatted: "0 dtk"
};

export function useLoremGenerator() {
  const { showToast } = useToast();
  const { saveToHistory } = useHistory();

  const [options, setOptions] = useState<GeneratorOptions>(INITIAL_OPTIONS);
  const [lines, setLines] = useState<string[]>([]);
  const [stats, setStats] = useState<TextStats>(INITIAL_STATS);

  const [viewFormat, setViewFormat] = useState<ExportFormat>("plain");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = useCallback(() => {
    startTransition(() => {
      const generated = generateLoremText(options);
      setLines(generated);
      setStats(calculateTextStats(generated));
    });
  }, [options]);

  useEffect(() => {
    handleGenerate();
  }, [options, handleGenerate]);

  const currentFormattedText = formatOutput(lines, viewFormat);

  const handleCopy = async (format: ExportFormat = viewFormat) => {
    const textToCopy = formatOutput(lines, format);
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopiedFormat(format);
      showToast("Teks Disalin!", `Format ${format.toUpperCase()} berhasil disalin ke clipboard.`, "success");
      setTimeout(() => setCopiedFormat(null), 2000);
    } else {
      showToast("Gagal Menyalin", "Tidak dapat menyalin teks ke clipboard.", "error");
    }
  };

  const handleDownload = () => {
    const filename = `sakode-lorem-${options.themeId}-${Date.now()}`;
    downloadTextFile(currentFormattedText, filename, viewFormat);
    showToast("File Diunduh!", `Format ${viewFormat.toUpperCase()} telah disimpan.`, "success");
  };

  const handleBookmark = () => {
    const themeName = PRESET_THEMES[options.themeId]?.name || "Lorem Ipsum";
    saveToHistory(formatOutput(lines, "plain"), themeName);
    showToast("Tersimpan!", "Hasil generator disimpan ke riwayat Anda.", "success");
  };

  return {
    options,
    setOptions,
    lines,
    stats,
    viewFormat,
    setViewFormat,
    copiedFormat,
    searchQuery,
    setSearchQuery,
    isFullScreen,
    setIsFullScreen,
    isPending,
    currentFormattedText,
    handleGenerate,
    handleCopy,
    handleDownload,
    handleBookmark
  };
}
