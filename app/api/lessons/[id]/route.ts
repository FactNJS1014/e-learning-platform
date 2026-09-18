import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuth();
    const { id: lessonId } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: "Lesson not found" },
        { status: 404 },
      );
    }

    // Upsert Lesson Progress
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.id,
          lessonId: lessonId,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId: session.id,
        lessonId: lessonId,
        completed: true,
        completedAt: new Date(),
      },
    });

    // Recalculate Course Progress
    const courseId = lesson.module.courseId;
    const totalLessons = await prisma.lesson.count({
      where: { module: { courseId: courseId } },
    });

    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: session.id,
        completed: true,
        lesson: { module: { courseId: courseId } },
      },
    });

    const progressPercent = Math.round((completedLessons / totalLessons) * 100);

    await prisma.courseEnrollment.upsert({
      where: {
        userId_courseId: {
          userId: session.id,
          courseId: courseId,
        },
      },
      update: {
        progress: progressPercent,
        completedAt: progressPercent === 100 ? new Date() : null,
      },
      create: {
        userId: session.id,
        courseId: courseId,
        progress: progressPercent,
      },
    });

    return NextResponse.json({
      success: true,
      data: { progress: progressPercent, completedLessons, totalLessons },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Unauthorized action" },
      { status: 401 },
    );
  }
}
