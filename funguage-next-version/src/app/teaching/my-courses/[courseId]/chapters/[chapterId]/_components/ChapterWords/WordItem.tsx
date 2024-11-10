import { cue, databaseWord, subtitleWord } from "@/lib/types";
import WordAutoCompleteSearch from "./WordAutoCompleteSearch";

type WordItemProps = {
  subtitleWords: subtitleWord[];
  databaseWords: databaseWord[];
  cues: cue[];
  ///////////////
  subtitleWordList: subtitleWord[];
  databaseWordList: databaseWord[];
  setSubtitleWordList: (newSubtitleWordList: subtitleWord[]) => void;
  setDatabaseWordList: (newDatabaseWordList: databaseWord[]) => void;
  //////////////

  handleRemoveWordPair: () => void;
  suggestionBoxClosed: boolean;
  setSuggestionBoxClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WordItem({
  subtitleWords,
  databaseWords,
  cues,
  subtitleWordList,
  databaseWordList,
  setSubtitleWordList,
  setDatabaseWordList,
  handleRemoveWordPair,
  suggestionBoxClosed,
  setSuggestionBoxClosed,
}: WordItemProps) {
  return (
    <div className="w-full p-2 mb-4 rounded flex items-center gap-2">
      <div className="search grow p-2 border-r-2 flex flex-col items-center gap-2">
        <WordAutoCompleteSearch
          type={"subtitle"}
          itemsToSearchIn={subtitleWords}
          cues={cues}
          /////////////
          selectedItems={subtitleWordList}
          setSelectedItems={setSubtitleWordList}
          ////////////////////
          suggestionBoxClosed={suggestionBoxClosed}
          setSuggestionBoxClosed={setSuggestionBoxClosed}
        />
        <WordAutoCompleteSearch
          type={"database"}
          itemsToSearchIn={databaseWords}
          ////////////////
          selectedItems={databaseWordList}
          setSelectedItems={setDatabaseWordList}
          ////////////////
          suggestionBoxClosed={suggestionBoxClosed}
          setSuggestionBoxClosed={setSuggestionBoxClosed}
        />
      </div>

      <button
        className="rounded-full"
        onClick={handleRemoveWordPair}
        title="Remove this item"
      >
        ❌
      </button>
    </div>
  );
}
