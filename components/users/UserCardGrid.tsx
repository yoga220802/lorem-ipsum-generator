import React from "react";
import { DummyUser } from "@/types/user";
import { Briefcase, CreditCard, Mail, Phone, MapPin } from "lucide-react";

interface UserCardGridProps {
  users: DummyUser[];
}

export function UserCardGrid({ users }: UserCardGridProps) {
  if (users.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs italic">
        Tidak ada data user yang sesuai dengan pencarian.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
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
  );
}
