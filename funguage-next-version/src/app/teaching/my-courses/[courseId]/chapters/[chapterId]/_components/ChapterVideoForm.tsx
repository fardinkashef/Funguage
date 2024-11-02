"use client";

import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { updateChapterVideoUrl } from "@/lib/server-actions/chapters";
import { useRouter } from "next/navigation";

interface ChapterVideoFormProps {
  initialVideoUrl: string;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export default function ChapterVideoForm({
  initialVideoUrl,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapterVideoUrl(chapterId, values.videoUrl);
      await toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
      // const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      // const url = `${baseUrl}/teacher/courses/${courseId}/chapters/${chapterId}`;
      // window.location.assign(url);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4  dark:bg-gray-800 dark:text-slate-300">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialVideoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialVideoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialVideoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md  dark:bg-gray-800 dark:text-slate-300">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {/* <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} /> */}
            {/* <h2>This is initialVideoUrl: {initialVideoUrl}</h2> */}
            <video src={initialVideoUrl} controls></video>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                submit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialVideoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
}
