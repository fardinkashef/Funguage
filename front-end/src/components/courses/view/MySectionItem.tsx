import { Link } from "react-router-dom";
import "./MySectionItem.scss";

type sectionProgress = {
  percentage: number;
  learntWordsNum: number;
  totalWordsNum: number;
};

type MySectionItemProps = {
  name: string;
  description: string;
  courseName: string;
  courseId: string;
  progress: sectionProgress;
};

function MySectionItem({
  name,
  description,
  courseName,
  courseId,
  progress,
}: MySectionItemProps) {
  return (
    <Link
      className="MySectionItem"
      to={`/my-courses/enrolled/${courseId}/${name}`}
    >
      <img
        src={
          import.meta.env.VITE_BACKEND_URL +
          `/static-files/profile-images/sections/${courseName}/${name}.jpg`
        }
      />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="progress">
        <p className="percentage">{`${progress.percentage}% completed`}</p>
        <p className="wordsRemaining">{`${
          progress.totalWordsNum - progress.learntWordsNum
        } words remaining of ${progress.totalWordsNum}`}</p>
      </div>
    </Link>
  );
}

export default MySectionItem;
