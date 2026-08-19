export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

export interface HistoryItem {
  id: string;
  themeName: string;
  text: string;
  timestamp: string;
}

export type ActiveTab = "lorem" | "users" | "image";
