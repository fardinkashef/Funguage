import "./CoursePublish.css";
import axios from "axios";

import {
  databaseWordList,
  section,
  type course,
} from "@/shared/types/wordDataTypes";
import { useEffect, useState } from "react";

type CoursePublishProps = {
  course: course;
  courseProfileImageFile: File | null;
  sectionsProfileImageFiles: (File | null)[];
};

function CoursePublish({
  course,
  courseProfileImageFile,
  sectionsProfileImageFiles,
}: CoursePublishProps) {
  const [finalCourseData, setfinalCourseData] = useState<course | null>(null);

  const handleCourseSave = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/courses",
        finalCourseData
      );
    } catch (error) {
      console.log("Saving the course failed");
    }
    ////////////
    if (!courseProfileImageFile || sectionsProfileImageFiles.includes(null)) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("courseName", course.profile.name);
      formData.append("file", courseProfileImageFile);
      await axios.post(
        import.meta.env.VITE_BACKEND_URL +
          "/courses/upload/course-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    try {
      for (let i = 0; i < sectionsProfileImageFiles.length; i++) {
        const formData = new FormData();
        formData.append("courseName", course.profile.name);
        formData.append("sectionName", course.sections[i].name);

        // if (!sectionsProfileImageFiles[i]) return;
        formData.append("file", sectionsProfileImageFiles[i] as File);
        await axios.post(
          import.meta.env.VITE_BACKEND_URL +
            "/courses/upload/section-profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    function () {
      const extractDatabaseWordListIds = (
        databaseWordList: databaseWordList
      ) => {
        const ids = databaseWordList.map((databaseWord) => databaseWord._id);
        return ids;
      };

      const extractSectionDatabaseWordIds = (section: section) => {
        let ids: string[] = [];
        section.wordsPairList.forEach(
          (pair) =>
            (ids = [
              ...ids,
              ...extractDatabaseWordListIds(pair.databaseWordList),
            ])
        );
        //Remove duplicate items:
        return Array.from(new Set(ids));
      };
      const extractCourseDatabaseWordIds = (course: course) => {
        let ids: string[] = [];
        course.sections.forEach(
          (section) => (ids = [...ids, ...section.usedDatabaseWordIds])
        );
        //Remove duplicate items:
        return Array.from(new Set(ids));
      };
      const courseCopy = JSON.parse(JSON.stringify(course)) as course;
      courseCopy.sections.forEach(
        (section) =>
          (section.usedDatabaseWordIds = extractSectionDatabaseWordIds(section))
      );

      courseCopy.usedDatabaseWordIds = extractCourseDatabaseWordIds(courseCopy);
      setfinalCourseData(courseCopy);
    },
    [course]
  );

  return <button onClick={handleCourseSave}> save course</button>;
}
export default CoursePublish;
