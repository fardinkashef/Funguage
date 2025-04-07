import React, { useState } from "react";
// import episode1 from "./media/Friends.S01E01.720p_IFR.mp4";

// import gotta from "./media/gotta.png";
// import cafeteria from "./media/cafeteria.png";
// import chalk from "./media/chalk.png";
// import date_1 from "./media/date_1.png";
// import date_4 from "./media/date_4.png";
// import go_through_1 from "./media/go_through_1.png";
// import hairpiece from "./media/hairpiece.png";
// import hump_noun_4 from "./media/hump_noun_4.png";
// import turn_out_1 from "./media/turn_out_1.png";
// import weird from "./media/weird.png";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import VideoPlayer from "../../../courses/course-view/VideoPlayer";

function Tour() {
  const data = {
    gotta: "gotta.png",
    weird: "weird.png",
    turn: "turn_out_1.png",
    hump: "hump_noun_4.png",
    hair: "hairpiece.png",
    cafeteria: "cafeteria.png",
    chalk: "chalk.png",
    turn: "turn_out_1.png",
    go: "go_through_1.png",
    date: "date_1.png",
  };

  // {'gotta' , 'weird',
  // ,
  // 'hump_noun_4',
  // 'hairpiece'
  // 1,
  // gotta: gotta,
  // date_1: date_1,
  // date_4: date_4,
  // cafeteria: cafeteria,
  // chalk: chalk,
  // };
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [loadedVideo, setLoadedVideo] = useState();

  // const srcNames = {
  // weird: weird,
  // turn_out_1: turn_out_1,
  // hump_noun_4: hump_noun_4,
  // hairpiece: hairpiece,
  // go_through_1: go_through_1,
  // gotta: gotta,
  // date_1: date_1,
  // date_4: date_4,
  // cafeteria: cafeteria,
  // chalk: chalk,
  // };

  // let videoData = [
  //   { word: "gotta", time: 56, picSrc: gotta },
  //   { word: "cafeteria", time: 82, picSrc: cafeteria },
  //   { word: "chalk", time: 63, picSrc: chalk },
  //   { word: "date_1", time: 71, picSrc: date_1 },
  //   { word: "date_4", time: 71.1, picSrc: date_4 },
  //   { word: "go_through_1", time: 66, picSrc: go_through_1 },
  //   { word: "hairpiece", time: 60, picSrc: hairpiece },
  //   { word: "hump_noun_4", time: 58, picSrc: hump_noun_4 },
  //   { word: "turn_out_1", time: 104, picSrc: turn_out_1 },
  //   { word: "weird", time: 108, picSrc: weird },
  // ];

  return (
    <div>
      <VideoPlayer
        data={data}
        // These two did not work. I couldn't solve the problem in passing media src using props.
        // videoSrc={"./media/Friends.S01E01.720p_IFR"}
        // subtitleSrc={"./media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"}
      />
      {/* <img className="image" ref={image}/> */}
    </div>
  );
}

export default Tour;
