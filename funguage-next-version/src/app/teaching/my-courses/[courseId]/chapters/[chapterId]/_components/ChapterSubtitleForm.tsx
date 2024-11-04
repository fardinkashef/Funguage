"use client";
import * as z from "zod";
import { PlusCircle, File, Loader2, X, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

type ChapterSubtitleFormProps = {
  initialSubtitle: { url: string; name: string } | undefined;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
  originalFilename: z.string().min(1),
});

export default function ChapterSubtitleForm({
  initialSubtitle,
  courseId,
  chapterId,
}: ChapterSubtitleFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800 dark:text-slate-300">
      <div className="font-medium flex items-center justify-between">
        Chapter subtitle
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialSubtitle && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a subtitle
            </>
          )}
          {!isEditing && initialSubtitle && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit subtitle
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {!initialSubtitle && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No subtitle yet
            </p>
          )}
          {initialSubtitle && (
            <div className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href={initialSubtitle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs line-clamp-1 hover:underline"
              >
                {initialSubtitle.name}
              </a>
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterSubtitle"
            onChange={(url, originalFilename) => {
              if (url && originalFilename) {
                submit({ url: url, originalFilename: originalFilename });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add a subtitle for this chapter in .vtt format.
          </div>
        </div>
      )}
    </div>
  );
}
