"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { createCourse } from "@/lib/server-actions/courses";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function CreatePage() {
  const form = useForm<FormFields>({
    defaultValues: { title: "" },
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;

  const submit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await createCourse(data);
      toast.success("Course created");
      router.push(`/teaching/my-courses/${response.newCourseId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="grow max-w-2xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course. Don&apos;t worry, you can
          change this later
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'friends series'"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
