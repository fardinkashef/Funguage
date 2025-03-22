import { getChapters } from "@/lib/server-actions/chapters";
import { getCourseById } from "@/lib/server-actions/courses";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  const chapters = await getChapters(courseId);
  return (
    <div className="flex">
      <div>chapters</div>
      <div></div>
    </div>
  );
}
