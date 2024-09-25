import { useState, useEffect } from "react";
import "./AllCourses.scss";

import LoadingSpinner from "@/components/shared/components/LoadingSpinner";

import axios from "axios";
import CourseList from "@/components/courses/view/CourseList";
import { useAuthContext } from "@/shared/context/AuthContext";

type courseData = { id: string; name: string; description: string };

function AllCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [coursesData, setCoursesData] = useState<courseData[] | null>(null);
  const [userEnrolledCoursesIds, setUserEnrolledCoursesIds] = useState<
    string[] | null
  >(null);

  const { loggedIn } = useAuthContext();

  //* To get all the courses 👇:
  useEffect(function () {
    const getData = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/courses/all"
        );
        setCoursesData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log("sth wrong happened", err);
      }
    };
    getData();
  }, []);

  //* To get all the user's enrolled courses in order to mark them as "enrolled" when listing all the courses 👇:
  useEffect(
    function () {
      if (!loggedIn) return;
      const getData = async () => {
        try {
          const res = await axios.get(
            import.meta.env.VITE_BACKEND_URL + `/mycourses/all-ids`
          );
          setUserEnrolledCoursesIds(res.data);
        } catch (err) {
          console.log("sth wrong happened", err);
        }
      };
      getData();
    },
    [loggedIn]
  );

  if (!isLoading && coursesData && coursesData.length === 0) {
    return (
      <div>
        <h2>No courses found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="AllCourses">
      {isLoading || !coursesData ? (
        <LoadingSpinner />
      ) : (
        <CourseList
          coursesData={coursesData}
          userEnrolledCoursesIds={
            userEnrolledCoursesIds ? userEnrolledCoursesIds : undefined
          }
        />
      )}
    </div>
  );
}

export default AllCourses;
