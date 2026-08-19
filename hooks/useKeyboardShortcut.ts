"use client";

import { useEffect } from "react";

interface KeyCombo {
  key: string;
  ctrlOrMeta?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function useKeyboardShortcut(
  combo: KeyCombo,
  callback: () => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchKey = e.key.toLowerCase() === combo.key.toLowerCase();
      const matchCtrl = combo.ctrlOrMeta ? e.ctrlKey || e.metaKey : true;
      const matchShift = combo.shift ? e.shiftKey : true;
      const matchAlt = combo.alt ? e.altKey : true;

      if (matchKey && matchCtrl && matchShift && matchAlt) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [combo.key, combo.ctrlOrMeta, combo.shift, combo.alt, callback, ...deps]);
}
