import { databaseWord } from "@/lib/types";
import "./Examples.scss";

type ExamplesProps = {
  currentWord: databaseWord;
  currentExampleIndex: number;
  setCurrentExampleIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Examples({
  currentWord,
  currentExampleIndex,
  setCurrentExampleIndex,
}: ExamplesProps) {
  const { meaning } = currentWord;

  return (
    <div className="Examples">
      <div className="examples-nav">
        <button
          className="previous"
          onClick={() => setCurrentExampleIndex(currentExampleIndex - 1)}
          disabled={currentExampleIndex === 0}
          title="Back to previous example"
        ></button>
        <h5> examples</h5>
        <button
          className="next"
          onClick={() => setCurrentExampleIndex(currentExampleIndex + 1)}
          disabled={currentExampleIndex === meaning.examples.length - 1}
          title="Go to next example"
        ></button>
      </div>
      <p>{meaning.examples[currentExampleIndex].text}</p>
    </div>
  );
}
