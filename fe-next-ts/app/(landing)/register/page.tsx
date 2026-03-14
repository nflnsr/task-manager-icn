import Link from "next/link";
import { RegisterForm } from "../_components/register-form";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-[550px] flex-col items-center justify-center rounded-xl px-8 shadow-xl">
        <div className="space-y-10 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-600">Register</h1>
          <p className="">
            Let’s Sign up first for enter into Square Website. Uh She Up!
          </p>
        </div>
        <RegisterForm />
      </div>
      <div>
        <p className="pt-8 font-semibold text-blue-500">
          <Link href="/login" className="hover:underline">
            Have an account? Login
          </Link>
        </p>
      </div>
    </div>
  );
}
