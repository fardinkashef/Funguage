import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Courses from "./Courses";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/courses/user/${userId}`
        );
        setLoadedCourses(responseData.courses);
      } catch (err) {}
    };
    fetchCourses();
  }, [sendRequest, userId]);

  const courseDeletedHandler = (deletedCourseId) => {
    setLoadedCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== deletedCourseId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCourses && (
        <Courses
          items={loadedCourses}
          onDeleteCourse={courseDeletedHandler}
          userId={userId}
        />
      )}
    </React.Fragment>
  );
};

export default UserCourses;
