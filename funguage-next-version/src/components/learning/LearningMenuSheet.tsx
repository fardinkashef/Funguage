import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  Menu,
  Home,
  BookOpenCheck,
  LibraryBig,
  SquareLibrary,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Courses",
    url: "/learning/courses",
    icon: LibraryBig,
  },
  {
    title: "Enrolled",
    url: "/learning/enrolled",
    icon: SquareLibrary,
  },
  {
    title: "Review",
    url: "/learning/review",
    icon: BookOpenCheck,
  },
];
export default function LearningMenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[400px] flex flex-col">
        {items.map((item) => (
          <SheetClose asChild key={item.title}>
            <Link href={item.url} className="flex items-center gap-2">
              <item.icon size={22} />
              <span>{item.title}</span>
            </Link>
          </SheetClose>
        ))}
      </SheetContent>
    </Sheet>
  );
}
