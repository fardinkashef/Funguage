import { auth } from "@/auth";
import { getUserByID } from "@/lib/server-actions/users";
import { getWords } from "@/lib/server-actions/words";
import { databaseWord, user } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ClipReview() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login?callbackUrl=/learning/review/flashcard");

  const userData = (await getUserByID(user._id as string)) as user;
  const dbWords = await getWords(userData.learntWordsIds);

  return (
    <div>
      <ul>
        {dbWords.map((dbWord: databaseWord) => (
          <li key={dbWord._id}>
            <Link href={`/learning/review/clip/${dbWord._id}`}>
              {dbWord.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
