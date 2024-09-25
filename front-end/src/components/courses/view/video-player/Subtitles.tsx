import { useEffect, useState } from "react";
import "./Subtitles.scss";
import { wordsPairList } from "@/shared/types/wordDataTypes";

let counter = 0;
const colorNumGenerator = () => {
  counter++;
  return counter % 4;
};

type SubtitlesProps = {
  activeCue: VTTCue | null;
  currentPairList: wordsPairList;
  handleWordClick: (INDEX: number) => void;
};

function Subtitles({
  activeCue,
  currentPairList,
  handleWordClick,
}: SubtitlesProps) {
  const [rows, setRows] = useState<JSX.Element[]>([]);

  useEffect(
    function () {
      if (!activeCue) return setRows([]);
      //////////////
      const phrasedSubtitleData = currentPairList.filter(
        (item) => item.subtitleWordList.length > 1
      );
      const phrasedSubtitleDataWithColors = phrasedSubtitleData.map((word) => ({
        word: word,
        colorClass: `c c${colorNumGenerator()}`,
      }));

      /////////////
      let text = activeCue.text;
      // Text with /n seperated from the words
      text = text
        .replaceAll(".", " .")
        .replaceAll(". . .", "...")
        .replaceAll(",", " ,")
        .replaceAll("?", " ?");
      const lines = text.split("\n"); // Output example :  ["How are you?","I'm fine.","Thank you."]
      let lines_words = lines.map((line) => line.split(" ")); // Output example :  [["How", " are"," you? "],["I'm", "fine.","Thank", "you."]]

      // Now let's remove the possible whitespace from both ends of a word:
      lines_words = lines_words.map((line) => line.map((word) => word.trim()));
      // Output example :  [["How", "are","you?"],["I'm", "fine.","Thank", "you."]]

      const handleWord = (
        word: string,
        lineIndex: number,
        wordIndex: number
      ) => {
        const getWordOrderNumber = (word: string) => {
          let wordsBefore = [] as string[];
          for (let i = 0; i < lineIndex; i++) {
            wordsBefore = [...wordsBefore, ...lines_words[i]];
          }
          wordsBefore = [
            ...wordsBefore,
            ...lines_words[lineIndex].slice(0, wordIndex),
          ];
          const textBefore = wordsBefore.join(" ");
          return textBefore.split(`${word}`).length - 1 + 1;
        };
        // Find an item in currentPairList which in its subtitleWordList, there is an item with a title equal to the word:
        const dataItem = currentPairList.find((item) =>
          item.subtitleWordList.find(
            (subtitleItem) =>
              subtitleItem.title === word &&
              subtitleItem.orderNumber === getWordOrderNumber(word)
          )
        );

        // Then find its index:
        let INDEX: number;
        if (dataItem) {
          INDEX = currentPairList.indexOf(dataItem);
        }

        if (dataItem && dataItem.subtitleWordList.length > 1) {
          const phrasedSubWordAndColor = phrasedSubtitleDataWithColors.find(
            (item) => item.word === dataItem
          );
          //* Please note that I have used indexes as key values for subtitle lines and words (sth almost like react will do without specifing key prop) which is not a good practice in general, but in this case, this useEffect will only re-render after a change in current cue or data so list items will change only after that and just for once. I'm trying to say that in this case there was no need for keys but I just did it this way to stop react from complaining!
          return (
            <button
              className={phrasedSubWordAndColor?.colorClass}
              onClick={() => handleWordClick(INDEX)}
              key={`${lineIndex}${wordIndex}`}
            >
              {word}
            </button>
          );
        }
        if (dataItem && dataItem.subtitleWordList.length === 1) {
          return (
            <button
              className={`c c${colorNumGenerator()}`}
              onClick={() => handleWordClick(INDEX)}
              key={`${lineIndex}${wordIndex}`}
            >
              {word}
            </button>
          );
        } else return <button key={`${lineIndex}${wordIndex}`}>{word}</button>;
      };

      // A line is an array like this:["How", "are","you?"]
      const handleLine = (line: string[], lineIndex: number) => (
        <div className="row" key={lineIndex}>
          {line.map((word, wordIndex) =>
            handleWord(word, lineIndex, wordIndex)
          )}
        </div>
      );
      const newRows = lines_words.map((line, lineIndex) =>
        handleLine(line, lineIndex)
      );
      setRows(newRows);
    },
    [activeCue, currentPairList]
  );
  return <div className="Subtitles">{rows}</div>;
}

export default Subtitles;
