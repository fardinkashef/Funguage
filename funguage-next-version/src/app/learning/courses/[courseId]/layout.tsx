import Navbar from "@/components/learning/LearningNavbar";
import SideBar from "@/components/learning/LearningSideBar";

import { SidebarProvider } from "@/components/ui/sidebar";
import CoursePageSideBar from "./_components/CoursePageSideBar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return (
    <div className="flex h-full">
      <SidebarProvider>
        <CoursePageSideBar courseId={courseId} />
        <main className="grow">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
