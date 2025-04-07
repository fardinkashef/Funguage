import { LibraryBig, SquareLibrary, BookCheck, FileVideo } from "lucide-react";

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
import NavLink from "../NavLink";

// Menu items.
const items = [
  {
    title: "Browse",
    href: "/learning/browse",
    icon: LibraryBig,
  },
  {
    title: "Enrolled",
    href: "/learning/enrolled",
    icon: SquareLibrary,
  },
  {
    title: "Flash Card Review",
    href: "/learning/review/flashcard",
    icon: BookCheck,
  },
  {
    title: "Clip Review",
    href: "/learning/review/clip",
    icon: FileVideo,
  },
];

export default function LearningSideBar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
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
