import VideoPlayer from "@/components/video-player/VideoPlayer";
import { getChapterById } from "@/lib/server-actions/chapters";

type ChapterPageProps = {
  params: { chapterId: string };
};
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const chapter = await getChapterById(chapterId);
  return (
    <div>
      <VideoPlayer
        videoSrc={chapter.videoUrl}
        subtitleSrc={chapter.subtitle.url}
        wordsPairList={chapter.wordsPairList}
      />
    </div>
  );
}
