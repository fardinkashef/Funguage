import React, { useState, useRef } from "react";

function Test() {
  const [x, setX] = useState(0);
  const [buttons, setButtons] = useState([]);
  // const xRef = useRef(x);
  const adder = () => {
    setX(x + 1);
    console.log("real x", x);
  };

  const logger = () => {
    console.log("fake x ", x);
  };
  const addButton = () =>
    setButtons([...buttons, <button onClick={logger}>mo</button>]);

  return (
    <div>
      <button onClick={adder}>add</button>
      <button onClick={logger}>mo</button>
      <button onClick={logger}>mo</button>
      <button onClick={logger}>mo</button>

      {buttons}
      <button onClick={addButton}> add but</button>
    </div>
  );
}

export default Test;
