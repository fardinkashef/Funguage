import { Navigate, Route, Routes } from "react-router-dom";
// import "./MyEnrolledCoursesRoutes.scss";
import AllMyEnrolledCourses from "./all/AllMyEnrolledCourses";
import OneMyEnrolledCourse from "./onecourse/OneMyEnrolledCourse";
import MySectionView from "./onesection/MySectionView";

// type MyEnrolledCoursesRoutesProps = {
//   userId: string;
// };

function MyEnrolledCoursesRoutes() {
  return (
    <Routes>
      <Route path="all" element={<AllMyEnrolledCourses />} />
      <Route path=":courseId" element={<OneMyEnrolledCourse />} />
      <Route path=":courseId/:sectionName" element={<MySectionView />} />
      <Route path="*" element={<Navigate to="all" replace />} />
    </Routes>
  );
}

export default MyEnrolledCoursesRoutes;
