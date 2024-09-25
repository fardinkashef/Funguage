import React, { useState } from "react";
import "./NewCourse.scss";
import NewCourseNavBar from "@/components/courses/new/NewCourseNavBar.tsx";
import CourseProfile from "./profile/CourseProfile.tsx";
import CourseSection from "./section/CourseSection.tsx";
import CoursePublish from "./publish/CoursePublish.tsx";

import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  type section,
  type course,
  databaseWordList,
  subtitleWordList,
} from "@/shared/types/wordDataTypes.ts";

const initialSection = {
  name: "",
  description: "",
  subtitleUploaded: false,
  videoUploaded: false,
  wordsPairList: [{ subtitleWordList: [], databaseWordList: [] }],
  usedDatabaseWordIds: [],
};
// I want to use initialSection in initialCourse and addSection function. So: 1) We need a copy of initialSection because otherwise it will be mutated and when adding a new section, it won't be initial as above 2) We need a deep copy because it's a nested object 👇:
const initialCourse = {
  profile: { name: "", description: "" },
  sections: [
    {
      name: "",
      description: "",
      subtitleUploaded: false,
      videoUploaded: false,
      wordsPairList: [
        {
          subtitleWordList: [] as subtitleWordList,
          databaseWordList: [] as databaseWordList,
        },
      ],
      usedDatabaseWordsIds: [],
    },
  ],
  usedDatabaseWordIds: [],
};

type subtitles = {
  subtitleFile: File;
  subtitleSrc: string;
}[];

