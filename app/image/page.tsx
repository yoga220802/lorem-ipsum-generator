import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ImagePlaceholderGenerator } from "@/components/image/ImagePlaceholderGenerator";

export const metadata: Metadata = {
  title: "Generator Placeholder Gambar UI & Banner Mockup",
  description:
    "Generate URL gambar placeholder kustom dengan berbagai provider (Placehold.co, Picsum, Unsplash), preset rasio aspek (16:9, OG Banner, Avatar), custom color & label, serta snippet tag HTML dan Markdown.",
  alternates: {
    canonical: "/image",
  },
  openGraph: {
    title: "Generator Placeholder Gambar UI & Mockup Banner | Sakode MockLab",
    description:
      "URL dummy image placeholder fleksibel untuk mockup web dan aplikasi mobile.",
    url: "/image",
  }
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
