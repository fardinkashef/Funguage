import NavLink from "@/components/NavLink";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { chapter } from "@/lib/types";
import { Menu, SquarePlay } from "lucide-react";

export default function CourseMenuSheet({
  courseId,
  chapters,
}: {
  courseId: string;
  chapters: chapter[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[400px] flex flex-col">
        {chapters.map((chapter) => (
          <SheetClose asChild key={chapter._id}>
            <NavLink
              href={`/learning/courses/${courseId}/chapters/${chapter._id}`}
              className="flex gap-1"
            >
              <SquarePlay />
              <span>{chapter.title}</span>
            </NavLink>
          </SheetClose>
        ))}
      </SheetContent>
    </Sheet>
  );
}
