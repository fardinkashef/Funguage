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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { databaseWord } from "@/lib/types";

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

export default function WordsCheckForm({ words }: { words: databaseWord[] }) {
  const wordsForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      words: [],
    },
  });

  function submit(data: z.infer<typeof FormSchema>) {
    console.log("this is the data:", data);
    // Todo: define a server action to save this array of db words ids to user's learntWordIds
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
                        className="flex flex-row items-start space-x-3 space-y-0"
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
                          {/* {word.title} */}
                          {/* //Todo: Remove the following tooltip and also remove it from ui folder. The problem is mobile users can't use it. we need another idea. it's okay to use tooltip in WordsPart when creating a course because users won't be able to access it but here it's not acceptable. we need a better solution. maybe a collapsible component. */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger> {word.title}</TooltipTrigger>
                              <TooltipContent>
                                <p>{word.meaning.definition.text}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
