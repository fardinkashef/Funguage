import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./OneMyEnrolledCourse.scss";
import LoadingSpinner from "@/components/shared/components/LoadingSpinner.tsx";

import MySectionList from "@/components/courses/view/MySectionList";

type sectionProgress = {
  percentage: number;
  learntWordsNum: number;
  totalWordsNum: number;
};

type sectionData = {
  name: string;
  description: string;
  progress: sectionProgress;
};

type courseData = {
  name: string;
  description: string;
  sections: sectionData[];
};

function OneMyEnrolledCourse() {
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState<courseData | null>(null);

  //////////////
  const courseId = useParams().courseId;
  if (!courseId) throw new Error("There is no (course) id in the params");

  const navigate = useNavigate();
  //////////////
  const handleUnsubscribe = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/mycourses/${courseId}`
      );
      navigate("/mycourses/enrolled/all", { replace: true });
    } catch (err) {
      console.log("sth wrong happened", err);
    }
  };
  /////////////

  useEffect(function () {
    const getData = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/mycourses/${courseId}`
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
    <div className="OneMyEnrolledCourse">
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
              <button className="unsubscribe" onClick={handleUnsubscribe}>
                Unsubscribe
              </button>
            </div>
          </div>
          <hr />
          <h3>Sections:</h3>
          <MySectionList
            courseId={courseId}
            courseName={courseData.name}
            sectionsData={courseData.sections}
          />
        </>
      )}
    </div>
  );
}

export default OneMyEnrolledCourse;
