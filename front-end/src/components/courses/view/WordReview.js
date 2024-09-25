import React, { useState } from "react";
import "./WordReview.css";
function WordReview() {
  const dummyWords = [
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
    "gotta",
    "chalk",
  ];
  const setAllCheckedins = (boolean) => {
    let status = [];
    for (let index = 0; index < dummyWords.length; index++) {
      status.push(boolean);
    }
    return status;
  };
  const [state, setState] = useState(() => setAllCheckedins(false));
  return (
    <div className="word-review">
      <button className="back" onClick={() => console.log("back to video")}>
        <span>&larr;</span> Back
      </button>
      <button
        className="sellectAll"
        onClick={() => setState(setAllCheckedins(true))}
      >
        Select all
      </button>
      <button
        className="desellectAll"
        onClick={() => setState(setAllCheckedins(false))}
      >
        Deselect all
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const checkedItems = dummyWords.filter(
            (word, index) => state[index] === true
          );

          // console.log("e", e.target[0].checked);

          console.log("checked items", checkedItems);
        }}
      >
        <div className="items">
          {dummyWords.map((word, index) => (
            <div key={word + index} className={state[index] ? "checked" : ""}>
              <input
                type="checkbox"
                id={`checkbox${index}`}
                name={`checkbox${index}`}
                value={word}
                checked={state[index]}
                onChange={() => {
                  let stateCopy = [...state];
                  stateCopy[index] = !stateCopy[index];
                  let newState = [...stateCopy];
                  setState(newState);
                }}
              />
              <label htmlFor={`checkbox${index}`}> {word} </label>
            </div>
          ))}
        </div>
        <button className="save" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
export default WordReview;
