import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 },
      );
    }

    const validated = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 },
      );
    }

    // ⚠️ เช็คฟิลด์ password ตรงนี้ (เปลี่ยนเป็น user.password ถ้า schema ใช้ชื่อ password)
    const dbPassword = (user as any).passwordHash || (user as any).password;

    const isValid = await verifyPassword(validated.password, dbPassword);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 },
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

    response.cookies.set("sakura_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    // 🔴 บังคับส่ง Error Message ออกไปแสดงบน Response เพื่อให้เราเห็นสาเหตุ
    return NextResponse.json(
      {
        success: false,
        debug_error: error?.message || String(error),
        stack: error?.stack,
      },
      { status: 400 },
    );
  }
}
