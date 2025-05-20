import { BookOpen, SquarePlay } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavLink from "@/components/NavLink";
import { chapter } from "@/lib/types";

export default function CourseSideBar({
  courseId,
  chapters,
}: {
  courseId: string;
  chapters: chapter[];
}) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex h-20 items-center px-1 text-xl">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <span>CourseName</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chapters.map((chapter) => (
                <SidebarMenuItem key={chapter.title}>
                  <SidebarMenuButton asChild tooltip={chapter.title} size="lg">
                    <NavLink
                      href={`/learning/courses/${courseId}/chapters/${chapter._id}`}
                    >
                      <SquarePlay />
                      <span>{chapter.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
