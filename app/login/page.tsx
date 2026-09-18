import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/40 p-4">
      <LoginForm />
      <p className="mt-4 text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-rose-800 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
