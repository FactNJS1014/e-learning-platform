"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role?: "USER" | "ADMIN";
}

export const Sidebar: React.FC<SidebarProps> = ({ role = "USER" }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navClass = (path: string) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
      isActive(path)
        ? "bg-rose-800 text-white shadow-md shadow-rose-900/20"
        : "text-slate-600 hover:bg-rose-50 hover:text-rose-900"
    }`;

  return (
    <aside className="w-64 shrink-0 border-r border-rose-100 bg-white p-4 hidden md:block min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <Link href="/dashboard" className={navClass("/dashboard")}>
            📊 Dashboard
          </Link>
        </div>

        <div>
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-rose-900/50 mb-2">
            Learning
          </p>
          <div className="space-y-1">
            <Link href="/courses" className={navClass("/courses")}>
              📚 All Courses
            </Link>
            <Link
              href="/courses?cat=english"
              className={navClass("/courses?cat=english")}
            >
              🇬🇧 English
            </Link>
            <Link
              href="/courses?cat=backend"
              className={navClass("/courses?cat=backend")}
            >
              🟢 Node.js & Nest.js
            </Link>
            <Link href="/my-learning" className={navClass("/my-learning")}>
              🎓 My Learning
            </Link>
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-rose-900/50 mb-2">
            Account
          </p>
          <div className="space-y-1">
            <Link href="/certificates" className={navClass("/certificates")}>
              📜 Certificates
            </Link>
            <Link href="/profile" className={navClass("/profile")}>
              👤 Profile
            </Link>
          </div>
        </div>

        {role === "ADMIN" && (
          <div className="pt-4 border-t border-rose-100">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-rose-800 mb-2">
              Admin Zone
            </p>
            <div className="space-y-1">
              <Link href="/admin" className={navClass("/admin")}>
                ⚙️ Admin Dashboard
              </Link>
              <Link href="/admin/users" className={navClass("/admin/users")}>
                👥 Manage Users
              </Link>
              <Link
                href="/admin/courses"
                className={navClass("/admin/courses")}
              >
                📖 Manage Courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
