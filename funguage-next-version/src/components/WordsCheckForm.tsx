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
import { addToUserWords } from "@/lib/server-actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

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
              {words.map((word) => (
                <FormField
                  key={word._id}
                  control={wordsForm.control}
                  name="words"
                  render={({ field }) => {
                    return (
                      <Card className="px-2">
                        <FormItem
                          key={word._id}
                          className="flex items-center min-h-12"
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
                          <FormLabel className="cursor-pointer">
                            <CardHeader>
                              <CardTitle>{word.title}</CardTitle>
                              <CardDescription>
                                {word.meaning.definition.text}
                              </CardDescription>
                            </CardHeader>
                          </FormLabel>
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
