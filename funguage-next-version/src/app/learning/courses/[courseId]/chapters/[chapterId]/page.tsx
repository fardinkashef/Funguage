import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { getChapterById } from "@/lib/server-actions/chapters";
import { getUserByID } from "@/lib/server-actions/users";
import { Check, CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type ChapterPageProps = {
  params: Promise<{ chapterId: string; courseId: string }>;
};
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId, courseId } = await params;

  const session = await auth();
  const user = session?.user;
  if (!user)
    redirect(
      `/login?callbackUrl=/learning/courses/${courseId}/chapters/${chapterId}`
    );
  const userData = await getUserByID(user._id as string);
  if (!userData) return;
  const chapter = await getChapterById(chapterId);

  const wordsPairList = chapter.wordsPairList.filter(
    (pair) =>
      !pair.databaseWordList.every((dbWord) =>
        userData.learntWordsIds.includes(dbWord._id)
      )
  );

  if (!chapter.videoUrl) return <div>No video url</div>;

  return (
    <div className="px-2 py-4">
      <h1 className="text-3xl font-bold text-center mb-8">{chapter.title}</h1>

      <VideoPlayer
        videoSrc={chapter.videoUrl}
        subtitleSrc={chapter.subtitle.url}
        wordsPairList={wordsPairList}
      />

      {/* Call to Action Section */}
      <div className="bg-slate-50 rounded-lg p-6 shadow-md text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">
          Ready to add some words into your vocabulary collection?
        </h2>
        <p className="text-slate-700 mb-6">
          View all the new words taught in this video and check off the ones
          you&apos;ve completely mastered. This helps you track your progress
          and focus on words you still need to practice.
        </p>

        <Link
          href={`/learning/courses/${courseId}/chapters/${chapterId}/vocabulary`}
          className="flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white rounded-md p-2 w-fit mx-auto"
        >
          <CheckCircle className="mr-2" size={26} />
          View Vocabulary List
        </Link>
      </div>
    </div>
  );
}
