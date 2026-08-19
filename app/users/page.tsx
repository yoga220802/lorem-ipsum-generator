import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DummyUserGenerator } from "@/components/users/DummyUserGenerator";

export const metadata: Metadata = {
  title: "Generator Data User Indonesia (Dummy Profil & NIK)",
  description:
    "Buat data dummy profil pengguna Indonesia lengkap dengan NIK 16 digit, email, no HP +62, pekerjaan, nama perusahaan lokal, dan foto avatar realistis untuk seeding database dan testing API.",
  alternates: {
    canonical: "/users",
  },
  openGraph: {
    title: "Generator Data User Indonesia Realistis | Sakode MockLab",
    description:
      "Generate dummy user profile Indonesia: NIK, nama lengkap, kontak, pekerjaan, dan avatar untuk testing database & API mockup.",
    url: "/users",
  }
};

export default function UsersPage() {
  return (
    <>
      <SectionHeader
        titlePrefix="Generator"
        gradientText="Data User"
        titleSuffix="Indonesia"
        description="Hasilkan sampel profil pengguna lengkap dengan NIK, email, kontak, pekerjaan, dan foto avatar khas Indonesia."
      />
      <DummyUserGenerator />
    </>
  );
}
