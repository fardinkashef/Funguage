"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormFields, loginFormSchema } from "@/lib/zodSchemas";
import { login } from "@/lib/server-actions/users";
import { useRouter } from "next/navigation";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();

  // 1. Define your form.
  const loginForm = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });

  // 2. Define a submit handler.
  const submit = async (values: LoginFormFields) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const loginResult = await login(values);
    if (loginResult?.success) router.push(callbackUrl || "/");
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(submit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" type="email" {...field} />
              </FormControl>
              {/* <FormDescription>This is your email.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              {/* <FormDescription>This is your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mx-auto">
          Log in
        </Button>
      </form>
    </Form>
  );
}
