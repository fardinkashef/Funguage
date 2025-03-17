import "./Controls.scss";

import PlayBackRate from "./PlayBackRate";
import TimeLine from "./TimeLine";

type ControlsProps = {
  paused: boolean;
  handleTogglePlayPause: () => void;
  handleStop: () => void;
  volumeLevel: string;
  handleToggleMute: () => void;
  handleVolumeSliderChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  fullscreen: boolean;
  handleToggleFullscreen: () => void;
  videoTime: number;
  handleSetVideoTime: (time: number) => void;
  videoDuration: number;
  theater: boolean;
  handleTheater: () => void;
  playBackRate: number;
  handleSetPlayBackRate: (rate: number) => void;
};

function Controls({
  paused,
  handleTogglePlayPause,
  handleStop,
  volumeLevel,
  handleToggleMute,
  handleVolumeSliderChange,
  fullscreen,
  handleToggleFullscreen,
  videoTime,
  handleSetVideoTime,
  videoDuration,
  theater,
  handleTheater,
  playBackRate,
  handleSetPlayBackRate,
}: ControlsProps) {
  // Format video duration 👇:
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  const formatDuration = (time: number) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  };

  return (
    <div className={`Controls ${paused ? "show" : "hide"}`}>
      {/* Time line */}
      <TimeLine
        videoTime={videoTime}
        handleSetVideoTime={handleSetVideoTime}
        videoDuration={videoDuration}
        paused={paused}
        handleTogglePlayPause={handleTogglePlayPause}
      />

      <div className="controls-buttons">
        {/* Play/Pause */}
        <button
          id="playpause"
          type="button"
          data-state={`${paused ? "play" : "pause"}`}
          onClick={handleTogglePlayPause}
        />
        {/* Stop */}
        <button
          id="stop"
          type="button"
          data-state="stop"
          onClick={handleStop}
        />
        {/* Volume */}
        <div className="volume-container">
          <button
            type="button"
            data-volume-level={volumeLevel}
            onClick={handleToggleMute}
          />
          <input
            className="volume-slider"
            type="range"
            min="0"
            max="1"
            step="any"
            onChange={handleVolumeSliderChange}
          />
        </div>
        {/* Duration */}
        <div className="duration-container">
          <div>{formatDuration(videoTime)}</div>/
          <div>{formatDuration(videoDuration)}</div>
        </div>

        {/* Playback rate */}
        <PlayBackRate
          playBackRate={playBackRate}
          handleSetPlayBackRate={handleSetPlayBackRate}
        />

        {/* Mini player */}
        {/* <button
          id="mini-player"
          type="button"
          data-state="mini-player"
          onClick={handleToggleFullscreen}
        ></button> */}
        {/* Theater */}
        <button
          id="theater"
          type="button"
          data-state={`${theater ? "cancel-theater" : "go-theater"}`}
          onClick={handleTheater}
        />
        {/* Fullscreen */}
        <button
          id="fs"
          type="button"
          data-state={`${fullscreen ? "cancel-fullscreen" : "go-fullscreen"}`}
          onClick={handleToggleFullscreen}
        />
      </div>
    </div>
  );
}

export default Controls;