function NewCourse() {
  const [course, setCourse] = useState<course>(
    JSON.parse(JSON.stringify(initialCourse))
  );
  const [sectionNumber, setSectionNumber] = useState(1);

  const [databaseWords, setDatabaseWords] = useState<databaseWordList>([]);

  // FOR SAVING SUBTITLE FILES AND THEIR SRCS BETWEEN RE-RENDERS 👇:
  const [subtitles, setSubtitles] = useState<subtitles>([]);
  const [videos, setVideos] = useState<File[]>([]);

  // FOR SAVING PROFILE IMAGES (OF THE COURSE AND THE SECTIONS) BETWEEN RE-RENDERS 👇:
  const [courseProfileImageFile, setCourseProfileImageFile] =
    useState<File | null>(null);
  const [courseProfileImageSrc, setCourseProfileImageSrc] =
    useState<string>("");
  const [sectionsProfileImageFiles, setSectionsProfileImageFiles] = useState<
    (File | null)[]
  >([null]);
  const [sectionsProfileImageSrcs, setSectionsProfileImageSrcs] = useState<
    string[]
  >([""]);

  ///////////
  // FUNCTIONS TO SET DIFFERENT PARTS OF COURSE DATA
  const setCourseName = (courseName: string) =>
    setCourse({
      ...course,
      profile: { ...course.profile, name: courseName },
    });

  const setCourseDescription = (courseDescription: string) =>
    setCourse({
      ...course,
      profile: { ...course.profile, description: courseDescription },
    });
  const setSection = (section: section) => {
    setCourse({
      ...course,
      sections: [
        ...course.sections.slice(0, sectionNumber - 1),
        section,
        ...course.sections.slice(sectionNumber),
      ],
    });
  };
  const addSection = () => {
    setCourse({
      ...course,
      sections: [
        ...course.sections,
        JSON.parse(JSON.stringify(initialSection)),
      ],
    });
    setSectionsProfileImageFiles((pre) => [...pre, null]);
    setSectionsProfileImageSrcs((pre) => [...pre, ""]);
  };
  //////////////
  const setSectionName = (sectionName: string) =>
    setSection({ ...course.sections[sectionNumber - 1], name: sectionName });
  const setSectionDescription = (sectionDescription: string) =>
    setSection({
      ...course.sections[sectionNumber - 1],
      description: sectionDescription,
    });

  //////////
  // FOR SAVING SUBTITLE FILES AND THEIR SRCS BETWEEN RE-RENDERS:

  const setSectionSubtitleFile = (newSubtitleFile: File) => {
    setSubtitles((subtitles) => [
      ...subtitles.slice(0, sectionNumber - 1),
      { ...subtitles[sectionNumber - 1], subtitleFile: newSubtitleFile },
      ...subtitles.slice(sectionNumber),
    ]);
  };
  const setSectionSubtitleSrc = (newSubtitleSrc: string) => {
    setSubtitles((subtitles) => [
      ...subtitles.slice(0, sectionNumber - 1),
      { ...subtitles[sectionNumber - 1], subtitleSrc: newSubtitleSrc },
      ...subtitles.slice(sectionNumber),
    ]);
  };
  //////////
  // FOR SAVING VIDEO FILES BETWEEN RE-RENDERS:
  const setSectionVideoFile = (newVideoFile: File) => {
    setVideos((videos) => [
      ...videos.slice(0, sectionNumber - 1),
      newVideoFile,
      ...videos.slice(sectionNumber),
    ]);
  };
  /////////////////
  const setSectionProfileImageFile = (newFile: File | null) => {
    const newSectionsProfileImageFiles = sectionsProfileImageFiles.map(
      (imageFile, index) => (index !== sectionNumber - 1 ? imageFile : newFile)
    );
    setSectionsProfileImageFiles(newSectionsProfileImageFiles);
  };
  const setSectionProfileImageSrc = (newSrc: string) => {
    const newSectionsProfileImageSrcs = sectionsProfileImageSrcs.map(
      (imageSrc, index) => (index !== sectionNumber - 1 ? imageSrc : newSrc)
    );
    setSectionsProfileImageSrcs(newSectionsProfileImageSrcs);
  };

  ///////////
  //// GETTING ALL THE WORDS FROM DATABASE
  React.useEffect(() => {
    (function () {
      const getData = async () => {
        try {
          const res = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/words"
          );
          // console.log("this is all the words", res.data);

          //// to add id key. we have _id key but I need id key.
          // res.forEach((data) => {
          //   data.id = data._id;
          // });
          ////
          setDatabaseWords(res.data);
        } catch (err) {
          console.log("sth wrong happened when loading words from database");
        }
      };
      getData();
    })();
  }, []);
  //////////////////////////
  /////////////////////

  // console.log("this is course data", course);

  ////////////////////////
  return (
    <div className="NewCourse">
      <NewCourseNavBar
        // sectionNumber={sectionNumber}
        setSectionNumber={setSectionNumber}
        sectionsNumber={course.sections.length}
        handleAddSection={addSection}
      />
      <Routes>
        <Route
          path="profile"
          element={
            <CourseProfile
              courseName={course.profile.name}
              setCourseName={setCourseName}
              courseDescription={course.profile.description}
              setCourseDescription={setCourseDescription}
              courseProfileImageFile={courseProfileImageFile}
              setCourseProfileImageFile={setCourseProfileImageFile}
              courseProfileImageSrc={courseProfileImageSrc}
              setCourseProfileImageSrc={setCourseProfileImageSrc}
            />
          }
        />
        <Route
          path="section/*"
          element={
            <CourseSection
              courseName={course.profile.name}
              name={course.sections[sectionNumber - 1].name}
              setName={setSectionName}
              description={course.sections[sectionNumber - 1].description}
              setDescription={setSectionDescription}
              number={sectionNumber}
              key={sectionNumber}
              section={course.sections[sectionNumber - 1]}
              setSection={setSection}
              databaseWords={databaseWords}
              //////////////
              subtitleFile={subtitles[sectionNumber - 1]?.subtitleFile}
              setSubtitleFile={setSectionSubtitleFile}
              subtitleSrc={subtitles[sectionNumber - 1]?.subtitleSrc}
              setSubtitleSrc={setSectionSubtitleSrc}
              //////////////
              videoFile={videos[sectionNumber - 1]}
              setVideoFile={setSectionVideoFile}
              ///////////
              setProfileImageFile={setSectionProfileImageFile}
              profileImageSrc={sectionsProfileImageSrcs[sectionNumber - 1]}
              setProfileImageSrc={setSectionProfileImageSrc}
              /////////
              // subtitleUploaded={
              //   course.sections[sectionNumber - 1].subtitleUploaded
              // }
              // setSubtitleUploaded={setSectionSubtitleUploaded}
              // videoUploaded={course.sections[sectionNumber - 1].videoUploaded}
              // setVideoUploaded={setSectionVideoUploaded}
            />
          }
        />
        <Route
          path="publish"
          element={
            <CoursePublish
              course={course}
              courseProfileImageFile={courseProfileImageFile}
              sectionsProfileImageFiles={sectionsProfileImageFiles}
            />
          }
        />
        <Route path="*" element={<Navigate to="profile" />} />
      </Routes>
    </div>
  );
}

export default NewCourse;
