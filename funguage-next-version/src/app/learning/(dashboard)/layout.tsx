import { auth } from "@/auth";
import LearningNavbar from "@/components/learning/LearningNavbar";
import LearningSideBar from "@/components/learning/LearningSideBar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { sessionUser } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login?callbackUrl=/learning");

  return (
    <div className="flex h-full">
      <SidebarProvider>
        <LearningSideBar />
        <main className="grow">
          <LearningNavbar user={user as sessionUser} />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
