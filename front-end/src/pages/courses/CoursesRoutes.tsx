import { Navigate, Route, Routes } from "react-router-dom";
// import "./CoursesRoutes.scss";
import CoursesViewRoutes from "./view/CoursesViewRoutes";
import NewCourse from "./new/NewCourse";
function CoursesRoutes() {
  return (
    <Routes>
      <Route path="view/*" element={<CoursesViewRoutes />} />
      <Route path="new/*" element={<NewCourse />} />
      {/*//TODO Remove the following line and use useLocation to extract section num in NewCourse   */}
      {/* <Route path="/new/section/:sectionNum" element={<NewCourse />} /> */}
      <Route path="*" element={<Navigate to="view" replace />} />
    </Routes>
  );
}

export default CoursesRoutes;
