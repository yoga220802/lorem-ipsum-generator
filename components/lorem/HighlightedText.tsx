import React from "react";

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

export function HighlightedText({ text, highlight }: HighlightedTextProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-400/30 text-amber-200 px-0.5 rounded border border-amber-400/40">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
