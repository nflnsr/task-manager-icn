"use client";

import { registerSchema, RegisterFormType } from "@/validators/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { usePostRegister } from "@/services/user";

export function RegisterForm() {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: mutateRegister, isPending: isPendingRegister } = usePostRegister();

  function onSubmit(input: RegisterFormType) {
    mutateRegister(input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1.5 gap-y-20">
        <div className="flex w-full gap-x-4">
          <FormField
            control={form.control}
            name="name"
            render={() => {
              const hasError = !!form.formState.errors.name;
              return (
                <FormItem className="w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Name</FormLabel>
                    </legend>
                    <FormControl>
                      <Input
                        type="text"
                        {...form.register("name")}
                        className="ring-none border-none pb-3 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={() => {
            const hasError = !!form.formState.errors.email;
            return (
              <FormItem className="w-full gap-0.5">
                <fieldset
                  className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                >
                  <legend className="mx-5 px-1 text-sm text-cyan-400">
                    <FormLabel>Email</FormLabel>
                  </legend>
                  <FormControl>
                    <Input
                      type="text"
                      {...form.register("email")}
                      className="ring-none border-none pb-3 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                    />
                  </FormControl>
                </fieldset>
                <FormDescription />
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        <div className="flex w-full gap-x-4">
          <FormField
            control={form.control}
            name="password"
            render={() => {
              const hasError = !!form.formState.errors.password;
              return (
                <FormItem className="w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Password</FormLabel>
                    </legend>
                    <FormControl>
                      <Input
                        type="text"
                        {...form.register("password")}
                        className="ring-none border-none pb-3 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="pt-5 pb-10">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500/80 disabled:cursor-default disabled:bg-blue-500/60"
            disabled={isPendingRegister}
          >
            {isPendingRegister ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
