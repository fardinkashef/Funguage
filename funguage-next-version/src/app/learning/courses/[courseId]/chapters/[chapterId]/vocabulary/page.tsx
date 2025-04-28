import { auth } from "@/auth";
import SelectWordsForm from "@/components/SelectWordsForm";
import { getChapterById } from "@/lib/server-actions/chapters";
import { getUserByID } from "@/lib/server-actions/users";
import { getWords } from "@/lib/server-actions/words";
import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ChapterVocabularyPage({
  params,
}: {
  params: Promise<{ chapterId: string; courseId: string }>;
}) {
  const { chapterId, courseId } = await params;

  const session = await auth();
  const user = session?.user;
  if (!user)
    redirect(
      `/login?callbackUrl=/learning/courses/${courseId}/chapters/${chapterId}/vocabulary`
    );
  const userData = await getUserByID(user._id as string);
  if (!userData) return;

  const chapter = await getChapterById(chapterId);
  const newDBWordIds = chapter.usedDatabaseWordIds.filter(
    (dbWordId) => !userData.learntWordsIds.includes(dbWordId)
  );
  const newDBWords = await getWords(newDBWordIds);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-8 lg:flex gap-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Chapter Vocabulary List</h1>
          <p className="text-muted-foreground mt-2">
            Check off the words you&apos;ve completely mastered. This helps you
            track your progress and focus on words you still need to practice.
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-medium whitespace-nowrap">
            {newDBWordIds.length} Words
          </span>
        </div>
      </div>
      <SelectWordsForm
        databaseWords={newDBWords}
        userId={user._id as string}
      />
    </div>
  );
}
