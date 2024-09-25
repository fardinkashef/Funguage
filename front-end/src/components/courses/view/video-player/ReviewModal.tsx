import { useEffect, useState } from "react";
import "./ReviewModal.scss";
import { databaseWordList, wordsPairList } from "@/shared/types/wordDataTypes";
import axios from "axios";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; //These css are optional and implements the basic styles for the tooltip
import {
  databaseWord,
  wordsPair,
} from "../../../../shared/types/wordDataTypes";

type ReviewModalProps = {
  wordsPairList: wordsPairList;
  setWordsPairList: (newWordsPairList: wordsPairList) => void;
  reviewWordIds: string[];
  setReviewWordIds: (newReviewWordIds: string[]) => void;
  handleCloseModal: () => void;
};

function ReviewModal({
  wordsPairList,
  setWordsPairList,
  reviewWordIds,
  setReviewWordIds,
  handleCloseModal,
}: ReviewModalProps) {
  const [masteredWordsIds, setMasteredWordsIds] = useState<string[]>([]);

  let databaseWords: databaseWordList = wordsPairList.reduce(
    (accumulator: databaseWordList, currentPair: wordsPair) => [
      ...accumulator,
      ...currentPair.databaseWordList,
    ],
    []
  );
  // Remove duplicate items:
  databaseWords = Array.from(new Set(databaseWords));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return setMasteredWordsIds((prev) => [...prev, e.target.id]);
    setMasteredWordsIds((prev) => prev.filter((id) => id !== e.target.id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* First let's update reviewWordIds:
    const newReviewWordIds = reviewWordIds.filter(
      (id) => !masteredWordsIds.includes(id)
    );
    setReviewWordIds(newReviewWordIds);
    if (!localStorage.getItem("FunguageUserData"))
      return alert("Please log in first.");
    const storedUserData = JSON.parse(
      localStorage.getItem("FunguageUserData") as string
    );
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL +
          `/users/${storedUserData.userId}/add-words`,
        {
          masteredWordsIds,
        }
      );
    } catch (err) {
      console.log("sth wrong happened", err);
    }
    setMasteredWordsIds([]);

    //* Next let's update wordsPairList:
    const extractDatabaseWordListIds = (databaseWordList: databaseWordList) =>
      databaseWordList.reduce(
        (acc: string[], databaseWord: databaseWord) => [
          ...acc,
          databaseWord._id,
        ],
        []
      );

    const newWordsPairList = wordsPairList.filter(
      (pair: wordsPair) =>
        !extractDatabaseWordListIds(pair.databaseWordList).every((id) =>
          masteredWordsIds.includes(id)
        )
    );
    setWordsPairList(newWordsPairList);
  };

  return (
    <div
      className="ReviewModal"
      // onClick={handleCloseModal}
    >
      <form className="content" onSubmit={handleSubmit}>
        <div className="control">
          <button type="submit" disabled={masteredWordsIds.length === 0}>
            Save Changes
          </button>
          <button
            type="button"
            className="close"
            onClick={handleCloseModal}
            title="Close the modal"
          />
        </div>
        {/* <h3>Check the words you've fully mastered</h3>
        <h4>(you won't see them as colored anymore)</h4> */}

        {databaseWords.map((item: databaseWord, index: number) => (
          <Tippy
            content={
              <span style={{ fontSize: "1.2rem" }}>
                {item.meaning.definition.text}
              </span>
            }
            placement="auto-end"
            key={index}
          >
            <div key={item._id} className="check-item">
              <input
                type="checkbox"
                id={item._id}
                name={item.title}
                onChange={handleChange}
              />
              <label htmlFor={item._id}>{item.title}</label>
            </div>
          </Tippy>
        ))}
      </form>
    </div>
  );
}

export default ReviewModal;
