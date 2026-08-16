"use client";

import React, { useState, useEffect } from "react";
import { Navbar, ActiveTab } from "@/components/Navbar";
import { LoremGenerator } from "@/components/LoremGenerator";
import { DummyUserGenerator } from "@/components/DummyUserGenerator";
import { ImagePlaceholderGenerator } from "@/components/ImagePlaceholderGenerator";
import { HistoryDrawer, HistoryItem } from "@/components/HistoryDrawer";
import { ToastContainer, ToastMessage } from "@/components/Toast";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("lorem");
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load history from localStorage on client side
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sakode_lorem_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load history from localStorage", err);
    }
  }, []);

  // Save history to localStorage
  const handleSaveToHistory = (text: string, themeName: string) => {
    const newItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      themeName,
      text: text.slice(0, 300) + (text.length > 300 ? "..." : ""),
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...history.slice(0, 19)]; // Keep latest 20
    setHistory(updated);
    try {
      localStorage.setItem("sakode_lorem_history", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save history", err);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("sakode_lorem_history");
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  };

  // Toast Notification Helper
  const handleShowToast = (
    title: string,
    message?: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          historyCount={history.length}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />

        {/* Main Hero Header */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {/* Tab Banner Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {activeTab === "lorem" && (
                <>
                  Generator <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Lorem Ipsum</span> & Teks Dummy
                </>
              )}
              {activeTab === "users" && (
                <>
                  Generator <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Data User</span> Indonesia
                </>
              )}
              {activeTab === "image" && (
                <>
                  Generator <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Placeholder Gambar</span> UI
                </>
              )}
            </h1>

            <p className="text-sm text-slate-400">
              {activeTab === "lorem" &&
                "Hasilkan teks Latin klasik, nusantara Indonesia, tech, bisnis buzzwords, hingga slang anak muda untuk placeholder desain UI Anda."}
              {activeTab === "users" &&
                "Hasilkan sampel profil pengguna lengkap dengan NIK, email, kontak, pekerjaan, dan foto avatar khas Indonesia."}
              {activeTab === "image" &&
                "Hasilkan URL placeholder gambar dengan dimensi kustom, rasio aspek, warna latar, dan overlay teks."}
            </p>
          </div>

          {/* Active Tab View */}
          {activeTab === "lorem" && (
            <LoremGenerator
              onShowToast={handleShowToast}
              onSaveToHistory={handleSaveToHistory}
            />
          )}

          {activeTab === "users" && (
            <DummyUserGenerator onShowToast={handleShowToast} />
          )}

          {activeTab === "image" && (
            <ImagePlaceholderGenerator onShowToast={handleShowToast} />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* History Drawer Modal */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onShowToast={handleShowToast}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
