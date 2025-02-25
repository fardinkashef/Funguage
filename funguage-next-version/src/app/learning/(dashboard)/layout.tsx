import Navbar from "@/components/learning/LearningNavbar";
import SideBar from "@/components/learning/LearningSideBar";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function LearingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <SidebarProvider>
        <SideBar />
        <main className="grow">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
