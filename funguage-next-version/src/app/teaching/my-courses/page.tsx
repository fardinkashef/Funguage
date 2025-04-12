import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/server-actions/courses";
import { course } from "@/lib/types";
import Link from "next/link";

export default async function MyCoursesPage() {
  const courses = (await getCourses()) as course[];
  return (
    <div>
      My Courses page
      <Link href="/teaching/create">
        <Button>New Course</Button>
      </Link>
      <div className="flex flex-col gap-4">
        {courses.map((course: course) => (
          <Link href={`/teaching/my-courses/${course._id}`} key={course.title}>
            {course.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
