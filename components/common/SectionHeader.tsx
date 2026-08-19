import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  titlePrefix: string;
  highlightText: string;
  highlightColor?: string; // e.g. "text-[#71cffe]", "text-[#bc71fe]", "text-[#f9723b]"
  titleSuffix?: string;
  description: string;
}

export function SectionHeader({
  eyebrow = "SAKODE ECOSYSTEM — FREE DEVELOPER TOOLS",
  titlePrefix,
  highlightText,
  highlightColor = "text-[#71cffe]",
  titleSuffix,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 pt-2 pb-6 border-b border-[var(--border)]">
      <div className="flex flex-col max-w-3xl">
        <span className="text-[11px] font-extrabold tracking-wider uppercase text-[var(--primary)] mb-2 inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
          {eyebrow}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight mb-2">
          {titlePrefix}{" "}
          <span className={highlightColor}>
            {highlightText}
          </span>
          {titleSuffix ? ` ${titleSuffix}` : ""}
        </h1>
        <p className="text-sm sm:text-[15px] font-semibold text-[var(--text-muted)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
