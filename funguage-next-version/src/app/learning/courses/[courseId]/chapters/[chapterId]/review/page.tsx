import { auth } from "@/auth";
import { getChapterById } from "@/lib/server-actions/chapters";
import { getUserByID } from "@/lib/server-actions/users";
import { getWords } from "@/lib/server-actions/words";
import { redirect } from "next/navigation";

export default async function ChapterReviewPage({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) {
  const { chapterId, courseId } = await params;

  const session = await auth();
  const user = session?.user;
  if (!user)
    redirect(
      `/login?callbackUrl=/learning/courses/${courseId}/chapters/${chapterId}/review`
    );
  const userData = await getUserByID(user._id as string);
  if (!userData) return;

  const chapter = await getChapterById(chapterId);
  const newDBWordIds = chapter.usedDatabaseWordIds.filter(
    (dbWordId) => !(dbWordId in userData.learntWordsIds)
  );
  const newDBWords = await getWords(newDBWordIds);
  // console.log("this is the number:", newDBWords.length);

  return <div>ChapterReviewPage</div>;
}
