import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { getChapterById } from "@/lib/server-actions/chapters";
import { getUserByID } from "@/lib/server-actions/users";
import { CheckCircle } from "lucide-react";
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
      <h1 className="text-3xl font-bold text-center mb-8">
        English Vocabulary Lesson
      </h1>

      <VideoPlayer
        videoSrc={chapter.videoUrl}
        subtitleSrc={chapter.subtitle.url}
        wordsPairList={wordsPairList}
      />

      {/* Call to Action Section */}
      <div className="bg-slate-50 rounded-lg p-6 shadow-md text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">
          Track your vocabulary progress
        </h2>
        <p className="text-slate-700 mb-6">
          View all the words taught in this video and check off the ones you've
          completely mastered. This helps you track your progress and focus on
          words you still need to practice.
        </p>

        <Link
          href={`/learning/courses/${courseId}/chapters/${chapterId}/review`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-lg text-lg font-medium"
        >
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-lg text-lg font-medium">
            <CheckCircle className="mr-2 h-5 w-5" />
            Track My Vocabulary
          </Button>
        </Link>
      </div>
    </div>
  );
}
