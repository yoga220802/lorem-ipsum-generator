import React from "react";
import { DummyUser } from "@/types/user";
import { Briefcase, CreditCard, Mail, Phone, MapPin } from "lucide-react";

interface UserCardGridProps {
  users: DummyUser[];
}

export function UserCardGrid({ users }: UserCardGridProps) {
  if (users.length === 0) {
    return (
      <div className="sakode-card p-8 text-center text-[var(--text-muted)] text-xs italic">
        Tidak ada data pengguna yang cocok dengan filter pencarian.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user.id} className="sakode-card p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3.5">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-12 h-12 rounded-[var(--r-sm)] bg-[var(--surface-subtle)] border border-[var(--border)] p-0.5 shrink-0 shadow-xs"
            />
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[var(--text)] text-sm truncate">{user.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface-subtle)] text-[var(--text-muted)] border border-[var(--border)] shrink-0">
                  {user.gender}
                </span>
              </div>
              <p className="text-xs text-[#71cffe] font-bold flex items-center gap-1 truncate">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span>{user.profession}</span>
              </p>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] truncate">
                at {user.company}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[var(--border)] text-xs text-[var(--text)]">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5 text-[11px] font-bold">
                <CreditCard className="w-3.5 h-3.5 text-[#bc71fe]" /> NIK
              </span>
              <span className="font-mono text-[var(--text)] text-[11px] font-bold">{user.nik}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5 text-[11px] font-bold">
                <Mail className="w-3.5 h-3.5 text-[#71cffe]" /> Email
              </span>
              <span className="text-[var(--text)] text-[11px] truncate max-w-[160px]">{user.email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5 text-[11px] font-bold">
                <Phone className="w-3.5 h-3.5 text-[#10b981]" /> Telepon
              </span>
              <span className="font-mono text-[var(--text)] text-[11px]">{user.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5 text-[11px] font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#f9723b]" /> Kota
              </span>
              <span className="text-[var(--text)] text-[11px] font-semibold">{user.city}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
