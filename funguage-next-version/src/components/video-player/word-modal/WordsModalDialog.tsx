import { useState } from "react";
import Images from "./Images";
import Examples from "./Examples";
import { databaseWord } from "@/lib/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Ellipsis, Volume2 } from "lucide-react";

type WordsModalDialogProps = {
  databaseWords: databaseWord[];
  wordIndex: number;
};

export default function WordsModalDialog({
  databaseWords,
  wordIndex = 0,
}: WordsModalDialogProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(wordIndex);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const {
    word,
    pronunciation,
    partOfSpeech,
    register,
    // translation,
    // frequency,
    meaning,
    images,
  }: databaseWord = databaseWords[currentWordIndex];

  // Handlers 👇:

  const handleOpenChange = () => {
    // When openChange event happens, if open state is true, this means the modal has been just closed, you get it? So we reset currentWordIndex
    if (open) setCurrentWordIndex(wordIndex);
    setOpen((prevState) => !prevState);
  };
  return (
    // To use the Dialog component, we don't have to make it controlled using open and onOpenChange attributes like I've done. But I needed to reset currentWordIndex when modal is closed so I had to make it controlled.
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="">
          <Ellipsis size={28} />
        </button>
      </DialogTrigger>
      {/* //Todo: This aspect-square is not appropriate for mobile landscape view. I read about making Dialog scrollable in RadixUI documentation. It said wrap your content in some component, I think it was OverLay. Just be aware that scrollable dialog is possible */}
      <DialogContent className="aspect-square">
        <div className="p-5 rounded-md flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <button
                className="disabled:opacity-20 disabled:cursor-default"
                onClick={() => {
                  setCurrentWordIndex(currentWordIndex - 1);
                  setCurrentExampleIndex(0);
                  setCurrentImageIndex(0);
                }}
                disabled={currentWordIndex === 0}
                title="Back to previous highlighted word"
              >
                <ArrowLeft />
              </button>

              <button
                className="disabled:opacity-20 disabled:cursor-default"
                onClick={() => {
                  setCurrentWordIndex(currentWordIndex + 1);
                  setCurrentExampleIndex(0);
                  setCurrentImageIndex(0);
                }}
                disabled={currentWordIndex === databaseWords.length - 1}
                title="Forward to next highlighted word"
              >
                <ArrowRight />
              </button>
            </div>
            <button
              className="close"
              // onClick={handleCloseModal}
              title="Close the modal"
            />
          </div>
          <div className="flex justify-start items-center gap-5">
            {/* `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. */}
            <DialogTitle className="text-red-600 text-2xl">{word}</DialogTitle>
            <p>{pronunciation}</p>
            <div className="flex items-center gap-2">
              <button
                // onClick={() => playPronunciation("Br")}
                className="opacity-85 hover:opacity-100"
                title="Play British pronunciation"
              >
                <Volume2 color="red" />
              </button>
              <button
                // onClick={() => playPronunciation("Am")}
                className="opacity-85 hover:opacity-100"
                title="Play American pronunciation"
              >
                <Volume2 color="blue" />
              </button>
            </div>
          </div>

          {/* Other Info */}
          <div className="flex justify-start gap-3 font-semibold">
            {partOfSpeech && <p className="text-green-700">{partOfSpeech}</p>}
            {register && <p className="text-purple-600 italic">{register}</p>}
            {/* {frequency.written && <p>{frequency?.written}</p> } */}
          </div>

          <p className="p-1">
            <span>{meaning.index ? meaning.index + ") " : ""}</span>
            {meaning.definition.text}
          </p>

          {/* Examples and Images Container  */}
          <div className="w-full flex flex-col justify-around items-center gap-4 px-0 py-4 md:flex-row md:items-stretch">
            {meaning.examples.length > 0 && (
              <Examples
                currentWord={databaseWords[currentWordIndex]}
                currentExampleIndex={currentExampleIndex}
                setCurrentExampleIndex={setCurrentExampleIndex}
              />
            )}
            {images.length > 0 && (
              <Images
                currentWord={databaseWords[currentWordIndex]}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
