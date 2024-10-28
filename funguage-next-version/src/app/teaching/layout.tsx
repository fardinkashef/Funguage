import Navbar from "@/components/teaching/TeachingNavbar";
import SideBar from "@/components/teaching/TeachingSideBar";

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
        <main className="grow flex flex-col">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
