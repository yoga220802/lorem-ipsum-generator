import type { Metadata, Viewport } from "next";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mocklab.sakode.com";

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sakode MockLab - All-in-One Mock & Dummy Data Toolkit Indonesia",
    template: "%s | Sakode MockLab",
  },
  description:
    "Toolkit generator data dummy dan mockup terlengkap untuk developer & designer: Lorem Ipsum multi-tema (Nusantara, Tech, Corporate, Slang), data user Indonesia realistis (NIK, email, profil), dan image placeholder UI.",
  applicationName: "Sakode MockLab",
  keywords: [
    "sakode mocklab",
    "mock data generator",
    "dummy data indonesia",
    "lorem ipsum indonesia",
    "nusantara ipsum",
    "dummy user generator indonesia",
    "nik generator dummy",
    "placeholder image generator",
    "developer tools indonesia",
    "ui mock data generator",
    "faker indonesia"
  ],
  authors: [{ name: "Sakode", url: "https://sakode.com" }],
  creator: "Sakode",
  publisher: "Sakode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Sakode MockLab",
    title: "Sakode MockLab - All-in-One Mock & Dummy Data Toolkit",
    description:
      "Generate teks dummy multi-tema, data profil user Indonesia realistis, dan placeholder gambar UI dalam hitungan detik.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakode MockLab - All-in-One Mock Data Toolkit",
    description:
      "Generator teks lorem multi-tema, data user Indonesia, dan image placeholder untuk developer & designer.",
    creator: "@sakode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// JSON-LD Structured Data Schema for Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sakode MockLab",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  description:
    "All-in-one Mock Data & Placeholder Generator for Developers and UI/UX Designers, featuring Indonesian text themes, realistic Indonesian user data, and UI image placeholders.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Sakode",
    url: "https://sakode.com",
  },
  featureList: [
    "Multi-theme Lorem Ipsum (Classic Latin, Nusantara Indonesia, Tech, Corporate, Slang, Foodie)",
    "Realistic Indonesian Dummy Users (NIK, Email, Phone, Avatars, Job Titles)",
    "Custom UI Image Placeholder Generator (Placehold, Picsum, Unsplash)",
    "Multi-format Export (Plain text, HTML, Markdown, JSON, CSV)"
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
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
