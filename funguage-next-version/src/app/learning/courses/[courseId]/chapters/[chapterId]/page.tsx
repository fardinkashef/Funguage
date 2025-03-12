import { auth } from "@/auth";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { getChapterById } from "@/lib/server-actions/chapters";
import { getUserByID } from "@/lib/server-actions/users";
import Link from "next/link";
import { redirect } from "next/navigation";

type ChapterPageProps = {
  params: { chapterId: string; courseId: string };
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
    <div className="py-4">
      <VideoPlayer
        videoSrc={chapter.videoUrl}
        subtitleSrc={chapter.subtitle.url}
        wordsPairList={wordsPairList}
      />
      <div>
        <Link
          href={`/learning/courses/${courseId}/chapters/${chapterId}/review`}
          className="bg-black text-white p-4"
        >
          Check out
        </Link>
      </div>
    </div>
  );
}
