import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./OneCourse.scss";
import LoadingSpinner from "@/components/shared/components/LoadingSpinner.tsx";
import SectionList from "@/components/courses/view/SectionList";
import { useAuthContext } from "@/shared/context/AuthContext";

type sectionData = {
  name: string;
  description: string;
};

type courseData = {
  name: string;
  description: string;
  sections: sectionData[];
};

function OneCourse() {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState<courseData | null>(null);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);

  const { loggedIn } = useAuthContext();
  //////////////
  const courseId = useParams().courseId;
  if (!courseId) throw new Error("There is no (course) id in the params");
  const location = useLocation();
  const initialEnrolledState = location.state;
  //////////////
  const handleEnroll = async () => {
    if (!loggedIn)
      return alert("You need to log in first to enroll to courses");
    try {
      await axios.patch(
        import.meta.env.VITE_BACKEND_URL + `/mycourses/${courseId}`
      );
      setEnrolled(true);
    } catch (err) {
      console.log("sth wrong happened", err);
    }
  };
  const handleUnsubscribe = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/mycourses/${courseId}`
      );
      setEnrolled(false);
    } catch (err) {
      console.log("sth wrong happened", err);
    }
  };
  /////////////

  useEffect(function () {
    setEnrolled(initialEnrolledState);
  }, []);

  useEffect(function () {
    const getData = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/courses/${courseId}`
        );
        setCourseData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log("sth wrong happened", err);
      }
    };
    getData();
  }, []);

  if (!isLoading && courseData && courseData.sections.length === 0) {
    return (
      <div className="place-list center">
        <h2>No sections found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="OneCourse">
      {isLoading || !courseData ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="header">
            <img
              src={
                import.meta.env.VITE_BACKEND_URL +
                `/static-files/profile-images/courses/${courseData.name}.jpg`
              }
            />
            <div className="info">
              <h3>{courseData.name}</h3>
              <p>{courseData.description}</p>
              {enrolled ? (
                <button className="unsubscribe" onClick={handleUnsubscribe}>
                  Unsubscribe
                </button>
              ) : (
                <button className="enroll" onClick={handleEnroll}>
                  Enroll
                </button>
              )}
            </div>
          </div>
          <hr />
          <h3>Sections:</h3>
          <SectionList
            courseId={courseId}
            courseName={courseData.name}
            sectionsData={courseData.sections}
          />
        </>
      )}
    </div>
  );
}

export default OneCourse;
