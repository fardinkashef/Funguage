import React from "react";
import { redirect } from "next/navigation";

import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import { Banner } from "@/components/Banner";
import { getChapterById } from "@/lib/server-actions/chapters";
import ChapterSubtitleForm from "./_components/ChapterSubtitleForm";
import ChapterWords from "./_components/ChapterWords/ChapterWords";

type ChapterIdPageProps = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

export default async function ChapterIdPage({ params }: ChapterIdPageProps) {
  const { courseId, chapterId } = await params;
  //   const { userId } = auth();

  //   if (!userId) {
  //     return redirect("/");
  //   }

  const chapter = await getChapterById(chapterId);
  // const databaseWords = await getWords();

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  // const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
              </div>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300 ">
              Complete all fields {completionText}
            </span>
          </div>
          {/* <ChapterActions
            disabled={!isComplete}
            courseId={courseId}
            chapterId={chapterId}
            isPublished={chapter.isPublished}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-ceenter gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl font-medium">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialTitle={chapter.title}
                chapterId={chapterId}
              />
              <ChapterDescriptionForm
                initialDescription={chapter.description}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl font-medium">Access Settings</h2>
            </div>
            {/* <ChapterAccessForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            /> */}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl font-medium">Add a video</h2>
            </div>
            <ChapterVideoForm
              initialVideoUrl={chapter.videoUrl}
              chapterId={chapterId}
            />
            <ChapterSubtitleForm
              initialSubtitle={chapter.subtitle}
              chapterId={chapterId}
            />
            {chapter.subtitle.url && (
              <ChapterWords
                subtitleSrc={chapter.subtitle.url}
                initialWordsPairList={chapter.wordsPairList}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
