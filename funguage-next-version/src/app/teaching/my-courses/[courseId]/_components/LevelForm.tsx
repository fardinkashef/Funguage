"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { updateCourseLevel } from "@/lib/server-actions/courses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface LevelFormProps {
  initialLevel: string;
  courseId: string;
}

const formSchema = z.object({
  level: z.string().min(1, {
    message: "Please Select Course Level",
  }),
});

export default function LevelForm({ initialLevel, courseId }: LevelFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  console.log("this is course level initial:", initialLevel);

  const levelForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { level: initialLevel },
  });

  const { isSubmitting, isValid } = levelForm.formState;

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourseLevel(courseId, values.level);
      toast.success("Course Level updated");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Course Level
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Level
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2 dark:text-gray-300">
          {initialLevel || "Not Selected"}
        </p>
      )}
      {isEditing && (
        <Form {...levelForm}>
          <form onSubmit={levelForm.handleSubmit(submit)} className="space-y-6">
            <FormField
              control={levelForm.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner" className="cursor-pointer">
                        Beginner
                      </SelectItem>
                      <SelectItem
                        value="intermediate"
                        className="cursor-pointer"
                      >
                        Intermediate
                      </SelectItem>
                      <SelectItem value="advanced" className="cursor-pointer">
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
