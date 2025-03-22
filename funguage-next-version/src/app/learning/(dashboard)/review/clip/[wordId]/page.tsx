import { auth } from "@/auth";
import WordClips from "@/components/WordClips";
import { getChaptersByWordID } from "@/lib/server-actions/chapters";
import { chapter } from "@/lib/types";
import { redirect } from "next/navigation";

type WordClipPageProps = {
  params: Promise<{ wordId: string }>;
};
export default async function WordClipPage({ params }: WordClipPageProps) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login?callbackUrl=/learning/review/flashcard");
  const { wordId } = await params;
  const chapters = (await getChaptersByWordID(wordId)) as chapter[];
  const wordClips = [];
  console.log("chapters length:", chapters.length);

  chapters.forEach((chapter) => {
    chapter.wordsPairList.forEach((pair) => {
      const dbWordIds = pair.databaseWordList.map((dbWord) => dbWord._id);
      if (dbWordIds.includes(wordId))
        wordClips.push({
          videoUrl: chapter.videoUrl,
          subtitleUrl: chapter.subtitle.url,
          wordsPairList: [pair],
          startTime: pair.subtitleWordList[0].previousCueStartTime,
          endTime: pair.subtitleWordList[0].nextCueEndTime,
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
