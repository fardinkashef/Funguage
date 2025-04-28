import { auth } from "@/auth";
import SelectWordsForm from "@/components/SelectWordsForm";
import { getCourseById } from "@/lib/server-actions/courses";
import { getUserByID } from "@/lib/server-actions/users";
import { getWords } from "@/lib/server-actions/words";
import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";

export default async function CourseVocabularyPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const session = await auth();
  const user = session?.user;
  if (!user)
    redirect(`/login?callbackUrl=/learning/courses/${courseId}/vocabulary`);
  const userData = await getUserByID(user._id as string);
  if (!userData) return;

  const course = await getCourseById(courseId);
  const newDBWordIds = course.usedDatabaseWordIds.filter(
    (dbWordId) => !userData.learntWordsIds.includes(dbWordId)
  );
  const newDBWords = await getWords(newDBWordIds);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <header className="mb-8 lg:flex gap-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Course Vocabulary List</h1>
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
      </header>
      <SelectWordsForm databaseWords={newDBWords} userId={user._id as string} />
    </div>
  );
}
