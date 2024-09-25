import { useState } from "react";
import "./PlayBackRate.scss";
const rates = [0.5, 0.75, 1, 1.5, 2];
function PlayBackRate({ playBackRate, handleSetPlayBackRate }) {
  const [showVPRBox, setShowVPRBox] = useState(false);

  const toggleVPRBoxDisplay = () => {
    setShowVPRBox((previousState) => !previousState);
  };
  const handleRateButtonSelect = (rate) => {
    handleSetPlayBackRate(rate);
    toggleVPRBoxDisplay();
  };
  return (
    <div className="PlayBackRate">
      <button
        className={"icon" + ` ${showVPRBox ? "red-border-bottom" : ""}`}
        onClick={toggleVPRBoxDisplay}
      ></button>
      <div className={`rate-box ${showVPRBox ? "" : "hidden"}`}>
        {[...rates].reverse().map((rate) => (
          <button
            className={`${rate === playBackRate ? "selected" : ""}`}
            onClick={() => handleRateButtonSelect(rate)}
            key={rate}
          >
            {`${rate}x`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlayBackRate;
