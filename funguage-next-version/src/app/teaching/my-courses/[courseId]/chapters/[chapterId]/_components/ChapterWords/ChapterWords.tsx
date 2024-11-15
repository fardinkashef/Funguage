"use client";

import { useEffect, useState } from "react";
import { cue, databaseWord, subtitleWord, wordsPair } from "@/lib/types";
import { getWords } from "@/lib/server-actions/words";
import WordItem from "./WordItem";
import { Button } from "@/components/ui/button";
import { updateChapterWords } from "@/lib/server-actions/chapters";
import toast from "react-hot-toast";

type ChapterWordsProps = {
  subtitleSrc: string;
  initialWordsPairList: wordsPair[];
  chapterId: string;
};

export default function ChapterWords({
  subtitleSrc,
  initialWordsPairList,
  chapterId,
}: ChapterWordsProps) {
  const [databaseWords, setDatabaseWords] = useState<databaseWord[]>([]);
  const [subtitleWords, setSubtitleWords] = useState<subtitleWord[]>([]);
  const [cues, setCues] = useState<cue[]>([]);
  const [wordsPairList, setWordsPairList] =
    useState<wordsPair[]>(initialWordsPairList);
  const [suggestionBoxClosed, setSuggestionBoxClosed] = useState(false);

  // Handlers 👇:
  const setSubtitleWordList = (
    index: number,
    newSubtitleWordList: subtitleWord[]
  ) => {
    const wordsPairListCopy = [...wordsPairList];
    wordsPairListCopy[index].subtitleWordList = newSubtitleWordList;
    const newWordsPairList = [...wordsPairListCopy];
    setWordsPairList(newWordsPairList);
  };
  const setDatabaseWordList = (
    index: number,
    newDatabaseWordList: databaseWord[]
  ) => {
    const wordsPairListCopy = [...wordsPairList];
    wordsPairListCopy[index].databaseWordList = newDatabaseWordList;
    const newWordsPairList = [...wordsPairListCopy];
    setWordsPairList(newWordsPairList);
  };

  const handleAddWordPair = () => {
    setWordsPairList([
      ...wordsPairList,
      { subtitleWordList: [], databaseWordList: [] },
    ]);
  };

  const handleRemoveWordPair = (index: number) => {
    const list = [...wordsPairList];
    list.splice(index, 1);
    setWordsPairList([...list]);
  };
  const handleSaveWords = async () => {
    console.log("wordsPairList", wordsPairList);
    try {
      await updateChapterWords(chapterId, wordsPairList);
      toast.success("Chapter words updated");
    } catch (error) {
      console.log("This error happened while updating chapter words:", error);
    }
  };
  // Handlers 👆
  useEffect(
    function () {
      async function handleDatabaseWords() {
        const words = await getWords();
        setDatabaseWords(words);
      }
      handleDatabaseWords();
    },

    []
  );
  useEffect(
    function () {
      //* When using document.getElementById("some-id"), we need to assert the type. See "Type Assertions" pdf file in my notes 👇:
      const video = document.getElementById("video") as HTMLVideoElement;
      //   const track = document.getElementById("track") as HTMLTrackElement;
      const wordFilter = [
        "",
        ".",
        "?",
        "!",
        "a",
        "I",
        "an",
        "on",
        "that",
        "to",
        "is",
        "-",
      ];

      if (!video.textTracks[0].cues) return;

      let allWords: subtitleWord[] = [];
      const allCues = [];
      for (let i = 0; i < video.textTracks[0].cues.length; i++) {
        //* TS complains that "Property 'text' does not exist on type 'TextTrackCue'." so I asserted the more specific type of VTTCue 👇:
        const cue = video.textTracks[0].cues[i] as VTTCue;
        let text = cue.text;
        text = text
          .replaceAll(".", " .")
          .replaceAll(". . .", "...")
          .replaceAll(",", " ,")
          .replaceAll("?", " ?")
          .replaceAll("\n", " ");

        allCues.push({ id: cue.id, text: text });
        let cueWords = text.split(" ");
        cueWords = cueWords.map((word) => word.trim());
        cueWords = cueWords.filter((word) => !wordFilter.includes(word));

        const currentCueSubtitleWords = cueWords.map((word, index) => {
          return {
            title: word,
            cueId: cue.id,
            orderNumber:
              cueWords.slice(0, index).filter((cueWord) => cueWord === word)
                .length + 1,
          };
        });

        allWords = [...allWords, ...currentCueSubtitleWords];
      }
      setSubtitleWords(allWords);
      setCues(allCues);
    },
    [subtitleSrc]
  );
  console.log(
    "subtitleWords",
    `${subtitleWords.length ? " okay" : " not loaded"}`
  );

  return (
    <>
      <video
        // src={videoUrl}
        className="hidden"
        id="video"
        controls
        preload="metadata"
        crossOrigin="anonymous"
      >
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src={subtitleSrc}
          //   src="/Sintel1.vtt"
          default
          id="track"
        />
      </video>

      <div className="w-full mx-auto my-2 p-4 rounded-md  bg-slate-100  dark:bg-gray-800">
        {wordsPairList.map((wordPair, index) => (
          <WordItem
            subtitleWords={subtitleWords}
            databaseWords={databaseWords}
            cues={cues}
            ///////////////
            subtitleWordList={wordPair.subtitleWordList}
            databaseWordList={wordPair.databaseWordList}
            setSubtitleWordList={(newSubtitleWordList: subtitleWord[]) =>
              setSubtitleWordList(index, newSubtitleWordList)
            }
            setDatabaseWordList={(newDatabaseWordList: databaseWord[]) =>
              setDatabaseWordList(index, newDatabaseWordList)
            }
            //////////////

            handleRemoveWordPair={() => handleRemoveWordPair(index)}
            suggestionBoxClosed={suggestionBoxClosed}
            setSuggestionBoxClosed={setSuggestionBoxClosed}
            ////////////////
            key={index}
          />
        ))}
        <div className="flex justify-center gap-4">
          <Button className="bg-slate-500" onClick={handleAddWordPair}>
            Add a word
          </Button>
          <Button className="bg-slate-500" onClick={handleSaveWords}>
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
}
