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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 max-w-80 pt-10">
        <FormField
          control={form.control}
          name="email"
          render={() => {
            return (
              <FormItem className="gap-2">
                <FormLabel>Your Email / Username</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...form.register("email")}
                    className="ring-none border-2 border-gray-500 pb-1 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                    autoComplete="email"
                  />
                </FormControl>
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
            return (
              <FormItem className="gap-2">
                <FormLabel>Enter Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...form.register("password")}
                    className="ring-none border-2 border-gray-500 pb-1 outline-none autofill:bg-cyan-100 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                    autoComplete="current-password"
                  />
                </FormControl>
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
