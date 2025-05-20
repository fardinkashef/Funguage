import {
  LibraryBig,
  SquareLibrary,
  BookCheck,
  FileVideo,
  BookHeart,
  BookOpen,
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
    icon: BookHeart,
  },
  {
    title: "My Vocabulary",
    href: "/learning/my-vocabulary",
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
          <SidebarGroupLabel className="flex h-20 items-center px-4 text-xl">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <span>Learning</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="py-6"
                  >
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
