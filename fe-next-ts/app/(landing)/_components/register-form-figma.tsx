"use client";

import { formSchema, FormType } from "@/validator/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/classname";

export function RegisterFormFigma() {
  const { setAuthData } = useAuth();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      fullName: "",
      country: "",
    },
  });

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: async (input: FormType) => {
      const { data } = await axiosInstance.post("/register", input);
      return data;
    },
    onSuccess: (data) => {
      setAuthData({
        token: data.token,
        user: {
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
        },
        isLoggedIn: true,
      });
      router.replace("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  function onSubmit(input: FormType) {
    mutateRegister(input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1.5 gap-y-20">
        <div className="flex w-full gap-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={() => {
              const hasError = !!form.formState.errors.firstName;
              return (
                <FormItem className="w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>First Name</FormLabel>
                    </legend>
                    <FormControl>
                      <Input
                        type="text"
                        {...form.register("firstName")}
                        className="ring-none border-none pb-3 outline-none autofill:bg-yellow-200 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={() => {
              const hasError = !!form.formState.errors.lastName;
              return (
                <FormItem className="w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Last Name</FormLabel>
                    </legend>
                    <FormControl>
                      <Input
                        type="text"
                        {...form.register("lastName")}
                        className="ring-none border-none pb-3 outline-none autofill:bg-cyan-100 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex w-full gap-x-2">
          {/* it should be select input with country code (do fetch for that) */}
          <fieldset className="flex h-full w-full max-w-2 flex-col rounded-lg border-2 border-cyan-400 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md">
            <legend className="mx-2 px-1 text-sm text-cyan-400">
              <FormLabel>Code</FormLabel>
            </legend>
            <Input
              value="+62"
              className="ring-none border-none pb-2.5 outline-none autofill:bg-cyan-100 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
            />
          </fieldset>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={() => {
              const hasError = !!form.formState.errors.phoneNumber;
              return (
                <FormItem className="h-full w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Phone Number</FormLabel>
                    </legend>
                    <FormControl>
                      <Input
                        type="text"
                        {...form.register("phoneNumber")}
                        className="ring-none border-none pb-3.5 outline-none autofill:bg-cyan-100 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.phoneNumber?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              const hasError = !!form.formState.errors.country;
              return (
                <FormItem className="h-full w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Your Country</FormLabel>
                    </legend>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        defaultValue=""
                      >
                        <SelectTrigger className="auto w-full border-0">
                          <SelectValue placeholder="select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indo">Indo</SelectItem>
                          <SelectItem value="malay">Malay</SelectItem>
                          <SelectItem value="phil">Phil</SelectItem>
                          <SelectItem value="thai">Thai</SelectItem>
                          <SelectItem value="sg">Sg</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.country?.message}</FormMessage>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={() => {
              const hasError = !!form.formState.errors.confirmPassword;
              return (
                <FormItem className="w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Confirm Password</FormLabel>
                    </legend>
                    <FormControl>
                      <Input
                        type="text"
                        {...form.register("confirmPassword")}
                        className="ring-none border-none pb-3 outline-none autofill:bg-cyan-100 focus-visible:ring-0 [&::-webkit-autofill]:bg-blue-900"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex w-full gap-x-4">
          <FormField
            control={form.control}
            name="about"
            render={() => {
              const hasError = !!form.formState.errors.about;
              return (
                <FormItem className="w-full gap-0.5">
                  <fieldset
                    className={`flex h-fit flex-col rounded-lg border-2 shadow-cyan-100 focus-within:border-cyan-300 focus-within:shadow-md ${hasError ? "border-red-500" : "border-cyan-400"}`}
                  >
                    <legend className="mx-5 px-1 text-sm text-cyan-400">
                      <FormLabel>Tell Us about Yourself</FormLabel>
                    </legend>
                    <FormControl>
                      <Textarea
                        placeholder="Hello, my name is..."
                        className="border-0 focus-visible:ring-0 aria-invalid:border-0 aria-invalid:ring-0 dark:aria-invalid:ring-0"
                      />
                    </FormControl>
                  </fieldset>
                  <FormDescription />
                  <FormMessage>{form.formState.errors.about?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="pt-5 pb-10">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500/80"
            disabled={isPendingRegister}
          >
            {isPendingRegister ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
