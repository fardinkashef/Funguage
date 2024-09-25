import WordAutoCompleteSearch from "./WordAutoCompleteSearch";
import "./WordItem.scss";

import {
  cue,
  databaseWord,
  databaseWordList,
  subtitleWord,
  subtitleWordList,
} from "@/shared/types/wordDataTypes";

type WordItemProps = {
  subtitleWords: subtitleWord[];
  databaseWords: databaseWord[];
  cues: cue[];
  ///////////////
  subtitleWordList: subtitleWordList;
  databaseWordList: databaseWordList;
  setSubtitleWordList: (newSubtitleWordList: subtitleWordList) => void;
  setDatabaseWordList: (newDatabaseWordList: databaseWordList) => void;
  //////////////

  handleRemoveWordPair: () => void;
  suggestionBoxClosed: boolean;
  setSuggestionBoxClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

function WordItem({
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
    <div className="WordItem">
      <div className="search">
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
        className="word-item-remove"
        onClick={handleRemoveWordPair}
        title="Remove this item"
      />
    </div>
  );
}
export default WordItem;
