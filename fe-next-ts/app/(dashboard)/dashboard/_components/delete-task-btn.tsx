"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteTask } from "@/services/task";

export function DeleteTaskBtn({ taskId }: { taskId: string }) {
  const { mutate: mutateDelete } = useDeleteTask();

  return (
    <Button variant="destructive" onClick={() => mutateDelete(taskId)} className="bg-red-400 text-white hover:bg-red-500">
      Delete Task
      <Trash2 className="text-white size-4 pb-0.5 stroke-2" />
    </Button>
  );
}
