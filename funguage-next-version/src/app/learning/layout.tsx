import Navbar from "@/components/learning/Navbar";
import SideBar from "@/components/learning/SideBar";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function LearingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <SidebarProvider>
        {/* <div className="hidden md:block w-[300px] h-full bg-blue-500">
          sidebar
        </div> */}
        <SideBar />
        <main className="grow">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
