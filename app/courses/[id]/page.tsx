import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;

  // ดึงข้อมูลคอร์สเรียน พร้อม Modules และ Lessons
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // คำนวณจำนวนบทเรียนทั้งหมด
  const totalLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0,
  );

  // ตรวจสอบการลงทะเบียนเรียนของผู้ใช้
  let isEnrolled = false;
  if (session) {
    const enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.id,
          courseId: course.id,
        },
      },
    });
    if (enrollment) isEnrolled = true;
  }

  // ดึงบทเรียนแรกของคอร์ส
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar user={session} />
      <div className="flex">
        <Sidebar role={session?.role} />
        <main className="flex-1 p-6 md:p-8 max-w-5xl">
          {/* Header Card */}
          <div className="rounded-3xl border border-rose-100 bg-white p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                {course.category}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase">
                {course.level}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
              {course.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-6 text-xs font-medium text-slate-600 mb-6">
              <span>📦 {course.modules.length} Modules</span>
              <span>📖 {totalLessons} Lessons</span>
            </div>

            {firstLesson ? (
              <Link
                href={`/courses/${course.id}/lessons/${firstLesson.id}`}
                className="inline-block rounded-xl bg-rose-800 px-8 py-3 text-sm font-semibold text-white hover:bg-rose-900 transition shadow-md shadow-rose-900/20"
              >
                {isEnrolled ? "Continue Learning" : "Start Course"}
              </Link>
            ) : (
              <button
                disabled
                className="rounded-xl bg-slate-200 px-8 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed"
              >
                No Lessons Available
              </button>
            )}
          </div>

          {/* Curriculum / Modules List */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Course Content</h2>

            {course.modules.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-rose-200 rounded-2xl bg-white text-xs text-slate-500">
                No modules found in this course yet.
              </div>
            ) : (
              course.modules.map((module) => (
                <div
                  key={module.id}
                  className="rounded-2xl border border-rose-100 bg-white overflow-hidden shadow-sm"
                >
                  <div className="bg-rose-50/50 p-4 border-b border-rose-100">
                    <h3 className="font-bold text-slate-800 text-sm">
                      {module.title}
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/lessons/${lesson.id}`}
                        className="flex items-center justify-between p-4 hover:bg-rose-50/30 transition text-sm text-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-rose-800 font-medium">📄</span>
                          <span>{lesson.title}</span>
                        </div>
                        <span className="text-xs font-semibold text-rose-800">
                          Start →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
