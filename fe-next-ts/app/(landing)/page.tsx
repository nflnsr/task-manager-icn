import { SwitchMode } from "@/components/switch-mode";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-y-4 pb-6 justify-center">
        <div>
          <SwitchMode />
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <Button variant={"default"} className="w-full max-w-24">
            <Link href="/login">Login</Link>
          </Button>
          <Button variant={"secondary"} className="w-full max-w-24">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </main>
  );
}
