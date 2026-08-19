import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoremGenerator } from "@/components/lorem/LoremGenerator";

export const metadata: Metadata = {
  title: "Generator Lorem Ipsum & Teks Dummy Indonesia",
  description:
    "Hasilkan teks Latin klasik Cicero, tema nusantara Indonesia, istilah developer tech, corporate buzzwords, dan bahasa gaul anak muda untuk mockup desain Anda."
};

export default function HomePage() {
  return (
    <>
      <SectionHeader
        titlePrefix="Generator"
        gradientText="Lorem Ipsum"
        titleSuffix="& Teks Dummy"
        description="Hasilkan teks Latin klasik, nusantara Indonesia, tech, bisnis buzzwords, hingga slang anak muda untuk placeholder desain UI Anda."
      />
      <LoremGenerator />
    </>
  );
}
