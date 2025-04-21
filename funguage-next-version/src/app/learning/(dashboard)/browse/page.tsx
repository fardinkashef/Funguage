import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/server-actions/courses";
import { course } from "@/lib/types";

export default async function BrowsePage() {
  const courses = (await getCourses()) as course[];
  return (
    <ul className="p-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <li key={course._id}>
          {/* <Link href={`/learning/courses/${course._id}`}>{course.title}</Link> */}
          <CourseCard
            _id={course._id as string}
            title={course.title}
            description={course.description as string}
            level={course.level}
            imageUrl={course.imageUrl as string}
            wordCount={course.usedDatabaseWordIds?.length || 0}
          />
        </li>
      ))}
    </ul>
  );
}
