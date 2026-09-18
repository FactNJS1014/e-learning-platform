import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("cat");

  const where: any = { published: true };
  if (category) {
    where.category = { equals: category, mode: "insensitive" };
  }

  const courses = await prisma.course.findMany({
    where,
    include: {
      modules: {
        include: { lessons: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: courses });
}
