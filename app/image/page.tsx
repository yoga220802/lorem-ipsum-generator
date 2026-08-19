import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ImagePlaceholderGenerator } from "@/components/image/ImagePlaceholderGenerator";

export const metadata: Metadata = {
  title: "Generator Placeholder Gambar UI",
  description:
    "Hasilkan URL placeholder gambar dengan dimensi kustom, rasio aspek, warna latar, teks overlay, dan snippet tag HTML/Markdown untuk mockup website."
};

export default function ImagePage() {
  return (
    <>
      <SectionHeader
        titlePrefix="Generator"
        gradientText="Placeholder Gambar"
        titleSuffix="UI"
        description="Hasilkan URL placeholder gambar dengan dimensi kustom, rasio aspek, warna latar, dan overlay teks."
      />
      <ImagePlaceholderGenerator />
    </>
  );
}
