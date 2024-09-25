import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBarWideScreen.scss";
import { useAuthContext } from "@/shared/context/AuthContext";
import axios from "axios";
import { useState } from "react";

function NavBarWideScreen() {
  const [infoOpen, setInfoOpen] = useState(false);
  const { loggedIn, userName, getLoggedIn } = useAuthContext();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    await axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/logout");
    await getLoggedIn();
    navigate("/", { replace: true });
  };

  return (
    <nav className="NavBarWideScreen">
      <Link to="" className="logo" />

      {loggedIn === false && (
        <ul>
          {/* <li key={"signup"} >
          <NavLink to="signup"  end>
            SignUp
          </NavLink>
        </li> */}
          <li key="courses">
            <NavLink to="courses/view/all" end>
              Courses
            </NavLink>
          </li>
          <li key="login-signup" className="login-signup">
            <NavLink to="login" end>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
              </svg>
              LogIn | Sign Up
            </NavLink>
          </li>
          {/* <li key="courses/new">
            <NavLink to="courses/new">NewCourse</NavLink>
          </li> */}
        </ul>
      )}

      {loggedIn === true && (
        <ul>
          <li key="my-courses">
            <NavLink to="my-courses/enrolled/all" end>
              MyCourses
            </NavLink>
          </li>
          <li key="courses">
            <NavLink to="courses/view/all" end>
              Courses
            </NavLink>
          </li>
          <li key="courses/new">
            <NavLink to="courses/new">NewCourse</NavLink>
          </li>
          <li key="user-account" className="user-account">
            <button onClick={() => setInfoOpen((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#FFFFFF"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
              <svg
                className={infoOpen ? "info-open" : ""}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#FFFFFF"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
            <ul className={!infoOpen ? "info-closed" : ""}>
              <li>
                <Link to="/" onClick={() => setInfoOpen(false)}>
                  {userName}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogOut();
                    setInfoOpen(false);
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBarWideScreen;
