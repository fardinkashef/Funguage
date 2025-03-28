"use client";
import { useState } from "react";
import VideoPlayer from "./video-player/VideoPlayer";

export default function WordClips({ clips }) {
  const [clipNumber, setClipNumber] = useState(0);
  // console.log("clipNumber:", clipNumber);
  console.log("clips:", clips);
  const clip = clips[clipNumber];
  const handlePreviousButtonClick = () => {
    if (clipNumber === 0) return;
    setClipNumber(clipNumber - 1);
  };
  const handleNextButtonClick = () => {
    if (clipNumber === clips.length - 1) return;
    setClipNumber(clipNumber + 1);
  };
  return (
    <div>
      <VideoPlayer
        videoSrc={clip.videoUrl}
        subtitleSrc={clip.subtitleUrl}
        wordsPairList={clip.wordsPairList}
        startTime={clip.startTime}
        endTime={clip.endTime}
        // I added this key prop because, otherwise, React would c  onsider this component the same on clipNumber change.
        key={clipNumber}
        handlePreviousVideo={
          clipNumber === 0 ? undefined : handlePreviousButtonClick
        }
        handleNextVideo={
          clipNumber === clips.length - 1 ? undefined : handleNextButtonClick
        }
      />

      <p>{clipNumber}</p>
    </div>
  );
}
