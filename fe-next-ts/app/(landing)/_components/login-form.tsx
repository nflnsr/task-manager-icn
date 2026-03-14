"use client";

import { loginSchema, LoginFormType } from "@/validators/login";
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
import { usePostLogin } from "@/services/user";

export function LoginForm() {
  const { mutate: mutateLogin, isPending: isPendingLogin } = usePostLogin();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(input: LoginFormType) {
    mutateLogin(input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={() => {
            const hasError = !!form.formState.errors.email;
            return (
              <FormItem className="gap-1">
                <fieldset
                  className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                >
                  <legend className="mx-5 px-1 text-sm text-cyan-400">
                    <FormLabel>Your Email / Username</FormLabel>
                  </legend>
                  <FormControl>
                    <Input
                      type="email"
                      {...form.register("email")}
                      className="ring-none border-none pb-2 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      autoComplete="email"
                    />
                  </FormControl>
                </fieldset>
                <FormDescription />
                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => {
            const hasError = !!form.formState.errors.password;
            return (
              <FormItem className="gap-1">
                <fieldset
                  className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                >
                  <legend className="mx-5 px-1 text-sm text-cyan-400">
                    <FormLabel>Enter Password</FormLabel>
                  </legend>
                  <FormControl>
                    <Input
                      type="password"
                      {...form.register("password")}
                      className="ring-none border-none pb-2 outline-none autofill:bg-cyan-100 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      autoComplete="current-password"
                    />
                  </FormControl>
                </fieldset>
                <FormDescription />
                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        <div className="pt-5 pb-10">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500/80 disabled:cursor-default disabled:bg-blue-500/60"
            disabled={isPendingLogin}
          >
            {isPendingLogin ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
