"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardTable } from "./_components/dashboard-table";

export default function Dashboard() {
  return (
    <div className="box-border">
      <div className="max-w-5xl mx-auto flex flex-col min-h-screen justify-center pb-24">
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
  );
}
