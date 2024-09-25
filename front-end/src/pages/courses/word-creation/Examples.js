import React from "react";
import "./Examples.css";
function Examples({ examples, setExamples }) {
  return (
    <div className="examples">
      {examples.map((example, index) => (
        <div className="example">
          <textarea
            value={example}
            onChange={(event) =>
              setExamples([
                ...examples.slice(0, index),
                event.target.value,
                ...examples.slice(index + 1),
              ])
            }
            // onChange={(e) => console.log("text", e.target.value)}
          ></textarea>
          <button
            onClick={() =>
              setExamples([
                ...examples.slice(0, index),
                ...examples.slice(index + 1),
              ])
            }
          >
            ❌
          </button>
        </div>
      ))}

      <button className="add" onClick={() => setExamples([...examples, ""])}>
        add example
      </button>
    </div>
  );
}
export default Examples;
