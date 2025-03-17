"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { databaseWord } from "@/lib/types";
import { addToUserWords } from "@/lib/server-actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// const items = [
//   {
//     id: "recents",
//     label: "Recents",
//   },
//   {
//     id: "home",
//     label: "Home",
//   },
//   {
//     id: "applications",
//     label: "Applications",
//   },
//   {
//     id: "desktop",
//     label: "Desktop",
//   },
//   {
//     id: "downloads",
//     label: "Downloads",
//   },
//   {
//     id: "documents",
//     label: "Documents",
//   },
// ] as const;

const FormSchema = z.object({
  words: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function WordsCheckForm({
  words,
  userId,
}: {
  words: databaseWord[];
  userId: string;
}) {
  const router = useRouter();

  const wordsForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      words: [],
    },
  });
  async function submit(data: z.infer<typeof FormSchema>) {
    await addToUserWords(userId, data.words);
    toast.success("New words added to your words bank!");
    router.refresh();
  }

  return (
    <Form {...wordsForm}>
      <form onSubmit={wordsForm.handleSubmit(submit)} className="space-y-8">
        <FormField
          control={wordsForm.control}
          name="words"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Words Check</FormLabel>
                <FormDescription>
                  Select the words you&apos;ve mastered. They won&apos;t be
                  displayed in any course again.
                </FormDescription>
              </div>
              {words.map((word) => (
                <FormField
                  key={word._id}
                  control={wordsForm.control}
                  name="words"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={word._id}
                        className="flex flex-row items-start space-x-3 space-y-0 min-h-12 border-solid border-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(word._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, word._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== word._id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <h2>{word.title}</h2>
                          <p>{word.meaning.definition.text}</p>
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
