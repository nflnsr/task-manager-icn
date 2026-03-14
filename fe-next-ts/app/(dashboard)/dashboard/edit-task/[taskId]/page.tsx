import { serverFetch } from "@/utils/server-fetch";
import { EditTaskForm } from "../_components/edit-task-form";
import { Task } from "@/types/api/task";
import { Response } from "@/types/response";

export default async function EditTask({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  const res = await serverFetch<Response<Task>>(`/tasks/${taskId}`, {
    cache: "no-store",
  });

  return (
    <div className="w-full px-4 lg:px-20">
      <div className="py-8 flex justify-center items-center h-screen pb-16 max-w-200 mx-auto">
        <EditTaskForm taskData={res} />
      </div>
    </div>
  );
}
