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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1.5 max-w-80">
        <div className="flex w-full">
          <FormField
            control={form.control}
            name="name"
            render={() => {
              return (
                <FormItem className="w-full gap-1.5">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...form.register("name")}
                      className="ring-none border-2 border-gray-500 pb-1 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                    />
                  </FormControl>
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
            return (
              <FormItem className="w-full gap-1.5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...form.register("email")}
                    className="ring-none border-2 border-gray-500 pb-1 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                  />
                </FormControl>
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
              return (
                <FormItem className="w-full gap-1.5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...form.register("password")}
                      className="ring-none border-2 border-gray-500 pb-1 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="-pt-2">{form.formState.errors.password?.message}</FormMessage>
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
