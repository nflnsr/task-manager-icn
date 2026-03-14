"use client";

import { taskSchema, TaskFormType } from "@/validators/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Task } from "@/types/api/task";
import { Response } from "@/types/response";
import { usePutTask } from "@/services/task";

export function EditTaskForm({ taskData }: { taskData: Response<Task> }) {
  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: taskData?.data?.title || "",
      description: taskData?.data?.description || "",
      completed: taskData?.data?.completed || false,
    },
  });

  const { mutate: mutateEdit, isPending: isPendingEdit } = usePutTask();

  function onSubmit(input: TaskFormType) {
    mutateEdit({ taskId: taskData?.data?.id as string, input });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex">
          <ChevronLeft /> Back to Dashboard
        </Link>

        <FormField
          control={form.control}
          name="title"
          render={() => (
            <FormItem className="pt-4">
              <fieldset className="flex flex-col rounded-lg border-2 border-gray-400 focus-within:border-gray-500 focus-within:shadow-md">
                <legend className="mx-5 px-1 text-sm">
                  <FormLabel>Title</FormLabel>
                </legend>
                <FormControl>
                  <Input
                    type="text"
                    {...form.register("title")}
                    className="ring-none border-none pb-2 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                    autoComplete="email"
                  />
                </FormControl>
              </fieldset>
              <FormDescription />
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem className="">
              <fieldset className="flex flex-col rounded-lg border-2 border-gray-400 focus-within:border-gray-500 focus-within:shadow-md">
                <legend className="mx-5 px-1 text-sm">
                  <FormLabel>Description</FormLabel>
                </legend>
                <FormControl>
                  <Textarea
                    {...form.register("description")}
                    className="ring-none border-none pb-2 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900 h-32 text-start"
                  />
                </FormControl>
              </fieldset>
              <FormDescription />
              <FormMessage>{form.formState.errors.description?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="pt-5 pb-10">
          <Button
            type="submit"
            disabled={isPendingEdit}
            className="w-full cursor-pointer bg-black/75  disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-400 text-white"
          >
            {isPendingEdit ? (
              <div className="rounded-full animate-spin p-2 border border-t-2 block" />
            ) : (
              "Update Task"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
