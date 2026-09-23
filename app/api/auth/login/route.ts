import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body payload." },
        { status: 400 },
      );
    }

    // 1. Validate Input ด้วย Zod
    const validated = loginSchema.parse(body);

    // 2. ค้นหา User ใน Neon DB
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 },
      );
    }

    // 3. ตรวจสอบสถานะ User (หากโดนบล็อก)
    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, message: "Your account is not active." },
        { status: 403 },
      );
    }

    // 4. ตรวจสอบรหัสผ่านกับ passwordHash
    const isValid = await verifyPassword(validated.password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 },
      );
    }

    // 5. สร้าง JWT Token
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

    // 6. บันทึก Cookie
    response.cookies.set("sakura_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login Route Catch Error:", error);

    // กรณีข้อมูลที่ส่งมาไม่ตรงกับ Zod Schema
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          errors: error.errors.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    // กรณี Server / Database / JWT Secret ติดปัญหา (ส่ง 500)
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error_detail: error?.message || String(error),
      },
      { status: 500 },
    );
  }
}
