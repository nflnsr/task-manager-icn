
import { AddTaskForm } from "./_components/add-task-form";

export default function AddNew() {
  return (
    <div className="w-full px-4 lg:px-20">
      <div className="py-8 flex justify-center items-center h-screen pb-16 max-w-200 mx-auto">
        <AddTaskForm />
      </div>
    </div>
  );
}
