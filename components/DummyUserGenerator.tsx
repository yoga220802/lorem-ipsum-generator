"use client";

import React, { useState, useEffect } from "react";
import { generateDummyUsers, DummyUser } from "@/lib/lorem-generator";
import {
  Users,
  Copy,
  Check,
  Download,
  RefreshCw,
  Search,
  LayoutGrid,
  Table as TableIcon,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  UserCheck
} from "lucide-react";

interface DummyUserGeneratorProps {
  onShowToast: (title: string, message?: string, type?: "success" | "error" | "info") => void;
}

export function DummyUserGenerator({ onShowToast }: DummyUserGeneratorProps) {
  const [count, setCount] = useState<number>(6);
  const [users, setUsers] = useState<DummyUser[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [search, setSearch] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    const generated = generateDummyUsers(count);
    setUsers(generated);
  };

  useEffect(() => {
    handleGenerate();
  }, [count]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.profession.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Copy JSON Array
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(users, null, 2));
    setCopied(true);
    onShowToast("JSON Disalin!", `${users.length} data user disalin ke clipboard.`, "success");
    setTimeout(() => setCopied(false), 2000);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const headers = ["ID", "Nama", "Jenis Kelamin", "NIK", "Email", "No HP", "Kota", "Pekerjaan", "Perusahaan"];
    const rows = users.map((u) => [
      u.id,
      `"${u.name}"`,
      u.gender,
      `"${u.nik}"`,
      u.email,
      `"${u.phone}"`,
      `"${u.city}"`,
      `"${u.profession}"`,
      `"${u.company}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dummy-users-indo-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onShowToast("CSV Diunduh!", "File CSV berhasil tersimpan.", "success");
  };

  return (
    <div className="space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Generator Data User Indonesia (Dummy User)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Buat data profil pengguna realistis lengkap dengan NIK, email, no HP, dan kota untuk pengujian API/UI.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Baru</span>
          </button>

          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Tersalin!" : "Salin JSON"}</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Unduh CSV</span>
          </button>
        </div>
      </div>

      {/* FILTER & CONFIG BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-xl">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <span>Jumlah Data:</span>
            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold text-sm">
              {count}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-32 sm:w-48 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama, kota, pekerjaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "cards" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Kartu Profil"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "table" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Tabel Data"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DISPLAY USER CONTENT */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/60 p-1 shrink-0 shadow-md"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-100 text-sm truncate">{user.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                      {user.gender}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-400 font-medium flex items-center gap-1 truncate">
                    <Briefcase className="w-3.5 h-3.5 shrink-0" />
                    <span>{user.profession}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">at {user.company}</p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" /> NIK
                  </span>
                  <span className="font-mono text-slate-200 text-[11px]">{user.nik}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
                  </span>
                  <span className="text-slate-200 text-[11px] truncate max-w-[160px]">{user.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Telepon
                  </span>
                  <span className="font-mono text-slate-200 text-[11px]">{user.phone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Kota
                  </span>
                  <span className="text-slate-200 text-[11px]">{user.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-x-auto border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">NIK</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Pekerjaan</th>
                <th className="px-4 py-3">Kota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-100 flex items-center gap-2">
                    <img src={u.avatarUrl} alt="" className="w-6 h-6 rounded-full bg-slate-800" />
                    <span>{u.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{u.gender}</td>
                  <td className="px-4 py-3 font-mono text-indigo-300">{u.nik}</td>
                  <td className="px-4 py-3 text-slate-300">{u.email}</td>
                  <td className="px-4 py-3 font-mono text-emerald-400">{u.phone}</td>
                  <td className="px-4 py-3 text-slate-200">{u.profession} ({u.company})</td>
                  <td className="px-4 py-3 text-slate-400">{u.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
