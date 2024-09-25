import { Navigate, Route, Routes } from "react-router-dom";
// import "./CoursesViewRoutes.scss";
import AllCourses from "./allcourses/AllCourses";
import SectionView from "./onesection/SectionView";
import OneCourse from "./onecourse/OneCourse";

function CoursesViewRoutes() {
  return (
    <Routes>
      <Route path="all" element={<AllCourses />} />
      <Route path=":courseId" element={<OneCourse />} />
      <Route path=":courseId/:sectionName" element={<SectionView />} />
      <Route path="*" element={<Navigate to="all" replace />} />
    </Routes>
  );
}

export default CoursesViewRoutes;
