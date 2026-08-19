import React from "react";
import { DummyUser } from "@/types/user";

interface UserTableProps {
  users: DummyUser[];
}

export function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="sakode-card p-8 text-center text-[var(--text-muted)] text-xs italic">
        Tidak ada data pengguna yang cocok dengan filter pencarian.
      </div>
    );
  }

  return (
    <div className="sakode-card overflow-x-auto">
      <table className="w-full text-left text-xs text-[var(--text)]">
        <thead className="bg-[var(--surface-subtle)] text-[var(--text-muted)] uppercase font-extrabold text-[10px] tracking-wider border-b border-[var(--border)]">
          <tr>
            <th className="px-4 py-3.5">Nama Lengkap</th>
            <th className="px-4 py-3.5">Gender</th>
            <th className="px-4 py-3.5">NIK</th>
            <th className="px-4 py-3.5">Email</th>
            <th className="px-4 py-3.5">No. HP</th>
            <th className="px-4 py-3.5">Pekerjaan</th>
            <th className="px-4 py-3.5">Kota</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-[var(--surface-subtle)] transition-colors">
              <td className="px-4 py-3 font-bold text-[var(--text)] flex items-center gap-2">
                <img src={u.avatarUrl} alt="" className="w-6 h-6 rounded-full bg-[var(--surface-subtle)] border border-[var(--border)]" />
                <span>{u.name}</span>
              </td>
              <td className="px-4 py-3 text-[var(--text-muted)] font-semibold">{u.gender}</td>
              <td className="px-4 py-3 font-mono font-bold text-[#bc71fe]">{u.nik}</td>
              <td className="px-4 py-3 text-[var(--text)]">{u.email}</td>
              <td className="px-4 py-3 font-mono font-bold text-[#10b981]">{u.phone}</td>
              <td className="px-4 py-3 font-semibold text-[var(--text)]">
                {u.profession} <span className="text-[var(--text-muted)] font-normal">({u.company})</span>
              </td>
              <td className="px-4 py-3 text-[var(--text-muted)] font-semibold">{u.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
