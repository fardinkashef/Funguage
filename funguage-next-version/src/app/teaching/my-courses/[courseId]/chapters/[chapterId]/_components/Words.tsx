"use client";

import { useEffect, useState } from "react";
import WordsPairForm from "./WordsPairForm";
import { cue, databaseWord, subtitleWord, wordsPair } from "@/lib/types";
import { getWords } from "@/lib/server-actions/words";

type WordsProps = {
  subtitleSrc: string;
  wordsPairList: wordsPair[];
};

export default function Words({ subtitleSrc, wordsPairList }: WordsProps) {
  const [databaseWords, setDatabaseWords] = useState<databaseWord[]>([]);
  const [subtitleWords, setSubtitleWords] = useState<subtitleWord[]>([]);
  const [cues, setCues] = useState<cue[]>([]);

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
      if (!subtitleSrc) return;
      //* When using document.getElementById("some-id"), we need to assert the type. See "Type Assertions" pdf file in my notes 👇:
      const video = document.getElementById("video") as HTMLVideoElement;
      const track = document.getElementById("track") as HTMLTrackElement;
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
      console.log("track", track);

      track.addEventListener(`load`, () => {
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
      });
    },
    [subtitleSrc]
  );
  console.log("subtitleWords", subtitleWords);

  return (
    <div>
      <video className="hidden" id="video" controls preload="metadata">
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          // src="media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"
          src={subtitleSrc}
          default
          id="track"
          onLoad={() =>
            console.log("i'm looooooooooooooooooooadedddddddddddddd")
          }
        />
      </video>

      {wordsPairList.map((wordsPair: wordsPair, index: number) => (
        <WordsPairForm
          key={index}
          initialWordsPair={wordsPair}
          subtitleWords={subtitleWords}
          databaseWords={databaseWords}
        />
      ))}
      <WordsPairForm
        // initialWordsPair={{ subtitleWordList: [], databaseWordList: [] }}
        subtitleWords={subtitleWords}
        databaseWords={databaseWords}
      />
    </div>
  );
}