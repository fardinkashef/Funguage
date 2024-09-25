import "./CourseList.scss";
import CourseItem from "@/components/courses/view/CourseItem";

type courseData = { id: string; name: string; description: string };

type CourseListProps = {
  coursesData: courseData[];
  userEnrolledCoursesIds?: string[];
};

const CourseList = ({
  coursesData,
  userEnrolledCoursesIds,
}: CourseListProps) => {
  if (coursesData && coursesData.length === 0) {
    return (
      <div>
        <h2>No courses found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="CourseList">
      {coursesData.map((course) => (
        <CourseItem
          id={course.id}
          key={course.id}
          name={course.name}
          description={course.description}
          enrolled={
            userEnrolledCoursesIds &&
            !!userEnrolledCoursesIds.find((id) => course.id === id)
          }
        />
      ))}
    </div>
  );
};

export default CourseList;
