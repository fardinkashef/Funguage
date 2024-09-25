import "./SectionList.scss";
import SectionItem from "@/components/courses/view/SectionItem";

type sectionData = {
  name: string;
  description: string;
};

type SectionListProps = {
  courseName: string;
  courseId: string;
  sectionsData: sectionData[];
};

function SectionList({ courseName, courseId, sectionsData }: SectionListProps) {
  if (sectionsData && sectionsData.length === 0) {
    return (
      <div>
        <h2>No sections found. Maybe create one?</h2>
        <button>Share Course</button>
      </div>
    );
  }

  return (
    <div className="SectionList">
      {sectionsData.map((section) => (
        <SectionItem
          name={section.name}
          description={section.description}
          key={section.name}
          courseName={courseName}
          courseId={courseId}
        />
      ))}
    </div>
  );
}

export default SectionList;
