// This code checks new words with previous words and filters the new words that already exist in previous words. The code used the "title" property for comparison.
import previousWords from "./previousWords.json";
import newWords from "./newWords.json";

export default function FilterDuplicateWords() {
  const uniqueWords = newWords.filter((newWord) => {
    const repetitiveWord = previousWords.find(
      (word) => word.title === newWord.title
    );
    if (repetitiveWord) console.log("repetitiveWord", repetitiveWord);
    return !repetitiveWord;
  });
  console.log("newWords length", newWords.length);
  console.log("uniqueWords length", uniqueWords.length);

  return <div>FilterDuplicateWords</div>;
}
