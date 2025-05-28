// This code removes duplicate words from a json list of words
import words from "./words.json";
export default function RemoveDuplicateWords() {
  // Count occurrences of each title
  const titleCounts = words.reduce((acc, word) => {
    acc[word.title] = (acc[word.title] || 0) + 1;
    return acc;
  }, {});

  // Find titles that appear more than once
  const duplicateTitles = Object.keys(titleCounts).filter(
    (title) => titleCounts[title] > 1
  );

  console.log("duplicateTitles", duplicateTitles);
  return <div>RemoveDuplicateWords</div>;
}
