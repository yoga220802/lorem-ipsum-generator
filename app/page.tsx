import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoremGenerator } from "@/components/lorem/LoremGenerator";

export const metadata: Metadata = {
  title: "Generator Teks Mock & Lorem Ipsum Multi-Tema",
  description:
    "Generate teks dummy & placeholder siap pakai dalam 6 gaya bahasa: Latin klasik Cicero, tema budaya Nusantara Indonesia, istilah developer Tech, Corporate buzzwords, hingga Slang anak muda.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Generator Teks Mock & Lorem Ipsum Multi-Tema | Sakode MockLab",
    description:
      "Teks placeholder Latin, Nusantara Indonesia, Tech, Corporate, dan Slang untuk prototyping UI web & mobile.",
    url: "/",
  }
};

export default function HomePage() {
  return (
    <>
      <SectionHeader
        titlePrefix="Generator"
        highlightText="Mock Teks & Lorem"
        highlightColor="text-[#71cffe]"
        titleSuffix="Multi-Tema"
        description="Hasilkan teks Latin klasik, nusantara Indonesia, tech, bisnis buzzwords, hingga slang anak muda untuk placeholder desain UI Anda."
      />
      <LoremGenerator />
    </>
  );
}
