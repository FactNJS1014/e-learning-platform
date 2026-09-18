import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function DashboardPage() {
  const session = await requireAuth();

  const totalCourses = await prisma.course.count({
    where: { published: true },
  });
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { userId: session.id },
    include: { course: true },
  });

  const completedLessons = await prisma.lessonProgress.count({
    where: { userId: session.id, completed: true },
  });

  const certificates = await prisma.certificate.count({
    where: { userId: session.id },
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar user={session} />
      <div className="flex">
        <Sidebar role={session.role} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {session.firstName} 👋
            </h1>
            <p className="text-sm text-slate-500">
              Track your learning progress and upcoming milestones.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Available Courses
              </span>
              <p className="text-3xl font-extrabold text-slate-900 mt-2">
                {totalCourses}
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Active Enrollments
              </span>
              <p className="text-3xl font-extrabold text-rose-800 mt-2">
                {enrollments.length}
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Completed Lessons
              </span>
              <p className="text-3xl font-extrabold text-slate-900 mt-2">
                {completedLessons}
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Certificates
              </span>
              <p className="text-3xl font-extrabold text-amber-600 mt-2">
                {certificates}
              </p>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="bg-white rounded-2xl border border-rose-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Continue Learning
            </h2>
            {enrollments.length === 0 ? (
              <p className="text-sm text-slate-500">
                No active course enrollments. Explore courses to begin!
              </p>
            ) : (
              <div className="space-y-4">
                {enrollments.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-rose-50/30 transition"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.course.title}
                      </p>
                      <div className="w-48 bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-rose-700 h-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-800">
                      {item.progress}% Completed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
