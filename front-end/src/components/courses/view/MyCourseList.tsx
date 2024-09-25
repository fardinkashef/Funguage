import MyCourseItem from "./MyCourseItem";
import "./MyCourseList.scss";

type courseData = { id: string; name: string; description: string };

type courseProgress = {
  courseId: string;
  percentage: number;
  learntWordsNum: number;
  totalWordsNum: number;
};

type MyCourseListProps = {
  coursesData: courseData[];
  coursesProgress?: courseProgress[];
};

const MyCourseList = ({ coursesData, coursesProgress }: MyCourseListProps) => {
  if (coursesData && coursesData.length === 0) {
    return (
      <div>
        <h2>No courses found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="MyCourseList">
      {coursesData.map((course, index) => (
        <MyCourseItem
          id={course.id}
          key={course.id}
          name={course.name}
          description={course.description}
          courseProgress={coursesProgress ? coursesProgress[index] : undefined}
        />
      ))}
    </div>
  );
};

export default MyCourseList;
