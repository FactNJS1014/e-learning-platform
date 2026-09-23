"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface SidebarProps {
  role?: "USER" | "ADMIN";
}

// 1. แยกตัว Nav Content
const SidebarNav: React.FC<SidebarProps> = ({ role = "USER" }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // ดึง Query String มารวมกับ Pathname
  const searchString = searchParams?.toString();
  const currentUrl = searchString ? `${pathname}?${searchString}` : pathname;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const isActive = (path: string) => currentUrl === path;

  const navClass = (path: string) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
      isActive(path)
        ? "bg-rose-800 text-white shadow-md shadow-rose-900/20"
        : "text-slate-600 hover:bg-rose-50 hover:text-rose-900"
    }`;

  const SidebarContent = (
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
            <Link href="/admin/courses" className={navClass("/admin/courses")}>
              📖 Manage Courses
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-800 text-white shadow-lg shadow-rose-900/40 hover:bg-rose-900 active:scale-95 transition-all"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white p-4 border-r border-rose-100 shadow-xl transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between pb-2 border-b border-rose-100">
          <span className="font-bold text-rose-900">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-rose-900 p-1"
          >
            ✕
          </button>
        </div>
        {SidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="w-64 shrink-0 border-r border-rose-100 bg-white p-4 hidden md:block min-h-[calc(100vh-4rem)]">
        {SidebarContent}
      </aside>
    </>
  );
};

// 2. Export หลักพร้อมห่อด้วย Suspense
export const Sidebar: React.FC<SidebarProps> = ({ role = "USER" }) => {
  return (
    <Suspense
      fallback={
        <aside className="w-64 shrink-0 hidden md:block border-r border-rose-100 bg-white p-4 min-h-[calc(100vh-4rem)]" />
      }
    >
      <SidebarNav role={role} />
    </Suspense>
  );
};
