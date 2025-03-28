"use client";
import { useState } from "react";
import "./FlashCard.scss";
import { databaseWord } from "@/lib/types";

type FlashCardProps = {
  dbWord: databaseWord;
};

export default function FlashCard({ dbWord }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="relative w-56 h-56 rounded-md overflow-hidden shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`front ${
          flipped ? "front-flipped" : ""
        } flex flex-col justify-center items-center gap-3 rounded-lg border-solid border-2 border-t-8 border-t-orange-500`}
      >
        <h2 className="text-2xl font-bold">{dbWord.word}</h2>
        <span className="h-4">{dbWord.partOfSpeech}</span>
        <span className="h-4">{dbWord.meaning.index}</span>
      </div>
      <div
        className={`back ${
          flipped ? "back-flipped" : ""
        } flex justify-center items-center rounded-lg border-solid border-2 p-6 relative`}
      >
        <p className="first-letter:uppercase">
          {dbWord.meaning.definition.text}
        </p>
        <span className="absolute w-32 h-2 bg-orange-500 -rotate-45 top-0 -left-7"></span>
      </div>
    </div>
  );
}
