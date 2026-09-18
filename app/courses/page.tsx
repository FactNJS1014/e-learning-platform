import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const session = await getSession();
  const { cat } = await searchParams;

  // เงื่อนไขในการค้นหาคอร์ส
  const whereCondition: any = { published: true };

  if (cat) {
    // รองรับทั้ง english, nodejs, nestjs หรือหมวดหมู่อื่นๆ
    whereCondition.category = {
      contains: cat,
      mode: "insensitive", // ไม่สนใจตัวพิมพ์เล็ก-ใหญ่ (Prisma Postgres Feature)
    };
  }

  const courses = await prisma.course.findMany({
    where: whereCondition,
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar user={session} />
      <div className="flex">
        <Sidebar role={session?.role} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {cat ? `${cat} Courses` : "All Courses"}
            </h1>
            <p className="text-sm text-slate-500">
              Explore our comprehensive courses and start learning today.
            </p>
          </div>

          {/* Course List Grid */}
          {courses.length === 0 ? (
            <EmptyState
              message={`No courses found in category "${cat || "All"}".`}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const totalLessons = course.modules.reduce(
                  (acc, m) => acc + m.lessons.length,
                  0,
                );

                return (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-3xl border border-rose-100 bg-white p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                          {course.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 uppercase">
                          {course.level}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 mb-2">
                        {course.title}
                      </h2>
                      <p className="text-xs text-slate-500 line-clamp-3 mb-6">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-4 text-xs font-medium text-slate-600">
                        <span>📦 {course.modules.length} Modules</span>
                        <span>📖 {totalLessons} Lessons</span>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="block w-full text-center rounded-xl bg-rose-800 py-2.5 text-xs font-semibold text-white hover:bg-rose-900 transition shadow-sm"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
