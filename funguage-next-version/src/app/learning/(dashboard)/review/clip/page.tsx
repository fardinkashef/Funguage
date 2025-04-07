import { auth } from "@/auth";
import ClipReviewItem from "@/components/ClipReviewItem";
import { getUserByID } from "@/lib/server-actions/users";
import { getWords } from "@/lib/server-actions/words";
import { databaseWord, user } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function ClipReview() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login?callbackUrl=/learning/review/flashcard");

  const userData = (await getUserByID(user._id as string)) as user;
  const dbWords = await getWords(userData.learntWordsIds);

  return (
    <ul className="p-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
      {dbWords.map((dbWord: databaseWord) => (
        <li key={dbWord._id}>
          <ClipReviewItem word={dbWord} />
        </li>
      ))}
    </ul>
  );
}
