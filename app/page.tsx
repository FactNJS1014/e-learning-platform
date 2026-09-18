import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30">
      <header className="flex h-16 items-center justify-between px-8 border-b border-rose-100 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-rose-950 text-xl">
          🌸 Red Sakura Academy
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-700 hover:text-rose-800"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-rose-800 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-rose-900 transition"
          >
            Start Learning
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-24 text-center">
        <span className="rounded-full bg-rose-100 px-4 py-1.5 text-xs font-bold text-rose-800">
          🌸 Pure Next.js E-Learning Engine
        </span>
        <h1 className="mt-6 text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl">
          Learn. Build. Grow.
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Master Modern English Grammar and Full-stack Development with Node.js
          and Nest.js via hands-on interactive modules.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="rounded-2xl bg-rose-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose-900/20 hover:bg-rose-900 transition"
          >
            Get Started Free
          </Link>
          <Link
            href="/courses"
            className="rounded-2xl border border-rose-200 bg-white px-8 py-4 text-base font-semibold text-slate-800 hover:bg-rose-50 transition"
          >
            Explore Courses
          </Link>
        </div>
      </main>
    </div>
  );
}
