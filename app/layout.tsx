import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sakode - Lorem Ipsum & Dummy Text Generator Indonesia",
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
  ]
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
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
