import { useState, useEffect } from "react";
import "./AllMyEnrolledCourses.scss";

import LoadingSpinner from "@/components/shared/components/LoadingSpinner";

import axios from "axios";

import MyCourseList from "@/components/courses/view/MyCourseList";

type courseData = {
  id: string;
  name: string;
  description: string;
};

type courseProgress = {
  courseId: string;
  percentage: number;
  learntWordsNum: number;
  totalWordsNum: number;
};
// type AllMyEnrolledCoursesProps = {
//   userId: string;
// };

function AllMyEnrolledCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [coursesData, setCoursesData] = useState<courseData[] | null>(null);
  const [coursesProgress, setCoursesProgress] = useState<
    courseProgress[] | null
  >(null);

  useEffect(function () {
    const getData = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/mycourses/all`
        );
        setCoursesData(res.data.coursesData);
        setCoursesProgress(res.data.coursesProgress);

        setIsLoading(false);
      } catch (err) {
        console.log("sth wrong happened", err);
      }
    };
    getData();
  }, []);

  if (!isLoading && coursesData && coursesData.length === 0) {
    return (
      <div className="place-list center">
        <h2>No courses found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="AllMyEnrolledCourses">
      {isLoading || !coursesData ? (
        <LoadingSpinner />
      ) : (
        <MyCourseList
          coursesData={coursesData}
          coursesProgress={coursesProgress ? coursesProgress : undefined}
        />
      )}
    </div>
  );
}

export default AllMyEnrolledCourses;
