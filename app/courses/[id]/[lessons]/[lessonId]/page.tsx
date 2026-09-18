import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { notFound } from "next/navigation";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const session = await requireAuth();
  const { id: courseId, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });

  if (!lesson) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={session} />
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <div className="bg-white rounded-3xl border border-rose-100 p-8 shadow-sm">
          <span className="text-xs font-bold text-rose-800 uppercase">
            {lesson.module.course.title}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-6">
            {lesson.title}
          </h1>

          {/* ✅ แบบใหม่ Render HTML ปลอดภัยและแต่งสไตล์ผ่าน Tailwind */}
          <div
            className="prose max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          {lesson.codeExample && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-800 mb-2">
                Code Example:
              </h3>
              <CodeBlock code={lesson.codeExample} />
            </div>
          )}

          {lesson.summary && (
            <div className="mt-8 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 font-medium">
              💡 <strong>Summary:</strong> {lesson.summary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
