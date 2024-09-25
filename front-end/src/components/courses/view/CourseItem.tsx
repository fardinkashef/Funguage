import { Link } from "react-router-dom";
import "./CourseItem.scss";

type CourseItemProps = {
  id: string;
  name: string;
  description: string;
  enrolled?: boolean;
};

function CourseItem({ id, name, description, enrolled }: CourseItemProps) {
  return (
    <Link className="CourseItem" to={`/courses/view/${id}`} state={enrolled}>
      <img
        src={
          import.meta.env.VITE_BACKEND_URL +
          `/static-files/profile-images/courses/${name}.jpg`
        }
      />
      <div className="info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      {enrolled && <span className="enrolled-tag">enrolled</span> }
    </Link>
  );
}

export default CourseItem;
