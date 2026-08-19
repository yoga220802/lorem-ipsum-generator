"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { HistoryItem } from "@/types/common";

const STORAGE_KEY = "sakode_lorem_history";

interface HistoryContextValue {
  history: HistoryItem[];
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  saveToHistory: (text: string, themeName: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load history from localStorage", err);
    }
  }, []);

  const saveToHistory = useCallback((text: string, themeName: string) => {
    const newItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      themeName,
      text: text.slice(0, 300) + (text.length > 300 ? "..." : ""),
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.slice(0, 19)]; // Keep max 20 items
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save history", err);
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        isHistoryOpen,
        setIsHistoryOpen,
        saveToHistory,
        clearHistory
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory(): HistoryContextValue {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}
