import { auth } from "@/auth";
import SelectWordsForm from "@/components/SelectWordsForm";
import { getUserByID } from "@/lib/server-actions/users";
import { getWords } from "@/lib/server-actions/words";
import { user } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UnlearnWordsPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login?callbackUrl=/learning/review/my-vocabulary");

  const userData = (await getUserByID(user._id as string)) as user;
  const dbWords = await getWords(userData.learntWordsIds);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <header className="mb-8 md:flex justify-between items-center flex-wrap">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Unlearn Words</h1>
          <p className="text-muted-foreground mt-2">
            Remove words you think you need more time watching videos
          </p>
        </div>
        <Link
          href="/learning/my-vocabulary/unlearn-words"
          className="bg-black text-white p-2 rounded-md mr-4"
        >
          place holder
        </Link>
      </header>
      <SelectWordsForm
        databaseWords={dbWords}
        userId={user._id as string}
        action="remove"
      />
    </div>
  );
}
