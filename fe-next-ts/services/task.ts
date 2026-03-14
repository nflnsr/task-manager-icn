import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TaskFormType } from "@/validators/task";

const baseAPIUrl = "/api/tasks";

// profile fetch used in auth provider to check
// user session and set user state token
const useGetTasks = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const { data } = await axiosPrivate.get(`${baseAPIUrl}/`);
        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};


const usePostTask = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: UseMutationOptions<any, any, TaskFormType>
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: TaskFormType) => {
      const { data } = await axiosPrivate.post("/api/tasks", input);
      return data;
    },
    onSuccess: () => {
      toast.success("New Task added successfully!", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Failed to add new To do. Please try again.", {
        duration: 4000,
      });
    },
    ...params,
  });
};

const usePutTask = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: UseMutationOptions<any, any, { taskId: string; input: TaskFormType }>
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ taskId, input }: { taskId: string; input: TaskFormType }) => {
      const { data } = await axiosPrivate.put(`/api/tasks/${taskId}`, input);
      return data;
    },
    onSuccess: () => {
      toast.success("Task updated successfully!", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Failed to update task. Please try again.", {
        duration: 4000,
      });
    },
    ...params,
  });
};

const useDeleteTask = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: UseMutationOptions<any, any, string>
) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosPrivate.delete(`/api/tasks/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Failed to delete task. Please try again.", {
        duration: 4000,
      });
    },
    ...params,
  });
}

export { useGetTasks, usePostTask, usePutTask, useDeleteTask };
