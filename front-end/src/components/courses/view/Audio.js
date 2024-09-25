import myAudioFile from "./path/to/myAudioFile.mp3";
import { useState } from "react";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  function handleButtonClick() {
    setIsPlaying(!isPlaying);
  }

  function handleAudioEnded() {
    setIsPlaying(false);
  }

  return (
    <div>
      <button onClick={handleButtonClick}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio
        src={myAudioFile}
        autoplay
        hidden
        play={isPlaying}
        onEnded={handleAudioEnded}
      />
    </div>
  );
}

export default AudioPlayer;
