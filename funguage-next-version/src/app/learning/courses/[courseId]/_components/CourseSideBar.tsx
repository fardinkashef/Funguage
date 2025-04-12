import { SquarePlay } from "lucide-react";

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
          <SidebarGroupLabel>Course Name</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chapters.map((chapter) => (
                <SidebarMenuItem key={chapter.title}>
                  <SidebarMenuButton asChild>
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
