import Link from "next/link";
import { RegisterForm } from "../_components/register-form";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-96 flex-col items-center pt-10 pb-8 shadow-xl justify-center">  
        <div className="space-y-10 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-600">Register</h1>
        </div>
        <RegisterForm />
        <p className="pt-8 font-semibold text-blue-500">
          <Link href="/login" className="hover:underline">
            Have an account? Login
          </Link>
        </p>
      </div>
      <div></div>
    </div>
  );
}
