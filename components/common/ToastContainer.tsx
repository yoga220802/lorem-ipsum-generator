"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { ToastMessage } from "@/types/common";

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
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
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />
  };

  const borderColors = {
    success: "border-emerald-500/30 bg-emerald-950/40 text-emerald-100",
    error: "border-rose-500/30 bg-rose-950/40 text-rose-100",
    info: "border-indigo-500/30 bg-indigo-950/40 text-indigo-100"
  };

  return (
    <div
      className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl animate-toast ${borderColors[toast.type]}`}
    >
      <div className="flex items-start gap-3">
        {icons[toast.type]}
        <div>
          <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
          {toast.message && <p className="text-xs opacity-80 mt-1">{toast.message}</p>}
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-white transition-colors p-1 rounded-md cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
