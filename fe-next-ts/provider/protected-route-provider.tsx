"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";

export function ProtectedRouteProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoggedIn || isLoading) {
    return <div className="justify-center flex items-center h-screen pb-10">Loading...</div>;
  }

  return <>{children}</>;
}
