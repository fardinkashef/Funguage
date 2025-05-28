import { useRef, useState } from "react";
import "./WordModal.scss";
import { databaseWord } from "@/lib/types";
import localFont from "next/font/local";

const vazirFont = localFont({
  src: "../../../app/fonts/Vazirmatn-Regular.woff2",
});
type MiniWordModalProps = {
  databaseWords: databaseWord[];
  handleCloseModal: () => void;
};

export default function MiniWordModal({
  databaseWords,
  handleCloseModal,
}: MiniWordModalProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const BritishAudioRef = useRef<HTMLAudioElement>(null);
  const AmericanAudioRef = useRef<HTMLAudioElement>(null);
  // Handlers 👇:

  const {
    word,
    pronunciation,
    partOfSpeech,
    register,
    // frequency,
    meaning,
    audio,
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
  const playPronunciation = (accent: "Br" | "Am") => {
    if (!AmericanAudioRef.current || !BritishAudioRef.current) return;

    if (accent === "Am") AmericanAudioRef.current.play();
    else BritishAudioRef.current.play();
  };

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
          {audio && (
            <div className="pronunciation">
              <button
                onClick={() => playPronunciation("Br")}
                className="Br"
                title="Play British pronunciation"
              />
              <button
                onClick={() => playPronunciation("Am")}
                className="Am"
                title="Play American pronunciation"
              />
            </div>
          )}
        </div>
        <div className="other-info">
          {partOfSpeech && <p className="part-of-speech">{partOfSpeech}</p>}
          {register && <p className="register">{register}</p>}
          {/* {frequency.written && <p>{frequency?.written}</p> } */}
          {meaning.translation && (
            <p className={`${vazirFont.className}`}>{meaning.translation}</p>
          )}
        </div>
        {/* LexUnit (which is sth like "be not worth it" for the word "worth") */}
        {/* {meaning.definition.lexUnit && <p>{meaning.definition.lexUnit}</p>} */}
        <p className="definition">
          <span>{meaning.index ? meaning.index + ") " : ""}</span>
          {meaning.definition.lexUnit && (
            <>
              <span className="font-bold">{meaning.definition.lexUnit}</span>
              <span>: </span>
            </>
          )}
          {meaning.definition.text}
        </p>
      </div>

      {/* //! Audio player part. This part is hidden: */}
      {audio && (
        <div key={word}>
          <audio hidden ref={BritishAudioRef}>
            <source
              src={`/audios/${word}${
                audio === "specific" ? "_" + partOfSpeech : ""
              }_Br.mp3`}
              type="audio/mpeg"
            />
          </audio>
          <audio hidden ref={AmericanAudioRef}>
            <source
              src={`/audios/${word}${
                audio === "specific" ? "_" + partOfSpeech : ""
              }_Am.mp3`}
              type="audio/mpeg"
            />
          </audio>
        </div>
      )}
    </div>
  );
}
