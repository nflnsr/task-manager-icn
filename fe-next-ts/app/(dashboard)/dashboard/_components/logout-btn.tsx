"use client";

import { Button } from "@/components/ui/button";
import { clearRefreshToken } from "@/server/auth";
import { useAuthStore } from "@/stores/auth";

export function LogoutBtn() {
  const { clearAuthStore } = useAuthStore();

  const handleLogout = async () => {
    await clearRefreshToken();
    clearAuthStore();
  };

  return (
    <Button onClick={handleLogout} className="bg-red-400 px-6 pt-4 rounded-md text-white pb-5">
      Logout
    </Button>
  );
}
