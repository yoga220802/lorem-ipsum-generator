"use client";

import React from "react";
import { ThemeSelector } from "./ThemeSelector";
import { GeneratorControls } from "./GeneratorControls";
import { OutputDisplay } from "./OutputDisplay";
import { TextStatsFooter } from "./TextStatsFooter";
import { useLoremGenerator } from "@/hooks/useLoremGenerator";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useToast } from "@/context/ToastContext";

export function LoremGenerator() {
  const { showToast } = useToast();
  const {
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
  } = useLoremGenerator();

  // Keyboard shortcut: Ctrl/Cmd + Enter to regenerate
  useKeyboardShortcut(
    { key: "Enter", ctrlOrMeta: true },
    () => {
      handleGenerate();
      showToast("Diperbarui!", "Teks berhasil digenerate ulang.", "info");
    },
    [handleGenerate, showToast]
  );

  return (
    <div className="space-y-8">
      {/* 1. Preset Themes */}
      <ThemeSelector
        selectedThemeId={options.themeId}
        onSelectTheme={(themeId) => setOptions((prev) => ({ ...prev, themeId }))}
      />

      {/* 2. Controls & Output Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Controls (5 cols) */}
        <div className="lg:col-span-5">
          <GeneratorControls
            options={options}
            setOptions={setOptions}
            onGenerate={handleGenerate}
            isPending={isPending}
          />
        </div>

        {/* Right Column: Output & Stats (7 cols) */}
        <div
          className={`lg:col-span-7 flex flex-col space-y-4 ${
            isFullScreen
              ? "fixed inset-4 z-50 glass-panel p-6 rounded-2xl overflow-hidden space-y-4"
              : ""
          }`}
        >
          <OutputDisplay
            lines={lines}
            currentFormattedText={currentFormattedText}
            viewFormat={viewFormat}
            setViewFormat={setViewFormat}
            copiedFormat={copiedFormat}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            isPending={isPending}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onBookmark={handleBookmark}
          />

          <TextStatsFooter stats={stats} />
        </div>
      </div>
    </div>
  );
}
