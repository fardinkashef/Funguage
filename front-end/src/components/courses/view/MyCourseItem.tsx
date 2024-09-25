import { Link } from "react-router-dom";
import "./MyCourseItem.scss";

type courseProgress = {
  courseId: string;
  percentage: number;
  learntWordsNum: number;
  totalWordsNum: number;
};

type MyCourseItemProps = {
  id: string;
  name: string;
  description: string;
  courseProgress: courseProgress;
};

function MyCourseItem({
  id,
  name,
  description,
  courseProgress,
}: MyCourseItemProps) {
  return (
    <Link className="MyCourseItem" to={`/my-courses/enrolled/${id}`}>
      <img
        src={
          import.meta.env.VITE_BACKEND_URL +
          `/static-files/profile-images/courses/${name}.jpg`
        }
      />
      <div className="info">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <div className="progress">
          <p className="percentage">{`${courseProgress.percentage}% completed`}</p>
          <p className="wordsRemaining">{`${
            courseProgress.totalWordsNum - courseProgress.learntWordsNum
          } words remaining of ${courseProgress.totalWordsNum}`}</p>
        </div>
      </div>
    </Link>
  );
}

export default MyCourseItem;
