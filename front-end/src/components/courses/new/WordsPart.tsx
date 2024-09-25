import { useState } from "react";
import WordItem from "./WordItem";
import "./WordsPart.css";
import {
  type databaseWordList,
  type subtitleWordList,
  type cue,
  type databaseWord,
  type subtitleWord,
  type wordsPairList,
} from "@/shared/types/wordDataTypes";

type WordsPartProps = {
  subtitleWords: subtitleWord[];
  databaseWords: databaseWord[];
  cues: cue[];
  wordsPairList: wordsPairList;
  setWordsPairList: (newWordsPairList: wordsPairList) => void;
};

function WordsPart({
  subtitleWords,
  databaseWords,
  cues,
  wordsPairList,
  setWordsPairList,
}: WordsPartProps) {
  const [suggestionBoxClosed, setSuggestionBoxClosed] = useState(false);

  const setSubtitleWordList = (
    index: number,
    newSubtitleWordList: subtitleWordList
  ) => {
    let wordsPairListCopy = [...wordsPairList];
    wordsPairListCopy[index].subtitleWordList = newSubtitleWordList;
    const newWordsPairList = [...wordsPairListCopy];
    setWordsPairList(newWordsPairList);
  };
  const setDatabaseWordList = (
    index: number,
    newDatabaseWordList: databaseWordList
  ) => {
    let wordsPairListCopy = [...wordsPairList];
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
    let list = [...wordsPairList];
    list.splice(index, 1);
    setWordsPairList([...list]);
  };

  // const wordsSaveHandler = async () => {
  //   // try {
  //   //   await sendRequest(
  //   //     process.env.REACT_APP_BACKEND_URL + "/courses/words",
  //   //     "POST",
  //   //     JSON.stringify({
  //   //       name: "friends",
  //   //       content: wordsPairList,
  //   //     }),
  //   //     { "Content-Type": "application/json" }
  //   //   );
  //   // } catch (err) {}
  //   console.log("wordsPairList", wordsPairList);
  // };

  return (
    <div className="words-part">
      {wordsPairList.map((wordPair, index) => (
        <WordItem
          subtitleWords={subtitleWords}
          databaseWords={databaseWords}
          cues={cues}
          ///////////////
          subtitleWordList={wordPair.subtitleWordList}
          databaseWordList={wordPair.databaseWordList}
          setSubtitleWordList={(newSubtitleWordList: subtitleWordList) =>
            setSubtitleWordList(index, newSubtitleWordList)
          }
          setDatabaseWordList={(newDatabaseWordList: databaseWordList) =>
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
      <button className="add" onClick={handleAddWordPair}>
        Add a word
      </button>
 
    </div>
  );
}
export default WordsPart;
