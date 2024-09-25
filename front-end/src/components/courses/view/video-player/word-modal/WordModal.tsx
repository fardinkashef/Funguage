import { useEffect, useState } from "react";
import "./WordModal.scss";
import Images from "./Images";
import Examples from "./Examples";

import {
  type databaseWord,
  type databaseWordList,
} from "@/shared/types/wordDataTypes";

type WordModalProps = {
  data: databaseWordList;
  handleCloseModal: () => void;
  handleSetPronunciationAudioSrc: (word: string) => void;
  playPronunciation: (accent: string) => void;
};

function WordModal({
  data,
  handleCloseModal,
  handleSetPronunciationAudioSrc,
  playPronunciation,
}: WordModalProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handlers 👇:

  const {
    word,
    pronunciation,
    partOfSpeech,
    register,
    // translation,
    // frequency,
    meaning,
    images,
  }: databaseWord = data[currentWordIndex];

  useEffect(
    function () {
      handleSetPronunciationAudioSrc(word);
    },
    [word]
  );

  return (
    <div
      className="WordModal"
      // onClick={handleCloseModal}
    >
      <div className="content">
        <div className="main-nav">
          <div>
            <button
              className="back"
              onClick={() => {
                setCurrentWordIndex(currentWordIndex - 1);
                setCurrentExampleIndex(0);
                setCurrentImageIndex(0);
              }}
              disabled={currentWordIndex === 0}
              title="Back to previous highlighted word"
            ></button>

            <button
              className="forward"
              onClick={() => {
                setCurrentWordIndex(currentWordIndex + 1);
                setCurrentExampleIndex(0);
                setCurrentImageIndex(0);
              }}
              disabled={currentWordIndex === data.length - 1}
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
        <div className="examples-images-container">
          {meaning.examples.length > 0 && (
            <Examples
              currentWord={data[currentWordIndex]}
              currentExampleIndex={currentExampleIndex}
              setCurrentExampleIndex={setCurrentExampleIndex}
            />
          )}
          {images.length > 0 && (
            <Images
              currentWord={data[currentWordIndex]}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WordModal;
