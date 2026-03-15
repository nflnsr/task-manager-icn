import Link from "next/link";
import { LoginForm } from "../_components/login-form";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-96 flex-col items-center pt-10 pb-8 justify-center rounded-xl px-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-600">Login</h1>
        </div>
        <LoginForm />
        <p className=" font-semibold text-blue-500">
          <Link href="/register" className="hover:underline">
            Don&apos;t have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
