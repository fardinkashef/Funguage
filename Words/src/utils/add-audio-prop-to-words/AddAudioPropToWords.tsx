// This code imports old DB words, checks each word with wordsAudioData object and 'adds' audio property or 'updates' it.

import { wordsAudioData } from "./wordsAudioData";
import oldDBWords from "./oldDBWords.json";
export default function AddAudioPropToWords() {
  const newDBWords = oldDBWords.map((dbWord) => {
    // if (!dbWord?.word) return console.log("this is null", dbWord);

    if (!wordsAudioData[dbWord.word]) {
      return { ...dbWord, audio: null };
    } else return { ...dbWord, audio: wordsAudioData[dbWord.word] };
  });
  console.log("this is data:", newDBWords);
  return <div>AddAudioPropToDBWords</div>;
}
