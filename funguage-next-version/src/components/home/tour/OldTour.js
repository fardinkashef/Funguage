import React, { useState, useRef } from "react";
// import Navigation from "../heading/navigation/Navigation";

import { useHttpClient } from "../../../shared/hooks/http-hook";

function OldTour() {
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [loadedVideo, setLoadedVideo] = useState();
  const [rows, setRows] = useState([]);

  let desiredFS = false;
  const srcNames = {
    weird: weird,
    turn_out_1: turn_out_1,
    hump_noun_4: hump_noun_4,
    hairpiece: hairpiece,
    go_through_1: go_through_1,
    gotta: gotta,
    date_1: date_1,
    date_4: date_4,
    cafeteria: cafeteria,
    chalk: chalk,
  };
  const button0 = useRef();
  const button1 = useRef();
  const button2 = useRef();
  const button3 = useRef();
  const buttons = [button0, button1, button2, button3];
  const video = useRef();
  // const track = useRef();
  const image = useRef();
  const container = useRef();

  ///////// note : here is how to querySelect an element and add an event listener in react
  ///////// note : In vanilla java scrypt , there's cuechange event for 'track' elements. Unfortunately there has not been an onCuechange equivalent prop specified in react. So I had to use the old way of querySelecting the track element to use cuechange event.
  ///////// note : I achieved that by using useEffect which does two things : 1)  document.querySelector will be applied when the component finishes rendering. 2) By using an empty array as the second argument to useEffect , we ensure the event listner will be added to the element just once, not every time the component rerenders. I learnt about these in here :https://www.pluralsight.com/guides/event-listeners-in-react-components
  ///////// note : At first , I used refs to access the track element and then used  track.addEventListener . But for some reason a got an error indicating that there's no property called add event listener for track. So I tried accessing the element using  document.querySelector and it worked.
  React.useEffect(() => {
    const track = document.querySelector(".track");
    const player = document.querySelector(".player");
    track.addEventListener("cuechange", (event) => {
      if (event.target.track?.activeCues[0]?.text) {
        const text = event.target.track?.activeCues[0]?.text;
        // Text with /n seperated from the words
        const lines = text.split("\n"); // Output example :  ["How are you?","I'm fine.","Thank you."]
        const words = lines.map((line) => line.split(" ")); // Output example :  [["How", "are"," you?"],["I'm", "fine.","Thank", "you."]]
        console.log(words);

        const newRows = words.map((word) => (
          <div className="d-flex justify-content-center">
            {word.map((i) => (
              <button className=" bg-primary mx-2">{i}</button>
            ))}
          </div>
        ));
        setRows(newRows);
        if (!document.fullscreenElement && desiredFS) {
          desiredFS = false;
        }
        if (document.fullscreenElement && !desiredFS) {
          console.log("fulllllllllllllll screeeeeeeeeeeeeeeennnnnnnnnn");
          document.exitFullscreen();
          player.requestFullscreen().catch((err) => {
            alert(
              `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
            );
          });
          desiredFS = true;
        }
        // From MDN about fullscreen mode:
        // function toggleFullscreen() {
        //   let elem = document.querySelector("video");

        //   if (!document.fullscreenElement) {
        //     elem.requestFullscreen().catch((err) => {
        //       alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        //     });
        //   } else {
        //     document.exitFullscreen();
        //   }
        // }
      } else setRows([]);
    });
  }, []);

  let videoCurrentTime;
  let lastTimeUpdate = 0;
  let showingImage = false;
  let buttonNum = 0;
  let showingTimes = new Set();
  let showingTimes_copy;
  let showingButton = false;
  let counter = 0;
  let lastShowedButton = "";
  let eventType = "";

  let videoData = [
    { word: "gotta", time: 56, picSrc: gotta },
    { word: "cafeteria", time: 82, picSrc: cafeteria },
    { word: "chalk", time: 63, picSrc: chalk },
    { word: "date_1", time: 71, picSrc: date_1 },
    { word: "date_4", time: 71.1, picSrc: date_4 },
    { word: "go_through_1", time: 66, picSrc: go_through_1 },
    { word: "hairpiece", time: 60, picSrc: hairpiece },
    { word: "hump_noun_4", time: 58, picSrc: hump_noun_4 },
    { word: "turn_out_1", time: 104, picSrc: turn_out_1 },
    { word: "weird", time: 108, picSrc: weird },
  ];
  let wordShowTimeSeconds = videoData.map((x) => x.time);
  let wordShowTimeSeconds_copy = [...wordShowTimeSeconds];
  let currentWordShowTimeSeconds = [...wordShowTimeSeconds];

  const videoTimeUpdate = (event) => {
    if (counter > 1000) counter = 1;
    if (counter % 1000 === 0) {
      videoCurrentTime = event.target.currentTime;
      if (Math.abs(videoCurrentTime - lastTimeUpdate) > 3) {
        currentWordShowTimeSeconds = [...wordShowTimeSeconds];
        // console.log("case happened!");
      }
      wordShowTimeSeconds_copy = [...currentWordShowTimeSeconds];
      lastTimeUpdate = videoCurrentTime;
      for (const time of wordShowTimeSeconds_copy) {
        if (wordShowTime(time)) {
          showButton(buttonNum, videoData.find((x) => x.time == time).word);
          showingTimes.add([time, buttonNum]);
          buttonNum++;
          if (buttonNum > 3) buttonNum = 0;
          currentWordShowTimeSeconds.splice(
            wordShowTimeSeconds_copy.indexOf(time),
            1
          );
        }
      }
      showingTimes_copy = showingTimes;
      for (const j of showingTimes_copy) {
        if (!wordShowTime(j[0])) {
          hideButton(j[1]);
          showingTimes.delete(j);
        }
      }
    } else counter++;
  };

  function wordShowTime(wordShowTime) {
    return (
      wordShowTime < videoCurrentTime && videoCurrentTime < wordShowTime + 5
    );
  }

  function showButton(buttonNum, text) {
    showingButton = true;
    buttons[buttonNum].current.textContent = text;
    buttons[buttonNum].current.style.opacity = "1";
    lastShowedButton = text;
  }
  function hideButton(buttonNum) {
    showingButton = false;
    buttons[buttonNum].current.textContent = "";
    buttons[buttonNum].current.style.opacity = "0.1";
  }

  const showImage = (event, eventType) => {
    if (eventType === "click")
      image.current.src = srcNames[event.target.textContent];
    if (eventType === "keyPressed") {
      if (!lastShowedButton) lastShowedButton = "gotta";
      else {
        image.current.src = srcNames[lastShowedButton];
      }
    }
    showingImage = true;
    video.current.pause();
    container.current.style.opacity = "0.1";
    image.current.style.opacity = 1;
  };
  const hideImage = () => {
    image.current.style.opacity = 0.01;
    container.current.style.opacity = "1";
    showingImage = false;
    video.current.play();
  };

  const showingImageHandler = (event) => {
    eventType = "click";
    if (video.current.played && !showingImage) {
      showImage(event, eventType);
      return;
    }
    if (video.current.paused && showingImage) {
      hideImage();
      return;
    }
  };

  const keyPressHandler = (keyPressEvent) => {
    eventType = "keyPressed";
    // "Enter" key presesd :
    if (keyPressEvent.key === "a" || "A") {
      if (showingButton && !showingImage) {
        // console.log("enter pressed");
        //video.pause();//
        showImage(undefined, eventType);
        return;
      } else if (showingImage) {
        hideImage();
        // video.play();
        return;
      }
    }
    // console.log("Alt pressed");

    // "Escape" key presesd :
    if (showingImage && keyPressEvent.key === "Escape") {
      hideImage();
      return;
    }
  };

  // const cueChange = (e) => {
  //   console.log(e.target.track?.activeCues[0]?.text);
  // };

  return (
    <div onKeyDown={keyPressHandler}>
      <div className="container-fluid p-0" ref={container}>
        <div className="row m-0 ">
          <div className="p-0">
            {/* <video
          className="video "
          src={episode1}
          controls
          onTimeUpdate={videoTimeUpdate}
          ref={video}
          // onClick={hideImage}
        ></video> */}
            <div className="position-relative player">
              <video
                id="videoPlayer"
                controls
                muted="muted"
                autoPlay
                className=" w-100"
                // onClick={() => console.log(track.current)}

                // onTimeUpdate={videoTimeUpdate}
                // ref={video}
              >
                {/* <source
                // src="../../../../../back-end/uploads/video"
                src="http://localhost:5000/video"
                type="video/mp4"
              /> */}
                <source
                  // src="../../../../../back-end/uploads/video"
                  src={sintel}
                  type="video/mp4"
                />
                <track
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src={sintelV}
                  default
                  // onCuechange={cueChange}
                  // ref={track}
                  className="track"
                />
              </video>
              <div className="container-fluid position-absolute bottom-0 start-50">
                {rows}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <button
            className="button button0"
            ref={button0}
            onClick={showingImageHandler}
          ></button>
          <button
            className="button button1"
            ref={button1}
            onClick={showingImageHandler}
          ></button>
          <button
            className="button button2"
            ref={button2}
            onClick={showingImageHandler}
          ></button>
          <button
            className="button button3"
            ref={button3}
            onClick={showingImageHandler}
          ></button>
        </div> */}
      </div>
      <img className="image" ref={image} />
    </div>
  );
}

export default OldTour;
