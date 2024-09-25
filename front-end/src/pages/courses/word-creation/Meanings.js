import React, { useState } from "react";
import "./Meanings.css";
import Meaning from "./Meaning";
function Meanings({ meanings, setMeanings }) {
  return (
    <div className="meanings">
      {meanings.map((meaning, index) => (
        <div>
          <Meaning
            meaning={meaning}
            setMeaning={(newMeaning) => {
              let meaningsCopy = [...meanings];
              meaningsCopy[index] = newMeaning;
              setMeanings(meaningsCopy);
            }}
            onRemoveMeaning={() =>
              setMeanings(meanings.filter((_, i) => i !== index))
            }
          />
        </div>
      ))}
      <button
        className="add"
        onClick={() =>
          setMeanings([
            ...meanings,
            {
              index: "",
              definition: "",
              examples: [],
            },
          ])
        }
      >
        add meaning
      </button>
    </div>
  );
}
export default Meanings;
