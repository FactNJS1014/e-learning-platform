import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/40 p-4">
      <RegisterForm />
      <p className="mt-4 text-sm text-slate-600">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-semibold text-rose-800 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
