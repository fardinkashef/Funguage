import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { sessionUser } from "@/lib/types";
import { getChapters } from "@/lib/server-actions/chapters";
import CourseNavBar from "./_components/CourseNavBar";
import CourseSideBar from "./_components/CourseSideBar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login?callbackUrl=/learning");

  const { courseId } = await params;
  const chapters = await getChapters(courseId);

  return (
    <div className="flex h-full">
      <SidebarProvider>
        <CourseSideBar chapters={chapters} courseId={courseId} />
        <main className="grow">
          <CourseNavBar
            user={user as sessionUser}
            chapters={chapters}
            courseId={courseId}
          />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
