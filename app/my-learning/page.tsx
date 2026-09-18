import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function MyLearningPage() {
  const session = await requireAuth();

  // ดึงข้อมูลการลงทะเบียนเรียนของผู้ใช้ปัจจุบัน
  const enrollments = await prisma.courseEnrollment.findMany({
    where: {
      userId: session.id,
    },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: true,
            },
          },
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar user={session} />
      <div className="flex">
        <Sidebar role={session.role} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">My Learning</h1>
            <p className="text-sm text-slate-500">
              Manage and continue your enrolled courses.
            </p>
          </div>

          {/* Enrolled Courses Grid */}
          {enrollments.length === 0 ? (
            <div className="space-y-4">
              <EmptyState message="You haven't enrolled in any courses yet." />
              <div className="text-center">
                <Link
                  href="/courses"
                  className="inline-block rounded-xl bg-rose-800 px-6 py-2.5 text-xs font-semibold text-white hover:bg-rose-900 transition shadow-sm"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((item) => {
                const course = item.course;
                const totalLessons = course.modules.reduce(
                  (acc, m) => acc + m.lessons.length,
                  0,
                );
                const firstLesson = course.modules[0]?.lessons[0];

                return (
                  <div
                    key={item.id}
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
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {course.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>Progress</span>
                          <span className="text-rose-800">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-rose-800 h-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-4 text-xs font-medium text-slate-600">
                        <span>📦 {course.modules.length} Modules</span>
                        <span>📖 {totalLessons} Lessons</span>
                      </div>

                      {firstLesson ? (
                        <Link
                          href={`/courses/${course.id}/lessons/${firstLesson.id}`}
                          className="block w-full text-center rounded-xl bg-rose-800 py-2.5 text-xs font-semibold text-white hover:bg-rose-900 transition shadow-sm"
                        >
                          {item.progress > 0
                            ? "Continue Learning"
                            : "Start Learning"}
                        </Link>
                      ) : (
                        <Link
                          href={`/courses/${course.id}`}
                          className="block w-full text-center rounded-xl bg-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-300 transition"
                        >
                          View Details
                        </Link>
                      )}
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
