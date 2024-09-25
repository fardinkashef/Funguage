import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NewCourseNavBar.scss";

type NewCourseNavBarProps = {
  // sectionNumber: number;
  setSectionNumber: React.Dispatch<React.SetStateAction<number>>;
  handleAddSection: () => void;
  sectionsNumber: number;
};

function NewCourseNavBar({
  // sectionNumber,
  setSectionNumber,
  handleAddSection,
  sectionsNumber,
}: NewCourseNavBarProps) {
  // State variables 👇:
  const [linksHidden, setLinksHidden] = useState(true);

  // Handlers 👇:
  const toggleLinksHidden = () =>
    setLinksHidden((previousLinksHidden) => !previousLinksHidden);

  const handleCloseLinksBox = () => {
    if (!linksHidden) setLinksHidden(true);
  };

  return (
    <div className="NewCourseNavBar">
      <nav className={linksHidden ? "hidden" : ""} id="nav">
        <ul>
          <li key="profile">
            <NavLink
              to="/courses/new/profile"
              onClick={handleCloseLinksBox}
              end
            >
              {"profile"}
            </NavLink>
          </li>
          {Array.from({ length: sectionsNumber }, (_, i) => i + 1).map(
            (sectionNum) => (
              <li key={`section_${sectionNum}`}>
                <NavLink
                  to={`/courses/new/section/${sectionNum}`}
                  onClick={() => {
                    setSectionNumber(sectionNum);
                    handleCloseLinksBox;
                  }}
                  end
                >
                  {`section_${sectionNum}`}
                </NavLink>
              </li>
            )
          )}
          <li key="add section">
            <button onClick={handleAddSection}>add section</button>
          </li>
          <li key="publish">
            <NavLink
              to="/courses/new/publish"
              onClick={handleCloseLinksBox}
              end
            >
              {"publish"}
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className="menu-button" onClick={toggleLinksHidden}></button>
    </div>
  );
}

export default NewCourseNavBar;
