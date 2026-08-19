import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DummyUserGenerator } from "@/components/users/DummyUserGenerator";

export const metadata: Metadata = {
  title: "Generator Data User Indonesia (Dummy User)",
  description:
    "Hasilkan sampel profil pengguna lengkap dengan NIK, email, no HP, pekerjaan, perusahaan, dan foto avatar khas Indonesia untuk pengujian API & database."
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
