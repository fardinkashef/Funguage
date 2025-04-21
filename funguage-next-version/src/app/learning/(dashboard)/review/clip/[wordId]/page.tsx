import { auth } from "@/auth";
import WordClips from "@/components/WordClips";
import { getChaptersByWordID } from "@/lib/server-actions/chapters";
import { wordClip } from "@/lib/types";
import { redirect } from "next/navigation";

type WordClipPageProps = {
  params: Promise<{ wordId: string }>;
};
export default async function WordClipPage({ params }: WordClipPageProps) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login?callbackUrl=/learning/review/flashcard");
  const { wordId } = await params;
  const chapters = await getChaptersByWordID(wordId);
  const wordClips: wordClip[] = [];

  chapters.forEach((chapter) => {
    chapter.wordsPairList.forEach((pair) => {
      const dbWordIds = pair.databaseWordList.map((dbWord) => dbWord._id);
      if (dbWordIds.includes(wordId))
        wordClips.push({
          videoUrl: chapter.videoUrl as string,
          subtitleUrl: chapter.subtitle.url as string,
          wordsPairList: [pair],
          startTime: pair.subtitleWordList[0].previousCueStartTime as number,
          endTime: pair.subtitleWordList[0].nextCueEndTime as number,
        });
    });
  });
  // console.log("these are word clips:", wordClips.length);

  return (
    <div>
      <WordClips clips={wordClips} />
    </div>
  );
}
