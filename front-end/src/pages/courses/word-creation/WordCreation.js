import React, { useState } from "react";
import "./WordCreation.css";
import Meanings from "./Meanings";
const partOfSpeechList = [
  "noun",
  "verb",
  "phrasal verb",
  "adjective",
  "adverb",
  "preposition",
  "pronoun",
  "conjunction",
  "interjection",
];
function WordCreation() {
  const [newWord, setNewWord] = useState({
    word: "",
    pronunciation: "",
    frequency: [],
    partOfSpeech: "",
    register: "",
    meanings: [],
  });
  const handleSave = () => console.log(newWord);

  return (
    <div className="word-creation">
      <div className="top-info">
        <input
          value={newWord.word}
          onChange={(event) =>
            setNewWord((n) => ({ ...n, word: event.target.value }))
          }
          placeholder="word/phrase"
        ></input>
        <input
          placeholder="pronunciation"
          value={newWord.pronunciation}
          onChange={(event) =>
            setNewWord((n) => ({ ...n, pronunciation: event.target.value }))
          }
        ></input>
        <select
          onChange={(event) =>
            setNewWord((n) => ({ ...n, partOfSpeech: event.target.value }))
          }
        >
          <option value="">part of speech</option>
          {partOfSpeechList.map((p) => (
            <option value={p}>{p}</option>
          ))}
        </select>
        <select
          onChange={(event) =>
            setNewWord((n) => ({ ...n, register: event.target.value }))
          }
        >
          <option value="">register</option>
          <option value="formal">formal</option>
          <option value="informal">informal</option>
        </select>
      </div>
      <Meanings
        meanings={newWord.meanings}
        setMeanings={(meanings) =>
          setNewWord((n) => ({ ...n, meanings: meanings }))
        }
      />
      <button className="save" onClick={handleSave}>
        save
      </button>
    </div>
  );
}
export default WordCreation;
