import { useEffect, useState } from "react";
import "./WordModal.scss";
import { databaseWord } from "@/lib/types";

type MiniWordModalProps = {
  databaseWords: databaseWord[];
  handleCloseModal: () => void;
  handleSetPronunciationAudioSrc: (word: string) => void;
  playPronunciation: (accent: string) => void;
};

export default function MiniWordModal({
  databaseWords,
  handleCloseModal,
  handleSetPronunciationAudioSrc,
  playPronunciation,
}: MiniWordModalProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Handlers 👇:

  const {
    word,
    pronunciation,
    partOfSpeech,
    register,
    // translation,
    // frequency,
    meaning,
  }: databaseWord = databaseWords[currentWordIndex];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log("i'm here on modalllllllll", e.key.toLowerCase());

    switch (e.key.toLowerCase()) {
      case " ": // Check if the pressed key is the spacebar
        e.preventDefault(); // Prevent the default scrolling behavior
        break;
      case "enter":
        handleCloseModal();
        break;
      case "escape":
        handleCloseModal();
        break;
      case "arrowleft":
        if (currentWordIndex > 0) setCurrentWordIndex(currentWordIndex - 1);
        break;
      case "arrowright":
        if (currentWordIndex < databaseWords.length - 1)
          setCurrentWordIndex(currentWordIndex + 1);
        break;
    }
  };

  useEffect(
    function () {
      handleSetPronunciationAudioSrc(word);
    },
    [word]
  );

  return (
    <div
      className="WordModal"
      onKeyDown={handleKeyDown}
      //* This is called a "Callback Ref" and one of it's great use cases is to focus on a conditionally rendered element on mount.
      ref={(element) => element?.focus()}
      tabIndex={0} // Makes the div focusable
    >
      <div className="content">
        <div className="main-nav">
          <div>
            <button
              className="back"
              onClick={() => {
                setCurrentWordIndex(currentWordIndex - 1);
              }}
              disabled={currentWordIndex === 0}
              title="Back to previous highlighted word"
            ></button>

            <button
              className="forward"
              onClick={() => {
                setCurrentWordIndex(currentWordIndex + 1);
              }}
              disabled={currentWordIndex === databaseWords.length - 1}
              title="Forward to next highlighted word"
            ></button>
          </div>
          <button
            className="close"
            onClick={handleCloseModal}
            title="Close the modal"
          />
        </div>
        <div className="head">
          <h2 className="word">{word}</h2>
          <p>{pronunciation}</p>
          <div className="pronunciation">
            <button
              onClick={() => playPronunciation("Br")}
              className="Br"
              title="Play British pronunciation"
            ></button>
            <button
              onClick={() => playPronunciation("Am")}
              className="Am"
              title="Play American pronunciation"
            ></button>
          </div>
        </div>
        <div className="other-info">
          {partOfSpeech && <p className="part-of-speech">{partOfSpeech}</p>}
          {register && <p className="register">{register}</p>}
          {/* {frequency.written && <p>{frequency?.written}</p> } */}
        </div>

        <p className="definition">
          <span>{meaning.index ? meaning.index + ") " : ""}</span>
          {meaning.definition.text}
        </p>
      </div>
    </div>
  );
}
