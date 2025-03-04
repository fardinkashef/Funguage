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
import { RegisterFormFields, registerFormSchema } from "@/lib/zodSchemas";
import { register } from "@/lib/server-actions/users";

export default function RegisterForm() {
  // 1. Define your form.
  const registerForm = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormSchema),
    // defaultValues: {
    //   email: "",
    //   username: "",
    //   password: "",
    //   confirmPassword: "",
    // },
  });

  // 2. Define a submit handler.
  const submit = (values: RegisterFormFields) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    register(values);
  };

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(submit)} className="space-y-8">
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Must be at least 8 characters long"
                  type="password"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the same password again"
                  type="password"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>Confirm your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-auto">
          Register
        </Button>
      </form>
    </Form>
  );
}
