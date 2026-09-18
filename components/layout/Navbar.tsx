"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-red-100 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold text-rose-950"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-800 to-rose-600 text-white shadow-md shadow-rose-900/20">
              🌸
            </span>
            <span className="tracking-tight">
              Red Sakura <span className="text-rose-700">Academy</span>
            </span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search courses, lessons, topics..."
              className="w-full rounded-full border border-rose-200 bg-rose-50/30 px-4 py-2 pl-10 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
            />
            <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-600 hover:bg-rose-50 transition">
            🔔
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-600"></span>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-full border border-rose-100 p-1 pl-3 pr-2 hover:bg-rose-50/50 transition"
              >
                <span className="text-sm font-semibold text-slate-800">
                  {user.firstName} {user.lastName}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-800 text-sm font-medium text-white shadow-sm">
                  {user.firstName[0]}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-rose-100 bg-white p-1.5 shadow-xl shadow-rose-900/5 z-50">
                  <Link
                    href="/profile"
                    className="block rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-900"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/my-learning"
                    className="block rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-900"
                  >
                    My Learning
                  </Link>
                  <hr className="my-1 border-rose-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded-xl px-4 py-2 text-sm text-rose-700 hover:bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-rose-800 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-rose-900/20 hover:bg-rose-900 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
