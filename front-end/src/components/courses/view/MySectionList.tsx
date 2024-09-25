import "./MySectionList.scss";
import MySectionItem from "./MySectionItem";

type sectionProgress = {
  percentage: number;
  learntWordsNum: number;
  totalWordsNum: number;
};

type sectionData = {
  name: string;
  description: string;
  progress: sectionProgress;
};

type MySectionListProps = {
  courseName: string;
  courseId: string;
  sectionsData: sectionData[];
};

function MySectionList({
  courseName,
  courseId,
  sectionsData,
}: MySectionListProps) {
  if (sectionsData && sectionsData.length === 0) {
    return (
      <div>
        <h2>No sections found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="MySectionList">
      {sectionsData.map((section) => (
        <MySectionItem
          name={section.name}
          description={section.description}
          key={section.name}
          courseName={courseName}
          courseId={courseId}
          progress={section.progress}
        />
      ))}
    </div>
  );
}

export default MySectionList;
