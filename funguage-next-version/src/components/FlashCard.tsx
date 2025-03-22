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
    <div className="card" onClick={() => setFlipped(!flipped)}>
      <div
        className={`front ${
          flipped ? "front-flipped" : ""
        } flex flex-col justify-center items-center rounded-lg border-solid border-2 bg-blue-300`}
      >
        <h3>{dbWord.word}</h3>
        <span>{dbWord.partOfSpeech}</span>
        <span>{dbWord.meaning.index}</span>
      </div>
      <div
        className={`back ${
          flipped ? "back-flipped" : ""
        } flex justify-center items-center rounded-lg border-solid border-2 bg-green-300`}
      >
        <p>{dbWord.meaning.definition.text}</p>
      </div>
    </div>
  );
}
