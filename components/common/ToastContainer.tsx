"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { ToastMessage } from "@/types/common";

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#ef4444] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#71cffe] shrink-0" />
  };

  const borderStyles = {
    success: "border-[#10b981]/40 bg-[var(--surface)] text-[var(--text)] shadow-lg shadow-[#10b981]/5",
    error: "border-[#ef4444]/40 bg-[var(--surface)] text-[var(--text)] shadow-lg shadow-[#ef4444]/5",
    info: "border-[#71cffe]/40 bg-[var(--surface)] text-[var(--text)] shadow-lg shadow-[#71cffe]/5"
  };

  return (
    <div
      className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-[var(--r)] border backdrop-blur-md animate-toast ${borderStyles[toast.type]}`}
    >
      <div className="flex items-start gap-3">
        {icons[toast.type]}
        <div>
          <h4 className="font-extrabold text-xs sm:text-sm leading-tight text-[var(--text)]">{toast.title}</h4>
          {toast.message && <p className="text-xs font-semibold text-[var(--text-muted)] mt-0.5">{toast.message}</p>}
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1 rounded-md cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
