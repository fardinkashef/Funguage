import { getCourses } from "@/lib/server-actions/courses";
import Link from "next/link";

export default async function BrowsePage() {
  const courses = await getCourses();
  return (
    <ul>
      {courses.map((course) => (
        <li key={course._id}>
          <Link href={`/learning/courses/${course._id}`}>{course.title}</Link>
        </li>
      ))}
    </ul>
  );
}
