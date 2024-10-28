import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyCoursesPage() {
  return (
    <div>
      My Courses page
      <Link href="/teaching/create">
        <Button>New Course</Button>
      </Link>
    </div>
  );
}
