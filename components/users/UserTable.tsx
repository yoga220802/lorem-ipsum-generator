import React from "react";
import { DummyUser } from "@/types/user";

interface UserTableProps {
  users: DummyUser[];
}

export function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs italic">
        Tidak ada data user yang sesuai dengan pencarian.
      </div>
    );
  }

  return (
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
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-100 flex items-center gap-2">
                <img src={u.avatarUrl} alt="" className="w-6 h-6 rounded-full bg-slate-800" />
                <span>{u.name}</span>
              </td>
              <td className="px-4 py-3 text-slate-400">{u.gender}</td>
              <td className="px-4 py-3 font-mono text-indigo-300">{u.nik}</td>
              <td className="px-4 py-3 text-slate-300">{u.email}</td>
              <td className="px-4 py-3 font-mono text-emerald-400">{u.phone}</td>
              <td className="px-4 py-3 text-slate-200">
                {u.profession} ({u.company})
              </td>
              <td className="px-4 py-3 text-slate-400">{u.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
