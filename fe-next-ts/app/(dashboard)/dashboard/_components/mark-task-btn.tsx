"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function MarkTaskBtn({ taskId }: { taskId: string }) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosPrivate.put(`/api/tasks/${id}`, {
        completed: true,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task marked successfully");
    },
  });

  return (
    <Button
      className="bg-green-600 hover:bg-green-600/75"
      onClick={() => mutate(taskId)}
    >
      Set as Done <Check className="size-4 text-white" />
    </Button>
  );
}
