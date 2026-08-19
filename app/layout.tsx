import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { HistoryProvider } from "@/context/HistoryContext";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { HistoryDrawer } from "@/components/common/HistoryDrawer";
import { ToastContainer } from "@/components/common/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sakode - Lorem Ipsum & Dummy Text Generator Indonesia",
    template: "%s | Sakode Generator"
  },
  description:
    "Generator Teks Lorem Ipsum, Nusantara Indonesia, Tech Terms, Buzzwords, Dummy User Indonesia, dan Placeholder Gambar untuk pengujian desain UI & web.",
  keywords: [
    "lorem ipsum indonesia",
    "generator lorem ipsum",
    "dummy text generator",
    "teks dummy indonesia",
    "nusantara ipsum",
    "placeholder text",
    "dummy user generator",
    "placeholder image generator"
  ],
  authors: [{ name: "Sakode" }],
  creator: "Sakode"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white"
        suppressHydrationWarning
      >
        <ToastProvider>
          <HistoryProvider>
            <div className="min-h-screen flex flex-col justify-between">
              <div>
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                  {children}
                </main>
              </div>
              <Footer />
            </div>

            {/* Global Overlays */}
            <HistoryDrawer />
            <ToastContainer />
          </HistoryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
