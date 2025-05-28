import { MouseEvent, useEffect, useRef, useState } from "react";
import "./TimeLine.scss";

type TimeLineProps = {
  videoTime: number;
  startTime?: number;
  handleSetVideoTime: (time: number) => void;
  videoDuration: number;
  paused: boolean;
  handleTogglePlayPause: () => void;
};

export default function TimeLine({
  videoTime,
  startTime,
  handleSetVideoTime,
  videoDuration,
  paused,
  handleTogglePlayPause,
}: TimeLineProps) {
  //* State variables 👇:
  const [scrubbing, setScrubbing] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);
  // Whether the video was playing before scrubbing or not 👇:
  const [videoWasPlaying, setVideoWasPlaying] = useState(!paused);

  //* Refs 👇:
  const TimeLineRef = useRef<HTMLDivElement>(null);

  //* functions 👇∶
  const checkScrubbing = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    //* This is bitwise AND operator (logical AND operator is &&)👇:
    if ((event.buttons & 1) === 1) {
      setScrubbing(true);
      if (!paused) {
        setVideoWasPlaying(true);
        //Pause the video :
        handleTogglePlayPause();
      } else setVideoWasPlaying(false);
    }
  };

  const getPercentage = (
    event:
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | globalThis.MouseEvent
  ) => {
    if (!TimeLineRef.current) return 0;
    const rect = TimeLineRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, event.clientX - rect.x), rect.width) / rect.width;
    return percent;
  };

  //* Handlers 👇:

  const handleTimelineUpdate = (
    event:
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | globalThis.MouseEvent
  ) => {
    const percent = getPercentage(event);
    setPreviewPosition(percent);
    if (scrubbing) {
      event.preventDefault();
      handleSetVideoTime(percent * videoDuration);
    }
  };
  const handleTimeLineClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const percent = getPercentage(event);
    handleSetVideoTime(
      startTime ? startTime + percent * videoDuration : percent * videoDuration
    );
  };

  const handleMouseMove = (
    event:
      | globalThis.MouseEvent
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (scrubbing) handleTimelineUpdate(event);
  };
  ////////////
  useEffect(
    function () {
      //* Any where on page (including TimeLine) on mouse up, if scrubbing is true, set it to false:
      const handleMouseUp = () => {
        if (scrubbing) {
          setScrubbing(false);
          if (videoWasPlaying) {
            // Video was playing before scrubbing happened, so now that scrubbing is finished, play the video again 👇:
            handleTogglePlayPause();
          }
        }
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return function () {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    },
    [scrubbing, videoWasPlaying]
  );

  /////////////
  let progressPosition: number;
  if (!videoDuration) progressPosition = 0;
  else if (videoDuration && startTime)
    progressPosition = (videoTime - startTime) / videoDuration;
  else progressPosition = videoTime / videoDuration;

  return (
    <div
      className="TimeLine"
      onClick={handleTimeLineClick}
      onMouseMove={handleTimelineUpdate}
      onMouseDown={checkScrubbing}
      ref={TimeLineRef}
      style={
        {
          "--preview-position": previewPosition,
          "--progress-position": progressPosition,
        } as React.CSSProperties
      }
    >
      <div className="bar">
        {/*The little red circle at the end of red bar 👇: */}
        <div className="thumb-indicator"></div>
      </div>
    </div>
  );
}
