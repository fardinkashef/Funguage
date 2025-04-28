"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { databaseWord } from "@/lib/types";
import {
  addToUserWords,
  removeFromUserWords,
} from "@/lib/server-actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import WordsModalDialog from "./video-player/word-modal/WordsModalDialog";

const FormSchema = z.object({
  words: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type SelectWordsFormProps = {
  databaseWords: databaseWord[];
  userId: string;
  action?: "add" | "remove";
};
export default function SelectWordsForm({
  databaseWords,
  userId,
  action = "add",
}: SelectWordsFormProps) {
  console.log("databaseWords.length:", databaseWords.length);

  const router = useRouter();

  const wordsForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      words: [],
    },
  });
  async function submit(data: z.infer<typeof FormSchema>) {
    if (action === "add") {
      await addToUserWords(userId, data.words);
      toast.success("New words added to your words bank!");
    } else {
      await removeFromUserWords(userId, data.words);
      toast.success("Selected words removes from your words bank!");
    }
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
              {databaseWords.map((word, index) => (
                <FormField
                  key={word._id}
                  control={wordsForm.control}
                  name="words"
                  render={({ field }) => {
                    return (
                      <Card className="px-2">
                        <FormItem
                          key={word._id}
                          className="flex items-center gap-4 min-h-12"
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
                          {/* //Todo: Shadcn FormLabel component has a space-y-2 classname which makes it have a margin top and I don't know how to over-write it using classNames yet */}

                          {/* //Todo: The border below should be removed and instead added on the left side of the following Dialog Trigger */}
                          <FormLabel className="cursor-pointer grow">
                            <CardHeader>
                              <CardTitle>{word.title}</CardTitle>
                              <CardDescription>
                                {word.meaning.definition.text}
                              </CardDescription>
                            </CardHeader>
                          </FormLabel>
                          <WordsModalDialog
                            databaseWords={databaseWords}
                            wordIndex={index}
                            // I needed to add the following key to prevent an error. Pay attention that just using word._id as the value for the key is not enough.
                            key={word._id + databaseWords.length}
                          />
                        </FormItem>
                      </Card>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Submit
        </Button>
      </form>
    </Form>
  );
}
