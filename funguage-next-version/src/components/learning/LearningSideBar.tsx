import {
  Home,
  LibraryBig,
  SquareLibrary,
  BookCheck,
  FileVideo,
} from "lucide-react";

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
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },

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
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
