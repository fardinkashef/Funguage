"use client";
import { useState, useRef, useEffect } from "react";
import "./VideoPlayer.scss";
import Hls from "hls.js";
import Controls from "./Controls";
import Subtitles from "./Subtitles";

import { databaseWord, wordsPair } from "@/lib/types";
import LoadingModal from "./LoadingModal";

type WordsVideoPlayerProps = {
  videoSrc: string;
  subtitleSrc: string;
  wordsPairList: wordsPair[];
  setWordsPairList: React.Dispatch<React.SetStateAction<wordsPair[]>>;
};

export default function WordsVideoPlayer({
  videoSrc,
  subtitleSrc,
  wordsPairList,
}: WordsVideoPlayerProps) {
  // STATES:
  //? Why define a state variable for video time? Why not just use videoRef.current.currentTime? Answer: We're gonna use this time to update the progress bar. The videoRef.current.currentTime value gets updated regularly but it doesn't re-render the component so the updated time value won't be passed to progress element and the progress element will stay the same until component re-render by another cause (I've checked it and saw it).
  //? Doing so, doesn't make a lot of re-renders to crash the app or at least lower the performance? Answer: Not exactly. I checked and the time update event is fired about 3 or 4 times in a second. So I think it is okay.
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState("high");
  const [paused, setPaused] = useState(true);
  //*I need to change the play pause icon to replay icon when video is ended but videoRef.current.ended is not enough because I can't use it when playing clips, right? So I defined this state variable
  const [videoEnded, setVideoEnded] = useState(false);

  // const [miniPlayer, setMiniPlayer] = useState(false);
  const [theater, setTheater] = useState(false);
  //* I don't use fullscreen state variable anywhere. I just update it after fullscreen change in order for component to be re-rendered and UI gets updated (to update fullscreen button icon) 👇:
  const [fullscreen, setFullscreen] = useState(false);
  const [activeCue, setActiveCue] = useState<VTTCue | null>(null);
  const [showWordModal, setShowWordModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(true);

  // const [AmericanPronunciationAudioSrc, setAmericanPronunciationAudioSrc] =
  //   useState<string | null>(null);
  // const [BritishPronunciationAudioSrc, setBritishPronunciationAudioSrc] =
  //   useState<string | null>(null);
  const [playBackRate, setPlayBackRate] = useState(1);
  const [videoPreviouslyPaused, setVideoPreviouslyPaused] = useState(true);

  ///////////////////////
  // The part of the whole wordsPairList which we are currently dealing with in current specific cue:
  const [currentPairList, setCurrentPairList] = useState(wordsPairList);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  // There are two scenarios when the word modal will be displayed: 1) User clicks on a colored word 2) User presses Enter on the keyboard. This state variable determines if the user has pressed "Enter" while watching the video. If true, we will display ALL the DB words in currentPairList, not just the DB words in a single pair, okay? On the other hand, if the user clicks on a subtitle word, we only display the DB words in the related pair, get it?
  const [pressedEnter, setPressedEnter] = useState(false);

  ///////////////////////////////////////////////////////////////////////
  // REFERENCES:
  const VideoPlayerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const trackRef = useRef<HTMLTrackElement>(null);

  //* Event handlers 👇:

  const handleWordClick = (INDEX: number) => {
    if (!videoRef.current) return;

    if (!videoRef.current.paused) {
      videoRef.current.pause();
      setVideoPreviouslyPaused(false);
    } else {
      setVideoPreviouslyPaused(true);
    }
    setShowWordModal(true);
    setCurrentPairIndex(INDEX);
  };

  ////////////////////////////////////////////////////////////////////////////

  // Event handlers for control buttons

  // Handling theater mode 👇:

  const handleTheater = () => setTheater((previous) => !previous);

  // Handling fullscreen mode 👇:

  const handleToggleFullscreen = () => {
    // If fullscreen mode is active...
    if (document.fullscreenElement) {
      // (Note: this can only be called on document)
      document.exitFullscreen();
    } else {
      // ...otherwise enter fullscreen mode
      // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
      VideoPlayerRef.current?.requestFullscreen();
    }
  };

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  const handleTogglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended)
      videoRef.current.play();
    else videoRef.current.pause();
  };
  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setVideoEnded(false);
  };
  // The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
  const handleStop = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPaused(videoRef.current.paused);
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    if (videoRef.current.muted) setVolumeLevel("muted");
  };

  ////////////////////////////////////////////
  // Handling volume-slider change

  const handleVolumeSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!videoRef.current) return;

    videoRef.current.volume = +event.target.value;
  };

  // SETTING PLAYBACK Rate:
  const handleSetPlayBackRate = (rate: number) => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = rate;
    setPlayBackRate(rate);
  };

  /////////////////////////////////////////////////////

  const handleCloseWordModal = () => {
    if (!videoPreviouslyPaused) {
      if (!videoRef.current) return;

      videoRef.current.play();
    }
    setShowWordModal(false);
    if (VideoPlayerRef.current) VideoPlayerRef.current.focus();
    if (pressedEnter) setPressedEnter(false);
  };

  const handleTimeUpdate = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const currentTime = (event.target as HTMLVideoElement).currentTime;
    setVideoTime(currentTime);
  };

  const handleSetVideoTime = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setVideoTime(time);
  };

  const skip = (duration: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += duration;
  };

  const handleVolumeChange = () => {
    if (!videoRef.current) return;
    let volumeLevel;
    if (videoRef.current.muted || videoRef.current.volume === 0) {
      volumeLevel = "muted";
    } else if (videoRef.current.volume >= 0.5) {
      volumeLevel = "high";
    } else {
      volumeLevel = "low";
    }
    setVolumeLevel(volumeLevel);
  };
  // const handleLoadedData = () => {
  //   if (!videoRef.current) return;

  //   setVideoDuration(videoRef.current.duration);
  // };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const tagName = document.activeElement
      ? document.activeElement.tagName.toLowerCase()
      : null;

    if (tagName === "input") return;

    switch (e.key.toLowerCase()) {
      case " ": // Check if the pressed key is the spacebar
        e.preventDefault(); // Prevent the default scrolling behavior
        handleTogglePlayPause();
        break;
      case "enter":
        if (currentPairList.length > 0) {
          handleWordClick(0);
          setPressedEnter(true);
        }
        break;
      case "k":
        handleTogglePlayPause();
        break;
      // case "space":
      // e.preventDefault(); // Prevent the default scrolling behavior
      // handleTogglePlayPause();
      //   break;
      case "f":
        handleToggleFullscreen();
        break;
      case "t":
        handleTheater();
        break;
      // case "i":
      //   toggleMiniPlayerMode()
      //   break
      case "m":
        handleToggleMute();
        break;
      case "arrowleft":
      case "j":
        skip(-5);
        break;
      case "arrowright":
      case "l":
        skip(5);
        break;
      // case "c":
      //   toggleCaptions()
      //   break
    }
  };

  ///////////

  useEffect(function () {
    document.addEventListener("fullscreenchange", () =>
      setFullscreen(!!document.fullscreenElement)
    );
  }, []);
  // useEffect(function () {
  //   if (!videoRef.current) return;

  //   videoRef.current.addEventListener("volumechange", () => {
  //     if (!videoRef.current) return;

  //     let volumeLevel;
  //     if (videoRef.current.muted || videoRef.current.volume === 0) {
  //       volumeLevel = "muted";
  //     } else if (videoRef.current.volume >= 0.5) {
  //       volumeLevel = "high";
  //     } else {
  //       volumeLevel = "low";
  //     }
  //     setVolumeLevel(volumeLevel);
  //   });
  // }, []);
  ////////////////////////////
  useEffect(function () {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadeddata", () => {
      setShowLoadingModal(false);
      if (!videoRef.current) return;
      setVideoDuration(videoRef.current.duration);
    });
  }, []);
  // useEffect(
  //   function () {
  //     if (showWordModal && WordModalRef.current) {
  //       console.log("i'm here");
  //       console.log("WordModalRef.current", WordModalRef.current);
  //       WordModalRef.current.focus();
  //     }
  //   },
  //   [showWordModal]
  // );
  //////////////////////////////////
  /////////////////////////////////
  //* Handling subtitles 👇:

  // Turn off all subtitles:
  // useEffect(function () {
  //   if (!videoRef.current) return;

  //   for (let i = 0; i < videoRef.current.textTracks.length; i++) {
  //     videoRef.current.textTracks[i].mode = "hidden";
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!trackRef.current) return;

  //   trackRef.current.addEventListener("cuechange", (event) => {
  //     const activeCues = (event.target as HTMLTrackElement).track.activeCues;
  //     if (!activeCues) return;
  //     const currentCue = activeCues[0] as VTTCue;

  //     if (currentCue) {
  //       setActiveCue(currentCue);
  //       const currentItems = wordsPairList.filter(
  //         (item) => item.subtitleWordList[0].cueId === currentCue.id
  //       );
  //       setCurrentPairList(currentItems);
  //     }
  //   });
  // }, [wordsPairList]);

  ////////////// HLS.js player
  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!videoRef.current) return;
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadeddata", () => {
      if (!videoRef.current) return;

      const trackEl = document.createElement("track");
      // trackEl.setAttribute("kind", "captions");
      trackEl.setAttribute("kind", "subtitles");
      trackEl.setAttribute("label", "English");
      trackEl.setAttribute("srcLang", "en");
      trackEl.setAttribute("src", subtitleSrc);

      videoRef.current.appendChild(trackEl);

      trackEl.track.addEventListener("cuechange", () => {
        const activeCues = trackEl.track.activeCues;
        if (!activeCues) return;
        const currentCue = activeCues[0] as VTTCue;

        if (currentCue) {
          setActiveCue(currentCue);
          const currentItems = wordsPairList.filter(
            (item) => item.subtitleWordList[0].cueId === currentCue.id
          );
          setCurrentPairList(currentItems);
        }
      }); // Don't need if using native caption display.
      trackEl.track.mode = "hidden"; // Enable the track with "hidden", or "showing" if using native captions display.
    });
  }, [subtitleSrc, wordsPairList]);

  ///////////////
  //* Note: When I tried to load video and subtitle from my Node js backend, the video loaded but vtt file did not. The solution was adding crossOrigin="anonymous" to video element.
  //* Note: In a Vite React project, local video files must be placed in public directory otherwise they won't get loaded.
  //* Note: PLEASE PAY ATTENTION THAT FOR THE EXPRESS.JS TO SERVE STATIC FILES, THE VIDEO OR SUBTITLE SRC MUST BE SOME THING LIKE THE STRING BELOW:
  //  <source src="http://localhost:5000/api/static-files/courses-data/A/section_1/A1.mp4" />
  // AS YOU SEE THE PART "/api" IS NEEDED AND THE "express.static" METHOD SHOULD BE USED LIKE THIS:
  // app.use("/api/static-files", express.static("static-files"));
  //* Note: About the AUDIO PLAYER: This audio player is not sth we see in the UI (pay attention to the hidden attribute assigned to it), it just plays the pronunciation audio in the background when needed.
  const handleCanPlay = () => {
    // console.log("handlecanplay");

    setShowLoadingModal(false); // Video is ready to play
  };

  const handleWaiting = () => {
    setShowLoadingModal(true); // Video is buffering/loading
  };

  return (
    <figure
      className={"VideoPlayer" + ` ${theater ? "theater" : ""}`}
      data-fullscreen="false"
      ref={VideoPlayerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* //! Video part: */}
      <video
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        crossOrigin="anonymous"
        id="video"
        className="video"
        // controls
        ref={videoRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onClick={handleTogglePlayPause}
        //* We must use the following events to handle the  changes of the state "paused" which is used to update the UI (update play and pause icon) in "Controls" component, not only change the state in event handler when the play-pause botton is clicked because there are cases when video play-pause situation changes without us clicking the play-pause botton (for example in Mozilla theater mode, when we click the exit botton, the video gets paused without us clicking the pause botton)
        onPlay={() => {
          if (!videoRef.current) return;
          setPaused(videoRef.current.paused);
        }}
        onPause={() => {
          if (!videoRef.current) return;
          setPaused(videoRef.current.paused);
        }}
        onVolumeChange={handleVolumeChange}
        // onLoadedData={handleLoadedData}
        // muted
        // src={videoSrc}
        // autoPlay
      >
        <source
          src={videoSrc}
          // src="https://funguage.arvanvod.ir/MaqPbZPWlo/WG31Vk0p78/origin_T8UmVBv948dm2oyt2T6uYDqio2UAtkVZk4D3dsjp.mp4"
        />
        {/* <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src={subtitleSrc}
          // src={import.meta.env.VITE_BACKEND_URL + "/playlist/friends1.vtt"}
          default
          ref={trackRef}
        /> */}
      </video>
      {/* //! Subtitle part: */}
      <Subtitles
        activeCue={activeCue}
        currentPairList={currentPairList}
        handleWordClick={handleWordClick}
      />
      {/* //! Controls part: */}
      <Controls
        paused={paused}
        handleTogglePlayPause={handleTogglePlayPause}
        volumeLevel={volumeLevel}
        handleToggleMute={handleToggleMute}
        handleStop={handleStop}
        theater={theater}
        handleTheater={handleTheater}
        handleVolumeSliderChange={handleVolumeSliderChange}
        fullscreen={fullscreen}
        handleToggleFullscreen={handleToggleFullscreen}
        videoTime={videoTime}
        videoEnded={videoRef.current?.ended || videoEnded}
        startTime={undefined}
        handleSetVideoTime={handleSetVideoTime}
        videoDuration={videoDuration}
        playBackRate={playBackRate}
        handleSetPlayBackRate={handleSetPlayBackRate}
        handleReplay={handleReplay}
        // handleWordsReviewClick={handleWordsReviewClick}
      />

      {/* //! WordModal part: */}
      {currentPairList.length > 0 && showWordModal && (
        <div>the modalllllllllllllllllllll</div>
      )}
      {showLoadingModal && <LoadingModal />}
    </figure>
  );
}
