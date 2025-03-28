import LearningNavbar from "@/components/learning/LearningNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import CoursePageSideBar from "./_components/CoursePageSideBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { sessionUser } from "@/lib/types";

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

  return (
    <div className="flex h-full">
      <SidebarProvider>
        <CoursePageSideBar courseId={courseId} />
        <main className="grow">
          <LearningNavbar user={user as sessionUser} />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
