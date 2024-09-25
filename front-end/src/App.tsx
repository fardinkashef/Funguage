import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/home/navbar/NavBar.tsx";
import Home from "./pages/home/Home.tsx";
import CoursesRoutes from "./pages/courses/CoursesRoutes.tsx";
import MyEnrolledCoursesRoutes from "./pages/mycourses/enrolled/MyEnrolledCoursesRoutes.tsx";
import LogIn from "./pages/login/LogIn.tsx";
import SignUp from "./pages/signup/SignUp.tsx";

import axios from "axios";
import { useAuthContext } from "./shared/context/AuthContext.tsx";

axios.defaults.withCredentials = true; //Without this, browser won't save cookies recieved from the server.

function App() {
  const { loggedIn } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="courses/*" element={<CoursesRoutes />} />

          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />

          {loggedIn === true && (
            <>
              <Route
                path="my-courses/enrolled/*"
                element={<MyEnrolledCoursesRoutes />}
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
