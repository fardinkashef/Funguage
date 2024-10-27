import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu, Home, LibraryBig, ChartNoAxesCombined } from "lucide-react";

const items = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },

  {
    title: "My Courses",
    href: "/teaching/my-courses",
    icon: LibraryBig,
  },
  {
    title: "Analytics",
    href: "/teaching/analytics",
    icon: ChartNoAxesCombined,
  },
];
export default function TeachingMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[400px] flex flex-col">
        {items.map((item) => (
          <SheetClose asChild key={item.title}>
            <Link href={item.href} className="flex items-center gap-2">
              <item.icon size={22} />
              <span>{item.title}</span>
            </Link>
          </SheetClose>
        ))}
      </SheetContent>
    </Sheet>
  );
}
