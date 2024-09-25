import { useEffect, useState } from "react";

import "./CourseSection.scss";
import SubtitleUploadPart from "@/components/courses/new/SubtitleUploadPart";
import VideoUploadPart from "@/components/courses/new/VideoUploadPart";
import WordsPart from "@/components/courses/new/WordsPart";
import {
  cue,
  databaseWord,
  section,
  subtitleWord,
  wordsPairList,
} from "@/shared/types/wordDataTypes";
import ImageInput from "@/components/courses/new/ImageInput";

type CourseSectionProps = {
  courseName: string;
  name: string;
  setName: (sectionName: string) => void;
  description: string;
  setDescription: (sectionDescription: string) => void;
  number: number;
  ////////////////
  section: section;
  setSection: (section: section) => void;
  databaseWords: databaseWord[];
  /////////
  subtitleFile: File;
  setSubtitleFile: (newSubtitleFile: File) => void;
  // todo: I added undefined type to the following. Check whether it's okay or not 👇:
  subtitleSrc: string | undefined;
  setSubtitleSrc: (newSubtitleSrc: string) => void;
  ///////////
  videoFile: File;
  setVideoFile: (newVideoFile: File) => void;
  //////
  setProfileImageFile: (newFile: File | null) => void;
  profileImageSrc: string;
  setProfileImageSrc: (newSrc: string) => void;
  //////////
};

function CourseSection({
  courseName,
  name,
  setName,
  description,
  setDescription,
  number,
  ////////////////
  section,
  setSection,
  databaseWords,
  /////////
  subtitleFile,
  setSubtitleFile,
  subtitleSrc,
  setSubtitleSrc,
  ////////
  videoFile,
  setVideoFile,
  //////////
  setProfileImageFile,
  profileImageSrc,
  setProfileImageSrc,
}: CourseSectionProps) {
  const [subtitleWords, setSubtitleWords] = useState<subtitleWord[]>([]);
  const [cues, setCues] = useState<cue[]>([]);
  /////////////
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (!setProfileImageFile || !setProfileImageSrc) return;

    setProfileImageFile(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
      if (typeof reader.result === "string") setProfileImageSrc(reader.result);
    };
  };

  const handleRemoveProfileImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setProfileImageFile(null);
    setProfileImageSrc("");
  };

  //////////////
  useEffect(
    function () {
      if (!subtitleSrc) return;
      //* When using document.getElementById("some-id"), we need to assert the type. See "Type Assertions" pdf file in my notes 👇:
      const video = document.getElementById("video") as HTMLVideoElement;
      const track = document.getElementById("track") as HTMLTrackElement;

      const wordFilter = [
        "",
        ".",
        "?",
        "!",
        "a",
        "I",
        "an",
        "on",
        "that",
        "to",
        "is",
        "-",
      ];

      track.addEventListener(`load`, () => {
        if (!video.textTracks[0].cues) return;

        let allWords: subtitleWord[] = [];
        let allCues = [];
        for (let i = 0; i < video.textTracks[0].cues.length; i++) {
          //* TS complains that "Property 'text' does not exist on type 'TextTrackCue'." so I asserted the more specific type of VTTCue 👇:
          let cue = video.textTracks[0].cues[i] as VTTCue;
          let text = cue.text;
          text = text
            .replaceAll(".", " .")
            .replaceAll(". . .", "...")
            .replaceAll(",", " ,")
            .replaceAll("?", " ?")
            .replaceAll("\n", " ");

          allCues.push({ id: cue.id, text: text });
          let cueWords = text.split(" ");
          cueWords = cueWords.map((word) => word.trim());
          cueWords = cueWords.filter((word) => !wordFilter.includes(word));

          let currentCueSubtitleWords = cueWords.map((word, index) => {
            return {
              title: word,
              cueId: cue.id,
              orderNumber:
                cueWords.slice(0, index).filter((cueWord) => cueWord === word)
                  .length + 1,
            };
          });

          allWords = [...allWords, ...currentCueSubtitleWords];
        }
        setSubtitleWords(allWords);
        setCues(allCues);
      });
    },
    [subtitleSrc]
  );

  return (
    <div className="CourseSection">
      <h2>{`Section ${number}`}</h2>
      <label>
        <span>name</span>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="description">
        <span>description</span>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <SubtitleUploadPart
        courseName={courseName}
        sectionName={name}
        subtitleFile={subtitleFile}
        setSubtitleFile={setSubtitleFile}
        setSubtitleSrc={setSubtitleSrc}
        ////////////////
        subtitleUploaded={section.subtitleUploaded}
        setSubtitleUploaded={(boolean: boolean) =>
          setSection({ ...section, subtitleUploaded: boolean })
        }
      />
      <VideoUploadPart
        courseName={courseName}
        sectionName={name}
        videoFile={videoFile}
        setVideoFile={setVideoFile}
        ////////////
        videoUploaded={section.videoUploaded}
        setVideoUploaded={(boolean: boolean) =>
          setSection({ ...section, videoUploaded: boolean })
        }
      />
      <ImageInput
        onChange={handleImageChange}
        onRemoveButtonClick={handleRemoveProfileImage}
        imageSrc={profileImageSrc}
        text="Click or Drag a profile image here..."
      />
      <video id="video" controls preload="metadata">
        {subtitleSrc && (
          <track
            label="English"
            kind="subtitles"
            srcLang="en"
            // src="media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"
            src={subtitleSrc}
            default
            id="track"
          />
        ) }
      </video>
      <WordsPart
        subtitleWords={subtitleWords}
        databaseWords={databaseWords}
        cues={cues}
        /////////////
        wordsPairList={section.wordsPairList}
        setWordsPairList={(newWordsPairList: wordsPairList) =>
          setSection({ ...section, wordsPairList: newWordsPairList })
        }
      />
    </div>
  );
}
export default CourseSection;
