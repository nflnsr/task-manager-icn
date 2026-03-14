"use client";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrivateRouteProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return <div className="justify-center flex items-center h-screen pb-10">Loading...</div>;
  }

  return <>{children}</>;
}
