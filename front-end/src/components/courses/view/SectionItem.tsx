import { Link } from "react-router-dom";
import "./SectionItem.scss";

type SectionItemProps = {
  name: string;
  description: string;
  courseName: string;
  courseId: string;
};

function SectionItem({
  name,
  description,
  courseName,
  courseId,
}: SectionItemProps) {
  return (
    <Link className="SectionItem" to={`/courses/view/${courseId}/${name}`}>
      <img
        src={
          import.meta.env.VITE_BACKEND_URL +
          `/static-files/profile-images/sections/${courseName}/${name}.jpg`
        }
      />
      <h3>{name}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default SectionItem;
