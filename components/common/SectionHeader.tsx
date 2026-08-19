import React from "react";

interface SectionHeaderProps {
  titlePrefix: string;
  gradientText: string;
  titleSuffix?: string;
  description: string;
}

export function SectionHeader({
  titlePrefix,
  gradientText,
  titleSuffix,
  description
}: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        {titlePrefix}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
          {gradientText}
        </span>
        {titleSuffix ? ` ${titleSuffix}` : ""}
      </h1>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
