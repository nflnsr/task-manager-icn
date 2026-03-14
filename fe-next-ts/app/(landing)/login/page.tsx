import Link from "next/link";
import { LoginForm } from "../_components/login-form";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-[550px] flex-col items-center justify-center rounded-xl px-8 shadow-xl">
        <div className="space-y-10 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-600">Sign In</h1>
          <p className="">
            Just sign in if you have an account in here. Enjoy our Website
          </p>
        </div>
        <LoginForm />
      </div>
      <div>
        <p className="pt-8 font-semibold text-blue-500">
          <Link href="/register" className="hover:underline">
            Don&apos;t have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
