"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardTable } from "./_components/dashboard-table";
import { useAuthStore } from "@/stores/auth";
import { LogoutBtn } from "./_components/logout-btn";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="box-border pt-14">
        <div className="flex justify-end px-2">
          <LogoutBtn />
        </div>
        <div className="pt-4 px-2 text-center">Hi, {user?.name}. Welcome 👋🏻</div>
        <div className="pt-4">
          <div className="w-full max-w-full overflow-x-auto">
            <DashboardTable />
          </div>
          <div className="px-4 pt-8">
            <Link href="/dashboard/add-task">
              <Button className="w-full cursor-pointer rounded-sm border bg-black/75 shadow-lg hover:bg-neutral-500 dark:bg-stone-200 hover:dark:bg-stone-200/60">
                Add Task
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
