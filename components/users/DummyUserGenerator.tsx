"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { DummyUser, UserViewMode } from "@/types/user";
import { generateDummyUsers, formatUsersToCSV } from "@/lib/generators/dummy-user";
import { downloadCSVFile } from "@/lib/utils/download";
import { copyToClipboard } from "@/lib/utils/clipboard";
import { useToast } from "@/context/ToastContext";
import { UserControls } from "./UserControls";
import { UserCardGrid } from "./UserCardGrid";
import { UserTable } from "./UserTable";

export function DummyUserGenerator() {
  const { showToast } = useToast();
  const [count, setCount] = useState<number>(6);
  const [users, setUsers] = useState<DummyUser[]>([]);
  const [viewMode, setViewMode] = useState<UserViewMode>("cards");
  const [search, setSearch] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = useCallback(() => {
    const generated = generateDummyUsers(count);
    setUsers(generated);
  }, [count]);

  useEffect(() => {
    handleGenerate();
  }, [count, handleGenerate]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.profession.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleCopyJSON = async () => {
    const jsonStr = JSON.stringify(users, null, 2);
    const success = await copyToClipboard(jsonStr);
    if (success) {
      setCopied(true);
      showToast("JSON Disalin!", `${users.length} data user disalin ke clipboard.`, "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCSV = () => {
    const csvContent = formatUsersToCSV(users);
    downloadCSVFile(csvContent, `dummy-users-indo-${Date.now()}`);
    showToast("CSV Diunduh!", "File CSV berhasil tersimpan.", "success");
  };

  return (
    <div className="space-y-6">
      <UserControls
        count={count}
        setCount={setCount}
        search={search}
        setSearch={setSearch}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onGenerate={handleGenerate}
        onCopyJSON={handleCopyJSON}
        onDownloadCSV={handleDownloadCSV}
        copied={copied}
      />

      {viewMode === "cards" ? (
        <UserCardGrid users={filteredUsers} />
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
}
