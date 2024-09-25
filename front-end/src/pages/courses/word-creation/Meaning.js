import React, { useState } from "react";
import "./Meaning.css";
import Examples from "./Examples";
function Meaning({ meaning, setMeaning, onRemoveMeaning }) {
  return (
    <div className="meaning">
      <div className="index-definition">
        <input
          className="index"
          placeholder="ind"
          value={meaning.index}
          onChange={(event) =>
            setMeaning({ ...meaning, index: event.target.value })
          }
        ></input>
        <textarea
          placeholder="definition"
          value={meaning.definition}
          onChange={(event) =>
            setMeaning({ ...meaning, definition: event.target.value })
          }
        ></textarea>
      </div>

      <button className="remove" onClick={onRemoveMeaning}>
        ❌
      </button>
      <Examples
        examples={meaning.examples}
        setExamples={(newExamples) =>
          setMeaning({ ...meaning, examples: newExamples })
        }
      />
    </div>
  );
}
export default Meaning;
