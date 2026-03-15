"use client";

import { Button } from "@/components/ui/button";
import { clearRefreshToken } from "@/server/auth";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

export function LogoutBtn() {
  const route = useRouter();
  const { clearAuthStore } = useAuthStore();

  const handleLogout = async () => {
    await clearRefreshToken();
    clearAuthStore();
    route.push("/login");
  };

  return (
    <Button onClick={handleLogout} className="bg-red-400 px-6 pt-4 rounded-md text-white pb-5">
      Logout
    </Button>
  );
}
