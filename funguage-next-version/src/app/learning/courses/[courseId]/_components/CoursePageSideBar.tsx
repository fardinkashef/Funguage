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
import { getChapters } from "@/lib/server-actions/chapters";
import NavLink from "@/components/NavLink";

export default async function CoursePageSideBar({
  courseId,
}: {
  courseId: string;
}) {
  const chapters = await getChapters(courseId);

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
