import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

const links = ["courses", "enrolled", "review"];

export function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[400px]">
        {links.map((link) => (
          <SheetClose asChild key={link}>
            <Link href={`/learning/${link}`}>{link}</Link>
          </SheetClose>
        ))}
      </SheetContent>
    </Sheet>
  );
}
