import { chapter, sessionUser } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown from "@/components/UserDropDown";
import CourseMenuSheet from "./CourseMenuSheet";
import CourseBreadCrumb from "./CourseBreadCrumb";

export default function CourseNavBar({
  user,
  chapters,
  courseId,
}: {
  user: sessionUser;
  chapters: chapter[];
  courseId: string;
}) {
  return (
    <div className="flex justify-between items-center p-4 border-b-2">
      <CourseMenuSheet chapters={chapters} courseId={courseId} />
      <SidebarTrigger className="hidden md:flex" />
      <CourseBreadCrumb />
      <UserDropdown user={user} />
    </div>
  );
}
